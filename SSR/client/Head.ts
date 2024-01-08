import { usePage } from "@ssr-client/usePage";
import { Nullable } from "@yandex/ymaps3-types";
import React, {
  DOMAttributes,
  FC,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import HeadContext from "./HeadContext";

type Head = FC<HeadProps>;

type NodeType = ReactElement<
  Record<string, unknown> &
    DOMAttributes<HTMLElement> & {
      dangerouslySetInnerHTML?: {
        __html: string;
      };
    }
>;

type HeadProps = {
  title?: string;
  children?: Array<Nullable<NodeType>> | Nullable<NodeType>;
};

const Head: Head = function ({ children, title }) {
  const headManager = useContext(HeadContext);
  const page = usePage();
  const provider = useMemo(() => headManager?.createProvider(), [headManager]);

  function isUnaryTag(node: NodeType) {
    return (
      [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ].indexOf(`${node.type.toString()}`) > -1
    );
  }

  function renderTagStart(node: NodeType) {
    const attrs = Object.keys(node.props).reduce((carry, name) => {
      if (["head-key", "children", "dangerouslySetInnerHTML"].includes(name)) {
        return carry;
      }
      const value = node.props[name] as string;
      if (value === "") {
        return carry + ` ${name}`;
      } else {
        return carry + ` ${name}="${value}"`;
      }
    }, "");
    return `<${node.type.toString()}${attrs}>`;
  }

  function renderTagChildren(node: NodeType) {
    if (typeof node.props.children === "string") {
      return node.props.children;
    }

    if (Array.isArray(node.props.children)) {
      return node.props?.children?.reduce<string>(
        (html, child) => html + renderTag(child as NodeType),
        "",
      );
    }
    return renderTag(node.props.children as NodeType);
  }

  function renderTag(node: NodeType) {
    let html = renderTagStart(node);
    if (node.props.children) {
      html += renderTagChildren(node);
    }
    if (node.props.dangerouslySetInnerHTML) {
      html += node.props.dangerouslySetInnerHTML.__html;
    }
    if (!isUnaryTag(node)) {
      html += `</${node.type.toString()}>`;
    }
    return html;
  }

  function ensureNodeHasInitProp(node: NodeType) {
    return React.cloneElement(node, {
      init: node.props["head-key"] !== undefined ? node.props["head-key"] : "",
    });
  }

  function renderNode(node: NodeType) {
    return renderTag(ensureNodeHasInitProp(node));
  }

  function renderNodes(nodes: Array<Nullable<NodeType>>) {
    const computed = React.Children.toArray(nodes)
      .filter((node) => !!node)
      .map((node) => renderNode(node as NodeType));

    if (title && !computed.find((tag) => tag.startsWith("<title"))) {
      computed.unshift(`<title init>${title}</title>`);
    }
    return computed;
  }

  if (children) {
    const rendered = renderNodes(
      Array.isArray(children) ? children : [children],
    );
    provider?.update(rendered, page.location);
  }

  return null;
};
export default Head;

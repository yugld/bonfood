import debounce from "./debounce";

const Renderer = {
  buildDOMElement(tag: string): ChildNode {
    const template = document.createElement("template");
    template.innerHTML = tag;
    const node = template.content.firstChild as Element;

    if (!tag.startsWith("<script ")) {
      return node;
    }

    const script = document.createElement("script");
    script.innerHTML = node.innerHTML;
    node.getAttributeNames().forEach((name) => {
      script.setAttribute(name, node.getAttribute(name) || "");
    });

    return script;
  },

  isInitManagedElement(element: Element): boolean {
    return (
      element.nodeType === Node.ELEMENT_NODE &&
      element.getAttribute("init") !== null
    );
  },

  findMatchingElementIndex(element: Element, elements: Array<Element>): number {
    const key = element.getAttribute("init");
    if (key !== null) {
      return elements.findIndex(
        (element) => element.getAttribute("init") === key,
      );
    }

    return -1;
  },

  update: debounce(function (elements: Array<string>) {
    const sourceElements = elements.map((element) =>
      Renderer.buildDOMElement(element),
    );

    const targetElements = Array.from(
      document.head.querySelectorAll("[init]"),
    ).filter((element) => Renderer.isInitManagedElement(element));

    targetElements.forEach((targetElement) => {
      targetElement?.parentNode?.removeChild(targetElement);
    });

    sourceElements.forEach((element) => document.head.appendChild(element));
  }, 1),
};

export default function createHeadManager(
  isServer: boolean,
  titleCallback: (title: string) => string,
  onUpdate: (elements: string[]) => void,
): {
  forceUpdate: () => void;
  createProvider: () => {
    update: (elements: string[], id: string) => void;
    disconnect: () => void;
  };
} {
  const states: Record<string, Array<string>> = {};

  function update(elements: Array<string> = [], id: string): void {
    states[id] = Array.from(new Set([...(states[id] || []), ...elements]));
    commit(id);
  }

  function collect(id?: string): Array<string> {
    const title = titleCallback("");

    const defaults: Record<string, string> = {
      ...(title ? { title: `<title init="">${title}</title>` } : {}),
    };

    const elements = (id ? states[id] || [] : Object.values(states))
      .reduce<string[]>((carry, elements) => carry.concat(elements), [])
      .reduce((carry, element) => {
        if (element.indexOf("<") === -1) {
          return carry;
        }

        if (element.indexOf("<title ") === 0) {
          const title = element.match(/(<title [^>]+>)(.*?)(<\/title>)/);
          carry.title = title
            ? `${title[1]}${titleCallback(title[2])}${title[3]}`
            : element;
          return carry;
        }

        const name = element.match(/ name="[^"]+"/);
        if (name) {
          carry[name[0]] = element;
          return carry;
        }

        const match = element.match(/ init="[^"]+"/);
        if (match) {
          carry[match[0]] = element;
        } else {
          carry[Object.keys(carry).length] = element;
        }

        return carry;
      }, defaults);

    return Object.values(elements);
  }

  function commit(id?: string): void {
    isServer ? onUpdate(collect(id)) : Renderer.update(collect(id));
  }

  // By committing during initialization, we can guarantee that the default
  // tags are set, as well as that they exist during SSR itself.
  commit();

  return {
    forceUpdate: commit,
    createProvider: function () {
      return {
        update: (elements, id) => update(elements, id),
        disconnect: () => "",
      };
    },
  };
}

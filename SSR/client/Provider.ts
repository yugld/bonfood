import {
  ReactElement,
  ReactNode,
  StrictMode,
  createElement,
  useMemo,
  useState,
} from "react";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { ProviderProps, RenderFunctionType } from "../types";
import HeadContext from "./HeadContext";
import PageContext from "./PageContext";
import createHeadManager from "./headManager";

const renderChildDefault = ({ Component, props, key }: RenderFunctionType) => {
  const child = createElement(Component, { key, ...props });

  if (typeof Component.layout === "function") {
    return Component.layout(child) as ReactElement;
  }

  if (Array.isArray(Component.layout)) {
    return Component.layout.reduce(
      (children: ReactNode, Layout) =>
        createElement(Layout, { children, ...props }),
      child,
    ) as ReactElement;
  }

  return child;
};

export default function Provider({
  children,
  initialComponent,
  getInitialPageData,
  onHeadUpdate,
}: ProviderProps) {
  const isServer = typeof window === "undefined";

  const Router = isServer ? StaticRouter : BrowserRouter;

  const [current, setCurrent] = useState({
    component: initialComponent || null,
    page: getInitialPageData(),
    key: null,
  });

  const headManager = useMemo(() => {
    return createHeadManager(
      typeof window === "undefined",
      (title) => title,
      onHeadUpdate || (() => {}),
    );
  }, [onHeadUpdate]);

  if (!current.component) {
    return createElement(
      StrictMode,
      {},
      createElement(
        Router,
        { location: current.page.location },
        createElement(
          PageContext.Provider,
          {
            value: {
              page: current.page,
              setPage: (pageCallback) =>
                setCurrent((state) => ({
                  ...state,
                  page: pageCallback(state.page),
                })),
            },
          },
          createElement(
            HeadContext.Provider,
            { value: headManager },

            null,
          ),
        ),
      ),
    );
  }

  const renderChildren = children ? () => children : renderChildDefault;

  return createElement(
    StrictMode,
    {},
    createElement(
      Router,
      { location: current.page.location },
      createElement(
        PageContext.Provider,
        {
          value: {
            page: current.page,
            setPage: (pageCallback) =>
              setCurrent((state) => ({
                ...state,
                page: pageCallback(state.page),
              })),
          },
        },
        createElement(
          HeadContext.Provider,
          { value: headManager },

          renderChildren({
            Component: current.component,
            key: current.key,
            props: current.page.props,
          }),
        ),
      ),
    ),
  );
}

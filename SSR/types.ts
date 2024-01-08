import { IncomingMessage, ServerResponse } from "http";
import { FunctionComponent, ReactElement, ReactNode } from "react";

export type PageResponse = { head: string[]; body: string };
export type HeadManagerOnUpdate = (elements: string[]) => void;

export type DecoratePage = ((page: Page) => Promise<void> | void) | undefined;
export type DecoratePageResponse = (
  response: PageResponse,
) => Promise<PageResponse> | PageResponse;

export type PageResolver = (page: Page) => Promise<{
  page: unknown;
  decoratePage?: DecoratePage;
  decorateResponse?: DecoratePageResponse;
}>;

export type Component = unknown;

export type ProviderProps = {
  children?: ReactNode;
  initialComponent: FunctionComponent & { layout: unknown };
  onHeadUpdate?: HeadManagerOnUpdate | null;
  getInitialPageData: () => Page;
};

export type RenderFunctionType = {
  Component: ProviderProps["initialComponent"];
  props: Page["props"];
  key: string | null;
};

export type SetupOptions = {
  el: HTMLElement | null;
  Provider: FunctionComponent<ProviderProps>;
  props: ProviderProps;
};

export type CreateSSROptions = {
  setup?: (options: SetupOptions) => ReactElement | void;
  resolve: PageResolver;
  page?: Page;
  render?: (element: ReactElement) => string | Promise<string>;
};

export type Errors = Record<string, string>;
export type ErrorBag = Record<string, Errors>;

export type AppCallback = (page: Page) => SSRAppResponse;
export type RouteHandler = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  },
) => unknown;

type JSONScalar = string | number | boolean;
interface JSONObject {
  [key: string]: JSONScalar | JSONObject | JSONScalar[] | JSONObject[];
}
export interface Page {
  component: string;
  props: JSONObject & { errors: Errors & ErrorBag };
  location: string;
  origin: string;
  csrfToken: string;
  errorMessage?: string;
  meta?: JSONObject;
}

export interface ReqRes {
  _response: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  };
  _request: IncomingMessage;
}

export type PageHandler = ({
  component,
  page,
}: {
  component: Component;
  page: Page;
}) => Promise<unknown>;

export type SSRAppResponse = Promise<{
  head: string[];
  body: string;
} | void>;

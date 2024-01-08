import { createContext } from "react";
import { Page } from "../types";

type SetPageCallBack = (page: Page) => Page;
const pageContext = createContext<{
  page: Page;
  setPage: (callback: SetPageCallBack) => void;
} | null>(null);

export default pageContext;

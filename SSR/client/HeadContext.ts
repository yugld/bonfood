import { createContext } from "react";
import createHeadManager from "./headManager";

const headContext = createContext<ReturnType<typeof createHeadManager> | null>(
  null,
);

export default headContext;

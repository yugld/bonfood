import { cn } from "@init-src/utils/cn";
import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn("container mx-auto lg:w-4/5 3xl:w-2/3", "px-5 lg:px-0", "")}
    >
      {children}
    </div>
  );
}

export default Container;

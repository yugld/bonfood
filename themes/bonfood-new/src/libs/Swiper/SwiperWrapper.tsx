import { cn } from "@init-src/utils/cn";
import { ReactNode } from "react";

type SwiperWrapperProps = {
  children: ReactNode;
  swiperWrapperClasses?: string;
  vertical: boolean;
};

function SwiperWrapper({
  children,
  swiperWrapperClasses,
  vertical,
}: SwiperWrapperProps) {
  return (
    <div
      className={cn(
        "swiper-wrapper relative z-10 box-content flex h-full w-full transition-transform",
        "flex h-full items-stretch",
        swiperWrapperClasses,
        vertical && "flex-col",
      )}
    >
      {children}
    </div>
  );
}

export default SwiperWrapper;

import { cn } from "@init-src/utils/cn";
import { ForwardedRef, ReactNode, forwardRef } from "react";

type SwiperComponentProps = {
  children: ReactNode | ReactNode[];
  swiperClasses?: string;
};

function SwiperComponentBase(
  { children, swiperClasses }: SwiperComponentProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={cn(
        "swiper relative z-[1] mx-auto block list-none p-0 overflow-clip",
        "h-full",
        swiperClasses,
      )}
      ref={ref}
    >
      {children}
    </div>
  );
}

const SwiperComponent = forwardRef<HTMLDivElement, SwiperComponentProps>(
  SwiperComponentBase,
);

export default SwiperComponent;

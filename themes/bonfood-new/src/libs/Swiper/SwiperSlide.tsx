import { cn } from "@init-src/utils/cn";
import { ReactNode } from "react";

type SwiperSlideProps = {
  children: ReactNode;
  swiperSlideClasses?: string;
};

function SwiperSlide({ children, swiperSlideClasses }: SwiperSlideProps) {
  return (
    <div
      className={cn(
        "swiper-slide relative block w-full flex-shrink-0 transition-transform",
        "p-3 my-3",
        swiperSlideClasses,
      )}
    >
      {children}
    </div>
  );
}

export default SwiperSlide;

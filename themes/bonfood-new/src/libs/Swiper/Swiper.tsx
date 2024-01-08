import SwiperComponent from "@init-src/libs/Swiper/SwiperComponent";
import SwiperNavigation from "@init-src/libs/Swiper/SwiperNavigation";
import SwiperSlide from "@init-src/libs/Swiper/SwiperSlide";
import SwiperWrapper from "@init-src/libs/Swiper/SwiperWrapper";
import { cn } from "@init-src/utils/cn";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createRef,
  useEffect,
  useRef,
} from "react";
import Swiper from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

type SwiperComponentProps<T> = {
  data: T[];
  renderSlide: (data: T) => {
    key: string | number;
    element: ReactNode;
  };
  children?: ReactNode | ReactNode[];
  perView?: number;
  perViewBreakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  state?: { state: number; setState: Dispatch<SetStateAction<number>> };
  swiperClasses?: string;
  swiperWrapperClasses?: string;
  navigation?: boolean;
  swiperSlideClasses?: string;
  swiperNavigationClasses?: string;
  name?: string;
  rootClasses?: string;
  spaceBetween?: number;
  vertical?: boolean;
  autoPerView?: boolean;
  mousewheel?: boolean;
  autoplay?: number;
};

function SwiperReact<T extends object>({
  data,
  renderSlide,
  children,
  perView,
  rootClasses,
  swiperClasses,
  swiperSlideClasses,
  swiperWrapperClasses,
  swiperNavigationClasses,
  perViewBreakpoints,
  spaceBetween,
  vertical,
  navigation,
  name,
  autoPerView,
  autoplay,
  state,
  mousewheel,
}: SwiperComponentProps<T>) {
  const swiper = useRef<Swiper>();
  const swiperElement = createRef<HTMLDivElement>();

  useEffect(() => {
    if (!swiperElement.current) return;
    const slide = swiper.current?.activeIndex || 0;

    const options: SwiperOptions = {
      slidesPerView: autoPerView ? "auto" : perView || 1,

      modules: [Navigation, Scrollbar, Autoplay],

      direction: vertical ? "vertical" : "horizontal",

      navigation: {
        nextEl: `.${name || "swiper-button"}__right`,
        prevEl: `.${name || "swiper-button"}__left`,
      },

      scrollbar: {
        el: ".swiper__scrollbar",
      },
      mousewheel: mousewheel || undefined,

      spaceBetween: spaceBetween || 0,
    };

    if (state) {
      options.on = {
        slideChange: () => {
          state?.setState(swiper.current?.realIndex || 0);
        },
      };
    }

    if (autoplay) {
      options.autoplay = {
        delay: autoplay,
        pauseOnMouseEnter: false,
      };
    }

    if (perViewBreakpoints) {
      options.breakpoints = {
        640: {
          ...options,
          slidesPerView: perViewBreakpoints?.sm || perView,
        },
        768: {
          ...options,
          slidesPerView:
            perViewBreakpoints?.md || perViewBreakpoints?.sm || perView,
        },
        1024: {
          ...options,
          slidesPerView:
            perViewBreakpoints?.lg || perViewBreakpoints?.md || perView,
        },
        1440: {
          ...options,
          slidesPerView:
            perViewBreakpoints?.xl || perViewBreakpoints?.lg || perView,
        },
        2560: {
          ...options,
          slidesPerView:
            perViewBreakpoints?.xxl || perViewBreakpoints?.xl || perView,
        },
      };
    }

    swiper.current = new Swiper(swiperElement.current, options);
    if (state) {
      swiper.current.slideTo(state.state);
    } else {
      swiper.current.slideTo(slide);
    }

    return () => {
      swiper.current?.destroy();
    };
  }, [
    perView,
    swiperElement,
    perViewBreakpoints,
    spaceBetween,
    state,
    autoplay,
    vertical,
    name,
    autoPerView,
    mousewheel,
  ]);

  return (
    <div className={cn("relative", rootClasses)}>
      <SwiperComponent ref={swiperElement} swiperClasses={swiperClasses}>
        <SwiperWrapper
          vertical={vertical || false}
          swiperWrapperClasses={swiperWrapperClasses}
        >
          {data.map((dataItem) => {
            const { element, key } = renderSlide(dataItem);
            return (
              <SwiperSlide key={key} swiperSlideClasses={swiperSlideClasses}>
                {element}
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>
      </SwiperComponent>

      {navigation && (
        <SwiperNavigation
          className={swiperNavigationClasses || ""}
          name={name || "swiper-button"}
        />
      )}
      {children}
    </div>
  );
}

export default SwiperReact;

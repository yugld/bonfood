import Container from "@bonfood-new-src/components/Container";
import SwiperReact from "@bonfood-new-src/libs/Swiper/Swiper";
import { cn } from "@init-src/utils/cn";
import { usePageMeta } from "@ssr-client/usePage";
import { useState } from "react";
interface Slide {
  image: string;
  title: string;
  subtitle: string;
  url: string;
  key: number;
}
function InitHome() {
  const themeUrl = usePageMeta<string>("themeUrl");

  const [slides] = useState<Slide[]>([
    {
      image: "/img/swiperInit/oats.jpg",
      title: "Товар дня",
      subtitle: "Перейти к товарам!",
      url: "/product",
      key: 0,
    },
    {
      image: "/img/swiperInit/spaghetti.jpg",
      title: "Поставщик продуктов питания",
      subtitle: "Продукты лучшего качества",
      url: "/product",
      key: 1,
    },
    {
      image: "/img/swiperInit/rice.jpg",
      title: "Поставщик продуктов питания",
      subtitle: "Продукты лучшего качества",
      url: "/product",
      key: 2,
    },
    {
      image: "/img/swiperInit/spices.jpg",
      title: "Поставщик продуктов питания",
      subtitle: "Продукты лучшего качества",
      url: "/product",
      key: 3,
    },
    {
      image: "/img/swiperInit/blini.jpg",
      title: "Поставщик продуктов питания",
      subtitle: "Продукты лучшего качества",
      url: "/product",
      key: 4,
    },
    {
      image: "/img/mainSlider/bonfood.jpg",
      title: "",
      subtitle: "",
      url: "/product",
      key: 5,
    },
  ]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <Container>
      <div className="init__wrapper space-y-6 flex flex-col justify-center items-center">
        <SwiperReact
          state={{ state: activeIndex, setState: setActiveIndex }}
          data={slides}
          renderSlide={({ image, title, subtitle, url, key }) => ({
            key: key,
            element: (
              <a
                href={url}
                className={`swiper-slide flex-shrink-0 h-full rounded-lg bg-cover bg-center flex items-center`}
                style={{
                  backgroundImage: `url(${themeUrl}${image})`,
                }}
              >
                <div className="content flex flex-col gap-2 lg:gap-12 w-2/3 md:w-1/2 pl-20 lg:pb-20 justify-center h-full text-white font-bold">
                  <span className="leading-snug text-xl sm:text-3xl md:text-3xl lg:text-5xl md:leading-snug lg:leading-snug">
                    {title}
                  </span>
                  <span className="text-lg sm:text-2xl lg:text-3xl">
                    {subtitle}
                  </span>
                </div>
              </a>
            ),
          })}
          rootClasses="init__swiper swiper w-full overflow-hidden h-[15rem] sm:h-[20rem] lg:h-[30rem] 2xl:h-[34rem]"
          swiperWrapperClasses="swiper-wrapper flex h-full"
          swiperSlideClasses="swiper-slide"
          perView={1}
          spaceBetween={0}
        />

        {/* <div className="init_pagination w-fit grid grid-cols-6 p-3 h-4 gap-2 lg:hidden space-x-1 rounded-2xl justify-center items-center"></div> */}

        <div className="swiper hidden lg:flex init_thumbs h-1/6">
          <div className="init__thumbnails swiper-wrapper grid grid-cols-6 auto-rows-[4rem] lg:auto-rows-[5rem] gap-10">
            {slides.map((slide, index) => {
              return (
                <button
                  key={slide.key}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "thumbnail swiper-slide rounded-lg h-full",
                    index === activeIndex && "opacity-30",
                  )}
                >
                  <img
                    className="h-full w-full object-cover rounded-lg"
                    src={themeUrl + slide.image}
                    alt=""
                  />
                  <p className="text-sm pt-2 text-start">
                    {!slide.title ? "Bonfood" : slide.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InitHome;

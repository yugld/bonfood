import Headline from "@bonfood-new-src/components/Headline";
import SwiperReact from "@bonfood-new-src/libs/Swiper/Swiper";
import { usePageMeta } from "@ssr-client/usePage";

function Awards() {
  const themeUrl = usePageMeta<string>("themeUrl");

  const awardsData = [
    {
      image: "/img/awards/1award.jpg",
      key: 1,
    },
    {
      image: "/img/awards/4award.jpg",
      key: 4,
    },
    {
      image: "/img/awards/2award.jpg",
      key: 2,
    },
    {
      image: "/img/awards/3award.jpg",
      key: 3,
    },
  ];

  return (
    <div className="awards overflow-hidden flex flex-col gap-12 justify-center">
      <Headline text="Достижения и награды" />
      <SwiperReact
        data={awardsData}
        renderSlide={({ image, key }) => ({
          key: key,
          element: (
            <img
              src={themeUrl + image}
              className="h-full hover:scale-120 transition-transform duration-300 ease-in-out"
            />
          ),
        })}
        rootClasses="awards__swiper swiper w-full overflow-hidden"
        swiperWrapperClasses="awards__swiper--wrapper swiper-wrapper flex h-full w-full"
        swiperSlideClasses="swiper-slide awards__swiper--item flex-shrink-0 rounded-sm h-80 max-w-max"
        perView={2}
        perViewBreakpoints={{
          sm: 2,
          md: 3,
          lg: 4,
        }}
        spaceBetween={40}
        navigation={true}
        autoplay={3000}
      />
    </div>
  );
}

export default Awards;

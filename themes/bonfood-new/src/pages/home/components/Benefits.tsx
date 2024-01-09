import Container from "@bonfood-new-src/components/Container";
import Headline from "@bonfood-new-src/components/Headline";
import SwiperReact from "@bonfood-new-src/libs/Swiper/Swiper";
import { usePageMeta } from "@ssr-client/usePage";
import { ReactNode } from "react";
interface BenefitItem {
  image: string;
  title: string;
  description: string;
}

const BenefitsItems: BenefitItem[] = [
  {
    image: "/img/bebefits/excellence-honor-icon.svg",
    title: "Высокое качество",
    description:
      "Качество без компромиссов! Все продукции сертифицированные. Доставляем продукты в целости и сохранности с надлежащим товарным видом, соблюдая температурный режим.",
  },
  {
    image: "/img/bebefits/gift-voucher-icon.svg",
    title: "Все для вашего удобства",
    description:
      "Мы любим своих клиентов, поэтому разработали для вас клубную программу! Накапливайте баллы за каждую покупку, а с ними — доступ к эксклюзивным предложениям и скидкам, расплачивайтесь бонусами!",
  },
  {
    image: "/img/bebefits/groceries-icon.svg",
    title: "Уникальный ассортимент",
    description:
      "У нас более чем 500 товаров производителей из стран СНГ, ближнего и дальнего зарубежья.",
  },
];

function Benefits() {
  const themeUrl = usePageMeta<string>("themeUrl");

  const renderSlide = (
    item: BenefitItem,
  ): { key: string; element: ReactNode } => {
    return {
      key: item.title,
      element: (
        <>
          <div className="icon flex justify-center items-center">
            <img className="h-20 w-20" src={themeUrl + item.image} alt="" />
          </div>
          <div className="headline grow flex flex-col gap-4 pt-4">
            <div className="title text-lg hover:text-green-900 font-semibold">
              {item.title}
            </div>
            <div className="lg:text-sm description text-gray-500">
              {item.description}
            </div>
          </div>
        </>
      ),
    };
  };

  return (
    <section className="benefits">
      <Container>
        <div className="flex justify-center">
          <Headline text="Доставка продуктов на дом" />
        </div>
        <SwiperReact
          data={BenefitsItems}
          renderSlide={renderSlide}
          perView={1}
          perViewBreakpoints={{
            sm: 1,
            lg: 3,
          }}
          spaceBetween={48}
          autoplay={5000}
          swiperClasses="benefits__swiper"
          swiperWrapperClasses=""
          swiperSlideClasses="swiper-slide text-center shrink-0 justify-center items-center"
        />
      </Container>
    </section>
  );
}

export default Benefits;

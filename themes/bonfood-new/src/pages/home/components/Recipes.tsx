import Container from "@bonfood-new-src/components/Container";
import Headline from "@bonfood-new-src/components/Headline";
import SwiperReact from "@bonfood-new-src/libs/Swiper/Swiper";
import { usePageMeta } from "@ssr-client/usePage";

interface Recipe {
  imageSrc: string;
  date: string;
  title: string;
}

const recipes: Recipe[] = [
  {
    imageSrc: "/img/recipes/iceCream.jpg",
    date: "11.11.2023 г.",
    title: "Домашнее мороженое",
  },
  {
    imageSrc: "/img/recipes/soup.jpg",
    date: "11.11.2023 г.",
    title: "Чечевичный суп",
  },
  {
    imageSrc: "/img/recipes/iceCream.jpg",
    date: "11.11.2023 г.",
    title: "Домашнее мороженое",
  },
  {
    imageSrc: "/img/recipes/soup.jpg",
    date: "11.11.2023 г.",
    title: "Чечевичный суп",
  },
  {
    imageSrc: "/img/recipes/iceCream.jpg",
    date: "11.11.2023 г.",
    title: "Домашнее мороженое",
  },
  {
    imageSrc: "/img/recipes/soup.jpg",
    date: "11.11.2023 г.",
    title: "Чечевичный суп",
  },
];

function RecipesSection() {
  const themeUrl = usePageMeta<string>("themeUrl");
  const renderSlide = (recipe: Recipe) => ({
    key: recipe.date, // Use a unique key for each slide
    element: (
      <a href="/single-recipe/" className="swiper-slide shrink-0">
        <div className="image mb-2 h-60 relative overflow-hidden rounded-3xl">
          <img
            className="hover:scale-125 transition-transform duration-300 ease-in-out h-full w-full object-cover"
            src={themeUrl + recipe.imageSrc}
            alt=""
          />
        </div>
        <div className="content flex justify-center">
          <div className="title font-semibold hover:text-primary">
            {recipe.title}
          </div>
        </div>
      </a>
    ),
  });
  return (
    <section className="recipes">
      <Container>
        <Headline text="Новости и рецепты блюд" />
        <SwiperReact
          data={recipes}
          renderSlide={renderSlide}
          perView={1}
          perViewBreakpoints={{
            sm: 2,
            md: 3,
            lg: 4,
          }}
          spaceBetween={20}
          navigation={true}
          autoplay={3000}
        />
      </Container>
    </section>
  );
}

export default RecipesSection;

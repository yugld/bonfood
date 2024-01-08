import { usePageMeta } from "@ssr-client/usePage";
import { FC } from "react";

interface Recipe {
  imageSrc: string;
  date: string;
  title: string;
}

interface RecipeCardProps {
  imageSrc: string;
  title: string;
}

const RecipeCard: FC<RecipeCardProps> = ({ imageSrc, title }) => {
  const themeUrl = usePageMeta<string>("themeUrl");
  return (
    <a href="/single-recipe/" className="swiper-slide shrink-0">
      <div className="image mb-2 h-60 relative overflow-hidden rounded-3xl">
        <img
          className="hover:scale-125 transition-transform duration-300 ease-in-out h-full w-full object-cover"
          src={themeUrl + imageSrc}
          alt=""
        />
      </div>
      <div className="content flex justify-center">
        <div className="title font-semibold hover:text-primary">{title}</div>
      </div>
    </a>
  );
};

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: FC<RecipeListProps> = ({ recipes }) => (
  <div className="container recipes__wrapper relative mx-auto px-5 w-full lg:w-4/5 3xl:w-2/3 space-y-12">
    {/* <h2>Новости и рецепты блюд</h2> */}

    <div className="recipes__swiper swiper overflow-hidden">
      <div className="swiper-wrapper flex">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </div>
  </div>
);

const recipes = [
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

function Recipes() {
  return <RecipeList recipes={recipes} />;
}

export default Recipes;

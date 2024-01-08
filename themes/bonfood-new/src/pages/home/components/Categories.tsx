import Container from "@bonfood-new-src/components/Container";
import Headline from "@bonfood-new-src/components/Headline";
import { cn } from "@init-src/utils/cn";
import { usePageMeta } from "@ssr-client/usePage";

function Categories() {
  const themeUrl = usePageMeta<string>("themeUrl");

  const categoriesData = [
    {
      title: "Рыбная консервация",
      image: "/img/rybnaya_kons.jpeg",
      gridClasses: "sm:col-span-2 md:col-start-2",
    },
    {
      title: "Овощная и фруктовая консервация",
      image: "/img/ovochnayaifruktovayakons.jpeg",
      gridClasses: "row-span-2",
    },
    {
      title: "Грибная консервация",
      image: "/img/gribnayakons.jpeg",
      gridClasses: "row-span-2 md:row-start-1",
    },
    {
      title: "Фасованные крупы и мюсли",
      image: "/img/myusli.jpeg",
      gridClasses: "",
    },
    {
      title: "Правильное питание",
      image: "/img/categories/healthFood.jpg",
      gridClasses: "",
    },
  ];

  return (
    <>
      <Container>
        <Headline text="Категории" />
        <div className="categories__wrapper grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 auto-rows-[18rem] sm:auto-rows-[15rem] lg:auto-rows-[14rem]">
          {categoriesData.map((category, index) => (
            <a
              key={index}
              className={cn(
                "grid-item relative group overflow-hidden rounded-lg cursor-pointer",
                `${category.gridClasses}`,
              )}
            >
              <img
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
                src={themeUrl + category.image}
                alt={category.title}
              ></img>
              <div className="grid-text absolute top-28 left-8 md:left-4 flex flex-col gap-8">
                <span className="text-white text-xl font-medium">
                  {category.title}
                </span>
                <div className="h-0.5 w-1/2 bg-white rounded"></div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Categories;

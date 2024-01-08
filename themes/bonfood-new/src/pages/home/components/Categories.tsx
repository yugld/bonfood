import { usePageMeta } from "@ssr-client/usePage";
function Categories() {
  const themeUrl = usePageMeta<string>("themeUrl");
  return (
    <>
      <div className="container mx-auto px-5 lg:px-0 lg:w-4/5 3xl:w-2/3 space-y-12">
        {/* <?php get_headline('Категории'); ?> */}

        <div className="categories__wrapper grid grid-cols-1 grid-rows-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 auto-rows-[18rem] sm:auto-rows-[15rem] lg:auto-rows-[14rem]">
          <div className="grid-item relative sm:col-span-2 md:col-start-2 group">
            <div className="grid-left bg-mask w-0 h-0 absolute top-0 left-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
            <img
              className="h-full w-full object-cover rounded-lg"
              src={themeUrl + "/img/rybnaya_kons.jpeg"}
            ></img>
            <div className="grid-text absolute top-28 left-12 md:left-6 flex flex-col gap-4">
              <span className="text-white text-xl font-medium">
                Рыбная <br></br>консервация
              </span>
              <div className="h-0.5 w-1/2 bg-white rounded"></div>
            </div>
            <div className="grid-right bg-mask w-0 h-0 absolute top-0 right-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
          </div>

          <div className="grid-item relative row-span-2 group">
            <div className="grid-left bg-mask w-0 h-0 absolute top-0 left-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
            <img
              className="h-full w-full object-cover rounded-lg"
              src={themeUrl + "/img/ovochnayaifruktovayakons.jpeg"}
            ></img>
            <div className="grid-text absolute top-28 left-12 md:left-6 flex flex-col gap-8">
              <span className="text-white text-xl font-medium leading-snug">
                Овощная и фруктовая<br></br>консервация
              </span>
              <div className="h-0.5 w-1/2 bg-white rounded"></div>
            </div>
            <div className="grid-right bg-mask w-0 h-0 absolute top-0 right-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
          </div>

          <div className="grid-item relative row-span-2 md:row-start-1 group">
            <div className="grid-left bg-mask w-0 h-0 absolute top-0 left-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
            <img
              className="h-full w-full object-cover rounded-lg"
              src={themeUrl + "/img/gribnayakons.jpeg"}
            ></img>
            <div className="grid-text absolute top-28 left-12 md:left-6 flex flex-col gap-8">
              <span className="text-white text-xl font-medium">
                Грибная<br></br>консервация
              </span>
              <div className="h-0.5 w-1/2 bg-white rounded"></div>
            </div>
            <div className="grid-right bg-mask w-0 h-0 absolute top-0 right-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
          </div>

          <div className="grid-item relative group">
            <div className="grid-left bg-mask w-0 h-0 absolute top-0 left-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
            <img
              className="h-full w-full object-cover rounded-lg"
              src={themeUrl + "/img/myusli.jpeg"}
              alt=""
            ></img>
            <div className="grid-text absolute top-28 left-8 md:left-4 flex flex-col gap-8">
              <span className="text-white text-xl font-medium">
                Фасованные <br></br>крупы и мюсли
              </span>
              <div className="h-0.5 w-1/2 bg-white rounded"></div>
            </div>
            <div className="grid-right bg-mask w-0 h-0 absolute top-0 right-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
          </div>

          <div className="grid-item relative group">
            <div className="grid-left bg-mask w-0 h-0 absolute top-0 left-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
            <img
              className="h-full w-full object-cover rounded-lg"
              src={themeUrl + "/img/categories/healthFood.jpg"}
            ></img>
            <div className="grid-text absolute top-28 left-8 md:left-4 flex flex-col gap-8">
              <span className="text-white text-xl font-medium">
                Правильное<br></br>питание
              </span>
              <div className="h-0.5 w-1/2 bg-white rounded"></div>
            </div>
            <div className="grid-right bg-mask w-0 h-0 absolute top-0 right-0 group-hover:w-full group-hover:h-full transition-all ease-in-out duration-500"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;

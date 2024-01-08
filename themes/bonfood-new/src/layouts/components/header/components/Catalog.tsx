import LocalizedLink from "@init-src/components/LocalizedLink";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

function CatalogHeader() {
  const menuItems = [
    { to: "/product", label: "Каталог" },
    { to: "/recipes", label: "Новости и рецепты" },
    { to: "/about", label: "О нас" },
    { to: "/contacts", label: "Контакты" },
  ];

  return (
    <div className="flex lg:flex-row items-center justify-between lg:justify-start lg:gap-5">
      <div className="catalog group">
        <div className="header__btn flex items-center cursor-pointer text-white bg-primary-500 hover:bg-hover py-3 px-3 gap-2 w-12 h-12 lg:w-fit rounded-full lg:rounded-lg justify-center">
          <MenuOutlinedIcon />
          <LocalizedLink
            className="hidden lg:flex text-sm font-medium"
            to="/product"
          >
            Каталог
          </LocalizedLink>
        </div>
        <div
          className="absolute p-4 group-hover:block hidden left-0 z-10 lg:w-1/2 3xl:w-1/3 origin-top-right rounded-xl bg-white border-b border-x shadow-lg focus:outline-none"
          aria-orientation="vertical"
        >
          <div
            className="flex flex-col space-y-4 py-1 lg:w-fit lg:border-r "
            role="none"
          >
            {/* <CatalogSearch /> */}

            {/* <div className="header__search lg:hidden flex bg-gray-100 py-2 px-6 rounded-[3.25rem] w-full gap-8 items-center">
              <svg
                className="h-4 stroke-primary-500 hover:stroke-hover"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>

              <input
                className="bg-transparent outline-none"
                type="text"
                placeholder="Поиск..."
              ></input>
            </div> */}

            <div className="px-4 font-medium lg:hidden flex">
              <ul className="flex flex-row space-x-3">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:border-b border-primary"
                  >
                    <LocalizedLink to={item.to}>{item.label}</LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-6 px-4 text-sm">
              {/* <?php
                                $parent_terms = get_terms([
                                    'taxonomy' => 'catalog',
                                    'hide_empty' => false,
                                    'parent' => 0,
                                ]);

                                foreach ($parent_terms as $term) :
                                    $id = $term->term_id;
                                    $children = get_terms([
                                        'taxonomy' => 'catalog',
                                        'hide_empty' => false,
                                        'parent' => $id,
                                    ]);
                                ?> */}
              <div
                className="group/item cursor-pointer"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-<?php echo $index; ?>"
              >
                <div className="parent hover:text-primary-500 flex flex-row justify-between items-center">
                  <LocalizedLink
                    to="<?php echo get_term_link($term, 'catalog'); ?>"
                    className="hover:text-primary-500 block"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    ?php echo $term-name; ?
                  </LocalizedLink>
                  <ChevronRightOutlinedIcon className="h-2 invisible group-hover/item:visible text-gray-400 " />
                  {/* <svg
                      className="h-3 invisible group-hover/item:visible"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg> */}
                </div>
                <div className="children lg:group-hover/item:block hidden absolute top-0 pl-36 pt-8 left-[20%] h-full">
                  <ul className="flex flex-col space-y-3">
                    {/* <?php foreach ($children as $child) : ?> */}
                    <li className="hover:text-primary">
                      <LocalizedLink to="<?php echo get_term_link($child, 'catalog'); ?>"></LocalizedLink>
                    </li>
                    {/* <?php endforeach; ?>? */}
                  </ul>
                </div>
              </div>
              {/* <?php endforeach; ?> */}
            </div>
          </div>
        </div>
      </div>

      {/* <?php get_search_form(); ?> */}
    </div>
  );
}

export default CatalogHeader;

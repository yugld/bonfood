import LocalizedLink from "@init-src/components/LocalizedLink";
import { cn } from "@init-src/utils/cn";
import { usePageMeta } from "@ssr-client/usePage";
import { useMemo } from "react";

export interface Menu {
  url: string;
  title: string;
}

function Menu() {
  const menu = usePageMeta<Menu[]>("menu");

  const uniqueMenu = useMemo(() => {
    return menu?.filter((item, index, array) => {
      return array.findIndex((t) => t.url === item.url) === index;
    });
  }, [menu]);

  return (
    <div
      className={cn(
        "hidden lg:flex text-xs 2xl:text-sm dropdown w-full h-full fixed left-0 top-0",
        "bg-red-50 sm:bg-transparent sm:relative sm:w-fit sm:h-fit",
      )}
    >
      <div className="menu">
        <div className="flex gap-6">
          {uniqueMenu?.map((item) => (
            <LocalizedLink key={item.url + item.title} to={item.url}>
              {item.title}
            </LocalizedLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;

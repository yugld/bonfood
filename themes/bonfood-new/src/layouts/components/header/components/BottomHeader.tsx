import Container from "@bonfood-new-src/components/Container";
import LocalizedLink from "@init-src/components/LocalizedLink";
import { useEffect } from "react";

interface Link {
  text: string;
  url: string;
  isRed?: boolean;
}

function BottomHeader() {
  const links: Link[] = [
    { text: "Главная", url: "/" },
    { text: "О нас", url: "/about/" },
    { text: "Новости и рецепты", url: "/recipes/" },
    { text: "Контакты", url: "/contacts/" },
    { text: "Скидки и акции %", url: "/discount/", isRed: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = document.documentElement.scrollTop;
      const headerBottom = document.querySelector(".header-bottom");

      if (currentScroll > 20) {
        headerBottom?.classList.add("hidden");
      } else {
        headerBottom?.classList.remove("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="header-bottom border-b">
      <Container>
        <nav className="nav hidden lg:flex">
          <div className="nav__wrapper w-full py-4 flex items-center">
            <div className="nav-right hidden lg:flex flex-grow">
              <ul className="flex justify-end w-full font-medium gap-8 text-sm">
                {links.map((link, index) => (
                  <li key={index}>
                    <LocalizedLink
                      className={`py-12 hover:text-primary-500 ${
                        link.isRed ? "text-red-500" : ""
                      }`}
                      to={link.url}
                    >
                      {link.text}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
}

export default BottomHeader;

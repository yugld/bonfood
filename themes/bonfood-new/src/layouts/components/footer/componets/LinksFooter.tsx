import { FC } from "react";

interface FooterItem {
  text: string;
  url: string;
}

const LinksFooter: FC = () => {
  const deliveryItems: FooterItem[] = [
    { text: "Условия доставки", url: "/delivery" },
  ];

  const businessItems: FooterItem[] = [
    { text: "Поставщикам", url: "/suppliers" },
    { text: "Противодействие коррупции", url: "/anti-corruption" },
  ];

  const otherItems: FooterItem[] = [
    { text: "Пользовательское соглашение", url: "/user-agree" },
    { text: "Публичная оферта", url: "/publicoffer" },
    { text: "Корпоративным клиентам", url: "/corporate-clients" },
    { text: "Вакансии", url: "/vacancies" },
    { text: "Контакты", url: "/contacts" },
  ];

  const renderLinks = (items: FooterItem[]) =>
    items.map((item) => (
      <a
        key={item.url}
        href={item.url}
        className="text-gray-500 hover:text-hover"
      >
        {item.text}
      </a>
    ));

  return (
    <div className="footer-item flex flex-col space-y-4 text-base md:text-base">
      <div className="flex flex-col space-y-2">
        <p className="font-semibold">Доставка</p>
        {renderLinks(deliveryItems)}
      </div>

      <div className="flex flex-col space-y-2">
        <p className="font-semibold">Бизнесу</p>
        <div className="flex flex-col space-y-3">
          {renderLinks(businessItems)}
        </div>
      </div>

      <div className="flex flex-col space-y-3">{renderLinks(otherItems)}</div>
    </div>
  );
};

export default LinksFooter;

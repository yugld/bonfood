import LocalizedLink from "@init-src/components/LocalizedLink";

const companies = [
  "Bon Agro",
  "Доброфлот",
  "Азбука Моря",
  "Южморрыбфлот",
  "Владкон",
  "Воложка",
  "Меленъ",
  "Экопродукт",
  "Бояринъ",
];

const CompanyList = () => (
  <div className="footer-item text-base flex flex-col space-y-2">
    <p className="font-semibold">Торговые марки</p>
    <div className="flex flex-col space-y-2">
      {companies.map((company, index) => (
        <LocalizedLink
          key={index}
          to="/"
          className="text-gray-500 hover:text-green-900"
        >
          {company}
        </LocalizedLink>
      ))}
    </div>
  </div>
);

export default CompanyList;

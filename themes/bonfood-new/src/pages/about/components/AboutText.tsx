import AboutItem from "@bonfood-new-src/pages/about/components/AboutItem";

function AboutText() {
  return (
    <>
      <AboutItem
        imageSrc="/img/about5.jpeg"
        headline="О компании Bonfood Distribution"
        text={[
          "Продукты питания, представляемые компанией «BonFood Distribution» — лучший выбор для магазинов, ресторанов и кафе.",
          "Мы предлагаем клиентам ощутить вкус заботы. Мы являемся официальным дистрибьютором продуктов питания в Казахстане, осуществляем поставки из стран ближнего и дальнего зарубежья, оптовые продажи в городе Алматы и других регионах страны по выгодным ценам.",
          "Особое внимание мы уделяем качеству. Все товары, поставляемые нами, сертифицированы, не содержат ГМО и вредные пищевые добавки, имеют дипломы и награды за высокое качество.",
        ]}
        link="/contacts"
      />
      <AboutItem
        imageSrc="/img/about3.jpeg"
        headline="Гарантия роста вашего бизнеса"
        text={[
          "Мы предлагаем выгодные условия поставок продуктов питания для магазинов, ресторанов, гостиниц, кафе и столовых. Наши продукты ценятся, так как позволяют улучшить вкусовые и полезные качества блюд без увеличения их себестоимости.",
          "«BonFood» — это синоним заботы",
        ]}
        link="/contacts"
        reverseOrder
      />
    </>
  );
}

export default AboutText;
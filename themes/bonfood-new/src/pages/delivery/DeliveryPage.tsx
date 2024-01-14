import PageContent from "@bonfood-new-src/components/page/PageContent";

function DeliveryPage() {
  return (
    <PageContent sectionName="delivery">
      <div className="delivery__wrapper space-y-6">
        <div className="flex flex-col lg:flex-row lg:justify-between space-y-12 lg:gap-16">
          <div className="flex w-full -order-1 lg:w-1/2 rounded-lg">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A83baaf08acf48f9aba067532cf4ee58f75714c7496428deb52c65523fff91a2d&amp;source=constructor"
              className="img h-[400px] w-full object-cover rounded-lg"
            ></iframe>
          </div>

          <div className="w-full self-center lg:w-1/2 space-y-8">
            <div className="delivery-item text space-y-4">
              <h2>О доставке продуктов питания в Алматы</h2>
              <p className="text-gray-700">
                Доставка продуктов на дом, в офис, на дачу или в любое другое
                удобное для вас место. Выбирайте подходящий для вас сервис и
                оформляйте заказ.
              </p>
              <p className="text-gray-700">
                Минимальная сумма заказа для Алматы 4000 тенге, в регионы г.
                Алматы (за город) - 8 000 тенге. Вы можете выбрать дату и время
                поставки при совершении покупки. Самовывоз продукции
                осуществляется только с офиса компании в г. Алматы (г.Алматы,
                ул. Куприна, 1).
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-between space-y-12 lg:gap-16">
          <div className="w-full self-center lg:w-1/2 space-y-8 mt-8">
            <div className="text space-y-4">
              <h2>Время доставки</h2>
              <p className="text-gray-700">
                Мы готовы доставить ваш заказ в день его оформления или в другой
                удобный для вас день в течение недели после оформления на сайте.
              </p>
              <p className="text-gray-700">
                Временные интервалы доставки: 09:00–11:00 11:00–13:00
                13:00–15:00 15:00–17:00
              </p>
              <h2>Оплата</h2>
              <p className="text-gray-700">
                Наличными или банковской картой при получении заказа
              </p>
              <p className="text-gray-700">
                Банковской картой при оформлении заказа в интернет-магазине
              </p>
            </div>
          </div>

          <div className="flex w-full -order-1 lg:w-1/2">
            <img
              className="img h-full object-cover rounded-lg"
              src="/img/delivery/delivery2.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between space-y-12 lg:gap-16">
          <div className="flex w-full -order-1 lg:w-1/2">
            <img
              className="img h-full object-cover rounded-lg"
              src="/img/delivery/food-arrangement-in-reusable-bag.jpg"
              alt=""
            />
          </div>

          <div className="w-full self-center lg:w-1/2 space-y-8">
            <div className="delivery-item text space-y-4">
              <h2>Получение заказа</h2>
              <p className="text-gray-700">
                К заказу прилагаются товарная накладная, кассовый чек и слип
                (при оплате пластиковой картой). Если вам необходимы
                дополнительные документы, пожалуйста, напишите об этом в поле
                «Комментарий к заказу» при его оформлении. Если вы не сможете
                принять заказ в обозначенное время, то у вас есть возможность
                отменить его или выбрать другое время доставки продуктов из
                интернет-магазина. Для этого, пожалуйста, позвоните в
                контакт-центр по телефону: 8 (727) 247-78-60.
              </p>
              <p className="text-gray-700">
                Вы можете отказаться от всего заказа или части доставленных
                товаров без объяснения причин. Для этого необходимо подписать
                два экземпляра товарной накладной с пометкой
                водителя-экспедитора об отказе.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse lg:justify-between space-y-12 lg:gap-16">
          <div className="w-full self-center lg:w-1/2 space-y-8 mt-8">
            <div className="text space-y-4">
              <h2>Сохранность свежести продуктов</h2>
              <p className="text-gray-700">
                При хранении товаров и комплектовании заказов мы учитываем
                принципы соседства, температурные режимы и особенности условий
                хранения, чтобы вы всегда получали самые свежие и вкусные
                продукты.
              </p>
              <p className="text-gray-700">
                Мы уделяем особое внимание упаковке продуктов и развозим заказы
                в специально оборудованных машинах с холодильными камерами,
                чтобы каждый из них был доставлен в целости и сохранности в
                удобное для вас место, будь то дом, офис или дача.
              </p>
            </div>
          </div>

          <div className="flex w-full -order-1 lg:w-1/2">
            <img
              className="img h-full object-cover rounded-lg"
              src="/img/delivery/delivery1.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between space-y-12 lg:gap-16">
          <div className="flex w-full -order-1 lg:w-1/2">
            <img
              className="img h-full object-cover rounded-lg"
              src="/img/delivery/7043309_645.jpg"
              alt=""
            />
          </div>

          <div className="w-full self-center lg:w-1/2 space-y-8">
            <div className="delivery-item text space-y-4">
              <h2>Замена и возврат товара</h2>
              <p className="text-gray-700">
                Если по каким-либо причинам заказанный товар отсутствует, мы
                готовы заменить его на похожий. При этом у покупателя остается
                право отказаться от предложенного нами товара. Обратите
                внимание, Если вас не устроило качество товара, пожалуйста,
                обратитесь в контакт-центр и оставьте заявку на возврат. Мы
                проведем внутреннюю проверку и при выявлении несоответствий по
                качеству заменим товар на аналогичный либо возвратим вам
                денежные средства в полном объеме.
              </p>
              <p className="text-gray-700">
                Фактическая стоимость заказа в онлайн-магазине может отличаться
                от предварительной в случае:
              </p>
              <ol className="list-inside list-disc marker:text-primary space-y-2">
                <li>Замены или отсутствия некоторых товаров</li>
                <li>Присутствия в заказе весовых товаров.</li>
              </ol>
              <p className="text-gray-700">
                На сайте указана типичная цена товаров, продаваемых на вес,
                которая может быть меньше или больше фактической При приеме
                заказа, пожалуйста, проверьте его комплектность по накладным
                документам.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default DeliveryPage;

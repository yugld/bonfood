import PageContent from "@bonfood-new-src/components/page/PageContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeadphonesIcon from "@mui/icons-material/Headphones";

function ContactsPage() {
  return (
    <PageContent sectionName="contacts">
      <div className="contact__wrapper flex flex-col lg:flex-row gap-8 lg:justify-between">
        <div className="contact-item flex items-center gap-8 border border-gray-200 p-6 lg:w-1/2 rounded-xl">
          <div className="contact-image w-1/5 hidden md:flex justify-center items-center text-primary-500">
            <HeadphonesIcon sx={{ fontSize: 100 }} />
          </div>

          <div className="contact-info flex flex-col gap-8 md:border-l md:pl-12">
            <div className="text-gray-500">Свяжитесь с нами</div>
            <div className="flex flex-col text-2xl lg:text-xl font-medium text-primary-500">
              <a href="tel:+77272477860" className="contact-phone-link">
                +7 (727) 247-78-60
              </a>
              <a href="tel:+77717595817" className="contact-phone-link">
                +7 (771) 759-58-17
              </a>
            </div>
            <a
              href="mailto:sales@bonfood.kz"
              className="text-xl text-green-900 contact-email-link"
            >
              sales@bonfood.kz
            </a>
          </div>
        </div>

        <div className="contact-item flex items-center gap-8 border border-gray-200 p-6 lg:w-1/2 rounded-xl">
          <div className="contact-image w-1/5 hidden md:flex justify-center items-center text-primary-500">
            <AccessTimeIcon sx={{ fontSize: 100 }} />
          </div>
          <div className="contact-info flex flex-col gap-8 md:border-l md:pl-12">
            <div className="text-gray-500">Время работы</div>
            <div className="flex flex-col text-2xl lg:text-xl font-medium text-primary-500">
              <p>В будние дни с 8:30 до 18:00</p>
              <p>Перерыв: с 13:00 до 14:00</p>
            </div>
            <a
              href="mailto:sales@bonfood.kz"
              className="text-xl text-green-900 contact-email-link"
            >
              sales@bonfood.kz
            </a>
          </div>
        </div>
      </div>
    </PageContent>
  );
}

export default ContactsPage;

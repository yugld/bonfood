import Container from "@bonfood-new-src/components/Container";
import Logo from "@bonfood-new-src/components/Logo";
import CompanyList from "@bonfood-new-src/layouts/components/footer/componets/CompanyList";
import ContactsFooter from "@bonfood-new-src/layouts/components/footer/componets/ContactsFooter";
import LinksFooter from "@bonfood-new-src/layouts/components/footer/componets/LinksFooter";
import SocialIcons from "@bonfood-new-src/layouts/components/footer/componets/SocialIcons";

function TopFooter() {
  return (
    <Container>
      <div className="footer__wrapper text-center lg:text-start">
        <div className="footer__top p-8 md:px-0 grid md:gap-8 sm:grid-cols-2 md:grid-cols-4 w-full gap-y-12 md:space-y-0 text-start justify-start sm:justify-between">
          <div className="footer-item space-y-6 justify-start">
            <div className="footer__logo flex justify-start">
              {/* <img
                  className="h-12 md:h-16 lg:h-12"
                  src="/wp-content/themes/init/img/images/bonfood_logo.svg"
                  alt=""
                ></img> */}
              <Logo />
            </div>

            <SocialIcons />

            <button className="border border-primary-500 font-bold text-primary-500 rounded-xl p-4 w-fit hover:border-green-900 hover:text-green-900 ">
              Написать нам
            </button>
          </div>

          <ContactsFooter />
          <CompanyList />

          <LinksFooter />
        </div>
      </div>
    </Container>
  );
}

export default TopFooter;

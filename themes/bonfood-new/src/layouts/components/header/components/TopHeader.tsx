import Logo from "@bonfood-new-src/components/Logo";
import CatalogHeader from "@bonfood-new-src/layouts/components/header/components/Catalog";
import RightBtns from "@bonfood-new-src/layouts/components/header/components/RightBtns";

function TopHeader() {
  return (
    <div className="header-top bg-white ">
      <div className="header__wrapper relative flex justify-between items-center py-2 sm:py-3 md:pt-5 ">
        <CatalogHeader />

        <Logo />

        <RightBtns />
      </div>
    </div>
  );
}

export default TopHeader;

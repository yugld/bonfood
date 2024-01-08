import Container from "@bonfood-new-src/components/Container";
import BottomHeader from "@bonfood-new-src/layouts/components/header/components/BottomHeader";
import TopHeader from "@bonfood-new-src/layouts/components/header/components/TopHeader";

function Header() {
  return (
    <header className="header w-full bg-white fixed top-0 z-30">
      <Container>
        <TopHeader />
      </Container>

      <div className="w-full border-b"></div>
      <BottomHeader />
    </header>
  );
}

export default Header;

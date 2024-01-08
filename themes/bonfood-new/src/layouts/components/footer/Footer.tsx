import BottomFooter from "@bonfood-new-src/layouts/components/footer/componets/BottomFooter";
import TopFooter from "@bonfood-new-src/layouts/components/footer/componets/TopFooter";

function Footer() {
  return (
    <footer className="footer border-t">
      <TopFooter />
      <div className="border-t"></div>
      <BottomFooter />
    </footer>
  );
}

export default Footer;

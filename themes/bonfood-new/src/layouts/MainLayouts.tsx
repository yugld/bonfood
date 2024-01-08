import SEOHead from "@bonfood-new-src/layouts/components/SEOHead";
import Footer from "@bonfood-new-src/layouts/components/footer/Footer";
import Header from "@bonfood-new-src/layouts/components/header/Header";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SEOHead />
      <Header />
      <main className="pt-[64px] sm:pt-[89px] md:pt-[80px] lg:pt-[133px]">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;

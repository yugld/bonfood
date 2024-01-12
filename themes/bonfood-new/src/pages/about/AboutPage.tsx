import PageContent from "@bonfood-new-src/components/page/PageContent";
import AboutText from "@bonfood-new-src/pages/about/components/AboutText";
import Awards from "@bonfood-new-src/pages/about/components/Awords";

function AboutPage() {
  return (
    <PageContent sectionName="about">
      <div className="flex flex-col space-y-12">
        <AboutText />
        <Awards />
      </div>
    </PageContent>
  );
}

export default AboutPage;

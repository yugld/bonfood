import Benefits from "@bonfood-new-src/pages/home/components/Benefits";
import Categories from "@bonfood-new-src/pages/home/components/Categories";
import InitHome from "@bonfood-new-src/pages/home/components/InitHome";
import RecipesSection from "@bonfood-new-src/pages/home/components/Recipes";

function HomePage() {
  return (
    <div className="flex flex-col space-y-16 lg:space-y-24 py-8">
      <InitHome />
      {/* <Hits /> */}
      <Categories />
      {/* <OurProducts /> */}
      {/* <SpecialOffers /> */}
      <RecipesSection />
      <Benefits />
    </div>
  );
}

export default HomePage;

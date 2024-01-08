import Categories from "@bonfood-new-src/pages/home/components/Categories";
import Hits from "@bonfood-new-src/pages/home/components/Hits";
import InitHome from "@bonfood-new-src/pages/home/components/InitHome";
import Recipes from "@bonfood-new-src/pages/home/components/Recipes";

function HomePage() {
  return (
    <div className="flex flex-col space-y-16 lg:space-y-24">
      <InitHome />
      <Hits />
      <Categories />
      {/* <OurProducts /> */}
      {/* <SpecialOffers /> */}
      <Recipes />
    </div>
  );
}

export default HomePage;

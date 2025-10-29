import { useScrollToTop } from "@/shared/lib";
import { CategoriesSection } from "@/widgets/categories-section";
import { NowPlaying } from "@/widgets/now-playing";
import { PopularSection } from "@/widgets/popular-section";

const MainPage = () => {
  useScrollToTop();
  return (
    <>
      <NowPlaying />
      <PopularSection />
      <CategoriesSection />
    </>
  );
};

export default MainPage;

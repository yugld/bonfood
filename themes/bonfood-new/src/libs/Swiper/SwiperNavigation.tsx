import { cn } from "@init-src/utils/cn";
import { ArrowBackIosNew } from "@mui/icons-material";

interface SwiperNavigationProps {
  name: string;
  className: string;
}

export default function SwiperNavigation({
  name,
  className,
}: SwiperNavigationProps) {
  return (
    <>
      <div
        className={cn(
          "hidden sm:block z-20 absolute -left-5 top-[40%] p-2 text-black rounded-lg cursor-pointer",
          "bg-white shadow-sm hover:text-white hover:bg-primary-500",
          `${name}__left ${name}`,
          className,
        )}
      >
        <ArrowBackIosNew />
      </div>

      <div
        className={cn(
          "hidden sm:block z-20 absolute -right-5 top-[40%] p-2 text-black rounded-lg cursor-pointer",
          "bg-white shadow-sm hover:text-white hover:bg-primary-500",
          `${name}__right ${name}`,
          className,
        )}
      >
        <ArrowBackIosNew className="rotate-180" />
      </div>
    </>
  );
}

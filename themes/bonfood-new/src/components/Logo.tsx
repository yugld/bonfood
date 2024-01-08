import LocalizedLink from "@init-src/components/LocalizedLink";
import { cn } from "@init-src/utils/cn";
import { usePageMeta } from "@ssr-client/usePage";

function Logo() {
  const logo = usePageMeta<string>("logo");
  const siteName = usePageMeta<string>("siteName");

  return (
    <div className="logo w-52 h-full">
      <LocalizedLink
        to="/"
        className="header__logo z-20 flex items-center h-12"
      >
        {logo ? (
          <img className={cn("h-12")} src={logo} alt={siteName} />
        ) : (
          siteName
        )}
      </LocalizedLink>
    </div>
  );
}

export default Logo;

import Headline from "@bonfood-new-src/components/Headline";
import { cn } from "@init-src/utils/cn";
import { usePageMeta } from "@ssr-client/usePage";

interface AboutItemProps {
  imageSrc: string;
  headline: string;
  text: string[];
  link?: string;
  reverseOrder?: boolean;
}

function AboutItem({
  imageSrc,
  headline,
  text,
  link,
  reverseOrder,
}: AboutItemProps) {
  const themeUrl = usePageMeta<string>("themeUrl");
  return (
    <div
      className={cn(
        "flex flex-col gap-12 ",
        `$${reverseOrder ? " lg:flex-row-reverse" : " lg:flex-row"}`,
      )}
    >
      <div className="about-item lg:w-1/2">
        <img
          className="img h-full object-cover"
          src={themeUrl + imageSrc}
          alt=""
        />
      </div>
      <div className="text space-y-8 lg:w-1/2">
        <Headline text={headline} />
        {text.map((paragraph, index) => (
          <p key={index} className="text-gray-700">
            {paragraph}
          </p>
        ))}

        {link && (
          <a
            className="shop-link flex gap-2 border-b text-primary-500 border-primary-500 items-center font-medium w-fit text-sm hover:gap-4 transition-all"
            href={link}
          >
            <span>Наши контакты</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default AboutItem;

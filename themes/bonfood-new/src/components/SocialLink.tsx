import { cn } from "@init-src/utils/cn";
import { Instagram, WhatsApp } from "@mui/icons-material";

interface SocialLinkProps {
  className?: string;
}

function SocialLinks({ className }: SocialLinkProps) {
  const socialLinks = [
    {
      name: "whatsapp",
      link: "https://www.instagram.com/qaganat_kz/",
      icon: <WhatsApp />,
    },
    {
      name: "instagram",
      link: "https://api.whatsapp.com/send/?phone=77089705046&text&app_absent=0",
      icon: <Instagram />,
    },
  ];
  return (
    <div className="social-link">
      <div className="flex gap-2 items-center">
        {socialLinks.map(({ link, icon, name }) => (
          <div className="item" key={name}>
            <a
              href={link}
              target="_blank"
              className={cn(
                "flex items-center justify-center h-8 w-8",
                className,
              )}
            >
              {icon}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;

import { FC } from "react";

export interface ContactInfoProps {
  title: string;
  phoneNumbers: string[];
  description?: string;
  email?: string;
}

const ContactInfo: FC<ContactInfoProps> = ({
  title,
  phoneNumbers,
  description,
  email,
}) => (
  <div className="footer__contact flex flex-col text-lg space-y-2">
    <div className="phones flex flex-col">
      {phoneNumbers.map((phoneNumber, index) => (
        <a
          key={index}
          className="text-xl md:text-lg font-semibold"
          href={`tel:${phoneNumber}`}
        >
          {phoneNumber}
        </a>
      ))}
    </div>
    <div className="flex flex-col text-sm text-gray-500 items-start space-y-1">
      <span>{title}</span>
      {description && <span>{description}</span>}
      {email && (
        <a
          href={`mailto:${email}`}
          className="border-b border-gray-400 hover:text-hover w-fit"
        >
          {email}
        </a>
      )}
    </div>
  </div>
);

export default ContactInfo;

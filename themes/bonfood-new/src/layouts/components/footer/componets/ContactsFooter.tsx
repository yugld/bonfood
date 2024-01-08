import ContactInfo, {
  ContactInfoProps,
} from "@bonfood-new-src/layouts/components/footer/componets/ContactInfo";
import { FC } from "react";

const ContactsFooter: FC = () => {
  const contacts: ContactInfoProps[] = [
    {
      title: "Прием заказа по телефону",
      phoneNumbers: ["+7 (727) 247-78-60", "+7 (771) 759-58-17"],
      description: "Офис 8:30-18:00 по будням",
      email: "sales@bonfood.kz",
    },
    {
      title: "Для корпоративных клиентов",
      phoneNumbers: ["+7 (727) 247-78-60", "+7 (771) 759-58-17"],
      email: "sales@bonfood.kz",
    },
  ];

  return (
    <div className="footer-item space-y-4 justify-start">
      {contacts.map((contact, index) => (
        <ContactInfo key={index} {...contact} />
      ))}
    </div>
  );
};

export default ContactsFooter;

import {
  maskPhoneNumber,
  unmaskPhoneNumber,
} from "@init-src/utils/PhoneNumberMask";
import { useTranslation } from "react-i18next";

function Contacts() {
  const { t } = useTranslation("home");
  return (
    <div className="contact hidden lg:flex md:flex-col">
      <a
        href={"tel:+" + unmaskPhoneNumber("+77089705046")}
        className="font-bold text-base xl:text-lg hover:text-primary-500"
      >
        {maskPhoneNumber("+77089705046")}
      </a>
      <div className="text-xs text-gray-500">{t("Delivery to Almaty")}</div>
    </div>
  );
}

export default Contacts;

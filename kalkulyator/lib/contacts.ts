export const CONTACT = {
  name: "Расул",
  phoneDisplay: "+7 989 932 87 75",
  phoneTel: "+79899328775",
  whatsapp: "79899328775",
  telegram: "Rasul_Develop",
};

export const waLink = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const tgLink = () => `https://t.me/${CONTACT.telegram}`;

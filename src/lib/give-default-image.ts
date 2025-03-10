export default function getDefaultImage(type: string) {
  let imageUrl: string;

  switch (type) {
    case "case":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268146/case_q7lga0.webp";
      break;
    case "cpu-cooler":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268208/cpu-cooler_onlt3r.webp";
      break;
    case "network-card":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268032/network-card_basdqx.webp";
      break;
    case "power-supply":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268051/power-supply_pjavgq.webp";
      break;
    case "motherboard":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712267899/motherboard_bthfse.webp";
      break;
    case "memory":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712267924/memory_ytll9u.webp";
      break;
    case "Cpu":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268167/cpu_iksg0k.webp";
      break;
    case "fans":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712268004/fans_qgjttm.webp";
      break;
    case "graphics-card":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712267994/graphics-card_lwxkbv.webp";
      break;
    case "storage":
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712267950/storage_lixo1y.webp";
      break;

    default:
      imageUrl =
        "https://res.cloudinary.com/gamma1199/image/upload/v1712220160/case_kjdrzx.webp";
  }

  return imageUrl;
}

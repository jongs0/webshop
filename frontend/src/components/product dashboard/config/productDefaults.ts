import type { Category } from "../../../../types/models";
import { productFields } from "./productFields";

type ProductDefaults = Record<string, any>;

const getDefaultValue = (type: string): any => {
  switch (type) {
    case "number":
      return 0;
    case "textarea":
    case "text":
      return "";
    case "enum":
    case "select":
      return "";
    default:
      return "";
  }
};

const createDefaultsForCategory = (category: Category): ProductDefaults => {
  const fields = productFields[category];
  const defaults: ProductDefaults = { category };

  fields.forEach((field) => {
    if (field.key === "category") return;
    defaults[field.key] = getDefaultValue(field.type);
  });

  return defaults;
};

export const productDefaults: Record<Category, ProductDefaults> = {
  IPHONE: {
    ...createDefaultsForCategory("IPHONE"),
    state: "AS_NEW",
    iphoneGeneration: "GEN_15",
    iphoneStorage: "GB_128",
    iphoneNetworkType: "NETWORK_TYPE_5G",
    iphoneColor: "BLACK",
    iphoneSimType: "ESIM",
  },
  IPAD: {
    ...createDefaultsForCategory("IPAD"),
    state: "AS_NEW",
    ipadGeneration: "GEN_9",
    ipadStorage: "GB_64",
    ipadConnectivity: "WIFI_BLUETOOTH",
    ipadColor: "SPACE_GREY",
  },
  MACBOOK: {
    ...createDefaultsForCategory("MACBOOK"),
    state: "AS_NEW",
    releaseYear: new Date().getFullYear(),
    macbookChipType: "M3",
    macbookRamSize: "GB_16",
    macbookStorage: "GB_256",
    macbookColor: "SPACE_GREY",
  },
  IWATCH: {
    ...createDefaultsForCategory("IWATCH"),
    state: "AS_NEW",
    releaseYear: new Date().getFullYear(),
    iwatchCaseColor: "BLACK",
    iwatchBandColor: "BLACK",
    iwatchConnectivity: "WIFI_BLUETOOTH",
    iwatchBandType: "OCEAN_RUBBER",
  },
};


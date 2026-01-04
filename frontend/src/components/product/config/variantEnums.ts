import type { Category } from "../../../types/models";

export const VARIANT_ENUMS: Record<Category, Record<string, readonly string[]>> =
{
  MACBOOK: {
    macbookRamSize: ["GB_8", "GB_16", "GB_24"],
    macbookStorage: ["GB_128", "GB_256", "GB_512", "GB_1024"],
    macbookColor: ["SPACE_GREY", "GOLD", "SILVER"],
    state: ["AS_NEW", "GOOD", "USED"],
  },

  IPHONE: {
    iphoneStorage: ["GB_128", "GB_256", "GB_512"],
    iphoneColor: ["BLACK", "WHITE", "PINK", "TEAL", "BLUE"],
    iphoneSimType: ["ESIM", "SIM"],
    state: ["AS_NEW", "GOOD", "USED"],
  },

  IPAD: {
    ipadStorage: ["GB_64", "GB_128", "GB_256"],
    ipadColor: ["SPACE_GREY", "WHITE", "PINK", "PURPLE", "BLUE"],
    ipadConnectivity: [
      "WIFI_BLUETOOTH",
      "WIFI_BLUETOOTH_MOBILEDATA",
    ],
    state: ["AS_NEW", "GOOD", "USED"],
  },

  IWATCH: {
    iwatchCaseColor: ["BLACK", "DARK_GREEN", "BLUE"],
    iwatchBandColor: ["BLACK", "BEIGE"],
    iwatchConnectivity: [
      "WIFI_BLUETOOTH",
      "WIFI_BLUETOOTH_MOBILEDATA",
    ],
    state: ["AS_NEW", "GOOD", "USED"],
  },
};

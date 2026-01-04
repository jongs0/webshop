import type { Category } from "../../../../types/models";

export const enumLabels: Record<string, Record<string, string>> = {
  state: {
    AS_NEW: "As New",
    GOOD: "Good",
    USED: "Used",
  },
  iphoneGeneration: {
    GEN_13: "iPhone 13",
    GEN_14: "iPhone 14",
    GEN_15: "iPhone 15",
    GEN_16: "iPhone 16",
    GEN_17: "iPhone 17",
  },
  iphoneStorage: {
    GB_128: "128 GB",
    GB_256: "256 GB",
    GB_512: "512 GB",
  },
  iphoneNetworkType: {
    NETWORK_TYPE_4G: "4G",
    NETWORK_TYPE_5G: "5G",
  },
  iphoneColor: {
    BLACK: "Black",
    WHITE: "White",
    PINK: "Pink",
    TEAL: "Teal",
    BLUE: "Blue",
  },
  iphoneSimType: {
    ESIM: "eSIM",
    SIM: "SIM",
  },
  ipadGeneration: {
    GEN_6: "iPad Gen 6",
    GEN_7: "iPad Gen 7",
    GEN_8: "iPad Gen 8",
    GEN_9: "iPad Gen 9",
    GEN_10: "iPad Gen 10",
  },
  ipadStorage: {
    GB_64: "64 GB",
    GB_128: "128 GB",
    GB_256: "256 GB",
  },
  ipadConnectivity: {
    WIFI_BLUETOOTH: "Wi-Fi + Bluetooth",
    WIFI_BLUETOOTH_MOBILEDATA: "Wi-Fi + Bluetooth + Mobile Data",
  },
  ipadColor: {
    SPACE_GREY: "Space Grey",
    WHITE: "White",
    PINK: "Pink",
    PURPLE: "Purple",
    BLUE: "Blue",
  },
  macbookChipType: {
    M1: "M1",
    M2: "M2",
    M3: "M3",
    M4: "M4",
  },
  macbookRamSize: {
    GB_8: "8 GB",
    GB_16: "16 GB",
    GB_24: "24 GB",
  },
  macbookStorage: {
    GB_128: "128 GB",
    GB_256: "256 GB",
    GB_512: "512 GB",
    GB_1024: "1 TB",
  },
  macbookColor: {
    SPACE_GREY: "Space Grey",
    GOLD: "Gold",
    SILVER: "Silver",
  },
  iwatchCaseColor: {
    BLACK: "Black",
    DARK_GREEN: "Dark Green",
    BLUE: "Blue",
  },
  iwatchBandColor: {
    BLACK: "Black",
    BEIGE: "Beige",
  },
  iwatchConnectivity: {
    WIFI_BLUETOOTH: "Wi-Fi + Bluetooth",
    WIFI_BLUETOOTH_MOBILEDATA: "Wi-Fi + Bluetooth + Mobile Data",
  },
  iwatchBandType: {
    ALPINE_TITANIUM: "Alpine Titanium",
    TRAIL_POLYESTER: "Trail Polyester",
    OCEAN_RUBBER: "Ocean Rubber",
  },
};

export const categoryLabels: Record<Category, string> = {
  IPHONE: "iPhone",
  IPAD: "iPad",
  MACBOOK: "MacBook",
  IWATCH: "Apple Watch",
};

export const getEnumLabel = (fieldKey: string, value: string): string => {
  return enumLabels[fieldKey]?.[value] || value.replace(/_/g, " ");
};


import type { Category } from "../../../types/models";

export const PRODUCT_OPTIONS: Record<Category, string[]> = {
  IPHONE: [
    "iphoneStorage",
    "iphoneColor",
    "iphoneSimType",
    "state",
  ],
  IPAD: [
    "ipadStorage",
    "ipadColor",
    "ipadConnectivity",
    "state",
  ],
  IWATCH: [
    "iwatchCaseColor",
    "iwatchBandColor",
    "iwatchConnectivity",
    "state",
  ],
  MACBOOK: [
    "macbookRamSize",
    "macbookStorage",
    "macbookColor",
    "state",
  ],
};

import type { Category } from "../../../../types/models";

export type FieldType = "text" | "number" | "textarea" | "select" | "enum";

export interface FieldConfig {
  key: string;
  type: FieldType;
  label: string;
  required?: boolean;
  enumValues?: readonly string[];
  placeholder?: string;
}

const commonFields: FieldConfig[] = [
  { key: "name", type: "text", label: "Name", required: true },
  { key: "description", type: "textarea", label: "Description", required: true },
  { key: "price", type: "number", label: "Price", required: true },
  { key: "stock", type: "number", label: "Stock", required: true },
  {
    key: "state",
    type: "enum",
    label: "State",
    required: true,
    enumValues: ["AS_NEW", "GOOD", "USED"] as const,
  },
  { key: "model", type: "text", label: "Model", required: true },
  { key: "imageUrls", type: "textarea", label: "Image URLs (one per line)", required: false, placeholder: "https://example.com/image1.jpg\nhttps://example.com/image2.jpg" },
];

export const productFields: Record<Category, FieldConfig[]> = {
  IPHONE: [
    ...commonFields,
    {
      key: "iphoneGeneration",
      type: "enum",
      label: "Generation",
      required: true,
      enumValues: ["GEN_13", "GEN_14", "GEN_15", "GEN_16", "GEN_17"] as const,
    },
    {
      key: "iphoneStorage",
      type: "enum",
      label: "Storage",
      required: true,
      enumValues: ["GB_128", "GB_256", "GB_512"] as const,
    },
    {
      key: "iphoneNetworkType",
      type: "enum",
      label: "Network Type",
      required: true,
      enumValues: ["NETWORK_TYPE_4G", "NETWORK_TYPE_5G"] as const,
    },
    {
      key: "iphoneColor",
      type: "enum",
      label: "Color",
      required: true,
      enumValues: ["BLACK", "WHITE", "PINK", "TEAL", "BLUE"] as const,
    },
    {
      key: "iphoneSimType",
      type: "enum",
      label: "SIM Type",
      required: true,
      enumValues: ["ESIM", "SIM"] as const,
    },
  ],
  IPAD: [
    ...commonFields,
    {
      key: "ipadGeneration",
      type: "enum",
      label: "Generation",
      required: true,
      enumValues: ["GEN_6", "GEN_7", "GEN_8", "GEN_9", "GEN_10"] as const,
    },
    {
      key: "ipadStorage",
      type: "enum",
      label: "Storage",
      required: true,
      enumValues: ["GB_64", "GB_128", "GB_256"] as const,
    },
    {
      key: "ipadConnectivity",
      type: "enum",
      label: "Connectivity",
      required: true,
      enumValues: ["WIFI_BLUETOOTH", "WIFI_BLUETOOTH_MOBILEDATA"] as const,
    },
    {
      key: "ipadColor",
      type: "enum",
      label: "Color",
      required: true,
      enumValues: ["SPACE_GREY", "WHITE", "PINK", "PURPLE", "BLUE"] as const,
    },
  ],
  MACBOOK: [
    ...commonFields,
    {
      key: "releaseYear",
      type: "number",
      label: "Release Year",
      required: true,
    },
    {
      key: "macbookChipType",
      type: "enum",
      label: "Chip Type",
      required: true,
      enumValues: ["M1", "M2", "M3", "M4"] as const,
    },
    {
      key: "macbookRamSize",
      type: "enum",
      label: "RAM Size",
      required: true,
      enumValues: ["GB_8", "GB_16", "GB_24"] as const,
    },
    {
      key: "macbookStorage",
      type: "enum",
      label: "Storage",
      required: true,
      enumValues: ["GB_128", "GB_256", "GB_512", "GB_1024"] as const,
    },
    {
      key: "macbookColor",
      type: "enum",
      label: "Color",
      required: true,
      enumValues: ["SPACE_GREY", "GOLD", "SILVER"] as const,
    },
  ],
  IWATCH: [
    ...commonFields,
    {
      key: "releaseYear",
      type: "number",
      label: "Release Year",
      required: true,
    },
    {
      key: "iwatchCaseColor",
      type: "enum",
      label: "Case Color",
      required: true,
      enumValues: ["BLACK", "DARK_GREEN", "BLUE"] as const,
    },
    {
      key: "iwatchBandColor",
      type: "enum",
      label: "Band Color",
      required: true,
      enumValues: ["BLACK", "BEIGE"] as const,
    },
    {
      key: "iwatchConnectivity",
      type: "enum",
      label: "Connectivity",
      required: true,
      enumValues: ["WIFI_BLUETOOTH", "WIFI_BLUETOOTH_MOBILEDATA"] as const,
    },
    {
      key: "iwatchBandType",
      type: "enum",
      label: "Band Type",
      required: true,
      enumValues: ["ALPINE_TITANIUM", "TRAIL_POLYESTER", "OCEAN_RUBBER"] as const,
    },
  ],
};


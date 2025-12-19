/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2025-12-17 13:38:36.

export interface AddressCreateDTO {
    street: string;
    houseNumber: number;
    postalCode: string;
    city: string;
}

export interface AddressSummaryDTO {
    id: number;
    city: string;
    postalCode: string;
}

export interface AddressUpdateDTO {
    street: string;
    houseNumber: number;
    postalCode: string;
    city: string;
}

export interface AdressDTO {
    id: number;
    street: string;
    houseNumber: number;
    postalCode: string;
    city: string;
}

export interface AppUserCreateDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AppUserDTO {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: Adress;
    orders: OrderDTO[];
}

export interface AppUserSummaryDTO {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

export interface AppUserUpdateDTO {
    email: string;
    firstName: string;
    lastName: string;
    address: AddressUpdateDTO;
}

export interface RegisterDTO {
    appUser: AppUserCreateDTO;
    adress: AddressCreateDTO;
}

export interface CartDTO {
    id: number;
    userId: number;
    cartProductDTOs: CartProductDTO[];
}

export interface CartProductDTO {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CartSummaryDTO {
    id: number;
    total: number;
}

export interface CartUpdateDTO {
    cartProductDTOs: CartProductDTO[];
}

export interface OrderCreateDTO {
    userId: number;
    paymentMethod: PaymentMethod;
    items: OrderItemDTO[];
}

export interface OrderDTO {
    id: number;
    userId: number;
    totalSum: number;
    paymentMethod: PaymentMethod;
    address: AdressDTO;
    orderItems: OrderItemDTO[];
}

export interface OrderItemDTO {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    lineTotal: number;
}

export interface OrderSummaryDTO {
    id: number;
    userId: number;
    totalSum: number;
}

export interface ProductAdminSummaryDTO {
    id: number;
    name: string;
    category: Category;
    price: number;
    stock: number;
    state: State;
}

export interface ProductDTO {
    id: number;
    name: string;
    description: string,
    category: Category;
    price: number;
    stock: number;
    state: State;
}

export interface IpadCreateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    ipadGeneration: IpadGeneration;
    ipadStorage: IpadStorage;
    ipadConnectivity: IpadConnectivity;
    ipadColor: IpadColor;
    category: Category;
}

export interface IpadDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    ipadGeneration: IpadGeneration;
    ipadStorage: IpadStorage;
    ipadColor: IpadColor;
    ipadConnectivity: IpadConnectivity;
}

export interface IpadSummaryDTO {
    id: number;
    name: string;
    price: number;
    model: string;
    ipadGeneration: IpadGeneration;
}

export interface IpadUpdateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    ipadGeneration: IpadGeneration;
    ipadStorage: IpadStorage;
    ipadConnectivity: IpadConnectivity;
    ipadColor: IpadColor;
}

export interface IphoneCreateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    iphoneGeneration: IphoneGeneration;
    iphoneStorage: IphoneStorage;
    iphoneNetworkType: IphoneNetworkType;
    iphoneColor: IphoneColor;
    iphoneSimType: IphoneSimType;
    category: Category;
}

export interface IphoneDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    iphoneGeneration: IphoneGeneration;
    iphoneStorage: IphoneStorage;
    iphoneNetworkType: IphoneNetworkType;
    iphoneColor: IphoneColor;
    iphoneSimType: IphoneSimType;
}

export interface IphoneSummaryDTO {
    id: number;
    name: string;
    price: number;
    model: string;
    iphoneGeneration: IphoneGeneration;
}

export interface IphoneUpdateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    iphoneGeneration: IphoneGeneration;
    iphoneStorage: IphoneStorage;
    iphoneNetworkType: IphoneNetworkType;
    iphoneColor: IphoneColor;
    iphoneSimType: IphoneSimType;
}

export interface IwatchCreateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    iwatchCaseColor: IwatchCaseColor;
    iwatchBandColor: IwatchBandColor;
    iwatchConnectivity: IwatchConnectivity;
    iwatchBandType: IwatchBandType;
    category: Category;
}

export interface IwatchDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    iwatchCaseColor: IwatchCaseColor;
    iwatchBandColor: IwatchBandColor;
    iwatchConnectivity: IwatchConnectivity;
    iwatchBandType: IwatchBandType;
}

export interface IwatchSummaryDTO {
    id: number;
    name: string;
    price: number;
    model: string;
    releaseYear: number;
}

export interface IwatchUpdateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    iwatchCaseColor: IwatchCaseColor;
    iwatchBandColor: IwatchBandColor;
    iwatchConnectivity: IwatchConnectivity;
    iwatchBandType: IwatchBandType;
}

export interface MacbookCreateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    macbookChipType: MacbookChipType;
    macbookRamSize: MacbookRamSize;
    macbookStorage: MacbookStorage;
    macbookColor: MacbookColor;
    category: Category;
}

export interface MacbookDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    macbookChipType: MacbookChipType;
    ram: MacbookRamSize;
    macbookStorage: MacbookStorage;
    macbookColor: MacbookColor;
    category: Category;
}

export interface MacbookSummaryDTO {
    id: number;
    name: string;
    price: number;
    model: string;
    releaseYear: number;
}

export interface MacbookUpdateDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    state: State;
    model: string;
    releaseYear: number;
    macbookChipType: MacbookChipType;
    macbookRamSize: MacbookRamSize;
    macbookStorage: MacbookStorage;
    macbookColor: MacbookColor;
}

export interface Adress {
    id: number;
    street: string;
    houseNumber: number;
    postalCode: string;
    city: string;
}

export type PaymentMethod = "IDEAL" | "CREDITCARD" | "PAYPAL";

export type Category = "IPHONE" | "MACBOOK" | "IPAD" | "IWATCH";

export type State = "AS_NEW" | "GOOD" | "USED";

export type IpadGeneration = "GEN_6" | "GEN_7" | "GEN_8" | "GEN_9" | "GEN_10";

export type IpadStorage = "GB_64" | "GB_128" | "GB_256";

export type IpadConnectivity = "WIFI_BLUETOOTH" | "WIFI_BLUETOOTH_MOBILEDATA";

export type IpadColor = "SPACE_GREY" | "WHITE" | "PINK" | "PURPLE" | "BLUE";

export type IphoneGeneration = "GEN_13" | "GEN_14" | "GEN_15" | "GEN_16" | "GEN_17";

export type IphoneStorage = "GB_128" | "GB_256" | "GB_512";

export type IphoneNetworkType = "NETWORK_TYPE_4G" | "NETWORK_TYPE_5G";

export type IphoneColor = "BLACK" | "WHITE" | "PINK" | "TEAL" | "BLUE";

export type IphoneSimType = "ESIM" | "SIM";

export type IwatchCaseColor = "BLACK" | "DARK_GREEN" | "BLUE";

export type IwatchBandColor = "BLACK" | "BEIGE";

export type IwatchConnectivity = "WIFI_BLUETOOTH" | "WIFI_BLUETOOTH_MOBILEDATA";

export type IwatchBandType = "ALPINE_TITANIUM" | "TRAIL_POLYESTER" | "OCEAN_RUBBER";

export type MacbookChipType = "M1" | "M2" | "M3" | "M4";

export type MacbookRamSize = "GB_8" | "GB_16" | "GB_24";

export type MacbookStorage = "GB_128" | "GB_256" | "GB_512" | "GB_1024";

export type MacbookColor = "SPACE_GREY" | "GOLD" | "SILVER";

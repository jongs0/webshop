import type {
    IphoneDTO,
    MacbookDTO,
    IpadDTO,
    IwatchDTO,
} from "../../../types/models";

export const dedupeIphones = (products: IphoneDTO[]): IphoneDTO[] => {
    const unique: IphoneDTO[] = [];
    const seenKeys: string[] = [];

    for (const product of products) {
        const key = `${product.name}-${product.iphoneGeneration}`;

        if (!seenKeys.includes(key)) {
            seenKeys.push(key);
            unique.push(product);
        }
    }

    return unique;
};

export const dedupeMacbooks = (products: MacbookDTO[]): MacbookDTO[] => {
    const unique: MacbookDTO[] = [];
    const seenKeys: string[] = [];

    for (const product of products) {
        const key = product.macbookChipType;

        if (!seenKeys.includes(key)) {
            seenKeys.push(key);
            unique.push(product);
        }
    }

    return unique;
};

export const dedupeIpads = (products: IpadDTO[]): IpadDTO[] => {
    const unique: IpadDTO[] = [];
    const seenKeys: string[] = [];

    for (const product of products) {
        const key = product.ipadGeneration;

        if (!seenKeys.includes(key)) {
            seenKeys.push(key);
            unique.push(product);
        }
    }

    return unique;
};

export const dedupeIwatches = (products: IwatchDTO[]): IwatchDTO[] => {
    const unique: IwatchDTO[] = [];
    const seenKeys: string[] = [];

    for (const product of products) {
        const key = String(product.releaseYear);

        if (!seenKeys.includes(key)) {
            seenKeys.push(key);
            unique.push(product);
        }
    }

    return unique;
};
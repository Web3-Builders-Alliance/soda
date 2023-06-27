interface Args {
    name: string,
    type: string
}
interface Fields {
    name: string,
    type: string,
    index?: boolean
}
interface Variants {
    name: string,
}
interface Accounts {
    name: string,
    isMut: boolean,
    isSigner: boolean
}
type PropertyTypes = Args | Fields | Variants | Accounts;

const isArgs = (item: PropertyTypes): item is Args => {
    return "name" in item && "type" in item;
};

const isFields = (item: PropertyTypes): item is Fields => {
    return "name" in item && "type" in item && "index" in item;
};

const isVariants = (item: PropertyTypes): item is Variants => {
    return "name" in item;
};

const isAccounts = (item: PropertyTypes): item is Accounts => {
    return "name" in item && "isMut" in item && "isSigner" in item;
};

export const isProperty = (item: PropertyTypes, property: string) => {
    switch (property) {
        case "args":
            if (isArgs(item)) {
                // Realizar acciones para Args
                return item;
            }
            break;
        case "fields":
            if (isFields(item)) {
                // Realizar acciones para Fields
                return item;
            }
            break;
        case "variants":
            if (isVariants(item)) {
                // Realizar acciones para Variants
                return item;
            }
            break;
        case "accounts":
            if (isAccounts(item)) {
                // Realizar acciones para Accounts
                return item;
            }
            break;
        default:
            break;
    }

    return false;
};
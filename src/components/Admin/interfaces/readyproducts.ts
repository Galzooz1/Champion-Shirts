// To parse this data:
//
//   import { Convert, ReadyProducts } from "./file";
//
//   const readyProducts = Convert.toReadyProducts(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IReadyproducts {
    _id:           string;
    name:          string;
    info:          string;
    price:         number;
    product_s_id:  number;
    product_name:  string;
    category_s_id: number;
    category_name: string;
    color:         string;
    size:          string;
    sideToDesign:  string;
    shirtDesigns:  ShirtDesigns;
    date_created:  string;
    user_id:       string;
    s_id:          number;
}

export interface ShirtDesigns {
    front: Front[];
    back:  Back[];
}

export interface Back {
    designs: Designs;
    costume: Costume;
    _id:     string;
}

export interface Costume {
    sizeOfCostume:     SizeOf;
    positionOfCostume: PositionOf;
    is_costume:        boolean;
    costumeImage:      null | string;
}

export interface PositionOf {
    x: number | null;
    y: number | null;
}

export interface SizeOf {
    width:  number | null;
    height: number | null;
}

export interface Designs {
    design_prices: number;
}

export interface Front {
    design:  Design;
    costume: Costume;
    _id:     string;
}

export interface Design {
    sizeOfDesign:     SizeOf;
    positionOfDesign: PositionOf;
    design_price:     number | null;
    is_design:        boolean;
    design_s_id:      number | null;
    designImage:      null | string;
}
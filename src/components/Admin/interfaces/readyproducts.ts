// To parse this data:
//
//   import { Convert, ReadyProducts2 } from "./file";
//
//   const readyProducts2 = Convert.toReadyProducts2(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IReadyproducts {
    _id:           string;
    isCart:        boolean;
    isWish:        boolean;
    isClean:       boolean;
    images:        Images;
    sideToDesign:  string;
    color:         string;
    size:          string;
    price:         number;
    product_s_id:  number;
    product_name:  string;
    category_s_id: number;
    category_name: string;
    shirtDesigns:  ShirtDesigns;
    date_created:  string;
    user_id:       string;
    s_id:          number;
    count:         number;
}

export interface Images {
    frontImage: Image;
    backImage:  Image;
}

export interface Image {
    image:  string;
    width:  number;
    height: number;
    x:      number;
    y:      number;
}

export interface ShirtDesigns {
    front: Front[];
    back:  any[];
}

export interface Front {
    design:   Design;
    costume?: Costume;
    _id:      string;
}

export interface Costume {
    sizeOfCostume:     SizeOf;
    positionOfCostume: PositionOf;
    is_costume:        boolean;
    costumeImage:      string;
}

export interface PositionOf {
    x:        number;
    y:        number;
    rotation: number;
}

export interface SizeOf {
    width:  number;
    height: number;
}

export interface Design {
    sizeOfDesign?:     SizeOf;
    positionOfDesign?: PositionOf;
    design_price:      number;
    is_design?:        boolean;
    design_s_id?:      number;
    designImage?:      string;
}

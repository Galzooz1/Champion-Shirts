// To parse this data:
//
//   import { Convert, Readyproducts } from "./file";
//
//   const readyproducts = Convert.toReadyproducts(json);
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
    design:        Design;
    date_created:  string;
    user_id:       string;
    s_id:          number;
}

export interface Design {
    front: Back[];
    back:  Back[];
}

export interface Back {
    design_price:     number;
    _id:              string;
    design_s_id:      number;
    kindOfDesign:     string;
    image:            string;
    costume:          Costume;
    sizeOfDesign:     SizeOfDesign;
    positionOfDesign: PositionOfDesign;
}

export interface Costume {
    is_costume: boolean;
}

export interface PositionOfDesign {
    x: number;
    y: number;
}

export interface SizeOfDesign {
    width:  number;
    height: number;
}
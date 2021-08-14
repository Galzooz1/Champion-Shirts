// To parse this data:
//
//   import { Convert, Designs } from "./file";
//
//   const designs = Convert.toDesigns(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IDesigns {
    _id:          string;
    likes:        number;
    price:        number;
    name:         string;
    image:        string;
    info:         string;
    date_created: string;
    user_id:      string;
    s_id:         number;
}
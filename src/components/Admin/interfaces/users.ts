// To parse this data:
//
//   import { Convert, Users } from "./file";
//
//   const users = Convert.toUsers(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IUsers {
    _id:                   string;
    favourite_designs_ids: number[];
    self_designs_ids:      number[];
    products_bought_ids:   number[];
    role:                  string;
    status:                string;
    firstName:             string;
    lastName:              string;
    email:                 string;
    phone:                 string;
    address:               string;
    avatar_img:            string;
    date_created:          string;
    confirmationCode:      string;
}
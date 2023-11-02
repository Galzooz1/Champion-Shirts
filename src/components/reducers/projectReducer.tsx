import { IReadyproducts } from "../Admin/interfaces/readyproducts";

export interface cartState {
  carts_ar: IReadyproducts[];
  wish_ar: IReadyproducts[];
  isCart: boolean;
  isWish: boolean;
  showCart: boolean;
  showWish: boolean;
}

const initState = {
    carts_ar: [],
    wish_ar: [],
    isCart:false,
    isWish:false,
    showCart: false,
    showWish: false
}

export const projectReducer = (state: cartState = initState, action: any) => {
    switch (action.type){
      case "SHOW_HIDE_CART":
        // saveToLocal שומר את זה בהתחלה בלוקאל ואז משגר את הסטטיט
        return saveToLocal(state,{...state, showCart:action.flag})
      break;
      case "UPDATE_THE_CART":
        // return {...state, carts_ar:[...state.carts_ar, action.data]}
        return saveToLocal(state, updateCart(state, action));
      break;
      case "UPDATE_IS_CART":
        return saveToLocal(state,{...state, isCart:action.flag});
      break;
      case "UPDATE_THE_WISH":
        return saveToLocal(state, updateWish(state, action));
      break;
      case "UPDATE_IS_WISH":
        return saveToLocal(state,{...state, isWish:action.flag});
      break;
    case "RESET_CARTS":
      return saveToLocal(state, {...state, carts_ar: action.carts_ar});
    break;
    case "RESET_WISH":
      return saveToLocal(state, {...state, wish_ar: action.wish_ar});
    break;
      default:
      // check if there localstorage and update itself
        return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
      break;
    }
  }
  
  const updateCart = (state: any,action: any) => {
    // נבדוק אם המוצר נמצא
    // אם המוצר נמצא אנחנו פשוט נעדכן את הקאונט לקאונט שנשלח בשיגור האחרון
    // ואם לא אנחנו נוסיף את המוצר לתוך המערך
    // אם שקר יבצע פעולה הוספה למערך אם אמת יעדכן את הקאונט
    let prodFound = false;
    let temp_ar = [...state.carts_ar]
    temp_ar.map((item , i) => {
      if(item.s_id === action.data.s_id){
        // בדוק במלאי כדי לעדכן
        item.count = action.data.count;   
        prodFound = true;
        // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
        if(action.data.count <= 0){
          temp_ar.splice(i,1);
        }
      }
    })
    if(!prodFound) {
      temp_ar.push(action.data) 
    }
    return {...state, carts_ar:temp_ar}
  
  }

  const updateWish = (state: any,action: any) => {
    // נבדוק אם המוצר נמצא
    // אם המוצר נמצא אנחנו פשוט נעדכן את הקאונט לקאונט שנשלח בשיגור האחרון
    // ואם לא אנחנו נוסיף את המוצר לתוך המערך
    // אם שקר יבצע פעולה הוספה למערך אם אמת יעדכן את הקאונט
    let prodFound = false;
    let temp_ar = [...state.wish_ar]
    temp_ar.map((data , i) => {
      if(data.s_id === action.data.s_id){
        // בדוק במלאי כדי לעדכן
        data.count = action.data.count;   
        prodFound = true; 
        // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
        if(action.data.count <= 0){
          temp_ar.splice(i,1);
        }
      }
    })
    if(!prodFound) {
      temp_ar.push(action.data) 
    }
    return {...state, wish_ar:temp_ar}
  
  }
  

  const saveToLocal = (state: any,stateTOSave: any) => {
    localStorage.setItem("market", JSON.stringify(stateTOSave));
    return stateTOSave;
  }
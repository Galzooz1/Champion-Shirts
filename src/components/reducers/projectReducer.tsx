const initState = {
    carts_ar: [],
    showCart: false 
}

export const projectReducer = (state: any = initState , action: any) => {
    switch (action.type){
      case "SHOW_HIDE_CART":
        // saveToLocal שומר את זה בהתחלה בלוקאל ואז משגר את הסטטיט
        return saveToLocal({...state, showCart:action.flag})
      break;
    //   case "UPDATE_THE_CART":
    //     return saveToLocal(updateCart(state,action));
    //   break;
      default:
      // check if there localstorage and update itself
        return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
      break;
    }
  }
  
//   const updateCart = (state: any,action: any) => {
//     // נבדוק אם המוצר נמצא
//     // אם המוצר נמצא אנחנו פשוט נעדכן את הקאונט לקאונט שנשלח בשיגור האחרון
//     // ואם לא אנחנו נוסיף את המוצר לתוך המערך
//     // אם שקר יבצע פעולה הוספה למערך אם אמת יעדכן את הקאונט
//     let prodFound = false;
//     let temp_ar = [...state.carts_ar]
//     temp_ar.map((item , i) => {
//       if(item._id === action.item._id){
//         // בדוק במלאי כדי לעדכן
      
//         if(item.qty >= action.item.count){
//           item.count = action.item.count;   
//         }
//         prodFound = true; 
//         // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
//         if(action.item.count <= 0){
//           temp_ar.splice(i,1);
//         }
//       }
//     })
//     if(!prodFound) {
//       temp_ar.push(action.item) 
//     }
//     return {...state, carts_ar:temp_ar}
  
//   }
  
  
  const saveToLocal = (stateTOSave: any) => {
    localStorage.setItem("market", JSON.stringify(stateTOSave));
    return stateTOSave;
  }
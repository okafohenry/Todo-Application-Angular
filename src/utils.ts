import { catchError } from "rxjs";
import { ItemProps } from "./items";


export const close = (arg: boolean) => { arg = !arg }


// export const getAllItems(messageService: any){
//     return messageService.get<ItemProps[]>(baseUrl  + '/list')
//     .pipe(
//         catchError(this.errorhandler)
//     )
// }
// export const updateItem = () => {

// }
// export const deleteItem = () => {

// }
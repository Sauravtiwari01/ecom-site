import {CREATE_WISHLIST,  DELETE_WISHLIST, GET_WISHLIST, UPDATE_WISHLIST } from "../Constants"

export function CreateWishlist(data){
    return{
        type:CREATE_WISHLIST,
        payload:data
    }
}
export function GetWishlist(){
    return{
        type:GET_WISHLIST
    }
}
export function UpdateWishlist(data){
    return{
        type:UPDATE_WISHLIST,
        payload:data
    }
}
export function DeleteWishlist(data){
    return{
        type:DELETE_WISHLIST,
        payload:data
    }
}
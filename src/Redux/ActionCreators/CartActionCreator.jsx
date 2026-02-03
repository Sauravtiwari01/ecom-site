import {CREATE_CART,  DELETE_CART, GET_CART, UPDATE_CART } from "../Constants"

export function CreateCart(data){
    return{
        type:CREATE_CART,
        payload:data
    }
}
export function GetCart(){
    return{
        type:GET_CART
    }
}
export function UpdateCart(data){
    return{
        type:UPDATE_CART,
        payload:data
    }
}
export function DeleteCart(data){
    return{
        type:DELETE_CART,
        payload:data
    }
}
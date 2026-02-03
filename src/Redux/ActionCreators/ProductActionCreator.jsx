import {CREATE_PRODUCT,  DELETE_PRODUCT, GET_PRODUCT, UPDATE_PRODUCT } from "../Constants"

export function CreateProduct(data){
    return{
        type:CREATE_PRODUCT,
        payload:data
    }
}
export function GetProduct(){
    return{
        type:GET_PRODUCT
    }
}
export function UpdateProduct(data){
    return{
        type:UPDATE_PRODUCT,
        payload:data
    }
}
export function DeleteProduct(data){
    return{
        type:DELETE_PRODUCT,
        payload:data
    }
}
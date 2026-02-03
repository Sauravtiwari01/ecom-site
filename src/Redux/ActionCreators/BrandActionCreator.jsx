import {CREATE_BRAND,  DELETE_BRAND, GET_BRAND, UPDATE_BRAND } from "../Constants"

export function CreateBrand(data){
    return{
        type:CREATE_BRAND,
        payload:data
    }
}
export function GetBrand(){
    return{
        type:GET_BRAND
    }
}
export function UpdateBrand(data){
    return{
        type:UPDATE_BRAND,
        payload:data
    }
}
export function DeleteBrand(data){
    return{
        type:DELETE_BRAND,
        payload:data
    }
}
import {CREATE_SUBCATEGORY,  DELETE_SUBCATEGORY, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../Constants"

export function CreateSubCategory(data){
    return{
        type:CREATE_SUBCATEGORY,
        payload:data
    }
}
export function GetSubCategory(){
    return{
        type:GET_SUBCATEGORY
    }
}
export function UpdateSubCategory(data){
    return{
        type:UPDATE_SUBCATEGORY,
        payload:data
    }
}
export function DeleteSubCategory(data){
    return{
        type:DELETE_SUBCATEGORY,
        payload:data
    }
}
import {CREATE_CATEGORY,  DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../Constants"

export function CreateCategory(data){
    return{
        type:CREATE_CATEGORY,
        payload:data
    }
}
export function GetCategory(){
    return{
        type:GET_CATEGORY
    }
}
export function UpdateCategory(data){
    return{
        type:UPDATE_CATEGORY,
        payload:data
    }
}
export function DeleteCategory(data){
    return{
        type:DELETE_CATEGORY,
        payload:data
    }
}
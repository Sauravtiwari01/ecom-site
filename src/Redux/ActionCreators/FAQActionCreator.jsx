import {CREATE_FAQ,  DELETE_FAQ, GET_FAQ, UPDATE_FAQ } from "../Constants"

export function CreateFAQ(data){
    return{
        type:CREATE_FAQ,
        payload:data
    }
}
export function GetFAQ(){
    return{
        type:GET_FAQ
    }
}
export function UpdateFAQ(data){
    return{
        type:UPDATE_FAQ,
        payload:data
    }
}
export function DeleteFAQ(data){
    return{
        type:DELETE_FAQ,
        payload:data
    }
}
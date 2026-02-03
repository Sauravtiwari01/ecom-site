import {CREATE_NEWSLETTER,  DELETE_NEWSLETTER, GET_NEWSLETTER, UPDATE_NEWSLETTER } from "../Constants"

export function CreateNewsletter(data){
    return{
        type:CREATE_NEWSLETTER,
        payload:data
    }
}
export function GetNewsletter(){
    return{
        type:GET_NEWSLETTER
    }
}
export function UpdateNewsletter(data){
    return{
        type:UPDATE_NEWSLETTER,
        payload:data
    }
}
export function DeleteNewsletter(data){
    return{
        type:DELETE_NEWSLETTER,
        payload:data
    }
}
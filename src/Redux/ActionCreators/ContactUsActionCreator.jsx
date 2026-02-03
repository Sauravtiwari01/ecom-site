import {CREATE_CONTACTUS,  DELETE_CONTACTUS, GET_CONTACTUS, UPDATE_CONTACTUS } from "../Constants"

export function CreateContactUS(data){
    return{
        type:CREATE_CONTACTUS,
        payload:data
    }
}
export function GetContactUS(){
    return{
        type:GET_CONTACTUS
    }
}
export function UpdateContactUS(data){
    return{
        type:UPDATE_CONTACTUS,
        payload:data
    }
}
export function DeleteContactUS(data){
    return{
        type:DELETE_CONTACTUS,
        payload:data
    }
}
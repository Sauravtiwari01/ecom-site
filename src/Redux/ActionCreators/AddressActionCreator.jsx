import {CREATE_ADDRESS,  DELETE_ADDRESS, GET_ADDRESS, UPDATE_ADDRESS } from "../Constants"

export function CreateAddress(data){
    return{
        type:CREATE_ADDRESS,
        payload:data
    }
}
export function GetAddress(){
    return{
        type:GET_ADDRESS
    }
}
export function UpdateAddress(data){
    return{
        type:UPDATE_ADDRESS,
        payload:data
    }
}
export function DeleteAddress(data){
    return{
        type:DELETE_ADDRESS,
        payload:data
    }
}
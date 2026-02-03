import {CREATE_ORDER,  DELETE_ORDER, GET_ORDER, UPDATE_ORDER } from "../Constants"

export function CreateOrder(data){
    return{
        type:CREATE_ORDER,
        payload:data
    }
}
export function GetOrder(){
    return{
        type:GET_ORDER
    }
}
export function UpdateOrder(data){
    return{
        type:UPDATE_ORDER,
        payload:data
    }
}
export function DeleteOrder(data){
    return{
        type:DELETE_ORDER,
        payload:data
    }
}
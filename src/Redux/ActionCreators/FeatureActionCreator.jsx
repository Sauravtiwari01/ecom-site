import {CREATE_FEATURE,  DELETE_FEATURE, GET_FEATURE, UPDATE_FEATURE } from "../Constants"

export function CreateFeature(data){
    return{
        type:CREATE_FEATURE,
        payload:data
    }
}
export function GetFeature(){
    return{
        type:GET_FEATURE
    }
}
export function UpdateFeature(data){
    return{
        type:UPDATE_FEATURE,
        payload:data
    }
}
export function DeleteFeature(data){
    return{
        type:DELETE_FEATURE,
        payload:data
    }
}
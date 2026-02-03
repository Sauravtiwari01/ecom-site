import {CREATE_SETTING, GET_SETTING, UPDATE_SETTING } from "../Constants"

export function CreateSetting(data){
    return{
        type:CREATE_SETTING,
        payload:data
    }
}
export function GetSetting(){
    return{
        type:GET_SETTING
    }
}
export function UpdateSetting(data){
    return{
        type:UPDATE_SETTING,
        payload:data
    }
}

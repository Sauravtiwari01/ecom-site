import { CREATE_USER, DELETE_USER, GET_USER, UPDATE_USER } from "../Constants"

export function CreateUser(data) {
    return {
        type: CREATE_USER,
        payload: data
    }
}
export function GetUser() {
    return {
        type: GET_USER
    }
}
export function UpdateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data
    }
}
export function DeleteUser(data) {
    return {
        type: DELETE_USER,
        payload: data
    }
}
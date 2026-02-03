import {CREATE_TESTIMONIAL,  DELETE_TESTIMONIAL, GET_TESTIMONIAL, UPDATE_TESTIMONIAL } from "../Constants"

export function CreateTestimonial(data){
    return{
        type:CREATE_TESTIMONIAL,
        payload:data
    }
}
export function GetTestimonial(){
    return{
        type:GET_TESTIMONIAL
    }
}
export function UpdateTestimonial(data){
    return{
        type:UPDATE_TESTIMONIAL, 
        payload:data
    }
}
export function DeleteTestimonial(data){
    return{
        type:DELETE_TESTIMONIAL,
        payload:data
    }
}
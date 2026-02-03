import { CREATE_TESTIMONIAL_REDUCER, DELETE_TESTIMONIAL_REDUCER, GET_TESTIMONIAL_REDUCER, UPDATE_TESTIMONIAL_REDUCER } from "../Constants";

export default function TestimonialReducer(state = [], action) {

    switch (action.type) {
        case CREATE_TESTIMONIAL_REDUCER:
            return [...state, action.payload]
        case GET_TESTIMONIAL_REDUCER:
            return action.payload
        case UPDATE_TESTIMONIAL_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_TESTIMONIAL_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

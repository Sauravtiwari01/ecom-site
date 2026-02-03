import { CREATE_CONTACTUS_REDUCER, DELETE_CONTACTUS_REDUCER, GET_CONTACTUS_REDUCER, UPDATE_CONTACTUS_REDUCER } from "../Constants";

export default function ContactUSReducer(state = [], action) {

    switch (action.type) {
        case CREATE_CONTACTUS_REDUCER:
            return [...state, action.payload]
        case GET_CONTACTUS_REDUCER:
            return action.payload
        case UPDATE_CONTACTUS_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_CONTACTUS_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
        default:
            return state
    }
}

import { CREATE_CART_REDUCER, DELETE_CART_REDUCER, GET_CART_REDUCER, UPDATE_CART_REDUCER } from "../Constants";

export default function CartReducer(state = [], action) {

    switch (action.type) {
        case CREATE_CART_REDUCER:
            return [...state, action.payload]
        case GET_CART_REDUCER:
            return action.payload
        case UPDATE_CART_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_CART_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
        default:
            return state
    }
}

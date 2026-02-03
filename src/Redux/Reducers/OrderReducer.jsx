import { CREATE_ORDER_REDUCER, DELETE_ORDER_REDUCER, GET_ORDER_REDUCER, UPDATE_ORDER_REDUCER } from "../Constants";

export default function OrderReducer(state = [], action) {

    switch (action.type) {
        case CREATE_ORDER_REDUCER:
            return [...state, action.payload]
        case GET_ORDER_REDUCER:
            return action.payload
        case UPDATE_ORDER_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_ORDER_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

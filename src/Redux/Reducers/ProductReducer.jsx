import { CREATE_PRODUCT_REDUCER, DELETE_PRODUCT_REDUCER, GET_PRODUCT_REDUCER, UPDATE_PRODUCT_REDUCER } from "../Constants";

export default function ProductReducer(state = [], action) {

    switch (action.type) {
        case CREATE_PRODUCT_REDUCER:
            return [...state, action.payload]
        case GET_PRODUCT_REDUCER:
            return action.payload
        case UPDATE_PRODUCT_REDUCER:
            return state.map(item =>
                item.id === action.payload.id
                    ? { ...item, ...action.payload }
                    : item
            )

        case DELETE_PRODUCT_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
        default:
            return state
    }
}

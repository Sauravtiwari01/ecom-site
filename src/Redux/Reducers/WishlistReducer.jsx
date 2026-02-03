import { CREATE_WISHLIST_REDUCER, DELETE_WISHLIST_REDUCER, GET_WISHLIST_REDUCER, UPDATE_WISHLIST_REDUCER } from "../Constants";

export default function WishlistReducer(state = [], action) {

    switch (action.type) {
        case CREATE_WISHLIST_REDUCER:
            return [...state, action.payload]
        case GET_WISHLIST_REDUCER:
            return action.payload
        case UPDATE_WISHLIST_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_WISHLIST_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

import { CREATE_BRAND_REDUCER, DELETE_BRAND_REDUCER, GET_BRAND_REDUCER, UPDATE_BRAND_REDUCER } from "../Constants";

export default function BrandReducer(state = [], action) {

    switch (action.type) {
        case CREATE_BRAND_REDUCER:
            return [...state, action.payload]
        case GET_BRAND_REDUCER:
            return action.payload
        case UPDATE_BRAND_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_BRAND_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

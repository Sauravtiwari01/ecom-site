import { CREATE_CATEGORY_REDUCER, DELETE_CATEGORY_REDUCER, GET_CATEGORY_REDUCER, UPDATE_CATEGORY_REDUCER } from "../Constants";

export default function CategoryReducer(state = [], action) {

    switch (action.type) {
        case CREATE_CATEGORY_REDUCER:
            return [...state, action.payload]
        case GET_CATEGORY_REDUCER:
            return action.payload
        case UPDATE_CATEGORY_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_CATEGORY_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

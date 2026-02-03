import { CREATE_SUBCATEGORY_REDUCER, DELETE_SUBCATEGORY_REDUCER, GET_SUBCATEGORY_REDUCER, UPDATE_SUBCATEGORY_REDUCER } from "../Constants";

export default function SubCategoryReducer(state = [], action) {

    switch (action.type) {
        case CREATE_SUBCATEGORY_REDUCER:
            return [...state, action.payload]
        case GET_SUBCATEGORY_REDUCER:
            return action.payload
        case UPDATE_SUBCATEGORY_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_SUBCATEGORY_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

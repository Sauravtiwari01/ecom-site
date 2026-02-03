import { CREATE_USER_REDUCER, DELETE_USER_REDUCER, GET_USER_REDUCER, UPDATE_USER_REDUCER } from "../Constants";

export default function UserReducer(state = [], action) {

    switch (action.type) {
        case CREATE_USER_REDUCER:
            return [...state, action.payload]
        case GET_USER_REDUCER:
            return action.payload
        case UPDATE_USER_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_USER_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

import { CREATE_ADDRESS_REDUCER, DELETE_ADDRESS_REDUCER, GET_ADDRESS_REDUCER, UPDATE_ADDRESS_REDUCER } from "../Constants";

export default function AddressReducer(state = [], action) {

    switch (action.type) {
        case CREATE_ADDRESS_REDUCER:
            return [...state, action.payload]
        case GET_ADDRESS_REDUCER:
            return action.payload
        case UPDATE_ADDRESS_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_ADDRESS_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

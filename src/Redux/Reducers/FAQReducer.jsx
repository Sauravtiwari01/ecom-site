import { CREATE_FAQ_REDUCER, DELETE_FAQ_REDUCER, GET_FAQ_REDUCER, UPDATE_FAQ_REDUCER } from "../Constants";

export default function FAQReducer(state = [], action) {

    switch (action.type) {
        case CREATE_FAQ_REDUCER:
            return [...state, action.payload]
        case GET_FAQ_REDUCER:
            return action.payload
        case UPDATE_FAQ_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].question = action.payload.question
            state[index].answer = action.payload.answer
            state[index].active = action.payload.active
            return state
        case DELETE_FAQ_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

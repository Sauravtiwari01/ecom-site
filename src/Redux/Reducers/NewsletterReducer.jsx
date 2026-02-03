import { CREATE_NEWSLETTER_REDUCER, DELETE_NEWSLETTER_REDUCER, GET_NEWSLETTER_REDUCER, UPDATE_NEWSLETTER_REDUCER } from "../Constants";

export default function NewsletterReducer(state = [], action) {

    switch (action.type) {
        case CREATE_NEWSLETTER_REDUCER:
            return [...state, action.payload]
        case GET_NEWSLETTER_REDUCER:
            return action.payload
        case UPDATE_NEWSLETTER_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_NEWSLETTER_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

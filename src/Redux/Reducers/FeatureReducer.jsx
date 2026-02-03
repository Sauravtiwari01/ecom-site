import { CREATE_FEATURE_REDUCER, DELETE_FEATURE_REDUCER, GET_FEATURE_REDUCER, UPDATE_FEATURE_REDUCER } from "../Constants";

export default function FeatureReducer(state = [], action) {

    switch (action.type) {
        case CREATE_FEATURE_REDUCER:
            return [...state, action.payload]
        case GET_FEATURE_REDUCER:
            return action.payload
        case UPDATE_FEATURE_REDUCER:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].icon = action.payload.icon
            state[index].description = action.payload.description
            state[index].active = action.payload.active
            return state
        case DELETE_FEATURE_REDUCER:
            return state.filter(x => x.id !== action.payload.id)
            default:
                return state
    }
}

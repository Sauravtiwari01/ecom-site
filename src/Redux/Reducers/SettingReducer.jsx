import { CREATE_SETTING_REDUCER, GET_SETTING_REDUCER, UPDATE_SETTING_REDUCER } from "../Constants";

export default function SettingReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_SETTING_REDUCER:
    case GET_SETTING_REDUCER:
    case UPDATE_SETTING_REDUCER:
      return action.payload;

    default:
      return state;
  }
}

import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord } from "./Services/Index";
import { CREATE_SETTING, CREATE_SETTING_REDUCER, GET_SETTING, GET_SETTING_REDUCER, UPDATE_SETTING, UPDATE_SETTING_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("settings", action.payload)
    // let response = yield CreateMultiPartRecord("SETTING",action.payload)
    yield put({ type: CREATE_SETTING_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("settings", action.payload)
    // let response = yield UpdateMultiPartRecord("SETTING",action.payload)
    yield put({ type: UPDATE_SETTING_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("settings")
    yield put({ type: GET_SETTING_REDUCER, payload: response })
}


export function* SettingSaga() {
    yield takeEvery(CREATE_SETTING, createSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
    yield takeEvery(GET_SETTING, getSaga)

}
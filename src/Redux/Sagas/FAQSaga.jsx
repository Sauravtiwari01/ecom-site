import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_FAQ, CREATE_FAQ_REDUCER, DELETE_FAQ, DELETE_FAQ_REDUCER, GET_FAQ, GET_FAQ_REDUCER, UPDATE_FAQ, UPDATE_FAQ_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("faq", action.payload)
    // let response = yield CreateMultiPartRecord("FAQ",action.payload)
    yield put({ type: CREATE_FAQ_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("faq", action.payload)
    // let response = yield UpdateMultiPartRecord("FAQ",action.payload)
    yield put({ type: UPDATE_FAQ_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("faq")
    yield put({ type: GET_FAQ_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_REDUCER, payload: response })
}

export function* FAQSaga() {
    yield takeEvery(CREATE_FAQ, createSaga)
    yield takeEvery(UPDATE_FAQ, updateSaga)
    yield takeEvery(GET_FAQ, getSaga)
    yield takeEvery(DELETE_FAQ, deleteSaga)

}
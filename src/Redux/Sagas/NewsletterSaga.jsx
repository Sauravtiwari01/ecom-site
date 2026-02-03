import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_NEWSLETTER, CREATE_NEWSLETTER_REDUCER, DELETE_NEWSLETTER, DELETE_NEWSLETTER_REDUCER, GET_NEWSLETTER, GET_NEWSLETTER_REDUCER, UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("newsletter", action.payload)
    // let response = yield CreateMultiPartRecord("NEWSLETTER",action.payload)
    yield put({ type: CREATE_NEWSLETTER_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("newsletter", action.payload)
    // let response = yield UpdateMultiPartRecord("NEWSLETTER",action.payload)
    yield put({ type: UPDATE_NEWSLETTER_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("newsletter")
    yield put({ type: GET_NEWSLETTER_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("newsletter", action.payload)
    yield put({ type: DELETE_NEWSLETTER_REDUCER, payload: response })
}

export function* NewsletterSaga() {
    yield takeEvery(CREATE_NEWSLETTER, createSaga)
    yield takeEvery(UPDATE_NEWSLETTER, updateSaga)
    yield takeEvery(GET_NEWSLETTER, getSaga)
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)

}
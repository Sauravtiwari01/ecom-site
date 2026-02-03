import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_CONTACTUS, CREATE_CONTACTUS_REDUCER, DELETE_CONTACTUS, DELETE_CONTACTUS_REDUCER, GET_CONTACTUS, GET_CONTACTUS_REDUCER, UPDATE_CONTACTUS, UPDATE_CONTACTUS_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("contact", action.payload)
    // let response = yield CreateMultiPartRecord("CONTACTUS",action.payload)
    yield put({ type: CREATE_CONTACTUS_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("contact", action.payload)
    // let response = yield UpdateMultiPartRecord("CONTACTUS",action.payload)
    yield put({ type: UPDATE_CONTACTUS_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("contact")
    yield put({ type: GET_CONTACTUS_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("contact", action.payload)
    yield put({ type: DELETE_CONTACTUS_REDUCER, payload: response })
}

export function* ContactusSaga() {
    yield takeEvery(CREATE_CONTACTUS, createSaga)
    yield takeEvery(UPDATE_CONTACTUS, updateSaga)
    yield takeEvery(GET_CONTACTUS, getSaga)
    yield takeEvery(DELETE_CONTACTUS, deleteSaga)

}
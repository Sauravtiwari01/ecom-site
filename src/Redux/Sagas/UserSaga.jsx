import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_USER, CREATE_USER_REDUCER, DELETE_USER, DELETE_USER_REDUCER, GET_USER, GET_USER_REDUCER, UPDATE_USER, UPDATE_USER_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("user", action.payload)
    // let response = yield CreateMultiPartRecord("USER",action.payload)
    yield put({ type: CREATE_USER_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("user", action.payload)
    // let response = yield UpdateMultiPartRecord("USER",action.payload)
    yield put({ type: UPDATE_USER_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("user")
    yield put({ type: GET_USER_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_REDUCER, payload: response })
}

export function* UserSaga() {
    yield takeEvery(CREATE_USER, createSaga)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(GET_USER, getSaga)
    yield takeEvery(DELETE_USER, deleteSaga)

}
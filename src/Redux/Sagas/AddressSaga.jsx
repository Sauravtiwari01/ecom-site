import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_ADDRESS, CREATE_ADDRESS_REDUCER, DELETE_ADDRESS, DELETE_ADDRESS_REDUCER, GET_ADDRESS, GET_ADDRESS_REDUCER, UPDATE_ADDRESS, UPDATE_ADDRESS_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("address", action.payload)
    // let response = yield CreateMultiPartRecord("ADDRESS",action.payload)
    yield put({ type: CREATE_ADDRESS_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("address", action.payload)
    // let response = yield UpdateMultiPartRecord("ADDRESS",action.payload)
    yield put({ type: UPDATE_ADDRESS_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("address")
    yield put({ type: GET_ADDRESS_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("address", action.payload)
    yield put({ type: DELETE_ADDRESS_REDUCER, payload: response })
}

export function* AddressSaga() {
    yield takeEvery(CREATE_ADDRESS, createSaga)
    yield takeEvery(UPDATE_ADDRESS, updateSaga)
    yield takeEvery(GET_ADDRESS, getSaga)
    yield takeEvery(DELETE_ADDRESS, deleteSaga)

}
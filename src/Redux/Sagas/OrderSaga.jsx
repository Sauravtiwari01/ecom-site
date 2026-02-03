import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_ORDER, CREATE_ORDER_REDUCER, DELETE_ORDER, DELETE_ORDER_REDUCER, GET_ORDER, GET_ORDER_REDUCER, UPDATE_ORDER, UPDATE_ORDER_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("orders", action.payload)
    // let response = yield CreateMultiPartRecord("ORDER",action.payload)
    yield put({ type: CREATE_ORDER_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("orders", action.payload)
    // let response = yield UpdateMultiPartRecord("ORDER",action.payload)
    yield put({ type: UPDATE_ORDER_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("orders")
    yield put({ type: GET_ORDER_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("orders", action.payload)
    yield put({ type: DELETE_ORDER_REDUCER, payload: response })
}

export function* OrderSaga() {
    yield takeEvery(CREATE_ORDER, createSaga)
    yield takeEvery(UPDATE_ORDER, updateSaga)
    yield takeEvery(GET_ORDER, getSaga)
    yield takeEvery(DELETE_ORDER, deleteSaga)

}
import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_PRODUCT, CREATE_PRODUCT_REDUCER, DELETE_PRODUCT, DELETE_PRODUCT_REDUCER, GET_PRODUCT, GET_PRODUCT_REDUCER, UPDATE_PRODUCT, UPDATE_PRODUCT_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("products", action.payload)
    // let response = yield CreateMultiPartRecord("PRODUCT",action.payload)
    yield put({ type: CREATE_PRODUCT_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("products", action.payload)
    // let response = yield UpdateMultiPartRecord("PRODUCT",action.payload)
    yield put({ type: UPDATE_PRODUCT_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("products")
    yield put({ type: GET_PRODUCT_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("products", action.payload)
    yield put({ type: DELETE_PRODUCT_REDUCER, payload: response })
}

export function* ProductSaga() {
    yield takeEvery(CREATE_PRODUCT, createSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)

}
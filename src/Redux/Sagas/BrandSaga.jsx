import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_BRAND, CREATE_BRAND_REDUCER, DELETE_BRAND, DELETE_BRAND_REDUCER, GET_BRAND, GET_BRAND_REDUCER, UPDATE_BRAND, UPDATE_BRAND_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("brands", action.payload)
    // let response = yield CreateMultiPartRecord("BRAND",action.payload)
    yield put({ type: CREATE_BRAND_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("brands", action.payload)
    // let response = yield UpdateMultiPartRecord("BRAND",action.payload)
    yield put({ type: UPDATE_BRAND_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("brands")
    yield put({ type: GET_BRAND_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("brands", action.payload)
    yield put({ type: DELETE_BRAND_REDUCER, payload: response })
}

export function* BrandSaga() {
    yield takeEvery(CREATE_BRAND, createSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)

}
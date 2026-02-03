import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_REDUCER, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_REDUCER, GET_SUBCATEGORY, GET_SUBCATEGORY_REDUCER, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("sub-category", action.payload)
    // let response = yield CreateMultiPartRecord("SUBCategory",action.payload)
    yield put({ type: CREATE_SUBCATEGORY_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("sub-category", action.payload)
    // let response = yield UpdateMultiPartRecord("SUBCategory",action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("sub-category")
    yield put({ type: GET_SUBCATEGORY_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("sub-category", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_REDUCER, payload: response })
}

export function* SubCategorySaga() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)

}
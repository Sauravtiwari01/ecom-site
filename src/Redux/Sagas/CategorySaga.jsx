import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_CATEGORY, CREATE_CATEGORY_REDUCER, DELETE_CATEGORY, DELETE_CATEGORY_REDUCER, GET_CATEGORY, GET_CATEGORY_REDUCER, UPDATE_CATEGORY, UPDATE_CATEGORY_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("category", action.payload)
    // let response = yield CreateMultiPartRecord("Category",action.payload)
    yield put({ type: CREATE_CATEGORY_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("category", action.payload)
    // let response = yield UpdateMultiPartRecord("Category",action.payload)
    yield put({ type: UPDATE_CATEGORY_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("category")
    yield put({ type: GET_CATEGORY_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("category", action.payload)
    yield put({ type: DELETE_CATEGORY_REDUCER, payload: response })
}

export function* CategorySaga() {
    yield takeEvery(CREATE_CATEGORY, createSaga)
    yield takeEvery(UPDATE_CATEGORY, updateSaga)
    yield takeEvery(GET_CATEGORY, getSaga)
    yield takeEvery(DELETE_CATEGORY, deleteSaga)

}
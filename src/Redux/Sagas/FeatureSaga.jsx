import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_FEATURE, CREATE_FEATURE_REDUCER, DELETE_FEATURE, DELETE_FEATURE_REDUCER, GET_FEATURE, GET_FEATURE_REDUCER, UPDATE_FEATURE, UPDATE_FEATURE_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("feature", action.payload)
    // let response = yield CreateMultiPartRecord("FEATURE",action.payload)
    yield put({ type: CREATE_FEATURE_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("feature", action.payload)
    // let response = yield UpdateMultiPartRecord("FEATURE",action.payload)
    yield put({ type: UPDATE_FEATURE_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("feature")
    yield put({ type: GET_FEATURE_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_REDUCER, payload: response })
}

export function* FeatureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)
    yield takeEvery(UPDATE_FEATURE, updateSaga)
    yield takeEvery(GET_FEATURE, getSaga)
    yield takeEvery(DELETE_FEATURE, deleteSaga)

}
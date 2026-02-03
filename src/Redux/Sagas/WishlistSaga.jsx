import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_WISHLIST, CREATE_WISHLIST_REDUCER, DELETE_WISHLIST, DELETE_WISHLIST_REDUCER, GET_WISHLIST, GET_WISHLIST_REDUCER, UPDATE_WISHLIST, UPDATE_WISHLIST_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("wishlist", action.payload)
    // let response = yield CreateMultiPartRecord("WISHLIST",action.payload)
    yield put({ type: CREATE_WISHLIST_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("wishlist", action.payload)
    // let response = yield UpdateMultiPartRecord("WISHLIST",action.payload)
    yield put({ type: UPDATE_WISHLIST_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("wishlist")
    yield put({ type: GET_WISHLIST_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_REDUCER, payload: response })
}

export function* WishlistSaga() {
    yield takeEvery(CREATE_WISHLIST, createSaga)
    yield takeEvery(UPDATE_WISHLIST, updateSaga)
    yield takeEvery(GET_WISHLIST, getSaga)
    yield takeEvery(DELETE_WISHLIST, deleteSaga)

}
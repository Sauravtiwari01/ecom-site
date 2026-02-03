import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_CART, CREATE_CART_REDUCER, DELETE_CART, DELETE_CART_REDUCER, GET_CART, GET_CART_REDUCER, UPDATE_CART, UPDATE_CART_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("cart", action.payload)
    // let response = yield CreateMultiPartRecord("CART",action.payload)
    yield put({ type: CREATE_CART_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("cart", action.payload)
    // let response = yield UpdateMultiPartRecord("CART",action.payload)
    yield put({ type: UPDATE_CART_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("cart")
    yield put({ type: GET_CART_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_REDUCER, payload: response })
}

export function* CartSaga() {
    yield takeEvery(CREATE_CART, createSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(DELETE_CART, deleteSaga)

}
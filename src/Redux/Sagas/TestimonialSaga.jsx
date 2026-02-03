import { put, takeEvery } from "redux-saga/effects";
import { CreateRecord, UpdateRecord, GetRecord, DeleteRecord } from "./Services/Index";
import { CREATE_TESTIMONIAL, CREATE_TESTIMONIAL_REDUCER, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_REDUCER, GET_TESTIMONIAL, GET_TESTIMONIAL_REDUCER, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_REDUCER } from "../Constants";


function* createSaga(action) {
    let response = yield CreateRecord("testimonials", action.payload)
    // let response = yield CreateMultiPartRecord("TESTIMONIAL",action.payload)
    yield put({ type: CREATE_TESTIMONIAL_REDUCER, payload: response })
}
function* updateSaga(action) {
    let response = yield UpdateRecord("testimonials", action.payload)
    // let response = yield UpdateMultiPartRecord("TESTIMONIAL",action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_REDUCER, payload: response })
}
function* getSaga() {
    let response = yield GetRecord("testimonials")
    yield put({ type: GET_TESTIMONIAL_REDUCER, payload: response })
}
function* deleteSaga(action) {
    let response = yield DeleteRecord("testimonials", action.payload)
    yield put({ type: DELETE_TESTIMONIAL_REDUCER, payload: response })
}

export function* TestimonialSaga() {
    yield takeEvery(CREATE_TESTIMONIAL, createSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)

}
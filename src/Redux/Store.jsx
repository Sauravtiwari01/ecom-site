import createSagaMiddleware from "redux-saga";
import RootSaga from "./Sagas/RootSaga";
import RootReducer from "./Reducers/RootReducer"
import { configureStore } from "@reduxjs/toolkit";


const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
    reducer:RootReducer,
    middleware: () => [sagaMiddleware]
})
sagaMiddleware.run(RootSaga)
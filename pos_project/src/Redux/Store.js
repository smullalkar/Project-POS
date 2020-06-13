import { createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import Reducer from "./Reducer";

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    Reducer, 
    createComposer(
        applyMiddleware(
            thunk,
        )
    )
)
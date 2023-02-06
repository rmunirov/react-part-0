import { useDispatch } from "react-redux/es/exports";
import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "./middlewares/thunk";
import appVisability from "./model/appVisability";
import github from "./model/github";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({ appVisability, github });

const store = legacy_createStore(reducer, undefined, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

import { useDispatch } from "react-redux/es/exports";
import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import { getFromLocalStorage, setToLocalStorage } from "../utils/utils";
import thunk from "./middlewares/thunk";
import appVisability from "./model/appVisability";
import github from "./model/github";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const LOCAL_STORAGE_KEY = "reduxState";

const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({ appVisability, github });

const initialState = getFromLocalStorage(LOCAL_STORAGE_KEY) ?? undefined;

const store = legacy_createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
    setToLocalStorage(LOCAL_STORAGE_KEY, store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;

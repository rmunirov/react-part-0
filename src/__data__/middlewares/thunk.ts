import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from "redux";

type ThunkAction = (dispatch: Dispatch, getState: () => unknown) => void;

const createThunkMiddleware: () => Middleware = () => {
    return ({ dispatch, getState }: MiddlewareAPI) =>
        (next: Dispatch<AnyAction>) =>
        (action: AnyAction | ThunkAction) => {
            if (typeof action === "function") {
                return action(dispatch, getState);
            }

            return next(action);
        };
};

const thunk = createThunkMiddleware();

export default thunk;

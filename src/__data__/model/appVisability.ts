import { Action, Reducer } from "redux";

const SET_OPTIONS_VISABILITY = "SET_OPTIONS_VISABILITY";
const SET_BANNER_VISABILITY = "SET_BANNER_VISABILITY";

export type AppOptions = {
    options: boolean;
    banner: boolean;
};

interface SetOptionsVisabilityAction extends Action<typeof SET_OPTIONS_VISABILITY> {
    payload: boolean;
}

interface SetBannerVisabilityAction extends Action<typeof SET_BANNER_VISABILITY> {
    payload: boolean;
}

export function setOptionsVisibility(value: boolean) {
    return {
        type: SET_OPTIONS_VISABILITY,
        payload: value,
    };
}

export function setBannerVisibility(value: boolean) {
    return {
        type: SET_BANNER_VISABILITY,
        payload: value,
    };
}

const initialState: AppOptions = {
    options: true,
    banner: false,
};

const appVisability: Reducer<AppOptions, SetOptionsVisabilityAction | SetBannerVisabilityAction> = (
    state = initialState,
    { type, payload },
) => {
    switch (type) {
        case SET_OPTIONS_VISABILITY:
            return { ...state, options: payload };
        case SET_BANNER_VISABILITY:
            return { ...state, banner: payload };
        default:
            return state;
    }
};

export default appVisability;

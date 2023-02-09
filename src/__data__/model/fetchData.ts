import { addContributors, addError, addRepos, addReviewer, addUser } from "./github";
import { setBannerVisibility } from "./appVisability";
import { RootState } from "../store";
import { Dispatch } from "redux";

export type FetchDataFromGithub = (dispatch: Dispatch, getState: () => RootState) => void;

export type FetchUser = (userName: string, type: "user" | "reviewer") => FetchDataFromGithub;
export type FetchRepos = (userName: string) => FetchDataFromGithub;
export type FetchContributors = (userName: string, rep: string) => FetchDataFromGithub;

const fetchData = (url: string): Promise<any> => {
    return fetch(url).then((response) => {
        if (!response.ok) {
            switch (response.status) {
                case 404:
                    throw new Error("Data not found");
                case 403:
                    throw new Error("API rate limit exceeded");
                default:
                    throw new Error(`Some error - ${response.status}`);
            }
        }
        return response.json();
    });
};

export const fetchUser: FetchUser = (userName: string, type: "user" | "reviewer") => {
    const fetchUser = (dispatch: Dispatch, getState: () => RootState) => {
        return fetchData(`https://api.github.com/users/${userName}`)
            .then((data) => {
                if (type === "user") {
                    dispatch(addUser(data));
                } else {
                    dispatch(addReviewer(data));
                }
            })
            .catch((error) => {
                dispatch(addError(error.message));
                dispatch(setBannerVisibility(true));
            });
    };
    return fetchUser;
};

export const fetchRepos: FetchRepos = (userName: string) => {
    const fetchRepos = (dispatch: Dispatch, getState: () => RootState) => {
        return fetchData(`https://api.github.com/users/${userName}/repos`)
            .then((data) => {
                dispatch(addRepos(data));
            })
            .catch((error) => {
                dispatch(addError(error.message));
                dispatch(setBannerVisibility(true));
            });
    };
    return fetchRepos;
};

export const fetchContributors: FetchContributors = (userName: string, rep: string) => {
    const fetchRepos = (dispatch: Dispatch, getState: () => RootState) => {
        return fetchData(`https://api.github.com/repos/${userName}/${rep}/contributors`)
            .then((data) => {
                dispatch(addContributors(data));
            })
            .catch((error) => {
                dispatch(addError(error.message));
                dispatch(setBannerVisibility(true));
            });
    };
    return fetchRepos;
};

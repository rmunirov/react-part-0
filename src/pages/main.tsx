import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./main.module.scss";
import classNames from "classnames/bind";
import { Banner, Button, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../__data__/store";
import { debounce } from "../utils/utils";
import { Contributors, Repositories, Reviewers } from "../widgets";
import { FetchDataFromGithub, fetchRepos, fetchUser, setBannerVisibility, setOptionsVisibility } from "../__data__/model";

const cn = classNames.bind(styles);
const CLASS_NAME = "Main";

const MainPage: FC = () => {
    const [user, setUser] = useState("");

    const dispatch = useDispatch();
    const dispatchThunk = dispatch as (fn: FetchDataFromGithub) => void;

    const showBanner = useSelector((state: RootState) => state.appVisability.banner);
    const showOptions = useSelector((state: RootState) => state.appVisability.options);
    const error = useSelector((state: RootState) => state.github.error);
    const currentUser = useSelector((state: RootState) => state.github.currentUser);

    const handleBannerClose = () => {
        dispatch(setBannerVisibility(false));
    };

    const handleOptionsToggle = () => {
        dispatch(setOptionsVisibility(!showOptions));
    };

    const debounceFetchUser = useCallback(
        debounce((userName: string) => {
            dispatchThunk(fetchUser(userName, "user"));
        }, 500),
        [],
    );

    useEffect(() => {
        if (user) {
            debounceFetchUser(user);
        }
    }, [user, debounceFetchUser]);

    useEffect(() => {
        if (currentUser) {
            dispatchThunk(fetchRepos(currentUser.login));
        }
    }, [currentUser]);

    return (
        <div className={cn(CLASS_NAME)}>
            {showBanner && <Banner mode="error" value={error ?? "Something went wrong"} onClose={handleBannerClose}></Banner>}
            <Button onClick={handleOptionsToggle} title="Hide"></Button>
            {showOptions && (
                <>
                    <Input value={user} placeholder="Enter login" onChange={setUser}></Input>
                    <Repositories />
                    <Contributors />
                    <Reviewers />
                </>
            )}
        </div>
    );
};

export default MainPage;

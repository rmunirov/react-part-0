import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./reviewer.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Reviewer";

type PropsType = {
    avatar: string;
    name: string;
    company?: string | null;
    location?: string | null;
    email?: string | null;
    publicRepos?: number;
    mode?: "full" | "short";
};

const Reviewer: FC<PropsType> = ({ avatar, name, company, location, email, publicRepos, mode = "full" }) => {
    if (mode === "short") {
        return (
            <div className={cn(CLASS_NAME)}>
                <div className={cn(`${CLASS_NAME}__avatar`)}>
                    <img src={avatar} alt="avatar" />
                </div>
                <div className={cn(`${CLASS_NAME}__info`)}>
                    <div>{`Name: ${name}`}</div>
                </div>
            </div>
        );
    }
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__avatar`)}>
                <img src={avatar} alt="avatar" />
            </div>
            <div className={cn(`${CLASS_NAME}__info`)}>
                <div>{`Name: ${name}`}</div>
                <div>{`Company: ${company ?? "secret"}`}</div>
                <div>{`Location: ${location ?? "some where"}`}</div>
                <div>{`Email: ${email ?? "email is not defined"}`}</div>
                <div>{`Public repos: ${publicRepos ?? "0"}`}</div>
            </div>
        </div>
    );
};

export default Reviewer;

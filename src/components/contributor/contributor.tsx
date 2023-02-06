import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./contributor.module.scss";
import { LockIcon, UnlockIcon } from "../../assets";

const cn = classNames.bind(styles);
const CLASS_NAME = "Contributor";

type PropsType = {
    id: number;
    login: string;
    avatar: string;
    contributions: number;
    active: boolean;
    lock?: boolean;
    onClick: (id: number) => void;
};

const Repository: FC<PropsType> = ({ id, login, avatar, contributions, active, lock, onClick }) => {
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div className={cn(CLASS_NAME, { [`${CLASS_NAME}_active`]: active })} onClick={handleClick}>
            <div className={cn(`${CLASS_NAME}__item`)}>
                <img src={avatar} alt="user avatar"></img>
            </div>
            <div className={cn(`${CLASS_NAME}__item`)}>{login}</div>
            <div className={cn(`${CLASS_NAME}__item`)}>{contributions}</div>
            <div className={cn(`${CLASS_NAME}__item`, `${CLASS_NAME}__item_center`)}>
                <img src={lock ? LockIcon : UnlockIcon} alt="lock" />
            </div>
        </div>
    );
};

export default Repository;

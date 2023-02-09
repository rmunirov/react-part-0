import React, { FC, useState } from "react";
import classNames from "classnames/bind";
import styles from "./banner.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Banner";

enum ModeEnum {
    "info" = "Information",
    "error" = "Error",
    "warn" = "Warning",
}

type PropsType = {
    mode: "info" | "error" | "warn";
    value: string;
    onClose: () => void;
};

const Banner: FC<PropsType> = ({ mode, value, onClose }) => {
    return (
        <div
            className={cn(CLASS_NAME, {
                [`${CLASS_NAME}_error`]: mode === "error",
                [`${CLASS_NAME}_info`]: mode === "info",
                [`${CLASS_NAME}_warn`]: mode === "warn",
            })}
        >
            <div className={cn(`${CLASS_NAME}__header`)}>
                <div className={cn(`${CLASS_NAME}__header-title`)}>{ModeEnum[mode]}</div>
                <div className={cn(`${CLASS_NAME}__header-button`)} onClick={onClose}>
                    Hide
                </div>
            </div>
            <div className={cn(`${CLASS_NAME}__content`)}>{value}</div>
        </div>
    );
};

export default Banner;

import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";
import styles from "./container.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Container";

type PropsType = {
    title: string;
    scroll?: boolean;
};

const Container: FC<PropsWithChildren<PropsType>> = ({ title, scroll = true, children }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__header`)}>{title}</div>
            <div className={cn(`${CLASS_NAME}__content`, { [`${CLASS_NAME}__content_scroll`]: scroll })}>{children}</div>
        </div>
    );
};

export default Container;

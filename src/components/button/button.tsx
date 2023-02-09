import React, { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";
import styles from "./button.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Button";

type PropsType = {
    onClick: () => void;
    full?: boolean;
};

const Button: FC<PropsWithChildren<PropsType>> = ({ full, onClick, children }) => {
    return (
        <button type="button" className={cn(CLASS_NAME, { [`${CLASS_NAME}_full`]: full })} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

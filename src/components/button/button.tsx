import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./button.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Button";

type PropsType = {
    title: string;
    onClick: () => void;
    full?: boolean;
};

const Button: FC<PropsType> = ({ title, full, onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (
        <button className={cn(CLASS_NAME, { [`${CLASS_NAME}_full`]: full })} onClick={handleClick}>
            {title}
        </button>
    );
};

export default Button;

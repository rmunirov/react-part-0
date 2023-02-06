import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./input.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Input";

type PropsType = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

const Input: FC<PropsType> = ({ value = "", placeholder, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <input className={cn(`${CLASS_NAME}__field`)} type="text" value={value} placeholder={placeholder} onChange={handleChange} />
        </div>
    );
};

export default Input;

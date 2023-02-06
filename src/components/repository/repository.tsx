import React, { FC } from "react";
import classNames from "classnames/bind";
import styles from "./repository.module.scss";

const cn = classNames.bind(styles);
const CLASS_NAME = "Repository";

type PropsType = {
    id: number;
    name: string;
    language: string;
    size: number;
    active: boolean;
    onClick: (id: number) => void;
};

const Repository: FC<PropsType> = ({ id, name, language, size, active, onClick }) => {
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div className={cn(CLASS_NAME, { [`${CLASS_NAME}_active`]: active })} onClick={handleClick}>
            <div className={cn(`${CLASS_NAME}__item`)}>{name}</div>
            <div className={cn(`${CLASS_NAME}__item`)}>{language}</div>
            <div className={cn(`${CLASS_NAME}__item`)}>{size}</div>
        </div>
    );
};

export default Repository;

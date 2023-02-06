import React, { FC } from "react";
import styles from "./reviewers.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Container, Reviewer } from "../../components";
import { RootState } from "../../__data__/store";

const cn = classNames.bind(styles);
const CLASS_NAME = "Reviewers";

const Reviewers: FC = () => {
    const currentUser = useSelector((state: RootState) => state.github.currentUser);
    const reviewer = useSelector((state: RootState) => state.github.reviewer);

    return (
        <div className={cn(`${CLASS_NAME}`)}>
            {currentUser && (
                <Container title="Current user" scroll={false}>
                    <Reviewer
                        avatar={currentUser.avatar_url}
                        company={currentUser.company}
                        email={currentUser.email}
                        location={currentUser.location}
                        name={currentUser.name}
                        publicRepos={currentUser.public_repos}
                    ></Reviewer>
                </Container>
            )}
            {reviewer && (
                <Container title="Reviewer" scroll={false}>
                    <Reviewer
                        avatar={reviewer.avatar_url}
                        company={reviewer.company}
                        email={reviewer.email}
                        location={reviewer.location}
                        name={reviewer.name}
                        publicRepos={reviewer.public_repos}
                    ></Reviewer>
                </Container>
            )}
        </div>
    );
};

export default Reviewers;

import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./contributors.module.scss";
import classNames from "classnames/bind";
import { Container, Contributor, Button, Reviewer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../__data__/store";
import { addToBlackList, ContributorType, FetchDataFromGithub, fetchUser, removeFromBlackList } from "../../__data__/model";

const cn = classNames.bind(styles);
const CLASS_NAME = "Contributors";

const Contributors: FC = () => {
    const [activeContributor, setActiveContributor] = useState<ContributorType | null>(null);
    const [randomReviewer, setRandomReviewer] = useState<ContributorType | null>(null);
    const [counter, setCounter] = useState(0);
    const contributorsToSelect = useRef<Array<ContributorType>>([]);
    const interval = useRef<NodeJS.Timer>();

    const dispatch = useDispatch();
    const dispatchThunk = dispatch as (fn: FetchDataFromGithub) => void;

    const contributors = useSelector((state: RootState) => state.github.contributors);
    const blackList = useSelector((state: RootState) => state.github.blackList);
    const currentUser = useSelector((state: RootState) => state.github.currentUser);

    useEffect(() => {
        if (counter >= 5) {
            clearInterval(interval.current);
            setCounter(0);
            if (randomReviewer) {
                dispatchThunk(fetchUser(randomReviewer.login, "reviewer"));
                setRandomReviewer(null);
            }
        }
    }, [counter]);

    const handleContributorClick = (id: number) => {
        if (contributors.length === 0 || !currentUser) {
            return;
        }
        const contributor = contributors.find((item) => item.id === id);
        if (contributor) {
            setActiveContributor(contributor);
        }
    };

    const handleLockButtonClick = () => {
        if (!activeContributor) {
            return;
        }
        dispatch(addToBlackList(activeContributor.id));
    };

    const handleUnlockButtonClick = () => {
        if (!activeContributor) {
            return;
        }
        dispatch(removeFromBlackList(activeContributor.id));
    };

    const handleSelectButtonClick = () => {
        if (!activeContributor) {
            return;
        }
        if (blackList.includes(activeContributor.id)) {
            return;
        }
        dispatchThunk(fetchUser(activeContributor.login, "reviewer"));
    };

    const handleRandomButtonClick = () => {
        if (contributors.length === 0) {
            return;
        }
        if (contributors.length === 1) {
            setRandomReviewer(contributors[0]);
            dispatchThunk(fetchUser(contributors[0].login, "reviewer"));
            return;
        }

        contributorsToSelect.current = contributors.filter((item) => !blackList.includes(item.id));
        if (contributorsToSelect.current.length === 0) {
            return;
        }
        if (contributorsToSelect.current.length === 1) {
            setRandomReviewer(contributorsToSelect.current[0]);
            dispatchThunk(fetchUser(contributorsToSelect.current[0].login, "reviewer"));
            return;
        }

        interval.current = setInterval(() => {
            const rand = Math.floor(Math.random() * contributorsToSelect.current.length);
            setRandomReviewer(contributorsToSelect.current[rand]);
            setCounter((prev) => prev + 1);
        }, 500);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <Container title="Contributors">
                {contributors.length > 0 &&
                    contributors.map((contributor) => {
                        return (
                            <Contributor
                                key={contributor.id}
                                avatar={contributor.avatar_url}
                                contributions={contributor.contributions}
                                id={contributor.id}
                                login={contributor.login}
                                active={activeContributor?.id === contributor.id}
                                lock={blackList.includes(contributor.id)}
                                onClick={handleContributorClick}
                            />
                        );
                    })}
            </Container>
            <div className={cn(`${CLASS_NAME}__buttons`)}>
                <Button title="Lock" full onClick={handleLockButtonClick} />
                <Button title="Unlock" full onClick={handleUnlockButtonClick} />
                <Button title="Select" full onClick={handleSelectButtonClick} />
                <Button title="Random" full onClick={handleRandomButtonClick} />
            </div>

            {randomReviewer && (
                <Container title="Random reviewer" scroll={false}>
                    <Reviewer avatar={randomReviewer.avatar_url} name={randomReviewer.login} />
                </Container>
            )}
        </div>
    );
};

export default Contributors;

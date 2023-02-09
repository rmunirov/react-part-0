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
    const counterRef = useRef(0);
    let contributorsToSelect: Array<ContributorType> = [];
    const intervalRef = useRef<NodeJS.Timer>();

    const dispatch = useDispatch();
    const dispatchThunk = dispatch as (fn: FetchDataFromGithub) => void;

    const contributors = useSelector((state: RootState) => state.github.contributors);
    const blackList = useSelector((state: RootState) => state.github.blackList);
    const currentUser = useSelector((state: RootState) => state.github.currentUser);

    useEffect(() => {
        if (counterRef.current >= 5) {
            clearInterval(intervalRef.current);
            counterRef.current = 0;
            if (randomReviewer) {
                dispatchThunk(fetchUser(randomReviewer.login, "reviewer"));
                setRandomReviewer(null);
            }
        }
    }, [randomReviewer, dispatchThunk]);

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
        contributorsToSelect = contributors.filter((item) => !blackList.includes(item.id));
        if (contributorsToSelect.length === 0) {
            return;
        }
        if (contributorsToSelect.length === 1) {
            setRandomReviewer(contributorsToSelect[0]);
            dispatchThunk(fetchUser(contributorsToSelect[0].login, "reviewer"));
            return;
        }

        intervalRef.current = setInterval(() => {
            const rand = Math.floor(Math.random() * contributorsToSelect.length);
            setRandomReviewer(contributorsToSelect[rand]);
            counterRef.current += 1;
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
                <Button full onClick={handleLockButtonClick}>
                    Lock
                </Button>
                <Button full onClick={handleUnlockButtonClick}>
                    Unlock
                </Button>
                <Button full onClick={handleSelectButtonClick}>
                    Select
                </Button>
                <Button full onClick={handleRandomButtonClick}>
                    Random
                </Button>
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

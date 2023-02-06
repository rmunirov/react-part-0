import React, { FC, useState } from "react";
import { Repository, Container } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../__data__/store";
import { fetchContributors, FetchDataFromGithub, RepositoryType } from "../../__data__/model";

const Repositories: FC = () => {
    const [activeRepository, setActiveRepository] = useState<RepositoryType | null>(null);

    const repositores = useSelector((state: RootState) => state.github.repositories);
    const currentUser = useSelector((state: RootState) => state.github.currentUser);

    const dispatch = useDispatch();
    const dispatchThunk = dispatch as (fn: FetchDataFromGithub) => void;

    const handleRepositoryClick = (id: number) => {
        if (repositores.length === 0 || !currentUser) {
            return;
        }
        const rep = repositores.find((item) => item.id === id);
        if (rep) {
            setActiveRepository(rep);
            dispatchThunk(fetchContributors(currentUser.login, rep.name));
        }
    };

    return (
        <Container title="Repositories">
            {repositores.length > 0 &&
                repositores.map((rep) => {
                    return (
                        <Repository
                            key={rep.id}
                            id={rep.id}
                            language={rep.language ?? "Language is not defined"}
                            name={rep.name}
                            size={rep.size}
                            active={activeRepository?.id === rep.id}
                            onClick={handleRepositoryClick}
                        />
                    );
                })}
        </Container>
    );
};

export default Repositories;

import { Action, Reducer } from "redux";
const ADD_USER_ACTION = "ADD_USER_ACTION";
const ADD_REVIEWER_ACTION = "ADD_REVIEWER_ACTION";
const ADD_REPOS_ACTION = "ADD_REPOS_ACTION";
const ADD_ERROR_ACTION = "ADD_ERROR_ACTION";
const ADD_CONTRIBUTOR_ACTION = "ADD_CONTRIBUTOR_ACTION";
const ADD_TO_BLACK_LIST_ACTION = "ADD_TO_BLACK_LIST_ACTION";
const REMOVE_FROM_BLACK_LIST_ACTION = "REMOVE_FROM_BLACK_LIST_ACTION";

export interface GithubUserType {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface ContributorType extends GithubUserType {
    contributions: number;
}

export interface UserType extends GithubUserType {
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: string | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}

export interface RepositoryType {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: GithubUserType;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}

export interface GithubInfoType {
    currentUser: UserType | null;
    repositories: Array<RepositoryType>;
    contributors: Array<ContributorType>;
    blackList: Array<number>;
    reviewer: UserType | null;
    error: string | null;
}

interface AddUserAction extends Action<typeof ADD_USER_ACTION> {
    payload: UserType;
}

interface AddReviewerAction extends Action<typeof ADD_REVIEWER_ACTION> {
    payload: UserType;
}

interface AddReposAction extends Action<typeof ADD_REPOS_ACTION> {
    payload: Array<RepositoryType>;
}

interface AddContributorsAction extends Action<typeof ADD_CONTRIBUTOR_ACTION> {
    payload: Array<ContributorType>;
}

interface AddToBlackListAction extends Action<typeof ADD_TO_BLACK_LIST_ACTION> {
    payload: number;
}

interface RemoveFromBlackListAction extends Action<typeof REMOVE_FROM_BLACK_LIST_ACTION> {
    payload: number;
}

interface AddErrorAction extends Action<typeof ADD_ERROR_ACTION> {
    payload: string;
}

export function addUser(user: UserType) {
    return {
        type: ADD_USER_ACTION,
        payload: user,
    };
}

export function addReviewer(reviewer: UserType) {
    return {
        type: ADD_REVIEWER_ACTION,
        payload: reviewer,
    };
}

export function addRepos(repos: Array<RepositoryType>) {
    return {
        type: ADD_REPOS_ACTION,
        payload: repos,
    };
}

export function addContributors(contributors: Array<ContributorType>) {
    return {
        type: ADD_CONTRIBUTOR_ACTION,
        payload: contributors,
    };
}

export function addError(error: string) {
    return {
        type: ADD_ERROR_ACTION,
        payload: error,
    };
}

export function addToBlackList(id: number) {
    return {
        type: ADD_TO_BLACK_LIST_ACTION,
        payload: id,
    };
}

export function removeFromBlackList(id: number) {
    return {
        type: REMOVE_FROM_BLACK_LIST_ACTION,
        payload: id,
    };
}

const initialState: GithubInfoType = {
    currentUser: null,
    repositories: [],
    contributors: [],
    blackList: [],
    reviewer: null,
    error: null,
};

const github: Reducer<
    GithubInfoType,
    | AddUserAction
    | AddErrorAction
    | AddReposAction
    | AddContributorsAction
    | AddToBlackListAction
    | RemoveFromBlackListAction
    | AddReviewerAction
> = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_USER_ACTION:
            return { ...state, currentUser: payload, error: null };
        case ADD_REVIEWER_ACTION:
            return { ...state, reviewer: payload, error: null };
        case ADD_REPOS_ACTION:
            return { ...state, repositories: payload, error: null };
        case ADD_CONTRIBUTOR_ACTION:
            return { ...state, contributors: payload, error: null };
        case ADD_ERROR_ACTION:
            return { ...state, error: payload, currentUser: null, repositories: [], contributors: [], reviewer: null };
        case ADD_TO_BLACK_LIST_ACTION:
            return { ...state, blackList: [...state.blackList, payload] };
        case REMOVE_FROM_BLACK_LIST_ACTION:
            return { ...state, blackList: state.blackList.filter((item) => item !== payload) };
        default:
            return state;
    }
};

export default github;

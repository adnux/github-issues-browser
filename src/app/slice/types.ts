import { Issue, Repo } from 'types/Repo';

/* --- STATE --- */
export interface GithubRepoFormState {
  username: string;
  selectedRepo?: Repo;
  state: string;
  loading: boolean;
  error?: RepoErrorType | null;
  repositories: Repo[];
  issues: Issue[];
  rowsPerPage: number;
  page: number;
}

export enum RepoErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
  GITHUB_RATE_LIMIT = 5,
  REPO_HAS_NO_ISSUES = 6,
}

export type ContainerState = GithubRepoFormState;

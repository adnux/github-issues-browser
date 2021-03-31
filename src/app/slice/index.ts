import { PayloadAction } from '@reduxjs/toolkit';
import { Issue, Repo } from 'types/Repo';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { githubRepoFormSaga } from './saga';
import { GithubRepoFormState, RepoErrorType } from './types';

export const initialState: GithubRepoFormState = {
  username: '',
  repositories: [],
  state: 'open',
  issues: [],
  loading: false,
  error: null,
  rowsPerPage: 30,
  page: 0,
};

const slice = createSlice({
  name: 'githubRepoForm',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    selectRepo(state, action: PayloadAction<Repo | undefined>) {
      state.selectedRepo = action.payload;
    },
    selectState(state, action: PayloadAction<string>) {
      state.state = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    loadIssues(state) {
      state.loading = true;
      state.error = null;
      state.issues = [];
    },
    issuesLoaded(state, action: PayloadAction<Issue[]>) {
      const issues = action.payload;
      state.issues = issues;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useGithubRepoFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: githubRepoFormSaga });
  return { actions: slice.actions };
};

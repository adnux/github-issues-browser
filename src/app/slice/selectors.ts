import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state?.githubRepoForm || initialState;

export const selectUsername = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.username,
);

export const selectLoading = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.error,
);

export const selectRepo = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.selectedRepo,
);

export const selectRepos = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.repositories,
);

export const selectState = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.state,
);

export const selectIssues = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.issues,
);

export const selectRowsPerPage = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.rowsPerPage,
);
export const selectPage = createSelector(
  [selectDomain],
  githubRepoFormState => githubRepoFormState.page,
);

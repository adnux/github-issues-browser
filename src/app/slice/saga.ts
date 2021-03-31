import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Issue, Repo } from 'types/Repo';
import { request } from 'utils/request';
import { githubRepoFormActions as actions } from '.';
import {
  selectPage,
  selectRepo,
  selectRowsPerPage,
  selectState,
  selectUsername,
} from './selectors';
import { RepoErrorType } from './types';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username: string = yield select(selectUsername);
  if (username.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos: Repo[] = yield call(request, requestURL);
    if (repos?.length > 0) {
      yield put(actions.reposLoaded(repos));
    } else {
      yield put(actions.repoError(RepoErrorType.USER_HAS_NO_REPO));
    }
  } catch (err) {
    if (err.response?.status === 404) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (err.message === 'Failed to fetch') {
      yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

export function* getIssues() {
  const username: string = yield select(selectUsername);
  const repo: Repo = yield select(selectRepo);
  const state: string = yield select(selectState);
  const page: string = yield select(selectPage);
  const rowsPerPage: string = yield select(selectRowsPerPage);
  if (!repo || repo.name.length === 0) {
    yield put(actions.repoError(RepoErrorType.USERNAME_EMPTY));
    return;
  }
  const requestURL = `https://api.github.com/repos/${username}/${repo.name}/issues?state=${state}&page=${page}&per_page=${rowsPerPage}`;
  try {
    const issues: Issue[] = yield call(request, requestURL);
    if (issues?.length > 0) {
      yield put(actions.issuesLoaded(issues));
    } else {
      yield put(actions.repoError(RepoErrorType.REPO_HAS_NO_ISSUES));
    }
  } catch (error) {
    if (error.response?.status === 404) {
      yield put(actions.repoError(RepoErrorType.USER_NOT_FOUND));
    } else if (error.message === 'Failed to fetch') {
      yield put(actions.repoError(RepoErrorType.GITHUB_RATE_LIMIT));
    } else {
      yield put(actions.repoError(RepoErrorType.RESPONSE_ERROR));
    }
  }
}

export function* setPage() {
  yield put(actions.loadIssues());
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubRepoFormSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRepos.type, getRepos);
  yield takeLatest(actions.loadIssues.type, getIssues);
  yield takeLatest(actions.setPage.type, setPage);
}

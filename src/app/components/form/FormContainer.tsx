import { Paper } from '@material-ui/core';
import { useGithubRepoFormSlice } from 'app/slice';
import * as selectors from 'app/slice/selectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from './Form';

interface Props {}

export const FormContainer = (props: Props) => {
  const dispatch = useDispatch();
  const { actions } = useGithubRepoFormSlice();

  const username = useSelector(selectors.selectUsername);
  const repo = useSelector(selectors.selectRepo);
  const repos = useSelector(selectors.selectRepos);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = ev;
    dispatch(actions.changeUsername(value));
  };

  const handleFocusEvent = (ev: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = ev;
    if (value.length > 0) {
      dispatch(actions.loadRepos());
    }
  };

  const handleClickClear = () => {
    dispatch(actions.changeUsername(''));
    dispatch(actions.selectRepo(undefined));
  };

  const handleClickSearch = () => {
    dispatch(actions.loadIssues());
  };

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    const repo = repos.find(repo => repo.name === value);
    if (repo) {
      dispatch(actions.selectRepo(repo));
      dispatch(actions.setPage(0));
    }
  };

  return (
    <Paper>
      <Form
        username={username}
        repo={repo}
        repos={repos}
        handleChange={handleChange}
        handleFocusEvent={handleFocusEvent}
        handleClickClear={handleClickClear}
        handleSelect={handleSelect}
        handleClickSearch={handleClickSearch}
      />
    </Paper>
  );
};

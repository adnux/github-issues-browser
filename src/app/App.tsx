import {
  Backdrop,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { FormContainer } from 'app/components/form/FormContainer';
import * as selectors from 'app/slice/selectors';
import { RepoErrorType } from 'app/slice/types';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { IssuesContainer } from './components/issues/IssuesContainer';

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, margin: theme.spacing(1) },
  margin: { margin: theme.spacing(1) },
  backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
}));

function App() {
  const classes = useStyles();

  const isLoading = useSelector(selectors.selectLoading);
  const error = useSelector(selectors.selectError);

  return (
    <div className={classes.root}>
      <FormContainer />
      {error && (
        <Paper>
          <Grid item xs={12}>
            <ErrorText>{repoErrorText(error)}</ErrorText>
          </Grid>
        </Paper>
      )}
      <IssuesContainer />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export const repoErrorText = (error: RepoErrorType) => {
  switch (error) {
    case RepoErrorType.USER_NOT_FOUND:
      return 'There is no such user 😞';
    case RepoErrorType.USERNAME_EMPTY:
      return 'Type any Github username';
    case RepoErrorType.USER_HAS_NO_REPO:
      return 'User has no repository 🥺';
    case RepoErrorType.GITHUB_RATE_LIMIT:
      return 'Looks like github api`s rate limit(60 request/h) has exceeded 🤔';
    case RepoErrorType.REPO_HAS_NO_ISSUES:
      return 'This repo has no issues! 🤔';
    default:
      return 'An error has occurred!';
  }
};

const ErrorText = styled.span`
  color: ${p => p.theme.text};
`;

export default App;

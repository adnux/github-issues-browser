import { Paper } from '@material-ui/core';
import { useGithubRepoFormSlice } from 'app/slice';
import * as selectors from 'app/slice/selectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Issues } from './Issues';

interface Props {}

export const IssuesContainer = (props: Props) => {
  const dispatch = useDispatch();

  //   const isLoading = useSelector(selectors.selectLoading);
  const repo = useSelector(selectors.selectRepo);
  const issues = useSelector(selectors.selectIssues);
  const rowsPerPage = useSelector(selectors.selectRowsPerPage);
  const page = useSelector(selectors.selectPage);

  const { actions } = useGithubRepoFormSlice();

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(actions.setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { value },
    } = event;
    dispatch(actions.setRowsPerPage(parseInt(value, 10)));
    dispatch(actions.setPage(0));
    dispatch(actions.loadIssues());
  };

  return (
    <Paper>
      {repo && issues && issues.length > 0 && (
        <Issues
          issues={issues}
          repo={repo}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

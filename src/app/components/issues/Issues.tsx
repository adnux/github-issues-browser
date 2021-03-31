import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { Issue, Repo } from 'types/Repo';

interface Props {
  issues: Issue[];
  repo: Repo;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, margin: theme.spacing(1) },
  margin: { margin: theme.spacing(1) },
  table: { minWidth: 650 },
  title: { flexGrow: 1 },
  backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
}));

export const Issues = (props: Props) => {
  const {
    issues,
    repo,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  const classes = useStyles();
  return (
    <>
      <TableContainer data-testid="container" component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="Github issues"
          data-testid="issues"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">Number</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues
              ? issues.map(issue => (
                  <TableRow key={issue.number}>
                    <TableCell align="right">{issue.number}</TableCell>
                    <TableCell align="left">{issue.title}</TableCell>
                    <TableCell align="right">{issue.state}</TableCell>
                    <TableCell align="right">
                      {dayjs(issue.created_at).format('YYYY/MM/DD HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 30]}
        component="div"
        count={repo.open_issues_count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

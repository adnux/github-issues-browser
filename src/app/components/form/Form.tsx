import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import clsx from 'clsx';
import { InputClear } from 'components/InputClear';
import React from 'react';
import { Repo } from 'types/Repo';

export interface Props {
  username: string;
  repo?: Repo;
  repos: Repo[];
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocusEvent: (ev: React.FocusEvent<HTMLInputElement>) => void;
  handleClickClear: () => void;
  handleSelect: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleClickSearch: () => void;
}

const useStyles = makeStyles(theme => ({
  root: { flexGrow: 1, margin: theme.spacing(1) },
  margin: { margin: theme.spacing(1) },
  table: { minWidth: 650 },
  title: { flexGrow: 1 },
  backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
}));

export const Form = (props: Props) => {
  const {
    username,
    repo,
    repos,
    handleChange,
    handleFocusEvent,
    handleClickClear,
    handleSelect,
    handleClickSearch,
  } = props;
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <FormControl className={clsx(classes.margin)}>
          <InputLabel htmlFor="username">User/Organization</InputLabel>
          <Input
            id="username"
            aria-labelledby="username"
            type="text"
            value={username}
            onChange={handleChange}
            onBlur={handleFocusEvent}
            fullWidth
            endAdornment={
              <InputClear
                handleClickClear={handleClickClear}
                value={username}
              />
            }
          />
        </FormControl>
      </Grid>
      <Grid item sm={3}>
        <FormControl className={clsx(classes.margin)}>
          <InputLabel id="repos">Repositories</InputLabel>
          <Select
            id="repos"
            data-testid="repos"
            labelId="repos"
            aria-labelledby="repos"
            value={repo}
            onChange={handleSelect}
            style={{ minWidth: '200px' }}
          >
            <MenuItem>Select a repository to show issues</MenuItem>
            {repos
              ? repos.map(repo => {
                  const { name } = repo;
                  return (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  );
                })
              : null}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={2}>
        <Button variant="contained" color="primary" onClick={handleClickSearch}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

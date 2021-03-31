import { IconButton, InputAdornment } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import React from 'react';

interface Props {
  value: string;
  handleClickClear: () => void;
}

export const InputClear = (props: Props) => {
  const { value, handleClickClear } = props;

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      {value.length > 0 && (
        <InputAdornment position="end">
          <IconButton
            aria-label="clear"
            onClick={handleClickClear}
            onMouseDown={handleMouseDownClear}
            role="clear"
          >
            <Clear />
          </IconButton>
        </InputAdornment>
      )}
    </React.Fragment>
  );
};

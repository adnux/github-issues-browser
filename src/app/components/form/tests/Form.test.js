import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { repos } from 'mocks/repos.mock';
import { Form } from '../Form';

const username = 'microsoft';
const handleChange = jest.fn();
const handleFocusEvent = jest.fn();
const handleClickClear = jest.fn();
const handleSelect = jest.fn();
const handleClickSearch = jest.fn();

const renderForm = props =>
  render(
    <Form
      username={username}
      repo={undefined}
      repos={undefined}
      handleChange={handleChange}
      handleFocusEvent={handleFocusEvent}
      handleClickClear={handleClickClear}
      handleSelect={handleSelect}
      handleClickSearch={handleClickSearch}
      {...props}
    />,
  );

describe('Form component', () => {
  test('should render Form', () => {
    const { getByLabelText } = renderForm();

    const usernameInput = getByLabelText('User/Organization');
    expect(usernameInput).not.toBeNull();
  });

  test('should handle UserEvents', () => {
    const { getByLabelText, getByRole, getByText } = renderForm();
    const usernameInput = getByLabelText('User/Organization');

    userEvent.type(usernameInput, username);
    expect(handleChange).toHaveBeenCalled();

    userEvent.tab();
    expect(handleFocusEvent).toHaveBeenCalled();

    const clearButton = getByRole('clear');
    userEvent.click(clearButton);
    expect(handleClickClear).toHaveBeenCalled();

    const searchButton = getByText('Search');
    userEvent.click(searchButton);
    expect(handleClickSearch).toHaveBeenCalled();
  });

  test('should render repos', () => {
    const [repo] = repos;
    const { getByTestId } = renderForm({ repos, repo });

    const select = getByTestId('repos');
    expect(select).not.toBeNull();
  });
});

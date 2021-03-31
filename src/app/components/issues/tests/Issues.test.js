import { render } from '@testing-library/react';
import { issues } from 'mocks/issues.mock';
import { Issues } from '../Issues';

const page = 0;
const rowsPerPage = 5;
const handleChangePage = jest.fn();
const handleChangeRowsPerPage = jest.fn();

const renderIssues = props =>
  render(
    <Issues
      issues={undefined}
      repo={{ open_issues_count: 2 }}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      {...props}
    />,
  );
describe('Issues component', () => {
  test('should render with no Issues', () => {
    const { getByTestId } = renderIssues();

    const container = getByTestId('container');
    expect(container).not.toBeNull();
  });

  test('should render with Issues', () => {
    const { getByTestId } = renderIssues({ issues });

    const container = getByTestId('container');
    expect(container).not.toBeNull();
  });
});

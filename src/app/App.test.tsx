import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import App from './App';
// import userEvent from '@testing-library/user-event';
// import { issues } from 'mocks/issues.mock';
// import { repos } from 'mocks/repos.mock';
// import nock from 'nock';
// import React from 'react';
// import { Repo } from 'types/Repo';

// const mockRepos = (username: string) =>
//   nock(`https://api.github.com`)
//     .get(uri => {
//       console.log(`uri`, uri);
//       return uri.includes('users');
//     })
//     .reply(200, repos);
// // `/users/${username}/repos?type=all&sort=updated`
// const mockIssues = (
//   username: string,
//   repo: any,
//   state: string,
//   page: number,
//   rowsPerPage: number,
// ) =>
//   nock(`https://api.github.com`)
//     .get(uri => {
//       console.log(`uri`, uri);
//       return uri.includes('repos');
//     })
//     .reply(200, issues);
// // `/repos/${username}/${repo.name}/issues?state=${state}&page=${page}&per_page=${rowsPerPage}`

const store = configureAppStore();

test('Finds microsoft vscode issues', async () => {
  // const username = 'microsoft';
  // mockRepos(username);
  // const [repo] = repos;
  // mockIssues(username, repo, 'open', 0, 30);

  const { getByLabelText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  const usernameInput = getByLabelText('User/Organization');

  expect(usernameInput).not.toBeNull();
  // userEvent.type(usernameInput, username);
  // userEvent.tab();
  // // const select = getByTestId('repos');
  // const select = await screen.findByTestId('repos');
  // userEvent.click(select);
  // logRoles(select);
  // // userEvent.click(getByLabelText('Repositories'));
  // const vscode = await screen.findByText('vscode');
  // userEvent.selectOptions(select, 'vscode');
  // userEvent.click(vscode);
});

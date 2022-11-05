import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import '@testing-library/jest-dom';

import SignUp from './index';

const queryClient = new QueryClient();

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      changeLanguage: () => new Promise(() => {})
    }
  })
}));

const server = setupServer(
  rest.post('https://books-training-rails.herokuapp.com/api/v1/users', (req, res, ctx) =>
    res(
      ctx.json({
        id: 1130,
        first_name: 'prueba',
        last_name: 'prueba',
        email: 'prueba1@test.com',
        locale: null
      }),
      ctx.status(201)
    )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SignUp view', () => {
  const history = createMemoryHistory();
  beforeEach(() => {
    history.push('/sign_up');
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <SignUp />
        </Router>
      </QueryClientProvider>
    );
  });

  test('Check that the button signUp is rendering on the screen', async () => {
    const button = screen.getByRole('button', {
      name: /FormsButton:signUp/i
    });
    expect(button).toBeInTheDocument();
  });

  test('all empty fields show error message', async () => {
    const button = screen.getByRole('button', {
      name: /FormsButton:signUp/i
    });
    await waitFor(() => userEvent.click(button));
    const msgError = screen.getAllByRole('msgError');
    expect(msgError).toHaveLength(5);
  });

  test('a wrong field shows an error message', async () => {
    userEvent.type(screen.getByLabelText('FormsLabels:firstName'), 'prueba');
    userEvent.type(screen.getByLabelText('FormsLabels:lastName'), 'prueba');
    userEvent.type(screen.getByLabelText('FormsLabels:email'), 'prueba@prueba');
    userEvent.type(screen.getByLabelText('FormsLabels:password'), '123456789A');
    userEvent.type(screen.getByLabelText('FormsLabels:passwordConfirmation'), '123456789A');
    const button = screen.getByRole('button', {
      name: /FormsButton:signUp/i
    });
    await waitFor(() => userEvent.click(button));
    expect(screen.getByRole('msgError')).toBeInTheDocument();
  });

  test('submit form, the user is created and redirects to the login', async () => {
    userEvent.type(screen.getByLabelText('FormsLabels:firstName'), 'prueba');
    userEvent.type(screen.getByLabelText('FormsLabels:lastName'), 'prueba');
    userEvent.type(screen.getByLabelText('FormsLabels:email'), 'prueba@prueba.com');
    userEvent.type(screen.getByLabelText('FormsLabels:password'), '123456789A');
    userEvent.type(screen.getByLabelText('FormsLabels:passwordConfirmation'), '123456789A');
    const button = screen.getByRole('button', {
      name: /FormsButton:signUp/i
    });
    await waitFor(() => userEvent.click(button));
    expect(history.location.pathname).toBe('/');
  });
});

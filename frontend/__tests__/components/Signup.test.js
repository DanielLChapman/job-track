import {render, screen} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';

import wait from 'waait';
import SignUp, {SIGNUP_MUTATION} from '../../components/SignUp';
import { fakeUser } from '../../library/testUtils';
import {act} from 'react-dom/test-utils';

const me = fakeUser();
const password = 'tempPassword';
const mocks = [
    {
        request: {
          query: SIGNUP_MUTATION,
          variables: {
            name: me.name,
            email: me.email,
            password,
          },
        },
        result: {
          data: {
            createUser: {
              __typename: 'User',
              id: 'abc123',
              email: me.email,
              name: me.name,
            },
          },
        },
      },
]


describe('<SignUp/>', () => {
    it('render and matches snapshot', () => {
      const { container } = render(
        <MockedProvider>
          <SignUp />
        </MockedProvider>
      );
      expect(container).toMatchSnapshot();
    });
    it('calls the mutation properly', async () => {
      const { container, debug } = render(
        <MockedProvider mocks={mocks}>
          <SignUp />
        </MockedProvider>
      );
      // Type into the boxes
      await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
      await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
      await userEvent.type(screen.getByPlaceholderText(/password/i), password);
      // Click the submit
      await userEvent.click(screen.getByText('Sign Up'));
      await act(async () => {
        await wait(0);
      })
      
      const element = await screen.getByTestId('success-signup-message');
      expect(element);
      /*await screen.findByText(
        `Signed Up With`
      );*/
    });
  });
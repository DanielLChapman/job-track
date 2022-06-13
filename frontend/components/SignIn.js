import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import useForm from '../library/useForm';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;


function SignIn(props) {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
      });
    const [signin, {data, error, loading}] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{query: CURRENT_USER_QUERY}],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signin();
        console.log(res);
        resetForm();
    }

    const errorM =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;
    
    
    return (
        <>
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                        />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        autoComplete='password'
                        value={inputs.password}
                        onChange={handleChange}
                        />
                </label>
                <button type="submit">Sign In</button>
            </fieldset>
        </form>
        </>

    );
}

export default SignIn;
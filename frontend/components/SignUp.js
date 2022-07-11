import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import useForm from "../library/useForm";
import { CURRENT_USER_QUERY } from "./User";
import { useState } from "react";

export const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $name: String!
        $email: String!
        $password: String!
    ) {
        createUser(data: { name: $name, email: $email, password: $password }) {
            id
            name
            email
        }
    }
`;

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function SignUp(props) {
    let [submitError, setError] = useState("");

    const { inputs, handleChange, resetForm } = useForm({
        email: "",
        password: "",
        name: "",
    });
    const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // send email and password to graphql api
        let variables = {
            email: inputs.email,
            password: inputs.password,
            name: inputs.name,
        };

        if (inputs.password.length < 8) {
            setError("Password required to be a minimum of 8 characters");
            return;
        }

        let errorMessage;
        const res = await signup({
            variables: {
                email: inputs.email,
                password: inputs.password,
                name: inputs.name,
            },
        }).catch((error) => {
            //let a = error.graphQLErrors[0].message.splice(0,6);

            errorMessage = error.graphQLErrors[0];
            let a;
            let b;
            try {
                a = error.graphQLErrors[0].message.substring(0, 6);
                b = Object.keys(errorMessage.extensions.exception.keyValue)[0];
            } catch (e) {
                console.log(error.graphQLErrors[0]);
                if (error.graphQLErrors[0].extensions.prisma.code === "P2002") {
                    return setError(
                        "Email already used. Please login or try a different email"
                    );
                }
            }
            if (a === "E11000") {
                return setError(
                    `${capitalize(b)} is already taken, please choose a new one`
                );
            }
        });
        if (errorMessage) {
            console.log(errorMessage);
            return;
        }
        if (props.closeFunc) {
          props.closeFunc(props.closeValue);
        }
        resetForm();
    };

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up For An Account</h2>
            {submitError ? <div>{submitError}</div> : <></>}
            <fieldset>
                {data?.createUser && (
                    <p data-testid="success-signup-message">
                        Signed Up With {data.createUser.email} - Please Go Ahead
                        And Sign In
                    </p>
                )}
                
                <div className="input">
                        <input
                            type="name"
                            name="name"
                            placeholder="Name"
                            autoComplete="name"
                            value={inputs.name}
                            onChange={handleChange}
                            className="input_field"
                            required
                        />
                        <label className="input_label" htmlFor="name">Name</label>
                    </div>
                <div className="input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email Address"
                            autoComplete="email"
                            value={inputs.email}
                            onChange={handleChange}
                            className="input_field"
                            required
                        />
                        <label className="input_label" htmlFor="email">Email</label>
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="password"
                            value={inputs.password}
                            onChange={handleChange}
                            className="input_field"
                            required
                        />
                        <label className="input_label" htmlFor="password">Password</label>
                    </div>
                <button type="submit">Sign Up</button>
            </fieldset>
        </form>
    );
}

export default SignUp;

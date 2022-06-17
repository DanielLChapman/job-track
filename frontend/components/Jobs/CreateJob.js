import React from "react";
import PropTypes from "prop-types";
import useForm from "../../library/useForm";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User";
import { useMutation } from "@apollo/client";

const CREATE_JOB_MUTATION = gql`
    mutation CREATE_JOB_MUTATION($name: String!, $status: String, $author: ID!, $salaryExpectation: Int, $notes: String) {
        createJob(data: {
            name: $name,
            status: $status, 
            author: 
                {connect: 
                    {id: $author}
                }, 
            salaryExpectation: $salaryExpectation, 
            notes: $notes }) {
            id
            name
        }
    }
`;

CreateJob.propTypes = {};

function CreateJob(props) {
    if (!props.user) {
        return <span>Please Log In</span>;
    }

    const { inputs, handleChange, clearForm, resetForm } = useForm({
        name: "",
        status: "waiting",
        author: props.user.id || "",
        salaryExpectation: 0,
        notes: "",
    });

    const [createJob, { data, error, loading }] = useMutation(
        CREATE_JOB_MUTATION,
        {
            variables: {
                ...inputs,
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createJob();
        clearForm();
    };

    return (
        <>
            {error && <span>Error, Please Try Again</span>}
            {data && (
                <span>
                    Success! You Can Close This Window or Return To The Homepage{" "}
                    <a href="/">Here</a>
                </span>
            )}
            <form method="POST" onSubmit={handleSubmit}>
                <h2>Create a new Job</h2>
                <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                        Name
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="status">
                        Status
                        <select
                            name="status"
                            value={inputs.status}
                            onChange={handleChange}
                        >
                            <option value="waiting">Waiting</option>
                            <option value="rejected">Rejected</option>
                            <option value="accepted">Accepted</option>
                        </select>
                    </label>
                    <label htmlFor="salaryExpectation">
                        Salary Expectation
                        <input
                            type="number"
                            name="salaryExpectation"
                            placeholder="0"
                            value={inputs.salaryExpectation}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="notes">
                        Notes
                        <textarea
                            value={inputs.notes}
                            onChange={handleChange}
                            name="notes"
                        />
                    </label>

                    <button type="submit">Add Job</button>
                </fieldset>
            </form>
        </>
    );
}

export default CreateJob;

import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import useForm from "../../library/useForm";
import { CURRENT_USER_QUERY } from "../User";

EditJob.propTypes = {
    job: PropTypes.object.isRequired,
    closeForm: PropTypes.func
};

export const EDIT_JOB_MUTATION = gql`
    mutation EDIT_JOB_MUTATION(
        $name: String!
        $status: String
        $id: ID!
        $salaryExpectation: Int
        $notes: String
    ) {
        updateJob(
            where: { id: $id }
            data: {
                name: $name
                status: $status
                salaryExpectation: $salaryExpectation
                notes: $notes
            }
        ) {
            id
        }
    }
`;

function EditJob(props) {

    let job = props.job;

    const { inputs, handleChange } = useForm({
        name: job.name,
        status: job.status || "waiting",
        id: job.id,
        salaryExpectation: job.salaryExpectation,
        notes: job.notes,
    });

    const [updateJob, { data, error, loading }] = useMutation(
        EDIT_JOB_MUTATION,
        {
            variables: {
                ...inputs,
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateJob();
        if (res.data.updateJob.id) {
            props.closeForm(false);
        }
    };

    return (
        <>
            {error && <span>Error, Please Try Again</span>}
            <form method="POST" onSubmit={handleSubmit}>
                <h2>Edit {props.job.name}</h2>
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

                    <button type="submit">Edit Job</button>
                </fieldset>
            </form>
        </>
    );
}

export default EditJob;

import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

EditJob.propTypes = {
    job: PropTypes.object,
    user: PropTypes.user,
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
    if (!props.job && !props.user)
        return <div>Hey, uhm, not supposed to be here.</div>;
    if (props.job.author.id !== props.user.id)
        return <div>Hey, uhm, not supposed to be here.</div>;

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

export default EditJob;

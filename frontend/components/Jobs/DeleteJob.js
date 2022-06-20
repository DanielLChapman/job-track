import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

DeleteJob.propTypes = {
    job: PropTypes.object,
};

export const DELETE_JOB_MUTATION = gql`
    mutation DELETE_JOB_MUTATION($id: ID!) {
        deleteJob(where: {id: $id}) {
            id
            name
        }
    }
`;

function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteJob));
}

function DeleteJob(props) {
    const [deleteJob, { loading, error }] = useMutation(DELETE_JOB_MUTATION, {
        variables: { id: props.job.id },
        update,
    });

    return (
        <button
            type="button"
            className="job-block-title-delete"
            disabled={loading}
            onClick={() => {
                if (confirm("Are you sure you want to delete this job?")) {
                    console.log("Deleting");
                    deleteJob().catch((err) => alert(err.message));
                }
            }}
        >
            Delete
        </button>
    );
}

export default DeleteJob;

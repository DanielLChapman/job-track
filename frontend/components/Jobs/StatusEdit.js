import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { EDIT_JOB_MUTATION } from './EditJob';
import { CURRENT_USER_QUERY } from '../User';

StatusEdit.propTypes = {
    job: PropTypes.object.isRequired,
    closeForm: PropTypes.func
};

function StatusEdit({job, closeForm}) {
    const [status, setStatus]= useState(job.status);

    const [updateStatus, {error, loading}] = useMutation(
        EDIT_JOB_MUTATION,
        {
            variables: {
                ...job,
                status
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateStatus();
        if (res.data.updateJob.id && closeForm) {
            closeForm(false);
        }
    }

    if (error) {
        alert('Sorry, error in updating status, please check logs and try again');
        console.log(error);
    }

    return (
        <>
        <form method="POST" onSubmit={handleSubmit}>
            <fieldset disabled={loading}>
                    <label htmlFor="status">
                        Status
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                        >
                            <option value="waiting">Waiting</option>
                            <option value="rejected">Rejected</option>
                            <option value="accepted">Accepted</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                    </fieldset>
            </form>
        </>
    );
}

export default StatusEdit;
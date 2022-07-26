import React from 'react';
import PropTypes from 'prop-types';
import { convertNum } from '../../library/tools';

JobInfo.propTypes = {
    job: PropTypes.object.isRequired,
};

function JobInfo({job}) {
    return (
        <ul>
            <li><h2>{job.name}</h2></li>
            <li><h5>{job.status}</h5></li>
            <li><h5>{convertNum(job.salaryExpectation)}</h5></li>
            <li><h5>{job.notes}</h5></li>
        </ul>
    );
}

export default JobInfo;
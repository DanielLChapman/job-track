import React from 'react';
import PropTypes from 'prop-types';
import JobView from './JobView';

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.object),
};

function JobList(props) {
    return (
        <ul className="job-view-container">   
            {
                props.jobs && props.jobs.map((x) => (
                    <li key={x.id}>
                        <JobView job={x} modalFill={props.modalFill} />
                    </li>
                ))
            }
        </ul>
    );
}

export default JobList;
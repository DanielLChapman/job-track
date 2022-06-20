import React from 'react';
import PropTypes from 'prop-types';
import JobView from './JobView';

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.object),
};

function JobList(props) {
    return (
        <ul>   
            {
                props.jobs && props.jobs.map((x) => (
                    <li key={x.id}>
                        <JobView job={x}  />
                    </li>
                ))
            }
        </ul>
    );
}

export default JobList;
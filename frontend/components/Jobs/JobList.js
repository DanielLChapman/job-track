import React from 'react';
import PropTypes from 'prop-types';

JobList.propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.object)
};

function JobList(props) {
    return (
        <ul>   
            {
                props.jobs && props.jobs.map((x) => (
                    <li key={x.id}>{x.name}</li>
                ))
            }
        </ul>
    );
}

export default JobList;
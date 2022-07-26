import React, { useState } from 'react';
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
                        <JobView job={x} modalFill={props.modalFill} key={x.id}/>
                ))
            }
        </ul>
    );
}

export default JobList;
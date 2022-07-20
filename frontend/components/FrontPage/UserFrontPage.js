import React from 'react';
import CreateJob from '../Jobs/CreateJob';
import JobList from '../Jobs/JobList';
import SignOut from '../Signout';

function UserFrontPage({user, modalFill}) {
    return (
        <>
        
                    <section className="jobs-list">
                        <JobList jobs={user.jobs} user={user} modalFill={modalFill} />
                    </section></>
    );
}

export default UserFrontPage;
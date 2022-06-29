import React from 'react';
import CreateJob from '../Jobs/CreateJob';
import JobList from '../Jobs/JobList';
import SignOut from '../Signout';

function UserFrontPage({user}) {
    return (
        <>
        
                    <section className="jobs-list">
                        <JobList jobs={user.jobs} user={user} />
                    </section></>
    );
}

export default UserFrontPage;
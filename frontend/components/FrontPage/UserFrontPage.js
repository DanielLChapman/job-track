import React from 'react';

function UserFrontPage({user}) {
    return (
        <>
        <CreateJob user={user} />
                    <section className="jobs-list">
                        <JobList jobs={user.jobs} user={user} />
                    </section></>
    );
}

export default UserFrontPage;
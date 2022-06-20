import React from 'react';
import CreateJob from './Jobs/CreateJob';
import JobList from './Jobs/JobList';
import { useUser } from './User';

function FrontPage(props) {
    let user = useUser();


    return (
        <div>
            {user && (
                <>
                    <CreateJob user={user} />
                    <section className="jobs-list">
                        <JobList jobs={user.jobs} user={user} />
                    </section>
                </>
                

            )}
        </div>
    );
}

export default FrontPage;
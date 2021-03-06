import React, { useState } from 'react';
import UserFrontPage from './FrontPage/UserFrontPage';
import Header from './Header';
import CreateJob from './Jobs/CreateJob';
import JobList from './Jobs/JobList';
import Modal from './Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useUser } from './User';

function FrontPage(props) {
    let user = props.user;


    return (
        <section className='container'>
            <section className='header'>
                <Header user={user} modalFill={props.modalFill} />
            </section>
            {user && (
                <UserFrontPage user={user} modalFill={props.modalFill} />
            )}
            {!user && (
                <>
                    <section className="info-section">
                        <section className="intro">
                            A website to keep track of your job applications!
                        </section>
                    </section>
                </>
            )}

        </section>
    );
}

export default FrontPage;
import React, { useState } from 'react';
import UserFrontPage from './FrontPage/UserFrontPage';
import CreateJob from './Jobs/CreateJob';
import JobList from './Jobs/JobList';
import Modal from './Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useUser } from './User';

function FrontPage(props) {
    let user = useUser();

    const [modal, setModal] = useState(false)


    return (
        <div>
            {user && (
                <UserFrontPage user={user} />
                

            )}
            {!user && (
                <>
                <button
                    type="button"
                    className="sign-in-button"
                    onClick={
                        () => {
                            setModal(true)
                        }
                    }>
                        Sign In/Up

                </button>


                    {
                        modal && (
                            <Modal closeFunc={setModal}>
                                <SignIn />
                                <SignUp />
                            </Modal>
                        )
                    }
                
                </>
            )}

        </div>
    );
}

export default FrontPage;
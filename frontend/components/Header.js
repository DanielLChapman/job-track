import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateJob from "./Jobs/CreateJob";
import SignOut from "./Signout";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Modal from "./Modal";

Header.propTypes = {
    user: PropTypes.object,
};

function Header({ user }) {
    const [modal, setModal] = useState(false);
    const [modalCreateJob, setModalCreateJob] = useState(false);

    return (
        <>
            <h1>Job Track</h1>
            {user && (
                <div className="header-button-class">

                    <button
                        type="button"
                        className="sign-in-button"
                        onClick={() => {
                            setModalCreateJob(!modalCreateJob);
                        }}
                    >
                        Create Job
                    </button>

                    <SignOut />
                    {modalCreateJob && (
                        <Modal closeFunc={setModalCreateJob}>
                            <CreateJob user={user} />
                        </Modal>
                    )}
                </div>
            )}
            {!user && (
                <div className="header-button-class">
                <button
                    type="button"
                    className="sign-in-button"
                    onClick={() => {
                        setModal(!modal);
                    }}
                >
                    Sign In / Up
                </button>
                </div>
            )}

            {modal && !user && (
                <Modal closeFunc={setModal}>
                    <SignIn closeFunc={setModal} closeValue={!modal} />
                    <SignUp />
                </Modal>
            )}
        </>
    );
}

export default Header;

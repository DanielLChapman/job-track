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
        <div>
            {user && (
                <>
                    <button
                        type="button"
                        className="sign-in-button"
                        onClick={() => {
                            setModalCreateJob(true);
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
                </>
            )}
            {!user && (
                <button
                    type="button"
                    className="sign-in-button"
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Sign In/Up
                </button>
            )}

            {modal && (
                <Modal closeFunc={setModal}>
                    <SignIn />
                    <SignUp />
                </Modal>
            )}
        </div>
    );
}

export default Header;

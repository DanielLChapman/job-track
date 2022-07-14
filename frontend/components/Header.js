import React, { useState } from "react";
import PropTypes from "prop-types";
import CreateJob from "./Jobs/CreateJob";
import SignOut from "./Signout";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Modal from "./Modal";
import { CSSTransition } from "react-transition-group";

Header.propTypes = {
    user: PropTypes.object,
};

function Header({ user }) {
    const [modal, setModal] = useState(false);
    const [modalCreateJob, setModalCreateJob] = useState(false);
    const [inUp, setInUp] = useState("In");

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
                        <CSSTransition
                            in={modalCreateJob}
                            timeout={200}
                            classNames="modal-transition"
                            unmountOnExit
                            onExited={() => setModalCreateJob(false)}
                        >
                            <Modal closeFunc={setModalCreateJob}>
                      
                                <CreateJob user={user} />
                            </Modal>
                        </CSSTransition>
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
            {!user && (
                <CSSTransition
                    in={modal}
                    timeout={200}
                    classNames="modal-transition"
                    unmountOnExit
                    onExited={() => setModal(false)}
                >
                    <Modal closeFunc={setModal} classes={"sign-in-up"}>
                        <div className="header">
                            {inUp === "In" && (
                                <>
                                    <h1 className="modal-title">Sign In</h1>
                                    <button
                                        type="button"
                                        className="sign-in-up-selector-button"
                                        onClick={() => {
                                            setInUp("Up");
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                            {inUp === "Up" && (
                                <>
                                    <h1 className="modal-title">Sign Up</h1>
                                    <button
                                        type="button"
                                        className="sign-in-up-selector-button"
                                        onClick={() => {
                                            setInUp("In");
                                        }}
                                    >
                                        Sign In
                                    </button>
                                </>
                            )}
                        </div>
                        <section className="modal-content hide-form-title">
                            {inUp === "In" && (
                                <SignIn
                                    closeFunc={setModal}
                                    closeValue={!modal}
                                />
                            )}
                            {inUp === "Up" && <SignUp />}
                        </section>
                    </Modal>
                </CSSTransition>
            )}
        </>
    );
}

export default Header;

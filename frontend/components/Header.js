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
    modalFill: PropTypes.func
};

function Header({ user, modalFill }) {


    return (
        <>
            <h1>Job Track</h1>
            {user && (
                <div className="header-button-class">
                    <button
                        type="button"
                        className="sign-in-button"
                        onClick={() => {
                            modalFill(
                                'createJob'
                            )
                        }}
                    >
                        Create Job
                    </button>

                    <SignOut />
    
                </div>
            )}
            {!user && (
                <div className="header-button-class">
                    <button
                        type="button"
                        className="sign-in-button"
                        onClick={() => {
                            modalFill(
                                'signInUp',
                                'sign-in-up'
                            )
                        }}
                    >
                        Sign In / Up
                    </button>
                </div>
            )}
        </>
    );
}

export default Header;

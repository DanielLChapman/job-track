import React, { useState } from "react";
import SignIn from "../SignIn";
import SignUp from "../SignUp";

function SignInUpModal({ user, closeFunc }) {

    const [inUp, setInUp] = useState("In");
    return (
        <>
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
                    <SignIn closeFunc={closeFunc} closeValue={false} />
                )}
                {inUp === "Up" && <SignUp />}
            </section>
        </>
    );
}

export default SignInUpModal;

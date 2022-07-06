import React from "react";
import { CSSTransition } from "react-transition-group";

function Modal(props) {
    return (
        <>
            <div
                className="blur-layer"
                onClick={() => {
                    props.closeFunc(false);
                }}
            ></div>
            <div className="modal-window">
                <button
                    type="button"
                    className="close-modal"
                    onClick={() => {props.closeFunc(false);}}
                >
                    X
                </button>
                {props.children}
            </div>
        </>
    );
}

export default Modal;

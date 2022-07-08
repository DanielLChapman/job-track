import React from "react";
import { CSSTransition } from "react-transition-group";

function Modal(props) {
    let t = props.classes;
    return (
        <>
            <div
                className="blur-layer"
                onClick={() => {
                    props.closeFunc(false);
                }}
            ></div>
            <div className={` modal-window ${t} `}>
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

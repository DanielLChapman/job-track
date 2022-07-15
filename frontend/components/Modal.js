import React from "react";
import { CSSTransition } from "react-transition-group";
import CreateJob from "./Jobs/CreateJob";
import SignInUpModal from "./Modal/SignInUpModal";

function Modal({user, closeFunc, modalContent, classes, children}) {
    let t = classes || '';
    let content = '';

    switch (modalContent) {
        case 'createJob':
            content = <CreateJob user={user} closeFunc={closeFunc} />
            break;
        case 'innertext':
            content = children;
            break;
        case 'signInUp':
            content = <SignInUpModal user={user} closeFunc={closeFunc} />
            break;
        default:
            content = children;
    }
    
    return (
        <>
            <div
                className="blur-layer"
                onClick={() => {
                    closeFunc(false);
                }}
            ></div>
            <div className={` modal-window ${t} `}>
                <button
                    type="button"
                    className="close-modal"
                    onClick={() => {closeFunc(false);}}
                >
                    X
                </button>
            
                {content}
            </div>
        </>
    );
}

export default Modal;

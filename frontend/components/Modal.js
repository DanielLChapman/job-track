import React from 'react';

function Modal(props) {
    return (
        <div className='modal-window'>
            <button type='button' className='close-modal' onClick={() => {
                props.closeFunc(false);
            }}>X</button>
            {props.children}
        </div>
    );
}

export default Modal;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteJob from './DeleteJob';
import EditJob from './EditJob';
import StatusEdit from './StatusEdit';
import Modal from "../Modal";
import { CSSTransition } from "react-transition-group";

JobView.propTypes = {
    job: PropTypes.object,
};

function JobView({job}) {
    const [open, setOpen] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false);
    const [editBlock, setEditBlock] = useState(false);
    return (
        <section className="job-block">
            <section className="job-block-title">
                <h5 className="job-block-title-text">{job.name}</h5>
                {
                    quickEdit ? <StatusEdit job={job} closeForm={setQuickEdit} /> : <span className="job-block-status" onClick={() => {
                        setQuickEdit(true);
                    }}>{job.status}</span>
                }
                
                <br />
                <DeleteJob job={job} />
                <button type="button" onClick={() => {
                    setOpen(!open);
                }}>
                    {open ? 'Close' : 'Expand'}
                </button>
            </section>
            {
                open && (
                    <div>
                    {

                        editBlock ? 
                        <CSSTransition
                            in={editBlock}
                            timeout={200}
                            classNames="modal-transition"
                            unmountOnExit
                            onExited={() => setEditBlock(false)}
                        >
                            <Modal closeFunc={setEditBlock}>
                      
                                <EditJob job={job} closeForm={setEditBlock}/>
                            </Modal>
                        </CSSTransition>
                        : 
                        <div>
                            <button type="button" onClick={() => {
                                setEditBlock(!editBlock);
                            }}>
                                {editBlock ? 'Close' : 'Edit'}
                            </button>
                        </div>
                        
                        
                    }
                     </div>
                )
            }

        </section>
    );
}

export default JobView;
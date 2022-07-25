import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import StatusEdit from "./StatusEdit";
import Modal from "../Modal";
import { CSSTransition } from "react-transition-group";

JobView.propTypes = {
    job: PropTypes.object,
};

function JobView({ user, job }) {
    const [open, setOpen] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false);
    const [editBlock, setEditBlock] = useState(false);

    return (
        <li
            key={job.id}
            onClick={() => {
                if (!quickEdit) {
                    setOpen(!open);
                }
               
            }}
        >
            <section className="job-block">
                <section className="job-block-title">
                    <h5 className="job-block-title-text">{job.name}</h5>
                    {quickEdit ? (
                        <StatusEdit job={job} closeForm={setQuickEdit} />
                    ) : (
                        <span
                            className="job-block-status"
                            onClick={() => {
                                setQuickEdit(true);
                            }}
                        >
                            {job.status}
                        </span>
                    )}
                    <section className="button-group">
                        <DeleteJob job={job} />
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            {open ? "⇧" : "⇩"}
                        </button>
                    </section>
                </section>
                {open && (
                    <section className="job-block-view">
                        {editBlock ? (
                            <CSSTransition
                                //would need to pass job back to the top which may be inefficient?
                                in={editBlock}
                                timeout={{
                                    appear: 400,
                                    enter: 200,
                                    exit: 0,
                                }}
                                classNames="modal-transition"
                                unmountOnExit
                                onExited={() => setEditBlock(false)}
                            >
                                <Modal closeFunc={setEditBlock}>
                                    <EditJob user={user} job={job} />
                                </Modal>
                            </CSSTransition>
                        ) : (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditBlock(!editBlock);
                                    }}
                                >
                                    {editBlock ? "Close" : "Edit"}
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </section>
        </li>
    );
}

export default JobView;

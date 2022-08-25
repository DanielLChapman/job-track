import React, { useState } from "react";
import PropTypes from "prop-types";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import StatusEdit from "./StatusEdit";
import Modal from "../Modal";
import { CSSTransition } from "react-transition-group";
import JobInfo from "./JobInfo";

JobView.propTypes = {
    job: PropTypes.object,
};

function JobView({ user, job }) {
    const [open, setOpen] = useState(false);
    const [quickEdit, setQuickEdit] = useState(false);
    const [editBlock, setEditBlock] = useState(false);

    return (
        <li key={job.id}>
            <section className="job-block" data-testid="job-block">
                <section
                    className="job-block-title"
                    onClick={() => {
                        if (!quickEdit && !editBlock) {
                            setOpen(!open);
                        }
                    }}
                >
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
                            <section className="job-block-edit-form">
                                
                                <EditJob
                                    user={user}
                                    job={job}
                                    closeForm={() => {
                                        setEditBlock(!editBlock);
                                    }}
                                />
                            </section>
                        ) : (
                            <section data-testid="job-info-appear" className="job-block-view-area">
                                <JobInfo job={job} />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditBlock(!editBlock);
                                    }}
                                >
                                    {editBlock ? "Close" : "Edit"}
                                </button>
                            </section>
                        )}
                    </section>
                )}
            </section>
        </li>
    );
}

export default JobView;

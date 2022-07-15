import React from "react";
import Head from "next/head";
import FrontPage from "../components/FrontPage";
import { useUser } from "../components/User";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import Modal from "../components/Modal";

function index(props) {
    const user = useUser();
    const [openModal, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalClasses, setModalClasses] = useState('');

    const modalFill = (content, classes = '') => {
      setModalContent(content);
      setModalState(true);
      setModalClasses(classes);
    }

    return (
        <>
            <Head>
                <title>Reddit:Clone</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />

            </Head>

            <FrontPage modalFill={modalFill} user={user} />
            <CSSTransition
                in={openModal}
                timeout={{
                    appear: 400,
                    enter: 200,
                    exit: 0,
                   }}
                
                classNames="modal-transition"
                unmountOnExit
                onExited={() => setModalState(false)}
            >
                <Modal user={user} closeFunc={setModalState} modalContent={modalContent} classes={modalClasses}>
                </Modal>
            </CSSTransition>
        </>
    );
}

export default index;

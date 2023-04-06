import React, {useState} from 'react';
import classes from '../styles/ErrorModal.css'
import {Button, Modal} from "react-bootstrap";

const ErrorModal = ({children, visibleError, setVisible}) => {
    return (
        <>
            <Modal show={visibleError.visible} onHide={() => setVisible({visible: false, visibleError: <></>})}>
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{visibleError.htmlE}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setVisible(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ErrorModal;
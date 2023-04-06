import React, {useState} from 'react';
import classes from '../styles/ErrorModal.css'
import {Button, Modal} from "react-bootstrap";

const ErrorModal = ({children, visible, setVisible}) => {
    return (
        <>
            <Modal show={visible} onHide={() => setVisible(false)}>
                <Modal.Header>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
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
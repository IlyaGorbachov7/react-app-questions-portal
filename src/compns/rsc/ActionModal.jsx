import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ActionModal = ({children, visibleAction, setVisibleAction}) => {
    return (
        <>
            <Modal
                show={visibleAction.visible} onHide={() => setVisibleAction({...visibleAction, visible: false})}
                backdrop="static" keyboard={false} >
                <Modal.Header>
                    <Modal.Title>Successfully!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                    {visibleAction.msgAction}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"
                            onClick={(e) => visibleAction.callbackAction(e)}>{visibleAction.btnName}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ActionModal;
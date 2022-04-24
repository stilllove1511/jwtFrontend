
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


function ModalDelete(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, are you sure to deletemthis user:{props.dataModal.email}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={props.confirmDeleteUser}>
                        Confron
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;
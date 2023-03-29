import {Modal, Button} from 'react-bootstrap';

export default function MyModal(props) {
   
        return (
            <Modal show={props.show} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <p>{props.message}</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                    <Button variant="danger" onClick={props.delete}>Confirm</Button>
                    </Modal.Footer>
            </Modal>
        );
}

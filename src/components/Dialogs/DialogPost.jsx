import { Button, Form, Modal } from 'react-bootstrap'; // Importa los componentes de React Bootstrap

export default function DialogPost({
    currentPost: { title, body }, // Destructuring de currentPost
    dialogTitle, // dialogTitle es un string --> 'Create Post' o 'Update Post' título del diálogo
    handleButtonClick, // función que se ejecuta al hacer click en el botón del diálogo
    setCurrentPost, // función que actualiza el estado de currentPost
    setShow, // función que actualiza el estado de show
    show, // booleano que controla la apertura y cierre del diálogo
}) {

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{dialogTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="post title"
                                value={title}
                                autoFocus
                                onChange={(e) => setCurrentPost(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content or comments</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={body}
                                rows={3}
                                onChange={(e) => setCurrentPost(prev => ({ ...prev, body: e.target.value }))}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleButtonClick}>
                        {dialogTitle.split(' ')[0]}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

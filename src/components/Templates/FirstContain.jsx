import { useEffect, useState } from 'react'; // Importa el hook useState

import axios from 'axios'; // Importa axios para hacer peticiones HTTP
import DialogPost from '../Dialogs/DialogPost'; // Importa el diálogo para crear y actualizar posts
import Swal from 'sweetalert2'; // Importa la librería de alertas
import TablePosts from '../Table/TablePosts'; // Importa la tabla de posts
import useAlerts from '../Hooks/useAlerts'; // Importa el custom hook para mostrar alertas

const POSTS_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'; // Endpoint de la API de posts de prueba de JSONPlaceholder

const initialPost = {
    id: '',
    title: '',
    body: '',
    userId: 1
}; // Objeto inicial para el post actual

export default function FirstContain() {

    const [posts, setPosts] = useState([]); // Estado para los posts
    const [show, setShow] = useState(false); // Estado para mostrar el diálogo
    const [dialogTitle, setDialogTitle] = useState('Create Post'); // Estado para el título del diálogo
    const [currentPost, setCurrentPost] = useState(initialPost);
    const { title, body, userId, id: idCurrent } = currentPost; // Desestructuración del post actual
    const { showAlert } = useAlerts(); // Custom hook para mostrar alertas

    // Lógica para obtener los posts de la API y actualizar el estado
    const fetchPosts = async () => {
        try {
            const { data } = await axios.get(POSTS_ENDPOINT);
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    // Actualiza el estado con los posts de la API
    useEffect(() => {
        fetchPosts();
    }, []);

    // Devuelve al estado inicial el post actual cuando se cierra el diálogo
    useEffect(() => {
        if (show === false) setCurrentPost(initialPost);
    }, [show]);


    // Crea un nuevo post
    const createPost = async () => {
        // Validar que los campos no estén vacíos
        if (title.trim() === '' || body.trim() === '') {
            showAlert('Eyy!', 'All fields are required!', 'warning');
            return;
        }
        try {
            const response = await axios.post(POSTS_ENDPOINT, {
                title,
                body,
                userId
            });
            setPosts(prev => [...prev, response.data]); // Agregar el nuevo post al arreglo de posts
            setShow(false); // Ocultar el diálogo
            showAlert('Ok!', 'post created successfully!', 'success');
        } catch (error) {
            showAlert('Cancelled', `Error sending post: ${error.message}`, 'error');

        }
    };

    // Actualiza el post actual
    const updatePost = async () => {
        // Validar que los campos no estén vacíos
        if (title.trim() === '' || body.trim() === '') {
            showAlert('Eyy!', 'All fields are required!', 'warning');
            return;
        }
        try {
            const response = await axios.put(`${POSTS_ENDPOINT}/${idCurrent}`, {
                id: idCurrent,
                title,
                body,
                userId
            });
            setPosts(prev => ( // Actualizar el post actual en el arreglo de posts
                prev.map(post => {
                    if (post.id === idCurrent) {
                        post.title = title;
                        post.body = body;
                    }
                    return post;
                })
            ));
            setShow(false); // Ocultar el diálogo
            showAlert('Ok!', 'post updated successfully', 'success');
        } catch (error) {
            showAlert('Cancelled', `Error updated message: ${error}`, 'error');
        }
    };


    const confirmDeleteAction = (selectToDelete) => {
        showAlert( // Mostrar alerta de confirmación
            'Are you sure?',
            "You won't be able to revert this!",
            'warning',
            true,
            'Yes, delete it!',
            'No, cancel!',
            true
        ).then((result) => {
            if (result.isConfirmed) {
                deletePost(selectToDelete);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                showAlert('Cancelled', 'Your post file is safe :)', 'error');
            }
        });
    }
    // Elimina el post seleccionado
    const deletePost = async (selectToDelete) => {
        try {
            const response = await axios.delete(`${POSTS_ENDPOINT}/${selectToDelete}`);
            showAlert('Ok!', 'post deleted successfully', 'success');
            setPosts(prev => ( // Eliminar el post seleccionado del arreglo de posts
                prev.filter(post => post.id !== selectToDelete)
            ));
        } catch (error) {
            showAlert('Cancelled', `Error sending message: ${error}`, 'error');
        }
    };

    return (
        <>
            <TablePosts
                confirmDeleteAction={confirmDeleteAction}
                posts={posts}
                setCurrentPost={setCurrentPost}
                setDialogTitle={setDialogTitle}
                setPosts={setPosts}
                setShow={setShow}
            />
            <DialogPost
                currentPost={currentPost}
                dialogTitle={dialogTitle}
                handleButtonClick={dialogTitle === 'Create Post' ? createPost : updatePost}
                setCurrentPost={setCurrentPost}
                setShow={setShow}
                show={show}
            />
        </>
    )
}

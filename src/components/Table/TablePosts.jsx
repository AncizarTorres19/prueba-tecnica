import { useEffect, useState } from 'react'; // Importa los hooks de React

import { Button, Form, FormControl, OverlayTrigger, Tooltip, Table, InputGroup } from 'react-bootstrap'; // Importa los componentes de React Bootstrap

import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono deseado
import { faPlus } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono deseado
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa el componente FontAwesomeIcon

import ReactPaginate from 'react-paginate'; // Importa el componente ReactPaginate


// Función para escapar los caracteres especiales de una expresión regular
const escapeRegExp = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export default function TablePosts(props) {
    const {
        confirmDeleteAction, // Función para eliminar un post
        posts, // Arreglo de posts
        setCurrentPost, // Función para setear el post actual
        setDialogTitle, // Función para setear el título del diálogo
        setShow, // Función para mostrar el diálogo
    } = props;
    const [currentPage, setCurrentPage] = useState(0);// Estado para la página actual
    const [postsPerPage] = useState(5); // Número de posts por página
    const [searchText, setSearchText] = useState('');// Estado para el texto de búsqueda
    const [rows, setRows] = useState([]);// Estado para los posts filtrados

    // Maneja el cambio de página
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Maneja la búsqueda de posts
    const requestSearch = (searchValue) => {
        try {
            // Filtrar el arreglo de objetos
            const filteredRows = posts.filter((row) => {
                return Object.values(row).some((field) => {
                    // Utilizar String para convertir a cadena de texto
                    return new RegExp(escapeRegExp(searchValue), 'i').test(String(field));
                });
            });
            // Actualizar el estado con los resultados filtrados
            setRows(filteredRows);
            setSearchText(searchValue);
        } catch (error) {
            // Manejar errores de manera adecuada
            console.error(error);
        }
    };

    // Actualiza el estado con los posts de la API
    useEffect(() => {
        setRows(posts)
    }, [posts])


    // Calcula el índice del último post y crea un array de posts para la página actual
    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = rows?.slice(indexOfFirstPost, indexOfLastPost);

    // Componente para mostrar los boton de editar
    const EditButtonWithTooltip = ({ post: { title, body, userId, id } }) => {
        return (
            <OverlayTrigger overlay={<Tooltip id="tooltip">Edit</Tooltip>}>
                <span className="d-inline-block">
                    <Button
                        variant="success"
                        className="text-light rounded mx-1 p-1"
                        onClick={() => {
                            setCurrentPost({ title, body, userId, id })  // Setea el post actual
                            setShow(true)
                            setDialogTitle('Edit Post')
                        }}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </span>
            </OverlayTrigger>
        );
    };
    // Componente para mostrar los boton de eliminar
    const DeleteButtonWithTooltip = ({ id }) => {
        return (
            <OverlayTrigger overlay={<Tooltip id="tooltip">Delete</Tooltip>}>
                <span className="d-inline-block">
                    <Button
                        variant="danger"
                        className="text-light rounded p-1"
                        onClick={() => confirmDeleteAction(id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </span>
            </OverlayTrigger>
        );
    };

    // Componente para mostrar los boton de agregar
    const NewPostButton = ({ setShow, setDialogTitle }) => {
        return (
            <h1>
                Welcome to your posts{' '}
                <Button
                    variant="primary"
                    title="Create new post"
                    onClick={() => {
                        setShow(true);
                        setDialogTitle('Create Post');
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    NewPost
                </Button>
            </h1>
        );
    };

    return (
        <>
            <NewPostButton setShow={setShow} setDialogTitle={setDialogTitle} />

            <Form>
                <FormControl
                    type="text"
                    placeholder="Search by title or content..."
                    className="mb-sm-3 mt-sm-4 w-50 text-center mx-auto text-light bg-dark border border-light rounded-pill shadow-sm p-2"
                    value={searchText} onChange={(e) => requestSearch(e.target.value)}
                />
            </Form>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Content or comments</th>
                        <th>Aciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(post => (
                        <tr key={post.id}>
                            <th scope="row">{post.id}</th>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                                <EditButtonWithTooltip post={post} />
                                <DeleteButtonWithTooltip id={post.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageCount={Math.ceil(posts.length / postsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </>
    )
}

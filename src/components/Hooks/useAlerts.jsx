import Swal from 'sweetalert2'; // Importamos la librería de alertas

// Creamos un custom hook para mostrar alertas
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});

const useAlerts = () => {
    const showAlert = (title, text, icon, showButton = false, confirmText = null, cancelText = null, reverseButtons, timer = 3500) => {
        return swalWithBootstrapButtons.fire({
            title,
            text,
            icon,
            showCancelButton: showButton,
            showConfirmButton: showButton,
            confirmButtonText: confirmText,
            cancelButtonText: cancelText,
            reverseButtons,
            timer
        });
    };

    return {
        showAlert, // Retornamos la función para mostrar alertas
    };
};

export default useAlerts;


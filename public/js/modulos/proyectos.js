import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

//agregamos evento al botón de eliminar proyecto
btnEliminar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Deseas borrar este proyecto?",
    text: "Un proyecto eliminado no se puede recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "No, cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Eliminado!", "Su proyecto ha sido borrado", "success");
    }
    //redireccionamos al inicio
    setTimeout(() => {
        window.location.href = "/"
    }, 2000);
  });
});

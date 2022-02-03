const tareas = document.querySelector(".listado-pendientes");

if(tareas){

    tareas.addEventListener("click", e => {
        if(e.target.classList.contains("fa-check-circle")){
            //extraemos id de la tarea
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea);
        }
    });

}

export default tareas;
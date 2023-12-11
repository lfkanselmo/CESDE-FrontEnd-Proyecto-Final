let fecha = document.querySelector(".fecha");
let btnGuardarCambios = document.querySelector(".btnGuardarCambiosCitas");
let fechaEditar = document.querySelector("#fechaEditar");
let editarCitaSeccion = document.querySelector(".editarCitaSeccion");
let busquedaFechaSeccion = document.querySelector(".busquedaFechaSeccion");
let usuario = JSON.parse(localStorage.getItem("usuario"));
let table = document.querySelector(".table tbody");
let idCitaAModifica;
let hoy = new Date();
let tomorrow = new Date();
tomorrow.setDate(hoy.getDate() + 1);
let format = tomorrow.toISOString().split('T')[0];
let formatHoy = hoy.toISOString().split('T')[0];
fechaEditar.setAttribute("min", format);
fecha.setAttribute("min", formatHoy);

window.addEventListener("DOMContentLoaded", async () => {

    let result = await validarTokenActual()
    if (!result) {
        window.location.href = "login.html";
    }
    fecha.value = "";
    fechaEditar.value = "";
    await limpiarTabla();

})

// Evento input en el campo de fecha
fechaEditar.addEventListener("input", () => {
    // Enviar a la base de datos la fecha para validar las horas disponibles

    let urlBuscarFecha = urlDomain + "/appointment/date";
    btnGuardarCambios.disabled = false;

    axios.post(urlBuscarFecha, {
        date: fechaEditar.value
    })
        .then(response => {
            if (response.status !== 200) {
                console.error("No hay citas en esta fecha");
            } else {
                cargarHorasEditarCita(response.data);
            }
        })
        .catch(error => {
            cargarHorasEditarCita(null);
        })


});

// Funcion para buscar citas
function buscarCitas() {
    let urlBusquedaCitas = urlDomain + "/appointment/dateusername";

    let datosFormulario;
    if (fecha.value !== "" &&
        usuario !== "") {
        datosFormulario = {
            date: fecha.value,
            userEmail: usuario
        }
    }

    let token = JSON.parse(localStorage.getItem('token'));

    if (datosFormulario !== null) {

        axios.post(urlBusquedaCitas, datosFormulario, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    ponerDatosEnTabla(response.data);
                } else {
                    limpiarTabla();
                }
            })
            .catch(error => {
                limpiarTabla();
                console.error(error.request.responseText);
                alertaInfo(error.request.responseText);
            })

    } else {
        alertaError("Todos los campos deben ser válidos");
    }
}


function ponerDatosEnTabla(citas) {
    limpiarTabla();

    // Función para comparar el ordenamiento por hora
    function compararPorHora(a, b) {
        const horaA = new Date('1970-01-01T' + a.startTime + 'Z');
        const horaB = new Date('1970-01-01T' + b.startTime + 'Z');

        // Compara los objetos Date
        return horaA - horaB;
    }

    // Ordenar por hora de cita
    citas.sort(compararPorHora);

    citas.forEach(cita => {
        let fila = document.createElement("tr");
        fila.innerHTML =
            `
        <td> ${cita.appointmentId} </td>
            <td> ${cita.propertyListRecord.propertyId} </td>
            <td> ${cita.date} </td>
            <td> ${cita.startTime} </td>
            <td> ${cita.propertyListRecord.address} </td>
            <td> ${cita.clientListRecord.firstName} ${cita.clientListRecord.lastName}</td>
            <td> ${cita.clientListRecord.phone} </td>
            <td>
                <span class="btn-editarCita btn btn-warning" onclick= "actualizarCita(${cita.appointmentId})" > 📝 </span> 
                <span class="btn-borrarCita btn btn-danger" onclick= "solicitarBorrarCita(${cita.appointmentId})" > ❌ </span> 
            </td> 
        `;
        table.appendChild(fila);
    })
}



// funcion para limpiar las tablas
async function limpiarTabla() {
    let filas = document.querySelectorAll("table tbody tr");
    filas.forEach(fila => {
        fila.remove();
    });
}

// funcion para realizar la verificación de si se quiere borrar la cita o no
async function solicitarBorrarCita(idCita) {
    let res = await borrarAlert("la cita");
    if (res) {
        borrarCita(idCita);
    }
}

// Funcion para borrar cita
async function borrarCita(idCita) {
    let urlBorrarCita = urlDomain + "/appointment/delete/" + idCita;

    axios.delete(urlBorrarCita)
        .then(response => {
            if (response.status === 200) {
                alertaExito("Cita borrada con éxito");
            } else {
                alertaError("No se pudo borrar la cita");
            }
        })
        .catch(error => {
            alertaError("Ocurrió un error inesperado al borrar la cita");
        })
}


// Funcion para cargar las horas según la fecha seleccionada, verificando las horas que ya están ocupadas
function cargarHorasEditarCita(citasFecha) {
    let horasVector = ["08:00:00", "10:00:00", "12:00:00", "14:00:00", "16:00:00"];
    let horasOcupadas = [];
    let horasDisponibles = [];

    if (citasFecha !== null) {
        citasFecha.forEach(cita => {
            horasOcupadas.push(cita.startTime);
        });

        for (let i = 0; i < 5; i++) {
            if (!horasOcupadas.includes(horasVector[i])) {
                horasDisponibles.push(horasVector[i]);
            }

        }

        generarHorasDisponibles(horasDisponibles);
    } else {
        generarHorasDisponibles(horasVector);
    }

}

// Funcion para poner las horas disponibles en el select
function generarHorasDisponibles(horasDisponibles) {
    let selectHoras = document.querySelector("#horaEditar");
    let horasElegibles = selectHoras.querySelectorAll(".horaElegible");

    // Limpiar antes de agregar horas disponibles nuevas
    horasElegibles.forEach(hora => {
        hora.remove();
    })

    // Agregar las horas disponibles
    horasDisponibles.forEach(hora => {
        let horaOption = document.createElement("option");
        horaOption.classList.add("horaElegible");
        horaOption.value = hora;
        horaOption.textContent = hora;

        selectHoras.appendChild(horaOption);
    })
}

// Funcion para cuando se presiona el boton de editar cita
function actualizarCita(idCita) {
    fechaEditar.value = "";
    idCitaAModifica = idCita;
    if (!busquedaFechaSeccion.classList.contains("d-none")) {
        busquedaFechaSeccion.classList.add("d-none");
    }

    if (editarCitaSeccion.classList.contains("d-none")) {
        editarCitaSeccion.classList.remove("d-none");
    }
}


// Funcion para guardar los cambios en la base de datos
async function guardarCambiosCitaDB() {
    let urlModificar = urlDomain + "/appointment/update";
    let urlBuscarCita = urlDomain + "/appointment/" + idCitaAModifica;
    let horaEditar = document.querySelector("#horaEditar").value;
    let fechaEditarContenido = document.querySelector("#fechaEditar").value;

    let cita;
    await axios.get(urlBuscarCita)
        .then(response => {
            if (response.status === 200) {
                cita = response.data;
            }
        })
        .catch(error => {
            console.log(error)
        })

    const datosNuevos = {
        appointmentId: idCitaAModifica,
        userId: cita.userListRecord.userId,
        clientId: cita.clientListRecord.clientId,
        propertyId: cita.propertyListRecord.propertyId,
        startTime: horaEditar,
        date: fechaEditarContenido
    }


    await axios.put(urlModificar, datosNuevos)
        .then(response => {
            if (response.status === 200) {
                console.log("Modificado con éxito")
                alertaExito("Cita modificada con exito");
                idCitaAModifica = "";
                if (busquedaFechaSeccion.classList.contains("d-none")) {
                    busquedaFechaSeccion.classList.remove("d-none");
                }

                if (!editarCitaSeccion.classList.contains("d-none")) {
                    editarCitaSeccion.classList.add("d-none");
                }

                let optionHorasEditar = document.querySelectorAll("#horaEditar > option");
                limpiarHoras(optionHorasEditar);
            }
        })
        .catch(error => {
            console.error(error)
            alertaError("No se pudo modificar la cita." + error.request.responseText);
        })
}

// Funcion para cancelar la edicion de las citas
function cancelarEditarCita() {
    // Limpiar
    fechaEditar.value = "";
    let optionHorasEditar = document.querySelectorAll("#horaEditar > option");
    limpiarHoras(optionHorasEditar);

    if (busquedaFechaSeccion.classList.contains("d-none")) {
        busquedaFechaSeccion.classList.remove("d-none");
    }

    if (!editarCitaSeccion.classList.contains("d-none")) {
        editarCitaSeccion.classList.add("d-none");
    }
}


// Limpiar horas
function limpiarHoras(horas) {
    horas.forEach(hora => {
        hora.remove();
    })
}
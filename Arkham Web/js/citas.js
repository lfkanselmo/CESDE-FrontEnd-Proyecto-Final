// Boton de scroll

window.addEventListener("scroll", (event)=>{
    if(window.scrollY > 200){
        btn.style.display = "block";
    }else{
        btn.style.display ="none";
    }
});

btn.addEventListener("click", () =>{
    window.scrollTo(top);
    btn.style.display = "none";
});



let fecha = document.querySelector(".fecha");
let hoy = new Date();
let tomorrow = new Date(hoy.getTime() + 86400000);
let format = tomorrow.toISOString().split('T')[0];
let id;
let idPropiedad = document.querySelector("#idPropiedad");
let btnAgendar = document.querySelector(".btn-agendar");
let btnGuardar = document.querySelector(".btn-guardarDatos");
let btnBuscar = document.querySelector(".buscarCliente");
let formCitas = document.querySelector(".formCitas");
let camposInputs = document.querySelectorAll(".datoCliente");

fecha.setAttribute("min", format);

// Acciones a realizar apenas se cargue la página
window.addEventListener("load", () => {
    validarTokenActual();
    id = sacarIdCapturado();
    ponerId(id);
    btnAgendar.disabled = true;
    btnGuardar.disabled = true;
    btnBuscar.disabled = false;
    let documento = document.querySelector(".documento");
    documento.value = "";
    limpiarCamposEditables(camposInputs)
    guardarDatosCliente();
})

// Evento input en el campo de fecha
fecha.addEventListener("input", () => {
    // Enviar a la base de datos la fecha para validar las horas disponibles

    let urlBuscarFecha = urlDomain + "/appointment/date";
    btnAgendar.disabled = false;

    axios.post(urlBuscarFecha, {
        date: fecha.value
    })
        .then(response => {
            if (response.status !== 200) {
                console.log(response.request.responseText);
            } else {
                cargarHoras(response.data);
            }
        })
        .catch(error => {
            cargarHoras(null);
            console.error(error)
        })


});

// Funcion para buscar cliente por id
function buscarCliente() {
    let documento = document.querySelector(".documento");
    let urlBuscar = urlDomain + "/client/" + documento.value;
    let fecha = formCitas.querySelector(".fecha");

    axios.get(urlBuscar)
        .then(response => {
            if (response.status === 200) {
                ponerValoresTraidos(response.data);
                fecha.value = "";
                btnBuscar.disabled = true;
            } else {
                alertaInfo(`No existe cliente con este documento.
            Ingrese datos para registro de la cita`);
                limpiarCamposEditablesParaCita();
                fecha.value = "";
                habilitarInputs();
            }

        })
        .catch(error => {
            console.error(error)
            alertaInfo(`No existe cliente con este documento.
            Ingrese datos para registro de la cita`);
            limpiarCamposEditablesParaCita();
            fecha.value = "";
            habilitarInputs();
        })

}

// Funcion para limpiar los campos de cita 
function limpiarCamposEditablesParaCita() {
    let nombre = formCitas.querySelector(".nombre");
    let apellido = formCitas.querySelector(".apellido");
    let telefono = formCitas.querySelector(".telefono");
    let email = formCitas.querySelector(".email");
    let fecha = formCitas.querySelector(".fecha");


    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    email.value = "";
    fecha.value = "";
}

// Funcion para poner los datos traidos de la BD cuando encuentra cliente por id
function ponerValoresTraidos(datos) {
    let nombre = formCitas.querySelector(".nombre");
    let apellido = formCitas.querySelector(".apellido");
    let telefono = formCitas.querySelector(".telefono");
    let email = formCitas.querySelector(".email");

    nombre.value = datos.firstName;
    apellido.value = datos.lastName;
    telefono.value = datos.phone;
    email.value = datos.email;

    btnAgendar.disabled = false;
}

// Funcion para habilitar los inputs
function habilitarInputs() {
    let nombre = formCitas.querySelector(".nombre");
    let apellido = formCitas.querySelector(".apellido");
    let telefono = formCitas.querySelector(".telefono");
    let email = formCitas.querySelector(".email");

    nombre.removeAttribute("readonly");
    apellido.removeAttribute("readonly");
    telefono.removeAttribute("readonly");
    email.removeAttribute("readonly");

    btnBuscar.disabled = true;
    btnAgendar.disabled = true;
}

// Funcion para guardar los datos del cliente
function guardarDatosCliente() {
    let btnGuardar = document.querySelector(".btn-guardarDatos");
    camposInputs.forEach(campo => {
        let campoInput = campo.firstElementChild
        if (campoInput.tagName === "INPUT") {
            campoInput.addEventListener("keyup", () => {
                btnBuscar.disabled = true;
                // Validar todos los campos para activar o desactivar el boton guardar
                if (validarDatos(camposInputs)) {
                    btnGuardar.disabled = false;
                } else {
                    btnGuardar.disabled = true;
                }
            });
        }
    });
}

// Funcion para guardar en la base de datos
function guardarClienteBD() {

    let urlGuardarCliente = urlDomain + "/client/save";
    let camposEditables = formCitas.querySelectorAll(".datoCliente");

    let documento = formCitas.querySelector(".documento").value;
    let nombre = formCitas.querySelector(".nombre").value;
    let apellido = formCitas.querySelector(".apellido").value;
    let telefono = formCitas.querySelector(".telefono").value;
    let email = formCitas.querySelector(".email").value;

    let datosCliente =
    {
        clientId: documento,
        firstName: nombre,
        lastName: apellido,
        phone: telefono,
        email: email
    }

    axios.post(urlGuardarCliente, datosCliente)
        .then(response => {
            if (response.status === 201) {
                alertaExito("Datos guardados con éxito");
                hacerNoEditables();
            } else {
                alertaError("no fue posible guardar los datos");
            }
        })
        .catch(error => {
            console.error(error);
            alertaError(`no fue posible guardar los datos.
            ${error.response.request.responseText}`);
        })

}

// Funcion para inhabilitar los campos, para que no se permita modificar lo que está en ellos momentaneamente
function hacerNoEditables() {
    let nombre = formCitas.querySelector(".nombre");
    let apellido = formCitas.querySelector(".apellido");
    let telefono = formCitas.querySelector(".telefono");
    let email = formCitas.querySelector(".email");

    nombre.setAttribute("readonly", "");
    apellido.setAttribute("readonly", "");
    telefono.setAttribute("readonly", "");
    email.setAttribute("readonly", "");



}

// Funcion para cargar las horas según la fecha seleccionada, verificando las horas que ya están ocupadas
function cargarHoras(citasFecha) {
    let horasVector = ["08:00:00", "10:00:00", "12:00:00", "14:00:00", "16:00:00"];
    let horasOcupadas = [];
    let horasDisponibles = [];

    if (citasFecha != null) {
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
    let selectHoras = document.querySelector("#hora");
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

// Cuando resuelve la promesa es la que pone el Id en el span IdPropiedad en el form
function ponerId(id) {
    idValor(id)
        .then(valor => {
            idPropiedad.innerText = valor;
        })
        .catch(error => {
            console.error(error);
        })
}

// Promesa para sacar el valor del ID del localStorage
let idValor = (idCapturado) => {
    return new Promise((resolve, reject) => {
        if (idCapturado != null) {
            resolve(idCapturado)
        } else {
            reject(new Error("Llegó Vacío"));
        }
    })
}


// Función que saca el valor del Id del LocalStorage
async function sacarIdCapturado() {
    let idTraido = await JSON.parse(localStorage.getItem("idCapturado"));
    return idTraido;
}

// función para guardar las citas
async function guardarCita() {
    let documento = formCitas.querySelector(".documento").value;
    let idInmueble = idPropiedad.innerText;
    let fecha = formCitas.querySelector(".fecha").value;
    let hora = formCitas.querySelector("#hora").value;
    let idUsuario;

    let urlBuscarIdUsuario = urlDomain + "/auth/user/all";

    await axios.get(urlBuscarIdUsuario)
        .then(response => {
            let usuarios = response.data;
            if (usuarios.length > 0) {
                idUsuario = usuarios[0].userId;
            } else {
                alertaError("No hay administradores disponibles para esta fecha y hora");
            }
        })
        .catch(error => {
            console.error(error)
            alertaError("No hay administradores disponibles para esta fecha y hora");
        })

    if (
        documento !== "" &&
        idInmueble !== "" &&
        fecha !== "" &&
        hora !== "" &&
        idUsuario !== ""
    ) {
        guardarCitaEnBD(documento, idInmueble, fecha, hora, idUsuario);
    } else {
        alertaError("No se puede guardar la cita, verifique los campos");
    }
}

// Funcion para guardar la cita en la base de datos
function guardarCitaEnBD(documento, idInmueble, fecha, hora, idUsuario) {
    let urlGuardarCita = urlDomain + "/appointment/save";
    let fechaInput = formCitas.querySelector(".fecha");
    let documentoInput = formCitas.querySelector(".documento");

    axios.post(urlGuardarCita, {
        userId: idUsuario,
        clientId: documento,
        propertyId: idInmueble,
        startTime: hora,
        date: fecha
    })
        .then(response => {
            if (response.data !== null) {
                console.log(response.data)
                alertaExito("Cita guardada con éxito");
                fechaInput.value = "";
                documentoInput.value = "";
                limpiarCamposEditablesParaCita();
                let res = generarPDF();
                if (res) {
                    pdfFromBD(response.data.appointmentId);
                }
                localStorage.setItem("idCapturado", JSON.stringify(""))
            } else {
                alertaError("No se pudo guardar la cita" + response.request.responseText);
            }

        })
        .catch(error => {
            console.log(error)
            alertaError(`No se pudo guardar la cita. 
        ${error.request.responseText}`);
        })
}

// Alerta para confirmar si desea imprimir el pdf o no
async function generadorPDF(idCita) {
    let res = await generarPDF();
    if (res) {
        pdfFromBD(idCita);
    }
}

// Imprimir la cita guardada en la base de datos
async function pdfFromBD(idCita) {
    let urlPdf = urlDomain + `/appointment/export?appoinmentId=${idCita}`;

    await axios.get(urlPdf, {
        params: {
            appoinmentId: idCita
        },
        responseType: 'blob', // Indica que esperas una respuesta en formato binario (por ejemplo, un archivo PDF)
        timeout: 10000    // Ponerle tiempo de espera a la solicitud de 10 segundos antes de cancelarla
    })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `cita${idCita}.pdf`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.log(`No se pudo generar el PDF. 
            ${error}`)
        })
}

/*

SE HABILITARÁ CUANDO SE GESTIONE TENER MULTIPLES ADMINISTRADORES Y USUARIOS

// funcion para traer el id del usuario disponible para fecha y hora especifica
async function traerIdUsuario(fecha, hora){

}

*/
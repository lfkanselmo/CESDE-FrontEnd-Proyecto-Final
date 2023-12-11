// Variables globales
let btnGuardarPropietario = document.querySelector(".btn-guardarPropietario")
let btnBuscarPropietario = document.querySelector(".buscarPropietario");
let camposInputsPropietario = document.querySelectorAll(".datoPropietario");
let camposInputsInmueble = document.querySelectorAll(".datoInmueble");
let formPropietarios = document.querySelector(".formPropietarios");
let formInmuebles = document.querySelector(".formInmuebles");
let documentoPropietario = document.querySelector(".documento");
let btnGuardarInmueble = document.querySelector(".btn-guardarInmueble");

// Carga de la página
window.addEventListener("DOMContentLoaded", async () => {

    let result = await validarTokenActual()
    if (!result) {
        window.location.href = "login.html";
    }

    btnGuardarPropietario.disabled = true;
    btnGuardarInmueble.disabled = true;
    btnBuscarPropietario.disabled = false;
    documentoPropietario.value = "";
    let inputs = document.querySelectorAll("input");
    limpiarTodosLosCampos(inputs);
    guardarDatosPropietario();
    guardarDatosInmueble();

})

// Deshabilitar el boton de buscar si el campo documento no es válido
documentoPropietario.addEventListener("keyup", () => {
    if (documentoPropietario.validity.valid === false || documentoPropietario.value === "") {
        btnBuscarPropietario.disabled = true;
    } else {
        btnBuscarPropietario.disabled = false;
    }
})

// Funcion para guardar los datos del propietario
function guardarDatosPropietario() {
    camposInputsPropietario.forEach(campo => {
        let campoInput = campo.firstElementChild
        if (campoInput.tagName === "INPUT") {
            campoInput.addEventListener("keyup", () => {
                btnBuscarPropietario.disabled = true;
                // Validar todos los campos para activar o desactivar el boton guardar
                if (validarDatos(camposInputsPropietario)) {
                    btnGuardarPropietario.disabled = false;
                } else {
                    btnGuardarPropietario.disabled = true;
                }
            });
        }
    });
}

// Funcion para guardar los datos del inmuble
function guardarDatosInmueble() {
    camposInputsInmueble.forEach(campo => {
        let campoInput = campo.firstElementChild
        if (campoInput.tagName === "INPUT") {
            campoInput.addEventListener("keyup", () => {
                // Validar todos los campos para activar o desactivar el boton guardar
                if (validarDatos(camposInputsInmueble)) {
                    btnGuardarInmueble.disabled = false;
                } else {
                    btnGuardarInmueble.disabled = true;
                }
            });
        }
    });
}


// Funcion para buscar cliente por id
function buscarPropietario() {
    let documento = document.querySelector(".documento");
    let urlBuscar = urlDomain + "/owner/" + documento.value;
    let token = JSON.parse(localStorage.getItem('token'));

    if (documento.value.trim() !== "") {
        axios.get(urlBuscar, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    ponerValoresTraidosPropietario(response.data);
                    btnBuscarPropietario.disabled = true;
                    btnGuardarPropietario.disabled = true;
                    habilitarInputsFormInmueble();
                } else {
                    alertaInfo(`No existe propietario con este documento...`);
                    habilitarInputsFormPropietario();
                }

            })
            .catch(error => {
                console.error(error)
                alertaInfo(`No existe propietario con este documento...`);
                limpiarCamposEditablesParaPropietario();
                habilitarInputsFormPropietario();
            })
    } else {
        alertaError("El documento no debe estar vacío para poder realizar la búsqueda");
    }
}


// Funcion para habilitar los inputs del form propietario
function habilitarInputsFormPropietario() {
    let nombre = formPropietarios.querySelector(".nombre");
    let apellido = formPropietarios.querySelector(".apellido");
    let telefono = formPropietarios.querySelector(".telefono");
    let email = formPropietarios.querySelector(".email");

    nombre.removeAttribute("readonly");
    apellido.removeAttribute("readonly");
    telefono.removeAttribute("readonly");
    email.removeAttribute("readonly");

    btnBuscarPropietario.disabled = true;
    btnGuardarPropietario.disabled = true;
}

// Funcion para habilitar los inputs del form inmueble
function habilitarInputsFormInmueble() {
    let precio = formInmuebles.querySelector("#precio");
    let oferta = formInmuebles.querySelector("#oferta");
    let tipo = formInmuebles.querySelector("#tipo");
    let habitaciones = formInmuebles.querySelector("#habitaciones");
    let banhos = formInmuebles.querySelector("#banhos");
    let patio = formInmuebles.querySelector("#patio");
    let nivel = formInmuebles.querySelector("#nivel");
    let area = formInmuebles.querySelector("#area");
    let gasNatural = formInmuebles.querySelector("#gasNatural");
    let zonaRopa = formInmuebles.querySelector("#zonaRopa");
    let direccion = formInmuebles.querySelector("#direccion");
    let barrio = formInmuebles.querySelector("#barrio");
    let ciudad = formInmuebles.querySelector("#ciudad");
    let imagen = formInmuebles.querySelector("#imagen");

    precio.removeAttribute("readonly");
    oferta.removeAttribute("readonly");
    tipo.removeAttribute("readonly");
    habitaciones.removeAttribute("readonly");
    banhos.removeAttribute("readonly");
    patio.removeAttribute("readonly");
    nivel.removeAttribute("readonly");
    area.removeAttribute("readonly");
    gasNatural.removeAttribute("readonly");
    zonaRopa.removeAttribute("readonly");
    direccion.removeAttribute("readonly");
    barrio.removeAttribute("readonly");
    ciudad.removeAttribute("readonly");
    imagen.removeAttribute("readonly");

    btnGuardarInmueble.disabled = true;
}

// Funcion para limpiar los campos de cita 
function limpiarCamposEditablesParaPropietario() {
    let nombre = formPropietarios.querySelector(".nombre");
    let apellido = formPropietarios.querySelector(".apellido");
    let telefono = formPropietarios.querySelector(".telefono");
    let email = formPropietarios.querySelector(".email");


    nombre.value = "";
    apellido.value = "";
    telefono.value = "";
    email.value = "";
}

// Funcion para poner los datos traidos de la BD cuando encuentra cliente por id
async function ponerValoresTraidosPropietario(datos) {
    let nombre = formPropietarios.querySelector(".nombre");
    let apellido = formPropietarios.querySelector(".apellido");
    let telefono = formPropietarios.querySelector(".telefono");
    let email = formPropietarios.querySelector(".email");

    nombre.value = datos.firstName;
    apellido.value = datos.lastName;
    telefono.value = datos.phone;
    email.value = datos.email;

    btnGuardarPropietario.disabled = false;
}

// Funcion para guardar en la base de datos un propietario
function guardarPropietarioBD() {

    let urlGuardarPropietario = urlDomain + "/owner/save";

    let documento = formPropietarios.querySelector(".documento").value;
    let nombre = capitalizar(formPropietarios.querySelector(".nombre").value);
    let apellido = capitalizar(formPropietarios.querySelector(".apellido").value);
    let telefono = formPropietarios.querySelector(".telefono").value;
    let email = formPropietarios.querySelector(".email").value.toLowerCase();

    let token = JSON.parse(localStorage.getItem('token'));
    let datosPropietario =
    {
        ownerId: documento.trim(),
        firstName: nombre.trim(),
        lastName: apellido.trim(),
        phone: telefono.trim(),
        email: email.trim()
    }

    axios.post(urlGuardarPropietario, datosPropietario, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 201) {
                alertaExito("Propietario guardado con éxito");
                hacerNoEditablesPropietario();
                habilitarInputsFormInmueble();
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

// Funcion para guardar en la base de datos un inmueble
function guardarInmuebleBD() {

    let urlGuardarInmueble = urlDomain + "/property/save";
    let inputs = document.querySelectorAll("input");

    let documento = formPropietarios.querySelector(".documento").value;
    let precio = formInmuebles.querySelector("#precio").value;
    let disponibilidad = true;
    let oferta = formInmuebles.querySelector("#oferta").value;
    let tipo = formInmuebles.querySelector("#tipo").value;
    let habitaciones = formInmuebles.querySelector("#habitaciones").value;
    let banhos = formInmuebles.querySelector("#banhos").value;
    let patio = convertirABooleanInmueble(formInmuebles.querySelector("#patio").value);
    let nivel = formInmuebles.querySelector("#nivel").value;
    let area = formInmuebles.querySelector("#area").value;
    let gasNatural = convertirABooleanInmueble(formInmuebles.querySelector("#gasNatural").value);
    let zonaRopa = convertirABooleanInmueble(formInmuebles.querySelector("#zonaRopa").value);
    let direccion = formInmuebles.querySelector("#direccion").value;
    let barrio = capitalizar(formInmuebles.querySelector("#barrio").value);
    let ciudad = capitalizar(formInmuebles.querySelector("#ciudad").value);
    let imagen = formInmuebles.querySelector("#imagen").value;


    let token = JSON.parse(localStorage.getItem('token'));

    let datosInmueble =
    {
        price: precio.trim(),
        availability: disponibilidad,
        ownerId: documento.trim(),
        offer: oferta.trim(),
        propertyType: tipo.trim(),
        rooms: habitaciones.trim(),
        bathrooms: banhos.trim(),
        courtyard: patio,
        level: nivel.trim(),
        area: area.trim(),
        naturalGas: gasNatural,
        laundryArea: zonaRopa,
        address: direccion.trim(),
        district: barrio.trim(),
        city: ciudad.trim(),
        image: imagen.trim()

    }

    axios.post(urlGuardarInmueble, datosInmueble, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.status === 201) {
                alertaExito("Inmueble guardado con éxito");
                hacerNoEditablesPropietario();
                limpiarTodosLosCampos(inputs);
            }else if(response.status === 200){
                alertaInfo(`Ya existe una propiedad con esta dirección que se encuentra en estado no disponible. 
                Se activará de nuevo.`)
                hacerNoEditablesPropietario();
                limpiarTodosLosCampos(inputs);
            }else{
                alertaError("No fue posible guardar los datos");
            }
        })
        .catch(error => {
            console.error(error.response.request.responseText);
            alertaError(`no fue posible guardar los datos.
            ${error.response.request.responseText}`);
        })


    // Funcion para convertir a valores booleanos las opciones del select
    function convertirABooleanInmueble(dato) {
        if (dato === "Si") {
            return true;
        } else {
            return false;
        }
    }

}

// Funcion para inhabilitar los campos, para que no se permita modificar lo que está en ellos momentaneamente
function hacerNoEditablesPropietario() {
    let nombre = formPropietarios.querySelector(".nombre");
    let apellido = formPropietarios.querySelector(".apellido");
    let telefono = formPropietarios.querySelector(".telefono");
    let email = formPropietarios.querySelector(".email");

    nombre.setAttribute("readonly", "");
    apellido.setAttribute("readonly", "");
    telefono.setAttribute("readonly", "");
    email.setAttribute("readonly", "");
}


// Funcion para inhabilitar los campos, para que no se permita modificar lo que está en ellos momentaneamente
function hacerNoEditablesInmueble() {
    let precio = formInmuebles.querySelector("#precio");
    let oferta = formInmuebles.querySelector("#oferta");
    let tipo = formInmuebles.querySelector("#tipo");
    let habitaciones = formInmuebles.querySelector("#habitaciones");
    let banhos = formInmuebles.querySelector("#banhos");
    let patio = formInmuebles.querySelector("#patio");
    let nivel = formInmuebles.querySelector("#nivel");
    let area = formInmuebles.querySelector("#area");
    let gasNatural = formInmuebles.querySelector("#gasNatural");
    let zonaRopa = formInmuebles.querySelector("#zonaRopa");
    let direccion = formInmuebles.querySelector("#direccion");
    let barrio = formInmuebles.querySelector("#barrio");
    let ciudad = formInmuebles.querySelector("#ciudad");
    let imagen = formInmuebles.querySelector("#imagen");

    precio.setAttribute("readonly", "");
    oferta.setAttribute("readonly", "");
    tipo.setAttribute("readonly", "");
    habitaciones.setAttribute("readonly", "");
    banhos.setAttribute("readonly", "");
    patio.setAttribute("readonly", "");
    nivel.setAttribute("readonly", "");
    area.setAttribute("readonly", "");
    gasNatural.setAttribute("readonly", "");
    zonaRopa.setAttribute("readonly", "");
    direccion.setAttribute("readonly", "");
    barrio.setAttribute("readonly", "");
    ciudad.setAttribute("readonly", "");
    imagen.setAttribute("readonly", "");
}

// Funcion para limpiar los inputs
function limpiarTodosLosCampos(campos){
    campos.forEach( input => {
        input.value = "";
    })
}
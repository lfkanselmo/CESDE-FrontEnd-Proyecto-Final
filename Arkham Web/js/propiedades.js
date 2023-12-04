// Variables globales
let idCapturado;

// Funcion para habilitar los campos y editar los atributos de las propiedades
function editarPropiedad(btnEditar) {
    let tabla = btnEditar.parentElement.parentElement.parentElement.parentElement;
    tabla.classList.add("w-100");

    // Selección de botones
    let editables = tabla.querySelectorAll(".camposEditar");
    let btnAgendar = tabla.querySelector(".btn-agendar");
    let btnCancelar = tabla.querySelector(".btn-cancelar");
    let btnGuardar = tabla.querySelector(".btn-guardar");

    // Seleccion de valores de los inputs
    let ciudad = tabla.querySelector("#ciudad");
    let barrio = tabla.querySelector("#barrio");
    let precio = tabla.querySelector("#precio");
    let patio = tabla.querySelector("#patio");
    let zonaRopa = tabla.querySelector("#zonaRopa");
    let gasNatural = tabla.querySelector("#gasNatural");
    let banos = tabla.querySelector("#banhos");
    let area = tabla.querySelector("#area");
    let habitaciones = tabla.querySelector("#habitaciones");
    let nivel = tabla.querySelector("#nivel");

    // Selección de span donde se muestra la info
    let ciudadValor = tabla.querySelector("#ciudadValor");
    let barrioValor = tabla.querySelector("#barrioValor");
    let precioValor = tabla.querySelector("#precioValor");
    let patioValor = tabla.querySelector("#patioValor");
    let zonaRopaValor = tabla.querySelector("#zonaRopaValor");
    let gasNaturalValor = tabla.querySelector("#gasNaturalValor");
    let banosValor = tabla.querySelector("#banosValor");
    let areaValor = tabla.querySelector("#areaValor");
    let habitacionesValor = tabla.querySelector("#habitacionesValor");
    let nivelValor = tabla.querySelector("#nivelValor");

    btnAgendar.classList.add("d-none");
    btnCancelar.classList.remove("d-none");
    btnGuardar.classList.remove("d-none");
    btnEditar.classList.add("d-none");

    // recorrer todos los campos de inputs
    editables.forEach(campo => {
        campo.classList.remove("d-none");
        let campoInput = campo.firstElementChild
        if (campoInput.tagName === "INPUT") {

            // Validamos cada vez que se escribe algo en alguno de los inputs
            campoInput.addEventListener("keyup", () => {

                // Validar todos los campos para activar o desactivar el boton guardar
                if (validarDatos(editables)) {
                    btnGuardar.disabled = false;
                } else {
                    btnGuardar.disabled = true;
                }


            });
        }
    });

    ciudad.value = ciudadValor.innerText;
    barrio.value = barrioValor.innerText;
    precio.value = Number(precioValor.innerText);
    banos.value = Number(banosValor.innerText);
    area.value = Number(areaValor.innerText);
    habitaciones.value = Number(habitacionesValor.innerText);
    nivel.value = Number(nivelValor.innerText);


    // Evento cuando se le da click a cancelar la edición
    btnCancelar.addEventListener("click", () => {
        btnAgendar.classList.remove("d-none");
        btnGuardar.classList.add("d-none");
        btnEditar.classList.remove("d-none");

        limpiarCamposEditables(editables);

        editables.forEach(campo => {
            campo.classList.add("d-none");
        });
        tabla.classList.remove("w-100");
        btnCancelar.classList.add("d-none");
        btnGuardar.disabled = false;
    })
}





/*---------------------------------------------------------------------------------------------------*/

// Funcion para guardar los cambios hechos
async function guardarCambios(btnGuardar) {
    let tabla = btnGuardar.parentElement.parentElement.parentElement.parentElement;
    let editables = tabla.querySelectorAll(".camposEditar");

    // Selección de botones
    let btnAgendar = tabla.querySelector(".btn-agendar");
    let btnCancelar = tabla.querySelector(".btn-cancelar");
    let btnEditar = tabla.querySelector(".btn-editar");

    // Selección de inputs
    let ciudad = tabla.querySelector("#ciudad");
    let barrio = tabla.querySelector("#barrio");
    let precio = tabla.querySelector("#precio");
    let patio = tabla.querySelector("#patio");
    let zonaRopa = tabla.querySelector("#zonaRopa");
    let gasNatural = tabla.querySelector("#gasNatural");
    let banos = tabla.querySelector("#banhos");
    let area = tabla.querySelector("#area");
    let habitaciones = tabla.querySelector("#habitaciones");
    let nivel = tabla.querySelector("#nivel");

    // Selección de spans finales
    let ciudadValor = tabla.querySelector("#ciudadValor");
    let barrioValor = tabla.querySelector("#barrioValor");
    let precioValor = tabla.querySelector("#precioValor");
    let patioValor = tabla.querySelector("#patioValor");
    let zonaRopaValor = tabla.querySelector("#zonaRopaValor");
    let gasNaturalValor = tabla.querySelector("#gasNaturalValor");
    let banosValor = tabla.querySelector("#banosValor");
    let areaValor = tabla.querySelector("#areaValor");
    let habitacionesValor = tabla.querySelector("#habitacionesValor");
    let nivelValor = tabla.querySelector("#nivelValor");

    // Se captura el resultado de la alerta y se ejecuta la funcion de guardado si se le da al botón guardar
 let res = await GuardarAlert();
    if (res) {
        guardando();
    }

    function guardando() {
        // Proceso de guardado de nuevos valores, reemplazar a futuro por el consumo de la API
        ciudadValor.innerText = ciudad.value;
        barrioValor.innerText = barrio.value;
        precioValor.innerText = precio.value;
        patioValor.innerText = patio.value;
        zonaRopaValor.innerText = zonaRopa.value;
        gasNaturalValor.innerText = gasNatural.value;
        banosValor.innerText = banos.value;
        areaValor.innerText = area.value;
        habitacionesValor.innerText = habitaciones.value;
        nivelValor.innerText = nivel.value;


        // Limpiar todo después de guardar
        btnAgendar.classList.remove("d-none");
        btnGuardar.classList.add("d-none");
        btnEditar.classList.remove("d-none");

        limpiarCamposEditables(editables);

        editables.forEach(campo => {
            campo.classList.add("d-none");
        });
        tabla.classList.remove("w-100");
        btnCancelar.classList.add("d-none");
        btnGuardar.disabled = false;
    }


}

/*---------------------------------------------------------------------------------------------------*/
// Funcion para mandar el ID del inmueble al gestor de citas
function agregarCita(btnAgendar){
    idCapturado = "";
    let tabla = btnAgendar.parentElement.parentElement.parentElement.parentElement.parentElement;
    let id = tabla.querySelector("#idValor");
    idCapturado = id.innerText;
    console.log(idCapturado)

    localStorage.setItem("idCapturado", JSON.stringify(idCapturado));
}

/*---------------------------------------------------------------------------------------------------*/


// Funcion para limpiar los campos de editar
function limpiarCamposEditables(campos) {
    campos.forEach(campo => {
        let campoInput = campo.firstElementChild;
        if (campoInput.tagName === "INPUT") {
            campoInput.value = "";
        }
    })
}


/*---------------------------------------------------------------------------------------------------*/


// Función para validar los datos
function validarDatos(campos) {
    let todosValidos = true;
    campos.forEach(function (contenedorCampo) {
        let campo = contenedorCampo.firstElementChild;

        // Si el input o select está vacío, o es invalido retorna false

        if (campo.value === "" || campo.validity.valid === false || (campo.tagName === 'SELECT' && campo.value === "0")) {
            todosValidos = false;
        }
    });
    return todosValidos;
}


// Variables globales
let idCapturado;

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


// Funcion para habilitar los campos y editar los atributos de las propiedades
function editarPropiedad(btnEditar) {
    let tabla = btnEditar.parentElement.parentElement.parentElement.parentElement;
    tabla.classList.add("w-100");

    // Selección de botones
    let editables = tabla.querySelectorAll(".camposEditar");
    let camposOcultos = tabla.querySelectorAll(".camposOcultos");
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
    let direccion = tabla.querySelector("#direccion");
    let disponibilidad = tabla.querySelector("#disponibilidad");
    let oferta = tabla.querySelector("#oferta");
    let tipo = tabla.querySelector("#tipo");
    let imagen = tabla.querySelector("#imagen");

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
    let direccionValor = tabla.querySelector("#direccionValor");
    let disponibilidadValor = tabla.querySelector("#disponibilidadValor");
    let ofertaValor = tabla.querySelector("#ofertaValor");
    let tipoValor = tabla.querySelector("#tipoValor");
    let imagenValor = tabla.querySelector("#imagenValor");


    btnAgendar.classList.add("d-none");
    btnCancelar.classList.remove("d-none");
    btnGuardar.classList.remove("d-none");
    btnEditar.classList.add("d-none");

    camposOcultos.forEach(campo => {
        campo.classList.remove("d-none");
    })

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
    patio.value = patioValor.innerText;
    zonaRopa.value = zonaRopaValor.innerText;
    gasNatural.value = gasNaturalValor.innerText;
    disponibilidad.value = disponibilidadValor.innerText;
    habitaciones.value = Number(habitacionesValor.innerText);
    nivel.value = Number(nivelValor.innerText);
    direccion.value = direccionValor.innerText;
    oferta.value = ofertaValor.innerText;
    tipo.value = tipoValor.innerText;
    imagen.value = imagenValor.innerText;

    console.log(imagen)


    // Evento cuando se le da click a cancelar la edición
    btnCancelar.addEventListener("click", () => {
        btnAgendar.classList.remove("d-none");
        btnGuardar.classList.add("d-none");
        btnEditar.classList.remove("d-none");

        limpiarCamposEditables(editables);
        desactivarCamposOcultos(camposOcultos);

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
    let direccion = tabla.querySelector("#direccion");
    let disponibilidad = tabla.querySelector("#disponibilidad");
    let oferta = tabla.querySelector("#oferta");
    let tipo = tabla.querySelector("#tipo");
    let imagen = tabla.querySelector("#imagen");

    // Selección de spans finales
    let idValor = tabla.querySelector("#idValor");
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
    let direccionValor = tabla.querySelector("#direccionValor");
    let disponibilidadValor = tabla.querySelector("#disponibilidadValor");
    let ofertaValor = tabla.querySelector("#ofertaValor");
    let tipoValor = tabla.querySelector("#tipoValor");
    let imagenValor = tabla.querySelector("#imagenValor");

    // Se captura el resultado de la alerta y se ejecuta la funcion de guardado si se le da al botón guardar
    let res = await GuardarAlert();
    if (res) {
        guardando();
    }

    async function guardando() {
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
        direccionValor.innerText = direccion.value;
        disponibilidadValor.innerText = disponibilidad.value;
        ofertaValor.innerText = oferta.value;
        tipoValor.innerText = tipo.value;
        imagenValor.innerText = imagen.value;

        let datosNuevos = {
            propertyId: Number(idValor.innerText),
            price: Number(precioValor.innerText),
            rooms: Number(habitacionesValor.innerText),
            bathrooms: Number(banosValor.innerText),
            courtyard: convertirABoolean(patioValor.innerText),
            level: Number(nivelValor.innerText),
            area: Number(areaValor.innerText),
            naturalGas: convertirABoolean(gasNatural.innerText),
            laundryArea: convertirABoolean(zonaRopaValor.innerText),
            district: barrioValor.innerText,
            city: ciudadValor.innerText,
            address: direccionValor.innerText,
            availability: convertirABoolean(disponibilidadValor.innerText),
            offer: ofertaValor.innerText,
            propertyType: tipoValor.innerText,
            image: imagenValor.innerText
        }

        console.log(datosNuevos)

        await guardarCambiosBD(datosNuevos);


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

    // Funcion para convertir a valores booleanos las opciones del select
    function convertirABoolean(dato) {
        if (dato === "Si") {
            return true;
        } else {
            return false;
        }
    }
}


// Guardar cambios de inmueble en la base de datos
async function guardarCambiosBD(datosNuevos) {
    let urlModificar = urlDomain + "/property/update"
    let token = JSON.parse(localStorage.getItem('token'));

    axios.put(urlModificar, datosNuevos, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if(response.status === 200){
                console.log("Modificado con éxito")
            }
        })
        .catch(error => {
            console.error(error)
            alertaError("No se pudo modificar el inmueble")
        })
}

/*---------------------------------------------------------------------------------------------------*/

// Funcion para mandar el ID del inmueble al gestor de citas
function agregarCita(btnAgendar) {
    idCapturado = "";
    let tabla = btnAgendar.parentElement.parentElement.parentElement.parentElement.parentElement;
    let id = tabla.querySelector("#idValor");
    idCapturado = id.innerText;

    localStorage.setItem("idCapturado", JSON.stringify(idCapturado));
}

/*---------------------------------------------------------------------------------------------------*/




// Funcion para ocultar los campos que deberían estar ocultos para la vista de cliente
function desactivarCamposOcultos(camposOcultos) {
    camposOcultos.forEach(campo => {
        campo.classList.add("d-none");
    })
}


/*---------------------------------------------------------------------------------------------------*/




/*---------------------------------------------------------------------------------------------------*/


// Funcion para cargar las propiedades desde la base de datos dependiendo de la oferta
async function cargarInmueblesPorOferta(oferta) {
    let urlInmuebles = urlDomain + "/property/offer/" + oferta;

    axios.get(urlInmuebles)
        .then(response => {
            if (!response.status === 200) {
                alertaError(`No hay propiedades en ${oferta} para mostrar`);
                console.log("La solicitud devolvió un código de estado 404 (No encontrado).");
            } else {
                crearPropiedades(response.data, oferta);
            }
        })
        .catch(error => {
            console.error("Error al cargar las propiedades: ", error.message);
        })

}


/*---------------------------------------------------------------------------------------------------*/


// Funcion para crear las propiedades y ponerlas en la página
function crearPropiedades(propiedades, oferta) {

    const galleriaPropiedades = document.querySelector(".propiedades");

    if (propiedades.length > 0) {

        propiedades.forEach(p => {

            if (p.availability) {

                let propiedad = document.createElement("div");
                propiedad.style.maxWidth = "1250px";
                propiedad.setAttribute("class", "propiedad card my-5 border-3 py-3");

                propiedad.innerHTML =
                    `
                    <div class="row g-0 justify-content-center">
                        <div class="col-md-8 d-flex justify-content-center align-items-center"
                            style="max-width: 550px;">
                            <!--  carrusel de imágenes -->
                            <div class="imgContenedor">
                                            <img src="${p.image}"
                                                class="img-fluid rounded-start d-block w-100" alt="...">
                                        </div>
                        </div>
                        <div class="col-md-6 ms-3">
                            <div class="card-body">

                                <!-- Tabla para la info de las propiedades -->
                                <table class="tablaInfo text-color-black my-5">
                                    <thead>
                                        <tr class="fw-bolder fontSize30">
                                            <th>
                                                <strong class="mx-1">ID: </strong>
                                            </th>
                                            <th>
                                                <span id="idValor">${p.id}</span>
                                            </th>
                                        </tr>

                                        <tr>
                                            <th>
                                                <strong class="mx-1">Ciudad:</strong>
                                            </th>
                                            <th>
                                                <span id="ciudadValor">${p.city} </span>
                                            </th>
                                            <th class="camposEditar d-none">
                                                <input type="text" name="ciudad" id="ciudad">
                                            </th>
                                        </tr>

                                        <tr>
                                            <th>
                                                <strong class="mx-1">Barrio:</strong>
                                            </th>
                                            <th>
                                                <span id="barrioValor"> ${p.district} </span>
                                            </th>
                                            <th class="camposEditar d-none">
                                                <input type="text" name="barrio" id="barrio">
                                            </th>
                                        </tr>

                                        <tr>
                                            <th>
                                                <strong class="mx-1">Precio:</strong>
                                            </th>
                                            <th>
                                                <span>$ <span id="precioValor"> ${p.price} </span></span>
                                                
                                            </th>
                                            <th class="camposEditar d-none">
                                                <input type="number" name="precio" min="1" id="precio">
                                            </th>
                                        </tr>

                                        <tr class="camposOcultos d-none">
                                            <th>
                                                <strong class="mx-1">Dirección:</strong>
                                            </th>
                                            <th>
                                                <span> <span id="direccionValor"> ${p.address} </span></span>
                                                
                                            </th>
                                            <th class="camposEditar d-none">
                                                <input type="text" name="direccion" min="1" id="direccion">
                                            </th>
                                        </tr>

                                    </thead>
                                    <!-- Cuerpo de la info -->
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong class="mx-1">Patio:</strong>
                                            </td>
                                            <td>
                                                <span id="patioValor"> ${convertirBooleano(p.courtyard)} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <select name="patio" id="patio">
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr class="camposOcultos d-none" >
                                            <td>
                                                <strong class="mx-1">Disponibilidad:</strong>
                                            </td>
                                            <td>
                                                <span id="disponibilidadValor"> ${convertirBooleano(p.availability)} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <select name="disponibilidad" id="disponibilidad">
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr class="camposOcultos d-none">
                                            <td>
                                                <strong class="mx-1">Oferta:</strong>
                                            </td>
                                            <td>
                                                <span id="ofertaValor"> ${p.offer} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                            <select name="oferta" id="oferta">
                                                    <option value="VENTA">Venta</option>
                                                    <option value="ARRENDAMIENTO">Arrendamiento</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Tipo:</strong>
                                            </td>
                                            <td>
                                                <span id="tipoValor"> ${p.propertyType} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                            <select name="tipo" id="tipo">
                                                    <option value="CASA">Casa</option>
                                                    <option value="APARTAMENTO">Apartamento</option>
                                                    <option value="APARTAESTUDIO">Apartaestudio</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">zona de ropa:</strong>
                                            </td>
                                            <td>
                                                <span id="zonaRopaValor"> ${convertirBooleano(p.laundryArea)} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <select name="zonaRopa" id="zonaRopa">
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Gas Natural:</strong>
                                            </td>
                                            <td>
                                                <span id="gasNaturalValor"> ${convertirBooleano(p.naturalGas)} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <select name="gasNatural" id="gasNatural">
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Baños:</strong>
                                            </td>
                                            <td>
                                                <span id="banosValor"> ${p.bathrooms} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <input type="number" name="banhos" min="1" max="10" id="banhos">
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Area m2:</strong>
                                            </td>
                                            <td>
                                                <span id="areaValor"> ${p.area} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <input type="number" name="area" min="1" id="area">
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Habitaciones:</strong>
                                            </td>
                                            <td>
                                                <span id="habitacionesValor"> ${p.rooms} </span>
                                            </td>

                                            <td class="camposEditar d-none">
                                                <input type="number" name="habitaciones" min="1" max="10"
                                                    id="habitaciones">
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <strong class="mx-1">Nivel:</strong>
                                            </td>
                                            <td>
                                                <span id="nivelValor"> ${p.level} </span>
                                            </td>
                                            <td class="camposEditar d-none">
                                                <input type="number" name="nivel" min="1" max="100" id="nivel">
                                            </td>
                                        </tr>

                                        <tr class="camposOcultos d-none">
                                            <td colspan="3">
                                                <strong class="mx-1">URL Imagen:</strong>
                                            </td>
                                            </tr>
                                            <tr class="camposOcultos d-none" >
                                            <td colspan="3">
                                                <span> <span id="imagenValor"> ${p.image} </span></span>
                                                
                                            </td>
                                            </tr>
                                            <tr class="camposOcultos d-none">
                                            <td class="camposEditar d-none" colspan="3">
                                                <input type="text" name="imagen" min="1" id="imagen" class="w-100">
                                            </td>
                                        </tr>

                                    </tbody>
                                    <tfoot class="mt-5">
                                        <tr>
                                            <td colspan="3" class="py-3">
                                                <a href="citas.html"><button class="btn-agendar btn btn-primary" onclick="agregarCita(this)">Agenda tu cita</button></a>
                                                <button class="btn-editar btn btn-primary d-none"
                                                    onclick="editarPropiedad(this)">Editar</button>
                                                    <button class="btn-guardar btn btn-primary d-none" onclick="guardarCambios(this)">Guardar</button>
                                                    <button class="btn-cancelar btn btn-primary d-none">Cancelar</button>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
        
        `;

                galleriaPropiedades.appendChild(propiedad);

            }
        });
    } else {
        alertaError(`No hay inmuebles en ${oferta} disponibles`);
    }
}

/*---------------------------------------------------------------------------------------------------*/


// Funcion para convertir los booleanos
function convertirBooleano(valor) {
    if (valor) {
        return "Si";
    }

    return "No";
}


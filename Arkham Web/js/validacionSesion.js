// validar token
async function validarTokenActual() {
    let tokenEnLS = JSON.parse(localStorage.getItem("token"));
    let urlToken = urlDomain + "/token/check";
    let result;

    objetoToken = {
        token: tokenEnLS
    }

    await axios.post(urlToken, objetoToken)
        .then(response => {
            let objeto = response.data;
            if (objeto.revoked || objeto.expired) {
                result = comprobacionDeSesion(false);
            } else {
                result = comprobacionDeSesion(true);
            }
        })
        .catch(error => {
            console.log(error)
            result = false;
        })

        return result;

}

// Funcion de comprobacion
function comprobacionDeSesion(validez) {
    let btnIniciar = document.querySelector("#btnIniciarSesion");
    let btnCerrarSesion = document.querySelector("#btnCerrarSesion");
    var nombreArchivo = document.location.pathname.split('/').pop();

    if (validez) {
        if (btnCerrarSesion.classList.contains("d-none")) {
            btnCerrarSesion.classList.remove("d-none");
        }
        if (!btnIniciar.classList.contains("d-none")) {
            btnIniciar.classList.add("d-none");
        }

        ocultarEditarPropiedades(validez, nombreArchivo, document);
        return true;
    } else {
        if (btnIniciar.classList.contains("d-none")) {
            btnIniciar.classList.remove("d-none");
        }

        if (!btnCerrarSesion.classList.contains("d-none")) {
            btnCerrarSesion.classList.add("d-none");
        }
        ocultarEditarPropiedades(validez, nombreArchivo, document);
        return false;
    }
}

// Ocultar botón de editar de propiedades dependiendo de si está o no iniciada la sesión de un admi
function ocultarEditarPropiedades(validez, nombreArchivo, d) {
    if (nombreArchivo === "ventas.html" || nombreArchivo === "alquiler.html") {
        let botonesEditar = d.querySelectorAll(".btn-editar");

        if (validez) {
            // Si tiene sesion iniciada muesta los botones editar
            botonesEditar.forEach(b => {
                b.classList.remove("d-none");
            });
        } else {
            // Si no tiene sesion iniciada oculta los botones editar
            botonesEditar.forEach(b => {
                if (!b.classList.contains("d-none")) {
                    b.classList.add("d-none");
                }
            })
        }
    }
}
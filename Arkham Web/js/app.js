const d = document;
const urlDomain = "http://localhost:8090/api";
let btn = document.querySelector("#myBtn");

// Funcion para cerrar sesión
function cerrarSesion(){
    const urlCerrarSesion = urlDomain + "/logout";

    

    let token = JSON.parse(localStorage.getItem('token'));
    axios.post(urlCerrarSesion,{}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
    })
    .then(response => {
        if(response.status === 200){
            window.location.href = "index.html";
        }
    })
    .catch(error => {
        console.error(error);
    })
}

// Funcion mostrar formulario
function mostrarFormulario(idFormulario) {
    
    var formularios = d.querySelectorAll('.formulario');
    for (var i = 0; i < formularios.length; i++) {
        formularios[i].style.display = 'none';
    }

  
    var formulario = d.querySelector('#' + idFormulario); 
    formulario.style.display = 'block';
}


// Botones cancelar en los registros y login
function cancelar(idFormulario) {
    var formulario = d.querySelector('#' + idFormulario); 
    let inputs = d.querySelectorAll(".form-control")
    
    // Limpiar todas las celdas cuando se le da cancelar
    inputs.forEach((p)=>{
        p.value = "";
    })

    formulario.style.display = 'none';
}

// Función para validar los datos
function validarDatos(campos) {
    let todosValidos = true;
    campos.forEach(function (contenedorCampo) {
        let campo = contenedorCampo.firstElementChild;

        // Si el input o select está vacío, o es invalido retorna false

        if(campo.classList.contains("documento")){
            btnBuscar.disabled = false;
        }

        if (campo.value === "" || campo.validity.valid === false || (campo.tagName === 'SELECT' && campo.value === "0")) {
            todosValidos = false;
        }
    });
    return todosValidos;
}


// Funcion para limpiar los campos de editar
function limpiarCamposEditables(campos) {
    campos.forEach(campo => {
        let campoInput = campo.firstElementChild;
        if (campoInput.tagName === "INPUT") {
            campoInput.value = "";
        }
    })
}

// Funcion para volver a la pagina anterior
async function volverAPaginaPrevia(Exitoso){
    if (Exitoso) {
        // Guardar página previa
        var paginaPrevia = document.referrer;


        if (paginaPrevia === "" || paginaPrevia === window.location.href) {
            paginaPrevia = "index.html";
        }

        // Redirige a la página anterior
        window.location.href = paginaPrevia;
      }
}

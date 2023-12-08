const d = document;
const urlDomain = "http://localhost:8090/api";


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
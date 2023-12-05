const d = document;
const urlDomain = "http://localhost:8090/api";

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
// Función para la alerta de guardar cambios
async function GuardarAlert() {

    let resultado;
     await Swal.fire({
        title: "Desea guardar los cambios?",
        text: "Verifique la información antes de guardar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff4500",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        backdrop: true,
        background: "#f5f5dc"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Guardado!",
                text: "Sus cambios han sido guardados",
                icon: "success",
                backdrop: true,
                background: "#f5f5dc"
            });  
            // Si la alerta es confirmada se devuelve true      
            resultado = true;
        }else{
            // Si la alerta es cancelada se devuelve false
            resultado = false;
        }     

    });   

    return resultado;
}
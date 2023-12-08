// Funcion para el login
function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let inicioExitoso;

    // URL del endpoint
    const endpointUrl = urlDomain +"/auth/login";

    // Solicitud POST
    axios.post(endpointUrl, {
        email: username,
        password: password
    })
    .then(function (response) {
        alertaExito("Bienvenido");
        inicioExitoso = true;
        actualizarTokenLS(response.data.token);
        volverAPaginaPrevia(inicioExitoso);
    })
    .catch(function (error) {
        console.error("Error al realizar la solicitud:", error);
        alertaError(`No se pudo iniciar Sesión. Credenciales no válidas`);
        inicioExitoso = false;
    });


}

// Actualizar token en localStorage
function actualizarTokenLS(token){
    localStorage.setItem("token", JSON.stringify(token));
}


// Funcion para el registro
function registro() {

    let username = document.querySelector("#newUsername").value;
    let password = document.querySelector("#newPassword").value;
    let name = document.querySelector("#nombre").value;
    let lastName = document.querySelector("#apellido").value;
    let phone = document.querySelector("#telefono").value;

    let registroExitoso;

    // URL del endpoint
    const endpointUrl = urlDomain + "/auth/register";

    // Solicitud POST
    axios.post(endpointUrl, {
        email: username,
        password: password,
        firstName: name,
        lastName: lastName,
        phone: phone,
        role: "ADMINISTRADOR"
    })
    .then(function (response) {
        console.log(response.data);
        alertaExito("Usuario guardado con éxito");
        registroExitoso = true;
        volverAPaginaPrevia(registroExitoso);
    })
    .catch(function (error) {
        console.error("Error al realizar la solicitud:", error);
        alertaError(`No se pudo registrar usuario. ${error.request.responseText}`);
        registroExitoso = false;
    });

}

// Función para cancelar y volver atrás
function cancelarYVolver(btnCancelar){
    let form = btnCancelar.parentElement;
    let inputs = form.querySelectorAll("input");
    limpiarInputs(inputs);
    //volverAPaginaPrevia(true);
    window.location.href = "index.html";



}

// funcion para el switch a la hora de actualizar datos
function toggleForm() {
    var loginForm = document.getElementById("loginForm");
        var updateForm = document.getElementById("updateForm");
        var linkSwitch = document.querySelector("#linkSwitch");

        let inputsLogin = document.querySelectorAll("#loginForm input");
        let inputsRegistro = document.querySelectorAll("#registerForm input");

        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            updateForm.style.display = "none";
            limpiarInputs(inputsRegistro);
            linkSwitch.innerText = "Actualizar datos";
        } else {
            loginForm.style.display = "none";
            updateForm.style.display = "block";
            limpiarInputs(inputsLogin);
            linkSwitch.innerText = "Iniciar Sesión";
        }
}

// Funcion para limpiar los inputs de los formularios
function limpiarInputs(inputs){
    inputs.forEach(input => {
        input.value = "";
    });
}

/*
// Funcion para volver a la pagina anterior
function volverAPaginaPrevia(Exitoso){
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
*/
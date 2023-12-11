let btnRegistrar = document.querySelector(".registroUsuarios");

// Boton de scroll
btn = document.querySelector("#myBtn");

window.addEventListener("scroll", (event) => {
    if (window.scrollY > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

btn.addEventListener("click", () =>{
    window.scrollTo(top);
    btn.style.display = "none";
});


// Lo primero que hace cuando carga la página
window.addEventListener("DOMContentLoaded", async () => {
    let result = await validarTokenActual()
    if (!result) {
        window.location.href = "login.html";
    }

    // Poner el nombre de usuario en el dashboard
    let emailUsuario = JSON.parse(localStorage.getItem("usuario"));
    let campoNombreUsuario = document.querySelector(".nombreAdmin");
    campoNombreUsuario.innerText = emailUsuario;
    await verificarTipoUsuario(emailUsuario);
})

// Funcion para verificar el tipo de usuario que tiene sesión iniciada
async function verificarTipoUsuario(email){
    let urlBusquedaUsuario = urlDomain + "/auth/user/email/" + email;
    let token = JSON.parse(localStorage.getItem('token'));

    axios.get(urlBusquedaUsuario,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        validarBotonRegistrar(response.data.type)
    })
    .catch(error =>{
        alertaError(error.request.responseText);
    })
}

async function validarBotonRegistrar(type){
    if(type === "ADMINISTRADOR"){
        if(btnRegistrar.classList.contains("d-none")){
            btnRegistrar.classList.remove("d-none")
        }
    }else{
        if(!btnRegistrar.classList.contains("d-none")){
            btnRegistrar.classList.add("d-none");
        }
    }
}
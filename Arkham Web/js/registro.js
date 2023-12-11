let campos = document.querySelectorAll(".formInput");
let btnRegistrar = document.querySelector(".btnRegistrar");

// Lo primero que hace cuando carga la página
window.addEventListener("DOMContentLoaded", async () => {
    let result = await validarTokenActual()
    if (!result) {
        window.location.href = "login.html";
    }

    if (!validarDatos(campos)) {
        btnRegistrar.disabled = true;
    } else {
        btnRegistrar.disabled = false;
    }
})

campos.forEach(div => {
    let campo = div.firstElementChild;
    if (campo.tagName === "INPUT") {
        campo.addEventListener("keyup", () =>{
            if (!validarDatos(campos)) {
                btnRegistrar.disabled = true;
            } else {
                btnRegistrar.disabled = false;
            }
        })
    }
})

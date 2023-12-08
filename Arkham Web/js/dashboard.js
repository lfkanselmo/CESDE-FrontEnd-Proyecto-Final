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
})
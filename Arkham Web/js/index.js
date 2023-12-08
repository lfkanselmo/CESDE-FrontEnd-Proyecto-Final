window.addEventListener("DOMContentLoaded", async () => {
    validarTokenActual();
})

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

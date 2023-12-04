
let fecha = document.querySelector(".fecha");
let hoy = new Date();
let tomorrow = new Date(hoy.getTime() + 86400000); 
let format = tomorrow.toISOString().split('T')[0];
let id;

fecha.setAttribute("min",format);

fecha.addEventListener("input", ()=>{
    // Enviar a la base de datos la fecha para validar las horas disponibles
    console.log(fecha.value)
});

window.addEventListener("DOMContentLoaded", ()=>{
    console.log(recibirIdCapturado())
})
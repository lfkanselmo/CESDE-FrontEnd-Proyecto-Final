
let fecha = document.querySelector(".fecha");
let hoy = new Date();
let tomorrow = new Date(hoy.getTime() + 86400000); 
let format = tomorrow.toISOString().split('T')[0];
let id;
let idPropiedad = document.querySelector("#idPropiedad");

fecha.setAttribute("min",format);

fecha.addEventListener("input", ()=>{
    // Enviar a la base de datos la fecha para validar las horas disponibles
    console.log(fecha.value)
});

// Controla lo que ocurre apenas se carga la página
window.addEventListener("DOMContentLoaded", ()=> {
    id = sacarIdCapturado();
        ponerId(id);
})

// Cuando resuelve la promesa es la que pone el Id en el span IdPropiedad en el form
function ponerId(id){
    idValor(id)
    .then(valor =>{
        idPropiedad.innerText = valor;
    })
    .catch(error =>{
        console.error(error);
    })
}

// Promesa para sacar el valor del ID del localStorage
let idValor = (idCapturado) => {
    return new Promise((resolve, reject) =>{
        if(idCapturado != null){
            resolve(idCapturado)
        }else{
            reject(new Error("Llegó Vacío"));
        }
    })
}


// Función que saca el valor del Id del LocalStorage
async function sacarIdCapturado(){
    let idTraido = await JSON.parse(localStorage.getItem("idCapturado"));
    return idTraido;
}
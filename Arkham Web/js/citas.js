
let fecha = document.querySelector(".fecha");
let hoy = new Date();
let tomorrow = new Date(hoy.getTime() + 86400000); 
let format = tomorrow.toISOString().split('T')[0];
let id;
let idPropiedad = document.querySelector("#idPropiedad");

fecha.setAttribute("min",format);

fecha.addEventListener("input", ()=>{
    // Enviar a la base de datos la fecha para validar las horas disponibles

    let urlBuscarFecha = urlDomain + "/appointment/date";

    axios.post(urlBuscarFecha, {
        date: fecha.value
    })
    .then(response => {
       if(response.status !== 200){
        console.log(response.request.responseText);
       }else{
        cargarHoras(response.data);
       }
    })
    .catch(error => {
        cargarHoras(null);
        console.error(error)
    })


});

// Funcion para cargar las horas según la fecha seleccionada, verificando las horas que ya están ocupadas
function cargarHoras(citasFecha){
    let horasVector = ["08:00:00","10:00:00","12:00:00","14:00:00","16:00:00"];
    let horasOcupadas = [];
    let horasDisponibles = [];

    if(citasFecha != null){
        citasFecha.forEach(cita => {
            horasOcupadas.push(cita.startTime);        
        });
    
        for (let i = 0; i < 5; i++) {
            if(!horasOcupadas.includes(horasVector[i])){
                horasDisponibles.push(horasVector[i]);
            }
            
        }
    
        generarHorasDisponibles(horasDisponibles);
    }else{
        generarHorasDisponibles(horasVector);
    }

}

// Funcion para poner las horas disponibles en el select
function generarHorasDisponibles(horasDisponibles){
    let selectHoras = document.querySelector("#hora");
    let horasElegibles = selectHoras.querySelectorAll(".horaElegible");

    // Limpiar antes de agregar horas disponibles nuevas
    horasElegibles.forEach(hora =>{
        hora.remove();
    })

    // Agregar las horas disponibles
    horasDisponibles.forEach(hora =>{
        let horaOption = document.createElement("option");
        horaOption.classList.add("horaElegible");
        horaOption.value = hora;
        horaOption.textContent = hora;

        selectHoras.appendChild(horaOption);
    })
}

// Controla lo que ocurre apenas se carga la página
window.addEventListener("load", ()=> {
    validarTokenActual();
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

// función para guardar las citas
function guardarCita(){

}
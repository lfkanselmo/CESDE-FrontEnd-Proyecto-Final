
window.addEventListener("DOMContentLoaded", ()=>{
    cargarInmueblesEnVenta();
})


async function cargarInmueblesEnVenta(){
    let urlInmuebles = "http://localhost:8090/api/property/offer/VENTA";

   await fetch(urlInmuebles)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error(error));

}

function cargaInmueble(inmuebles){
    
}
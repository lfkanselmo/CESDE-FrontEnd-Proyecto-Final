// Carga inicial de la página
window.addEventListener("DOMContentLoaded", async () => {
    await cargarInmueblesPorOferta("venta");
    await validarTokenActual();
})
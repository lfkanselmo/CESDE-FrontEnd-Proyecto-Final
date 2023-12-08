// Carga inicial de la página
window.addEventListener("load", async () => {
    await cargarInmueblesPorOferta("arrendamiento");
    await validarTokenActual();
})
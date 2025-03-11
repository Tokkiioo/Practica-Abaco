function generarNumero() {
    const minimo = parseInt(document.getElementById('minimo').value) || 0;
    const maximo = parseInt(document.getElementById('maximo').value) || 0;
    
    // Asegurar que mínimo sea menor que máximo
    const [min, max] = minimo > maximo ? [maximo, minimo] : [minimo, maximo];
    
    // Generar número aleatorio
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('numero').textContent = numero;
}
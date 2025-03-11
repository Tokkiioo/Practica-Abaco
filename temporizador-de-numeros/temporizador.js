let temporizadorActivo = false;
let iteracionActual = 0;
let totalIteraciones = 0;
let historialNumeros = [];

function toggleHistorial() {
    const container = document.getElementById('historialContainer');
    const boton = document.getElementById('btnHistorial');
    
    if (container.style.display === 'none') {
        container.style.display = 'block';
        boton.textContent = 'Ocultar historial';
    } else {
        container.style.display = 'none';
        boton.textContent = 'Mostrar historial';
    }
}

function actualizarHistorial(numero) {
    historialNumeros.push(numero);
    const container = document.getElementById('historialContainer');
    container.innerHTML = historialNumeros
        .map(n => `<span class="numero-historial">${n}</span>`)
        .join('');
    
    // Scroll automático al final
    container.scrollTop = container.scrollHeight;
}

function validarCampos() {
    const minimo = parseInt(document.getElementById('minimo').value);
    const maximo = parseInt(document.getElementById('maximo').value);
    const iteraciones = parseInt(document.getElementById('iteraciones').value);
    const intervalo = parseInt(document.getElementById('intervalo').value);

    const error = document.getElementById('mensajeError');

    if ([minimo, maximo, iteraciones, intervalo].some(isNaN)) {
        error.textContent = "Todos los campos son requeridos!";
        error.style.display = "block";
        return false;
    }

    if (minimo > maximo) {
        error.textContent = "El mínimo debe ser menor que el máximo!";
        error.style.display = "block";
        return false;
    }

    if (intervalo < 100) {
        error.textContent = "El intervalo mínimo es 100ms!";
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
}

function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function iniciarTemporizador() {
    if (temporizadorActivo) return;
            
    if (!validarCampos()) return;

    // Resetear historial al iniciar nueva generación
    historialNumeros = [];
    document.getElementById('historialContainer').innerHTML = '';

    const btnGenerar = document.getElementById('btnGenerar');
    const minimo = parseInt(document.getElementById('minimo').value);
    const maximo = parseInt(document.getElementById('maximo').value);
    totalIteraciones = parseInt(document.getElementById('iteraciones').value);
    const intervalo = parseInt(document.getElementById('intervalo').value);

    temporizadorActivo = true;
    iteracionActual = 0;
    btnGenerar.disabled = true;
    btnGenerar.textContent = "Generando...";

    const ejecutarIteracion = () => {
        if (iteracionActual < totalIteraciones) {
            const numero = generarNumeroAleatorio(minimo, maximo);
            document.getElementById('numero').textContent = numero;
            actualizarHistorial(numero); // <- Añadir esta línea
            iteracionActual++;
            setTimeout(ejecutarIteracion, intervalo);
        } else {
            temporizadorActivo = false;
            btnGenerar.disabled = false;
            btnGenerar.textContent = "Generar";
        }
    };

    ejecutarIteracion();
}

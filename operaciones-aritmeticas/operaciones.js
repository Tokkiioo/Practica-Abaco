let operacionesSeleccionadas = [];
let expresionActual = [];
let resultado = null;

document.querySelectorAll('.boton-operacion').forEach(boton => {
    boton.addEventListener('click', () => {
        const operacion = boton.dataset.operacion;
        boton.classList.toggle('active');

        if (operacionesSeleccionadas.includes(operacion)) {
            operacionesSeleccionadas = operacionesSeleccionadas.filter(op => op !== operacion);
        } else {
            operacionesSeleccionadas.push(operacion);
        }
    });
});

function generarOperacion() {
    const error = document.getElementById('error');
    error.style.display = 'none';

    // Validaciones
    if (operacionesSeleccionadas.length === 0) {
        mostrarError('Selecciona al menos una operación!');
        return;
    }

    // Obtener valores de los inputs
    let min = parseInt(document.getElementById('min').value);
    let max = parseInt(document.getElementById('max').value);
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Validar números
    if (isNaN(min) || isNaN(max) || isNaN(cantidad)) {
        mostrarError('¡Todos los campos numéricos son requeridos!');
        return;
    }

    // Validar rango
    if (min > max) {
        [min, max] = [max, min]; // Intercambiar valores
        document.getElementById('min').value = min;
        document.getElementById('max').value = max;
    }

    if (min === max) {
        mostrarError('¡El mínimo y máximo deben ser diferentes!');
        return;
    }

    if (cantidad < 1) {
        mostrarError('Mínimo 1 operación');
        return;
    }

    // Generar números y operaciones
    expresionActual = [];
    resultado = null;
    document.getElementById('resultado').textContent = '';

    for (let i = 0; i < cantidad + 1; i++) {
        expresionActual.push(Math.floor(Math.random() * (max - min + 1)) + min);
        
        if (i < cantidad) {
            const operacion = operacionesSeleccionadas[
                Math.floor(Math.random() * operacionesSeleccionadas.length)
            ];
            expresionActual.push(operacion);
        }
    }

    mostrarExpresion();
}

function mostrarExpresion() {
    const contenedor = document.getElementById('expresion');
    contenedor.innerHTML = expresionActual.map(item => {
        if (typeof item === 'number') return `<span class="numero">${item}</span>`;
        return `<span class="operador">${formatOperador(item)}</span>`;
    }).join(' ');
}

function formatOperador(operador) {
    const operadores = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return operadores[operador];
}

function mostrarResultado() {
    if (expresionActual.length === 0) {
        mostrarError('Primero genera una operación');
        return;
    }

    try {
        const expresion = expresionActual.join(' ')
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        resultado = eval(expresion);

        // Redondear resultados decimales
        document.getElementById('resultado').textContent =
            Number.isInteger(resultado) ? resultado : resultado.toFixed(2);
    } catch (e) {
        mostrarError('Error en la operación');
    }
}

function mostrarError(mensaje) {
    const error = document.getElementById('error');
    error.textContent = mensaje;
    error.style.display = 'block';
}
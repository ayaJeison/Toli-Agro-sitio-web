const pedido = localStorage.getItem('pedido');

// Obtener la referencia al elemento <ul> donde se mostrarán los <li>
const ul = document.getElementById('resumenc');

const mostrarCantidad = document.getElementById("cantidad");

var pedidofinal = '';


if (pedido) {
    var carrito = JSON.parse(pedido);
    let total = 0;
    carrito.forEach(function(producto, index) {
        total += producto.valor;

        // Crear elemento <li>
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.valor)}`;

        // Crear botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></>';
        btnEliminar.addEventListener('click', function() {
            eliminarDelCarrito(index); // Llamar función para eliminar el producto del carrito
        });

        // Agregar botón de eliminar al <li>
        li.appendChild(btnEliminar);

        // Agregar <li> al <ul>
        ul.appendChild(li);
    });

    // Colocar el total de los items en valor de pesos
    const tot = document.getElementById('total')
    tot.innerText = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total);

    mostrarCantidad.innerText = carrito.length;

    const mensajePedido = generarMensajePedido(carrito, total);
    pedidofinal = mensajePedido;
} else {
    var carrito = [];
}





function agregar(producto) {
    carrito.push(producto);
    mostrarCantidad.innerText = carrito.length;

    localStorage.setItem('pedido', JSON.stringify(carrito))

    // Limpiar contenido anterior del <ul>
    ul.innerHTML = '';

    let total = 0;
    carrito.forEach(function(producto, index) {
        total += producto.valor;

        // Crear elemento <li>
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.valor)}`;

        // Crear botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = '<i class="bi bi-trash3"></>';
        btnEliminar.addEventListener('click', function() {
            eliminarDelCarrito(index); // Llamar función para eliminar el producto del carrito
        });

        // Agregar botón de eliminar al <li>
        li.appendChild(btnEliminar);

        // Agregar <li> al <ul>
        ul.appendChild(li);
    });

    // Colocar el total de los items en valor de pesos
    const tot = document.getElementById('total')
    tot.innerText = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total);

    const mensajePedido = generarMensajePedido(carrito, total);
    pedidofinal = mensajePedido;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('pedido', JSON.stringify(carrito)) // Eliminar el elemento en la posición 'index' del arreglo 'carrito'
    location.reload();
}

// Función para generar el mensaje del pedido
function generarMensajePedido(carrito, total) {
    let mensaje = '¡Hola! Mi pedido es:\n';
    carrito.forEach(function (producto, index) {
        mensaje += `${index + 1}. ${producto.nombre} - ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(producto.valor)}\n`;
    });
    mensaje += `\nTotal: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}`;

    return encodeURIComponent(mensaje); // Codificar el mensaje para ser usado en el enlace
}

function generarEnlaceWhatsApp() {
    const telefono = '573170721473'; // Número de teléfono de WhatsApp
    window.location.href=`https://wa.me/${telefono}/?text=${pedidofinal}`;
}

function vaciar() {
    localStorage.removeItem('pedido');
    location.reload();
}

// El codigo presente en esta hoja de scripts fue elaborado por Jeison Aya de Andrómeda crea, en colaboración para el proyecto ToliAgro
  


var contador = 1;

const textos = [
    '"Cultivos de lechuga"',
    '"Cultivos de papa y otros productos"',
    '"Otros cultivos"'
]
const descripcion = document.getElementById('descripcion');
descripcion.innerText = textos[0]
function avanzar() {
    contador++;


    if (contador === 4) {
        contador = 1;
    }

    for (let a = 1; a <= 3; a++) {
        let elemento = document.getElementById(`activo${a}`);
        if (elemento) {
            if (a === contador) {
                elemento.classList.add('active');
            } else {
                elemento.classList.remove('active');
            }
        }
    }

    const cambio = document.getElementById('cambio');
    cambio.style = `margin-left: -${(contador - 1) * 33.3}%`;

    descripcion.innerText = textos[contador - 1];
}


setInterval(() => {
    avanzar();
}, 7000);


var cambio = false;
function menu(valor) {
    cambio = valor;
    const navegador = document.getElementById('navegador');
    // Obtener el elemento del checkbox por su ID
    var checkbox = document.getElementById('burger');

    // Cambiar el estado del checkbox
    checkbox.checked = valor;

    const mediaQuery = window.matchMedia('(max-width: 765px)');
    // Itera sobre cada elemento y cambia su color a negro
    if (mediaQuery.matches) {
        if (cambio) {
            navegador.style = 'height:calc(100vh - 70px);';
        } else {
            navegador.style = 'height:0);';
        }
    }

}

// Selecciona todos los elementos con la clase 'contenedor'
var sectionRefs = document.querySelectorAll('.contenedor');
// Selecciona el header
var header = document.querySelector('header');
var whatsapp = document.querySelector('.whatsapp');
let options = { threshold: 0.3 };


const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.target === sectionRefs[0]) {

            var nombreElements = document.querySelectorAll('.links');
            var nombreElements2 = document.querySelector('.links2');
            var navbars = document.querySelectorAll('.navbar');
            if (!entry.isIntersecting) {
                header.style.color = 'black'; // Cambia 'nuevoColor' por el color que desees
                header.style.background = "white";

                whatsapp.style = "right:20px;"

                const mediaQuery = window.matchMedia('(max-width: 765px)');
                // Itera sobre cada elemento y cambia su color a negro
                if (mediaQuery.matches) {

                } else {
                    nombreElements.forEach((element) => {
                        element.style.color = 'black';
                    });
                }

                nombreElements2.style.color='black';

                navbars.forEach((element) => {
                    element.style.background = 'black';
                });

            } else {
                header.style.color = 'white'; // Resetea el color del header
                header.style.background = "transparent";
                nombreElements.forEach((element) => {
                    element.style.color = 'white';
                });
                nombreElements2.style.color='white';
                navbars.forEach((element) => {
                    element.style.background = 'white';
                });
            }
        }

        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
};

// Itera sobre cada elemento en la colección
sectionRefs.forEach((sectionRef) => {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(sectionRef);
});



function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var targetPosition = targetElement.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'), 1000);
    });
});


//Función para enviar datos
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    
    // Recopila los datos del formulario
    const formData = new FormData(this);
    
    // Convierte FormData a un objeto JSON
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Enviar los datos a la API usando fetch
    fetch('https://toliagro.andromedacrea.com/correo/app/correo.php', { // Reemplaza esta URL con la URL de tu API
      method: 'POST', // Método de la petición
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
        // Puedes añadir más headers aquí si es necesario
      },
      body: JSON.stringify(data) // Convierte el objeto JSON a una cadena JSON
    })
    .then(response => response.text()) // Convierte la respuesta a JSON
    .then(result => { // Maneja la respuesta exitosa
      alert('Formulario enviado con éxito');
    })
    .catch(error => {
      console.error('Error:', error); // Maneja los errores
      alert('Hubo un error al enviar el formulario');
    });
  });

// El codigo presente en esta hoja de scripts fue elaborado por Jeison Aya de Andrómeda crea, en colaboración para el proyecto ToliAgro
  




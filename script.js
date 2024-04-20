
const url = "https://hp-api.onrender.com/api/characters";


async function mostrarPersonaje(nombreBusqueda) {
    try {
        const response = await fetch(`${url}?name=${nombreBusqueda}`);
        const personajes = await response.json();

        const cardList = document.querySelector(".ul__cards");

        // Limpiar la lista de cartas antes de mostrar el resultado
        cardList.innerHTML = "";

        if (personajes.length > 0) {
            const personaje = personajes[0]; // Tomar el primer personaje (debería ser único)

            const contenido = `
                <li class="card">
                    <img class="card__image" src="${personaje.image}" alt="${personaje.name}">
                    <h3 class="card__title">${personaje.name}</h3>
                    <h3 class="card__title">${personaje.house}</h3>
                    <h3 class="card__title">${personaje.yearOfBirth}</h3>
                </li>
            `;

            cardList.innerHTML = contenido;
        } else {
            cardList.innerHTML = `<li>No se encontró ningún personaje con el nombre "${nombreBusqueda}"</li>`;
        }
    } catch (error) {
        console.log(error);
    }
}

function buscarImagenes() {
    const input = document.getElementById("searchInput");
    const nombreBusqueda = input.value.trim();

    if (nombreBusqueda === "") {
        return; // No hacer nada si el campo de búsqueda está vacío
    }

    mostrarPersonaje(nombreBusqueda);
}

// Asignar la función buscarImagenes() al evento click del botón de búsqueda
const searchButton = document.querySelector(".header__button");
searchButton.addEventListener("click", buscarImagenes);

// Cargar las primeras 25 imágenes al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(url);
        const datosImagenes = await response.json();

        const cardList = document.querySelector(".ul__cards");

        // Limitar a solo los primeros 25 personajes al cargar la página
        datosImagenes.slice(0, 25).forEach(elemento => {
            const contenido = `
                <li class="card">
                    <img class="card__image" src="${elemento.image}" alt="${elemento.name}">
                    <h3 class="card__title">${elemento.name}</h3>
                    <h3 class="card__title">${elemento.house}</h3>
                    <h3 class="card__title">${elemento.yearOfBirth}</h3>
                </li>
            `;
            cardList.innerHTML += contenido;
        });
    } catch (error) {
        console.log(error);
    }
});

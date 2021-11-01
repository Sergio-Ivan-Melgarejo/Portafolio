"use stric"

const abrirCof = document.getElementById("abrir-cof");
const navSuperior = document.getElementById("nav-superior");
const cerrarCof = document.getElementById("cerrar-menu-sup");

//funciones

//Event

abrirCof.addEventListener("click", () => {
    navSuperior.style.animation = "abrirNavSup 2s forwards";
})

cerrarCof.addEventListener("click", () => {
    navSuperior.style.animation = "cerrarNavSup 2s forwards";
})
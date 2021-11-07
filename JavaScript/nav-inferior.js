"use strict"

import { navSuperior, cambiarNombreAvatar} from "./nav-superior.js"

//Declaraciones

const navInferior = document.getElementById("nav-inferior");
const avatar = document.querySelector(".nav-inferior-imagen");
export const nombreUsuario = document.getElementById("nombreDeUsuario");
const menuMovil = document.querySelector(".nav-inferior__bars");
const subMenu = document.querySelector(".nav-inferior__sub-menu");
//Funciones

//Eventos

navInferior.addEventListener("click", (e) => {
    let evento = e.target.classList;

    if ( evento.contains("nav-inferior-imagen" )){
        navSuperior.classList.toggle("cerrados")
    }

    if ( e.target.getAttribute("id") == "nombreDeUsuario" ){
        navSuperior.classList.toggle("cerrados")
        cambiarNombreAvatar()
    }

    if ( evento.contains("nav-inferior__bars") ) {
        subMenu.classList.toggle("abiertos");
        menuMovil.parentNode.classList.toggle("bars-selecionado");
    }
});

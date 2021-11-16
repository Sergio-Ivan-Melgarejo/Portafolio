"use strict"

import { navSuperior, cambiarNombreAvatar} from "./nav-superior.js"
import { main } from "./main.js";

//Declaraciones

const navInferior = document.getElementById("nav-inferior");
// const avatar = document.querySelector(".nav-inferior-imagen");
export const nombreUsuario = document.getElementById("nombreDeUsuario");
const menuMovil = document.querySelector(".nav-inferior__bars");
const subMenu = document.querySelector(".nav-inferior__sub-menu");
// abrir main desde trabajos
const mainFrontMentor = document.querySelector(".main__front-mentor");
const mainProjectos = document.querySelector(".main__projectos");
const mainJuegos = document.querySelector(".main__juegos");
const mainProximamente = document.querySelector(".main__proximamente");
let evitarClickConpulsivos = true;
// abrir nav-inferior en modo movil de costado
const fletaAbrirNanInf = document.getElementById("abrir-nav-inferior");
//Funciones

//Eventos

navInferior.addEventListener("click", (e) => {
    let evento = e.target;

    if ( evento.classList.contains("nav-inferior-imagen" )){
        navSuperior.classList.toggle("cerrados");
    }

    if ( evento.getAttribute("id") == "nombreDeUsuario" ){
        navSuperior.classList.toggle("cerrados");
        cambiarNombreAvatar();
    }

    if ( evento.classList.contains("nav-inferior__bars") ) {
        subMenu.classList.toggle("abiertos");
        menuMovil.parentNode.classList.toggle("bars-selecionado");
    }

    /* mostrar animacion de donde esta main  */

    if (evento.classList.contains("nav-inferior__trabajos") && evitarClickConpulsivos) {
        evitarClickConpulsivos = false

        evento.classList.add("nav-i__trabajos-click");
        mainFrontMentor.classList.add("nav-i__animacion-trabajos-1");
        mainFrontMentor.setAttribute("data-animacion-trabajos", "activo");
        mainProjectos.classList.add("nav-i__animacion-trabajos-2");
        mainProjectos.setAttribute("data-animacion-trabajos", "activo");   
        mainJuegos.classList.add("nav-i__animacion-trabajos-3");
        mainJuegos.setAttribute("data-animacion-trabajos", "activo"); 
        mainProximamente.classList.add("nav-i__animacion-trabajos-4");
        mainProximamente.setAttribute("data-animacion-trabajos", "activo");
        main.classList.add("nav-i__animacion-main");

        setTimeout( () => {
            evento.classList.remove("nav-i__trabajos-click");
            mainFrontMentor.classList.remove("nav-i__animacion-trabajos-1");
            mainFrontMentor.removeAttribute("data-animacion-trabajos");
            mainProjectos.classList.remove("nav-i__animacion-trabajos-2"); 
            mainProjectos.removeAttribute("data-animacion-trabajos");  
            mainJuegos.classList.remove("nav-i__animacion-trabajos-3"); 
            mainJuegos.removeAttribute("data-animacion-trabajos"); 
            mainProximamente.classList.remove("nav-i__animacion-trabajos-4");
            mainProximamente.removeAttribute("data-animacion-trabajos");
            main.classList.remove("nav-i__animacion-main");

            evitarClickConpulsivos = true
        } ,5000);
    }
})

fletaAbrirNanInf.addEventListener("click", () => {
    navInferior.classList.toggle("nav-inferior-abierto");
})
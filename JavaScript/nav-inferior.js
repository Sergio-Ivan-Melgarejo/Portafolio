"use strict"

import { navSuperior, cambiarNombreAvatar} from "./nav-superior.js"

//Declaraciones

const navInferior = document.getElementById("nav-inferior");
const avatar = document.querySelector(".nav-inferior-imagen");
export const nombreUsuario = document.getElementById("nombreDeUsuario");
const menuMovil = document.querySelector(".nav-inferior__bars");
const subMenu = document.querySelector(".nav-inferior__sub-menu");
// abrir main desde trabajos
const mainFrontMentor = document.querySelector(".main__front-mentor");
const mainProjectos = document.querySelector(".main__projectos");
const mainJuegos = document.querySelector(".main__juegos");
const mainProximamente = document.querySelector(".main__proximamente");

//Funciones

//Eventos

navInferior.addEventListener("click", (e) => {
    let evento = e.target;

    if ( evento.classList.contains("nav-inferior-imagen" )){
        navSuperior.classList.toggle("cerrados")
    }

    if ( evento.getAttribute("id") == "nombreDeUsuario" ){
        navSuperior.classList.toggle("cerrados")
        cambiarNombreAvatar()
    }

    if ( evento.classList.contains("nav-inferior__bars") ) {
        subMenu.classList.toggle("abiertos");
        menuMovil.parentNode.classList.toggle("bars-selecionado");
    }

    /* mostrar animacion de donde esta main  */

    if (evento.classList.contains("nav-inferior__trabajos")) {
        
        evento.classList.add("main__trabajos-click");
        mainFrontMentor.classList.add("main__animacion-trabajos-1");
        mainProjectos.classList.add("main__animacion-trabajos-2");   
        mainJuegos.classList.add("main__animacion-trabajos-3"); 
        mainProximamente.classList.add("main__animacion-trabajos-4");

        setTimeout( () => {
            mainFrontMentor.classList.remove("main__animacion-trabajos-1");
            mainProjectos.classList.remove("main__animacion-trabajos-2");   
            mainJuegos.classList.remove("main__animacion-trabajos-3"); 
            mainProximamente.classList.remove("main__animacion-trabajos-4");
            console.log(mainFrontMentor)
            evento.classList.remove("main__trabajos-click");
        } ,4600)
        console.log(mainFrontMentor)
    }
})



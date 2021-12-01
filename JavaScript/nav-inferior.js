"use strict"

import { navSuperior, cambiarNombreAvatar} from "./nav-superior.js"
import { main, comprobarAbiertosMain } from "./main.js";
import { contraerHeader, abrirHeader } from "./code-inicio.js";
import { footer } from "./footer.js";

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
const flechaAbrirNanInf = document.getElementById("abrir-nav-inferior");
//Funciones

//Eventos

addEventListener("DOMContentLoaded", () => {
        
    navInferior.addEventListener("click", (e) => {
        let evento = e.target;

        if ( evento.classList.contains("nav-inferior-imagen" )){
            navSuperior.classList.toggle("cerrados");
            contraerHeader();
        }

        if ( evento.getAttribute("id") == "nombreDeUsuario" ){
            navSuperior.classList.toggle("cerrados");
            cambiarNombreAvatar();
            contraerHeader();
        } 

        if ( evento.classList.contains("nav-inferior__bars") ) {
            subMenu.classList.toggle("abiertos");
            menuMovil.parentNode.classList.toggle("bars-selecionado"); 
          
        }

        if ( evento.classList.contains("nav-inferior__sobre-mi") ) {
            subMenu.classList.toggle("abiertos");

            for ( let i = 0; i < main.children.length; i++){
                if ( main.children[i] !== footer && !main.children[i].classList.contains("header") ){
                    main.children[i].classList.remove("main__item-flex-selecionado");
                }
            }
            footer.classList.contains("main__item-flex-selecionado") ? footer.classList.remove("main__item-flex-selecionado") : footer.classList.add("main__item-flex-selecionado");
        
            ( footer.classList.contains("main__item-flex-selecionado") ) ? contraerHeader() : abrirHeader();
            
        }
        
        /* mostrar animacion de donde estan los trabajos  */

        if (evento.classList.contains("nav-inferior__trabajos") && evitarClickConpulsivos) {
            evitarClickConpulsivos = false
            subMenu.classList.toggle("abiertos");
            menuMovil.parentNode.classList.toggle("bars-selecionado");
            // comprobarAbiertosMain();

            evento.classList.add("nav-i__trabajos-click");
            mainFrontMentor.classList.add("nav-i__animacion-trabajos");
            mainFrontMentor.setAttribute("data-animacion-trabajos", "activo");
            mainProjectos.classList.add("nav-i__animacion-trabajos");
            mainProjectos.setAttribute("data-animacion-trabajos", "activo");   
            mainJuegos.classList.add("nav-i__animacion-trabajos");
            mainJuegos.setAttribute("data-animacion-trabajos", "activo"); 
            mainProximamente.classList.add("nav-i__animacion-trabajos");
            mainProximamente.setAttribute("data-animacion-trabajos", "activo");

            setTimeout( () => {
                evento.classList.remove("nav-i__trabajos-click");
                mainFrontMentor.classList.remove("nav-i__animacion-trabajos");
                mainFrontMentor.removeAttribute("data-animacion-trabajos");
                mainProjectos.classList.remove("nav-i__animacion-trabajos"); 
                mainProjectos.removeAttribute("data-animacion-trabajos");  
                mainJuegos.classList.remove("nav-i__animacion-trabajos"); 
                mainJuegos.removeAttribute("data-animacion-trabajos"); 
                mainProximamente.classList.remove("nav-i__animacion-trabajos");
                mainProximamente.removeAttribute("data-animacion-trabajos");

                evitarClickConpulsivos = true;
            } ,2100);
        }
    })

    flechaAbrirNanInf.addEventListener("click", () => {
        navInferior.classList.toggle("nav-inferior-abierto");
    })    
})
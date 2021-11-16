"use strict"

import { nombreUsuario } from "./nav-inferior.js";

// Declaraciones
const header = document.getElementById("header");
const headerTitulo = document.getElementById("header-h1");
const headerBotonconf = document.getElementById("header-boton-conf");
const headerImg = document.getElementById("header-img");
const headerNombreUsuario = document.getElementById("header-nombre-usuario");
// para obtener nombre
const avatarDeNavInf = document.querySelector(".nav-inferior-imagen");

// Funciones

const efectoCambiarColor = ( nombreSetInt, id, colorUno, colorDos, colorCambio ) => {
    const elementoHTML = document.getElementById(`${id}`);
    const texto = elementoHTML.textContent;
    const array = texto.split("");

    let i = 0;
    let fragmento = document.createDocumentFragment();

    for( i; i < array.length; i++ ){
        let span = document.createElement("span");
        span.textContent = array[i];
        fragmento.appendChild(span)
    }

    elementoHTML.textContent = "";
    elementoHTML.appendChild(fragmento);

    i--
    elementoHTML.children[i].style.color = colorCambio;
    i--

    let vuelta = "1";

    nombreSetInt = setInterval( () => {
// comprueba si termino o empieza
        if ( i == -1 ) {
            i = 1;
            elementoHTML.children[0].style.color = colorCambio;
            vuelta = "2";
        }

        if ( i == array.length ) {
            i = array.length - 2;
            elementoHTML.children[ (array.length - 1) ].style.color = colorCambio;
            vuelta = "1";
        }

// imprime / borra
        if( vuelta === "1" ) {
            if( elementoHTML.textContent[i] == " " ){
                elementoHTML.children[(i - 1)].style.color = colorCambio;
                elementoHTML.children[(i + 1)].style.color = colorDos;
                i -= 2;
            }
            else{
                elementoHTML.children[i].style.color = colorCambio;
                elementoHTML.children[(i + 1)].style.color = colorDos;
                i--;
            }
        }
        else {
            if( elementoHTML.textContent[i] == " " ){
                elementoHTML.children[(i + 1)].style.color = colorCambio;
                elementoHTML.children[(i - 1)].style.color = colorUno;
                i += 2;
            }
            else{
                elementoHTML.children[i].style.color = colorCambio;
                elementoHTML.children[(i - 1)].style.color = colorUno;
                i++;
            }
        }

//frena al darle x del header
        if ( elementoHTML.getAttribute("data-parar") ){
            clearInterval( nombreSetInt )
        }
    }, 350);
}

const efectoEscribir = ( nombreSetInt, id, ...textos ) => {
    const elementoHTML = document.getElementById(`${id}`);
    if ( elementoHTML.textContent != "" ) textos.unshift( elementoHTML.textContent );
    elementoHTML.textContent = "";

    let i = 0;
    const texto = textos[i];
    let array = texto.split("");

    let fragmento = document.createDocumentFragment();
    for( i; i <= array.length; i++ ){
        let span = document.createElement("span");
        span.textContent = array[i] || "_";
        fragmento.appendChild(span)
    }
    elementoHTML.appendChild(fragmento);
    i -= 2

    let imprimido = "si";
    let palabraActual = 0;

    nombreSetInt = setInterval(() => {
//frena al darle x del header
        if ( elementoHTML.getAttribute("data-parar") ){
            clearInterval( nombreSetInt )
        }

// comprueba si esta impresa
        if ( i <= -1 ) {
            elementoHTML.children[0].textContent = array[i];

            imprimido = "no";
            palabraActual++
            i = 0;
        }

        if ( i >= array.length ) {
            i = array.length - 1;
            imprimido = "si";
        }

// comprueba para pasar a la otra palabra
        if ( palabraActual >= textos.length ) palabraActual = 0;
        if ( array !== textos[palabraActual] ) array = textos[palabraActual];

// imprime / borra
        if( imprimido == "si" ) {
            elementoHTML.removeChild( elementoHTML.children[i] )
            i--;
            
        }
        else {
            let span = document.createElement("span");
            span.textContent = "_";
            elementoHTML.appendChild( span );
            elementoHTML.children[i].textContent = array[i];
            i++ 
        }
    }, 200);
}

// Evento

addEventListener("DOMContentLoaded", () => {

    header.addEventListener("click", (e) => {
        let evento = e.target;

        if ( evento.classList.contains("header__boton-x") ) {
            evento.parentNode.style.animation = "eliminarHeader 1s forwards";
            setTimeout( () => {
                evento.parentNode.parentNode.removeChild(evento.parentNode);
                headerTitulo.setAttribute("data-parar", "true");
                headerBotonconf.setAttribute("data-parar", "true");
            }, 1100);
        }

    })

    headerImg.setAttribute( "src" , avatarDeNavInf.getAttribute( "src") );
    headerNombreUsuario.textContent = nombreUsuario.textContent;

    efectoCambiarColor( "efectoH1", "header-h1" , "var(--color-1)" , "transparent" , "var(--color-3)" );
    efectoCambiarColor( "efectoNombreUsuario" , "header-nombre-usuario" , "var(--color-4)" , "var(--color-1)", "var(--color-3)" );
    efectoEscribir( "efectoBotonConf" , "header-boton-conf" , "Editar Avatar" , "Cambiar Nombre" , "Cambiar Imagen de Fondo" , "Cambiar Tema" );


});

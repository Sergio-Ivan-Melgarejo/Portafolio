"use strict"

import { nombreUsuario } from "./nav-inferior.js";
import { navSuperior } from "./nav-superior.js"

// Declaraciones
const header = document.getElementById("header");
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
    }, 300);
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
    console.log("no paro")
    }, 300);
}

// para poder frenarlo y reiniciarlo

const IniciarEfectos = () => {
    efectoCambiarColor( "efectoH1", "header-h1" , "var(--color-4)" , "var(--color-2)" , "var(--color-3)" );
    efectoCambiarColor( "efectoNombreUsuario" , "header-nombre-usuario" , "var(--color-4)" , "var(--color-2)", "var(--color-3)" );
    efectoEscribir( "efectoBotonConf" , "header-boton-conf" , "Avatar" , "Nombre" , "Imagen de Fondo" , "Temas", "Fuentes" );
}

const frenarEfectos = () => {
    const headerBotonconf = document.getElementById("header-boton-conf");
    const headerTitulo = document.getElementById("header-h1");
    setTimeout( () => {
        headerTitulo.setAttribute("data-parar", "true");
        headerBotonconf.setAttribute("data-parar", "true");
    }, 1100);

}

export const contraerHeader = () => {
    frenarEfectos()
    setTimeout(() => {
        
    }, 1100);
}

export const abrirHeader = () => {
    IniciarEfectos()
}

const cerrarHeader = () => {
    const header = document.getElementById("header");
    console.log(header)
    if (header) {
        header.style.animation = "eliminarHeader 1s forwards";
        frenarEfectos();
        setTimeout( () => {
            header.parentNode.removeChild(header);
        }, 1100);
    }
}

// Evento

addEventListener("DOMContentLoaded", () => {

    header.addEventListener("click", (e) => {
        let evento = e.target;

        if ( evento.classList.contains("header__boton-x") ) {
            cerrarHeader()
        }

        // Abrir nav-superior

        if ( evento.classList.contains("header__boton-conf") ){
            navSuperior.classList.toggle("cerrados");
        }

    })

    headerImg.setAttribute( "src" , avatarDeNavInf.getAttribute( "src") );
    headerNombreUsuario.textContent = nombreUsuario.textContent;

    IniciarEfectos();
});

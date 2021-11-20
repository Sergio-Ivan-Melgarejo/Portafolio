"use strict"

import { navSuperior } from "./nav-superior.js"

// Declaraciones
const header = document.getElementById("header");

// Funciones

const efectoCambiarColor = ( nombreSetInt, id, colorUno, colorDos, colorCambio ) => {
    // toma el elmento 
    const elementoHTML = document.getElementById(`${id}`);

    if ( elementoHTML.getAttribute("data-efecto-cambiar-color") == null ) {
        // para evitar duplicado
        elementoHTML.setAttribute("data-efecto-cambiar-color", "activo");

        // tomo su texto
        const texto = elementoHTML.textContent;

        // tomo el texto y creo un array de span que estaran en el div
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

            // frena al darle x del header
            if ( elementoHTML.getAttribute("data-parar") ){
                clearInterval( nombreSetInt )
            }
        }, 300);      
    }
}

const efectoEscribir = ( nombreSetInt, id, ...textos ) => {
    const elementoHTML = document.getElementById(`${id}`);

    if ( elementoHTML.children.length < 1 ){
        let i = 0;
        const texto = textos[i];
        let array = texto.split("");
    
        let div = document.createElement("div");
        div.classList.add("efecto-escribir");
    
        for( i; i <= array.length; i++ ){
            let span = document.createElement("span");
            span.textContent = array[i] || "_";
            div.appendChild(span)
        }
    
        elementoHTML.appendChild(div);
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
                div.children[0].textContent = array[i];
    
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
                div.removeChild( div.children[i] )
                i--;
                
            }
            else {
                let span = document.createElement("span");
                span.textContent = "_";
                div.appendChild( span );
                div.children[i].textContent = array[i];
                i++ 
            }
        console.log("escribir")
        }, 300);
    }
}

// para poder frenarlo y reiniciarlo

const IniciarEfectos = () => {
    // obtengo los elementos necesario para reininiar efectos
    const headerTitulo = document.getElementById("header-h1");
    const headerImg = document.getElementById("header-img");
    const headerNombreUsuario = document.getElementById("header-nombre-usuario");
    const headerBotonconf = document.getElementById("header-boton-conf");

    // para obtener nombre y img del nav-inferior
    const avatarDeNavInf = document.querySelector(".nav-inferior-imagen");
    const nombreUsuario = document.getElementById("nombreDeUsuario");

    // añado la img y nombre del nav-inferior
    headerImg.setAttribute( "src" , avatarDeNavInf.getAttribute( "src") );
    if ( headerNombreUsuario.getAttribute("data-efecto-cambiar-color") == null ) headerNombreUsuario.textContent = nombreUsuario.textContent;

    headerTitulo.removeAttribute("data-parar");
    headerNombreUsuario.removeAttribute("data-parar");
    headerBotonconf.removeAttribute("data-parar");

    efectoCambiarColor( "efectoH1", "header-h1" , "var(--color-4)" , "var(--color-2)" , "var(--color-3)" );
    efectoCambiarColor( "efectoNombreUsuario" , "header-nombre-usuario" , "var(--color-4)" , "var(--color-2)", "var(--color-3)" );
    efectoEscribir( "efectoBotonConf" , "header-boton-conf" , "Configuraciones" , "Avatar" , "Nombre" , "Imagen de Fondo" , "Temas", "Fuentes" );
}

const frenarEfectos = () => {
    const headerTitulo = document.getElementById("header-h1");
    const headerBotonconf = document.getElementById("header-boton-conf");
    const headerNombreUsuario = document.getElementById("header-nombre-usuario");

    headerBotonconf.removeChild( headerBotonconf.children[0] );
    headerNombreUsuario.removeAttribute("data-efecto-cambiar-color");
    headerTitulo.removeAttribute("data-efecto-cambiar-color");

    setTimeout( () => {
        headerTitulo.setAttribute("data-parar", "true");
        headerBotonconf.setAttribute("data-parar", "true");
        headerNombreUsuario.setAttribute("data-parar", "true");
    }, 0);
}

export const contraerHeader = () => {
    const header = document.getElementById("header");
    // evitar ejecutar si esta eliminado o ya contraido
    if ( header !== null && !header.classList.contains("header-contraido") ) {
        header.classList.add("header-contraido");
        if (header) {
            frenarEfectos();
            setTimeout( () => {
            }, 0);
        }
    }
}

export const abrirHeader = () => {
    const header = document.getElementById("header");
    // evitar ejecutar si esta eliminado y no contraido
    if ( header !== null && header.classList.contains("header-contraido") ) {
        header.classList.remove("header-contraido");
        IniciarEfectos()
    }
}

const eliminarHeader = () => {
    const header = document.getElementById("header");
        header.style.animation = "eliminarHeader 500ms forwards";
    if (header) {
        frenarEfectos();
        setTimeout( () => {
            header.parentNode.removeChild(header);
        }, 500);
    }
}

// Evento

addEventListener("DOMContentLoaded", () => {

    header.addEventListener("click", (e) => {
        let evento = e.target;

        if ( evento.classList.contains("header__boton-x") ) {
            eliminarHeader()
        }

        // Abrir nav-superior

        if ( evento.classList.contains("header__flecha2") || evento.parentNode.classList.contains("efecto-escribir") ){
            navSuperior.classList.toggle("cerrados");
            contraerHeader();
        }

    })
    IniciarEfectos();
});
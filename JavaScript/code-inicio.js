"use strict"

// Declaraciones
const header = document.getElementById("header");

// Funciones

const efectoEscribir = ( id, colorUno, colorDos, colorCambio ) => {
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

    setInterval( () => {

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

        console.log(i)
    }, 400);

}

// Evento

addEventListener("DOMContentLoaded", () => {

    header.addEventListener("click", (e) => {
        let evento = e.target;

        if ( evento.classList.contains("header__boton-x") ) {
            evento.parentNode.style.animation = "eliminarHeader 1s forwards";
            setTimeout( () => {
                evento.parentNode.parentNode.removeChild(evento.parentNode)
            }, 1100);
        }
    })

    efectoEscribir("header-h1", "var(--color-4)", "var(--color-1)", "var(--color-3)")
})
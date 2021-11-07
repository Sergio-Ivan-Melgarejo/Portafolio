"use strict"

//Declaraciones

const main = document.getElementById("main");
let memorizacion;

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    if ( evento.classList.contains("main__abrir-i") ) {
        evento.parentNode.parentNode.classList.toggle("main__item-flex-selecionado");
        if ( memorizacion != undefined && memorizacion != evento.parentNode.parentNode ) {
            memorizacion.classList.remove("main__item-flex-selecionado");
        }
        memorizacion = evento.parentNode.parentNode ;
    }

    if ( evento.classList.contains("main__filtro-boton") ) {
        let menufiltro = evento.parentNode.parentNode.children[1];
        menufiltro.classList.toggle("filtro-abierto");
    }
})
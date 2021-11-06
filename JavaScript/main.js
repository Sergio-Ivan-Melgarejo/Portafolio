"use strict"

//Declaraciones

const main = document.getElementById("main");
let memorizacion;

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    if ( evento.classList.contains("main__item-flex") ) {
        evento.classList.add("main__item-flex-selecionado");
        if ( memorizacion != undefined && memorizacion != evento ) memorizacion.classList.remove("main__item-flex-selecionado");
        memorizacion = evento ;
    }
})
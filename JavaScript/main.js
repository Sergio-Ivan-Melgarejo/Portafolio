"use strict"

//Declaraciones

const main = document.getElementById("main");
let memorizacion;

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    if ( evento.classList.contains("main__abrir-i") ) {
        let secionElejida = evento.parentNode.parentNode;
        secionElejida.classList.toggle("main__item-flex-selecionado");

        if ( memorizacion != undefined && memorizacion != secionElejida ) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }
    
        memorizacion = secionElejida ;
    }

    /* abrir footer */

    if ( evento.classList.contains("main__abrir-footer") ) {
        evento.classList.toggle("main__footer-selecionado");

        if ( memorizacion != undefined && memorizacion != evento ) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }
    
        memorizacion = evento ;
    }

    /* ___________ */

    if ( evento.classList.contains("main__filtro-boton") ) {
        let menufiltro = evento.parentNode.parentNode.children[1];
        menufiltro.classList.toggle("filtro-abierto");
    }
})
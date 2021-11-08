"use strict"

//Declaraciones

const main = document.getElementById("main");
let memorizacion;
//Dato de las paginas a mostrar
let datos = "nada";
const divPaginas = document.querySelector(".main__paginas");

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    /* contraccion de secciones de main  */

    if ( evento.classList.contains("main__abrir-i") ) {
        let secionElejida = evento.parentNode.parentNode;
        secionElejida.classList.toggle("main__item-flex-selecionado");

        if ( memorizacion != undefined && memorizacion != secionElejida ) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }
    
        memorizacion = secionElejida ;
    }


    /* obtener las paginas */

    if ( evento.classList.contains("main__abrir-i") ) {
        if( datos === "nada" ) {
            fetch("./Data/Data-paginas.json").then( res  => {
                return res.json()
            }).then( res => {
                datos = res;
                mostrarPaginas();
            })
        }
        else mostrarPaginas();
    }

    /* filtro de paginas */

    if ( evento.classList.contains("main__filtro-boton") ) {
        let menufiltro = evento.parentNode.parentNode.children[1];
        menufiltro.classList.toggle("filtro-abierto");
    }

    /* abrir footer */

    if ( evento.classList.contains("main__abrir-footer") ) {
        evento.classList.toggle("main__footer-selecionado");

        if ( memorizacion != undefined && memorizacion != evento ) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }
    
        memorizacion = evento ;
    }

});

const mostrarPaginas = () => {

//obtiene dato

//pasa filtro y ordena

//si esta buscador aplica y reordena

//muestra segun filtro y buscador


}

const crearPagina = ( pagina ) => {
    
    const divPagina = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const divFooter = document.createElement("div");
    const pLenguaje = document.createElement("p");
    const spanLenguaje = document.createElement("span");
    const a = document.createElement("a");
    const pDificultad = document.createElement("p");
    const spanDificultad = document.createElement("span");

    divPagina.setAttribute("main__pagina");
    img.setAttribute("main__pagina-img");
    h3.setAttribute("main__pagina-titulo");
    divFooter.setAttribute("main__pagina-footer");
    pLenguaje.setAttribute("main__pagina-lenguaje");
    spanLenguaje.setAttribute("main__pagina-lenguaje-span");
    a.setAttribute("main__pagina-link");
    pDificultad.setAttribute("main__pagina-dificultad");
    spanDificultad.setAttribute("main__pagina-dificultad-span");

    img.setAttribute("src", pagina.url);
    img.setAttribute("alt", `imagen de ${pagina.titulo}`)

    h3.textContent = pagina.titulo;

    pLenguaje.textContent = "Lenguaje: ";
    spanLenguaje.textContent = pagina.lenguaje;

    a.textContent = "Link";

    pDificultad.textContent = "Dificultad: ";
    spanDificultad.textContent = pagina.dificultad;

    



}

const buscador = () => {

}

const filtro = () => {

}

// const mostrarModaldeCarga = () => {

// }
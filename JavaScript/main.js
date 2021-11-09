"use strict"

//Declaraciones

const main = document.getElementById("main");
//para cerrar el ultimo abierto
let memorizacion;
//donde pondre los Datos de las paginas a mostrar
let datos = "nada";
const divPaginas = document.querySelector(".main__paginas");
let primerClickFrontMentor = true,
primerClickProjectos = true,
primerClickJuegos = true,
primerClickTrabajo = true;
//buscador
const buscadorFrontMentor = document.getElementById("buscador__front-mentor");

//Funciones

//primer parametro es el padre que los contiene atodos, segundo opcional del buscador, tercero opcional del filtro
const mostrarPaginas = (eventoPadre, resbuscador = false, resFiltro = false) => {

    //obtiene dato para editar
    let datoAMostrar = datos;

    //si esta resBuscador aplica y reordena
    if (resbuscador) {
        let bus = resbuscador.toLowerCase();
        datoAMostrar = datoAMostrar.filter(elemento => {
            let titulo = elemento.datos.titulo.toLowerCase();
            let lenguaje = elemento.datos.lenguaje.toLowerCase();
            let dificultad = elemento.datos.dificultad.toLowerCase();
            return (
                titulo.includes(bus) ||
                lenguaje.includes(bus) ||
                dificultad.includes(bus)
            )
        });
    }

    //pasa filtro y ordena
    // if ( resFiltro ){
    //     let bus = resbuscador.toLowerCase();
    //     datoAMostrar = datoAMostrar.filter( elemento => {
    //         let titulo = elemento.datos.titulo.toLowerCase();
    //         let lenguaje = elemento.datos.lenguaje.toLowerCase();
    //         let dificultad = elemento.datos.dificultad.toLowerCase();
    //         return ( 
    //             titulo.includes(bus) || 
    //             lenguaje.includes(bus) || 
    //             dificultad.includes(bus) 
    //             )
    //     });
    // }

    // let mostrarDeA = filtro() || 5;
    let mostrarDeA = 4;
    let paginaActual = 0;

    datoAMostrar = datoAMostrar.slice(paginaActual * mostrarDeA, (1 + paginaActual) * mostrarDeA);


    //muestra segun filtro y buscador
    let paginas = document.createElement("div");
    paginas.classList.add("main__paginas");

    for (let i = 0; i < datoAMostrar.length; i++) {
        let pagina = crearPagina(datoAMostrar[i]);
        paginas.appendChild(pagina);
    }

    let padre = eventoPadre.children[1];
    let hijo = eventoPadre.children[1].children[2];


    padre.replaceChild(paginas, hijo);
}

//recipe los datos de una pagina para armarlos antes de mostrar
const crearPagina = (pagina) => {

    //lo creo
    const divPagina = document.createElement("div");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const divFooter = document.createElement("div");
    const pLenguaje = document.createElement("p");
    const spanLenguaje = document.createElement("span");
    const a = document.createElement("a");
    const pDificultad = document.createElement("p");
    const spanDificultad = document.createElement("span");

    //doy clase
    divPagina.classList.add("main__pagina");
    img.classList.add("main__pagina-img");
    h3.classList.add("main__pagina-titulo");
    divFooter.classList.add("main__pagina-footer");
    pLenguaje.classList.add("main__pagina-lenguaje");
    spanLenguaje.classList.add("main__pagina-lenguaje-span");
    a.classList.add("main__pagina-link");
    pDificultad.classList.add("main__pagina-dificultad");
    spanDificultad.classList.add("main__pagina-dificultad-span");

    //le doy el contenido y atributos
    img.setAttribute("src", pagina.datos.imagen);
    img.setAttribute("alt", `imagen de ${pagina.datos.titulo}`)
    h3.textContent = pagina.datos.titulo;
    pLenguaje.textContent = "Lenguaje: ";
    spanLenguaje.textContent = pagina.datos.lenguaje;
    a.textContent = "Link";
    a.setAttribute("href", pagina.datos.url)
    a.setAttribute("target", "_blank");
    pDificultad.textContent = "Dificultad: ";
    spanDificultad.textContent = pagina.datos.dificultad;

    //los uno
    divPagina.appendChild(img);
    divPagina.appendChild(h3);
    pLenguaje.appendChild(spanLenguaje);
    divFooter.appendChild(pLenguaje);
    divFooter.appendChild(a);
    divPagina.appendChild(divFooter);
    pDificultad.appendChild(spanDificultad);
    divPagina.appendChild(pDificultad);

    return divPagina
}

// const mostrarModaldeCarga = () => {

// }

//Eventos

main.addEventListener("click", (e) => {
    let evento = e.target;

    /* contraccion de secciones de main  */

    if (evento.classList.contains("main__abrir-i")) {
        let secionElejida = evento.parentNode.parentNode;
        secionElejida.classList.toggle("main__item-flex-selecionado");

        if (memorizacion != undefined && memorizacion != secionElejida) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }

        memorizacion = secionElejida;
    }

    /* obtener las paginas */

    if (evento.classList.contains("main__abrir-i")) {
        if (datos === "nada") {
            fetch("./Data/Data-paginas.json").then(res => {
                return res.json()
            }).then(res => {
                datos = res;
                mostrarPaginas(evento.parentNode.parentNode);
            })
        } //para que no borre y vuelva a cargar si lo minimiza y lo vuelve abrir
        else if ( evento.parentNode.parentNode.children[1].children[2].children.length == 0 ){
            mostrarPaginas(evento.parentNode.parentNode);
        }
        console.log(evento.parentNode.parentNode.children[1].children[2].children)
    }

    /* abrir y cerrar filtro de paginas */

    if (evento.classList.contains("main__filtro-boton")) {
        let menufiltro = evento.parentNode.parentNode.children[1];
        menufiltro.classList.toggle("filtro-abierto");
    }

    /* abrir footer */

    if (evento.classList.contains("main__abrir-footer")) {
        evento.classList.toggle("main__footer-selecionado");

        if (memorizacion != undefined && memorizacion != evento) {
            memorizacion.classList.remove("main__item-flex-selecionado", "main__footer-selecionado");
        }

        memorizacion = evento;
    }

});

//eventos de cada buscador(agregar los otros)
buscadorFrontMentor.addEventListener("keyup", (e) => {
    mostrarPaginas(e.target.parentNode.parentNode, e.target.value)
})

"use strict"

//Declaraciones

const main = document.getElementById("main");
//para cerrar el ultimo abierto
let memorizacion;
//donde pondre los Datos de las paginas a mostrar
let datos = "nada";
const divPaginas = document.querySelector(".main__paginas");
//buscador
const buscadorFrontMentor = document.getElementById("buscador__front-mentor");
const buscadorProjectos = document.getElementById("buscador__projectos");
const buscadorJuegos = document.getElementById("buscador__juegos");
const buscadorProximamente = document.getElementById("buscador__proximamente");

//Funciones

//primer parametro es el padre que los contiene atodos, segundo opcional del buscador, tercero opcional del filtro
const mostrarPaginas = ( eventoPadre, resbuscador = false, resFiltro = false) => {
    //para dar mensaje de 0 cerultado o no hay datos subidos todabia
    let todosLosFiltro = "no aplicados";

    //obtiene dato para editar
    let datoAMostrar = datos;

    //si esta resBuscador aplica y reordena
    if ( resbuscador ) {
        let bus = resbuscador.toLowerCase();
        datoAMostrar = datoAMostrar.filter(elemento => {
            let contenido = elemento.datos.titulo + elemento.datos.lenguaje + ( elemento.datos.dificultad || "" )+ ( elemento.datos.extra || "" );
            contenido = contenido.toLowerCase();
            return contenido.includes(bus)
        });
        todosLosFiltro = "aplicados";
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
    //    todosLosFiltro = "aplicados";
    // }

    // let mostrarDeA = filtro() || 5;
    let mostrarDeA = 10;
    let paginaActual = 0;
//filtro para tipo a mostrar
    datoAMostrar = datoAMostrar.filter( dato => dato.tipo.includes( eventoPadre.getAttribute("data-tipo") ));

    datoAMostrar = datoAMostrar.slice(paginaActual * mostrarDeA, (1 + paginaActual) * mostrarDeA);

    //termina si noy hay que mostrar y retornando un mensaje
    if ( datoAMostrar.length == 0 && todosLosFiltro == "aplicados" ) return mensajeCeroResultado(eventoPadre.children[1].children[2], resbuscador);
    else if ( datoAMostrar.length == 0 && todosLosFiltro ==  "no aplicados" ) return mensajeSinArchivosSubidos(eventoPadre.children[1].children[2]);



    //muestra segun filtro , buscador y si coniciden el data- del html y el tipo del json
    let paginas = document.createElement("div");
    paginas.classList.add("main__paginas");

    for (let i = 0; i < datoAMostrar.length; i++) {
        let pagina = crearPagina(datoAMostrar[i]);
        paginas.appendChild(pagina);
    }
  
    eventoPadre.children[1].replaceChild( paginas ,eventoPadre.children[1].children[2] );
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

    //doy clase
    divPagina.classList.add("main__pagina");
    img.classList.add("main__pagina-img");
    h3.classList.add("main__pagina-titulo");
    divFooter.classList.add("main__pagina-footer");
    pLenguaje.classList.add("main__pagina-lenguaje");
    spanLenguaje.classList.add("main__pagina-lenguaje-span");
    a.classList.add("main__pagina-link");

    //le doy el contenido y atributos
    img.setAttribute("src", pagina.datos.imagen);
    img.setAttribute("alt", `imagen de ${pagina.datos.titulo}`)
    h3.textContent = pagina.datos.titulo;
    pLenguaje.textContent = "Lenguaje: ";
    spanLenguaje.textContent = pagina.datos.lenguaje;
    a.textContent = "Link";
    a.setAttribute("href", pagina.datos.url)
    a.setAttribute("target", "_blank");

    //los uno
    divPagina.appendChild(img);
    divPagina.appendChild(h3);
    pLenguaje.appendChild(spanLenguaje);
    divFooter.appendChild(pLenguaje);
    divFooter.appendChild(a);
    divPagina.appendChild(divFooter);

    //cambio el diseño para las 4 clases
    if( pagina.tipo == "Front Mentor" ) {     
        //version front mentor

        const pDificultad = document.createElement("p");
        const spanDificultad = document.createElement("span");

        pDificultad.classList.add("main__pagina-dificultad");
        spanDificultad.classList.add("main__pagina-dificultad-span");

        pDificultad.textContent = "Dificultad: ";
        spanDificultad.textContent = pagina.datos.dificultad;

        pDificultad.appendChild(spanDificultad);
        divPagina.appendChild(pDificultad);

    }
    else if ( pagina.tipo == "projectos" ){
        //version projectos

    }


    return divPagina
}

//salta cuando no haya resultado de busqueda
const mensajeCeroResultado = ( evento , resbuscador ) => {

    if ( evento.getAttribute("data-msg") !== "sin resultado" ){

        let paginas = document.createElement("div");
        let mensaje = document.createElement("h3");
        let span = document.createElement("span");

        paginas.classList.add("main__paginas");
        mensaje.classList.add("mensajes404-text");
        span.classList.add("mensajes404-span");

        mensaje.textContent = "No se hayaron resuldtados con ";
        span.textContent = resbuscador;

        mensaje.appendChild(span);
        evento.appendChild(mensaje);
        paginas.appendChild(mensaje);
        evento.style.alignItems = "center";

        //para no hacer todo lo anterior de nuevo y simplemente cambiar el textcontent en el else
        paginas.setAttribute("data-msg", "sin resultado")

        evento.parentNode.replaceChild(paginas, evento.parentNode.children[2]);
    }
    else if ( evento.getAttribute("data-msg") == "sin resultado" ){
        evento.children[0].children[0].textContent = resbuscador;
    }
   
 
}

//salta si no hay archivos para mostrar / subidos
const mensajeSinArchivosSubidos = ( evento ) => {

    if ( evento.getAttribute("data-msg") !== "sin archivos" ){
        let mensaje = document.createElement("h3");
        let img = document.createElement("img");

        mensaje.classList.add("mensajes404-text")
        img.classList.add("mensajes404-img")
        
        img.setAttribute("src", "./imagenes/undraw_under_construction_46pa.svg");
        img.setAttribute("alt", "imagen de contruccion svg");

        mensaje.textContent = "No hay datos subidos aun...";

        evento.appendChild(mensaje);
        evento.appendChild(img);
        evento.style.alignItems = "center";

        //para no volver a poner si ya estaba
        evento.setAttribute("data-msg", "sin archivos");
    }
}



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
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorProjectos.addEventListener("keyup", (e) => {
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorJuegos.addEventListener("keyup", (e) => {
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})

buscadorProximamente.addEventListener("keyup", (e) => {
    mostrarPaginas(e.target.parentNode.parentNode.parentNode, e.target.value)
})
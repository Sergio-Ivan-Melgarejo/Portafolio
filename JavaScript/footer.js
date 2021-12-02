"use strict"

// Declaraciones

export const footer = document.getElementById("footer"),
    email = document.querySelector("#footer #form"),
    footerEmail = document.getElementById("footerEmail"),
    form = document.getElementById("form"),
    formMensaje = document.getElementById("formMensaje"),
    formMensajeError = document.getElementById("formMensajeError"),
    cerrarMsj = document.getElementById("cerrar-msj");

// Funciones

const cerrarMensaje = () => {
    formMensajeError.children[0].classList.toggle("open");
    formMensajeError.children[1].classList.toggle("open");
    formMensajeError.children[2].classList.toggle("open");
    formMensajeError.classList.toggle("open");
}

// Eventos

addEventListener("DOMContentLoaded", () => {
    footerEmail.addEventListener("click", () => {
        email.classList.toggle("open");
        if ( formMensajeError.getAttribute("data-msj") ) {
            cerrarMensaje();
        }
    })

    footer.addEventListener("submit", (e) => {

        if ( form.formNombre.value.length < 4 ) {
            e.preventDefault();
            formMensajeError.children[0].classList.add("open");
            formMensajeError.classList.add("open");
            formMensajeError.setAttribute("data-msj", true);
        }
        else{
            formMensajeError.children[0].classList.remove("open");
        }

        if ( 
            !form.formEmail.value.includes("@") || 
            !form.formEmail.value.includes(".com") || 
            form.formEmail.value.length < 9 
        ) {
            e.preventDefault();
            formMensajeError.children[1].classList.add("open");
            formMensajeError.classList.add("open");
            formMensajeError.setAttribute("data-msj", true);
        }
        else{
            formMensajeError.children[1].classList.remove("open");
        }

        if ( form.formMensaje.value.length < 9 ) {
            e.preventDefault();
            formMensajeError.children[2].classList.add("open");
            formMensajeError.classList.add("open");
            formMensajeError.setAttribute("data-msj", true);
        }
        else{
            formMensajeError.children[2].classList.remove("open");
        }
    })
})
// Comentario
// 

// let nombre;
// const a=1; 
// nombre = "Ana";
// consol.log(nombre);

// Hola Mundo
// console.log("Hola mundo")
// alert("¡Hola mundoooo >:)!")

// let a=10, b=20;
// console.log(a+b);

// Definir mis constantes y mis variables
const fecha = document.querySelector('#fecha'), FECHA = new Date (),
    lista = document.querySelector('#lista'),
    elemento = document.querySelector('#elemento'),
    input = document.querySelector('#input'),
    botonAgregar = document.querySelector('#botonAgregar'),
    check = 'bi-record-circle', tachado = 'tachado', uncheck = 'bi-circle';

let LIST, id;

fecha.innerHTML = FECHA.toLocaleDateString('es-MX',
    {weekday: 'long', month: 'short', day: 'numeric'});

function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return
    };
    const realizado = hecho ? check : uncheck,
        LINE = hecho ? tachado : '',
        elemento = `<li id="elemento">
        <i id="${id}" data="hecho" class="bi bi-record-circle icon"></i>
        <p class="tarea-lista text ${LINE}">${tarea}</p>
        <i id= "${id}" data="eliminar" class="bi bi-trash3-fill icon"></i>
        </li>`
    lista.insertAdjacentHTML("beforeend", elemento)
};

function tareaRealizada(element) {
    elemento.classlist.toggle(check);
    elemento.classlist.toggle(uncheck);
    elemento.parentNode.querySelector('.text').classlist.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
}

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar") {
        tareaEliminada(element);
    };
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
};

function cargarLista(array) {
    array.forEach((item) => {
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
}


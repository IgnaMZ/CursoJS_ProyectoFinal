alert('¡Bienvenido!');

// Declaración de variables globales
let nombre = prompt('Para comenzar, ingresá tu nombre:');
let edad = prompt('Ahora, tu edad:');
let ciudad = confirm('Actualmente, ¿vivís en Argentina?');
const listaVerduleria = ['Banana', 'Repollo', 'Papa', 'Manzana', 'Remolacha', 'Lechuga', 'Naranja', 'Frutilla', 'Zanahoria', 'Pera'];
const frutas = [];
const verduras = [];

// Verificación de los datos ingresados por el usuario
// y devolución de un mensaje compuesto por dichos datos.

if(ciudad){
    alert('¡Excelente! de acuerdo a los datos ingresados, \nTu nombre es ' + nombre + ', tenés ' + edad + ' años y, actualmente, vivís en Argentina.\n¡COMENCEMOS!');
}else{
    alert('¡Excelente! de acuerdo a los datos ingresados, \nTu nombre es ' + nombre + ', tenés ' + edad + ' años y, actualmente, NO vivís en Argentina.\n¡COMENCEMOS!');
}

// Brindamos al usuario la información necesaria para interactuar con el programa.
alert('IMPORTANTE: \nRecordá tener abierta la consola del navegador, te iremos brindando información a través de ella.');
alert('A continuación, te presentaremos un listado de ' + listaVerduleria.length + ' Frutas y verduras.');
console.table(listaVerduleria);

// Indicamos al usuario, que acción se necesita de su parte para poder continuar.
alert('Teniendo en cuenta el listado mostrado en consola, ingresá las 5 frutas a continuación. De a una a la vez, por favor.');

// A partir de los valores ingresados por el usuario, construimos los arrays de frutas y verduras.
for(let i = 0; i < 5; i++){
    frutas.push(prompt('Ingresa una fruta:'));
}
alert('¡Buen trabajo! Ahora, ingresá las 5 verduras. Nuevamente, de a una a la vez.');

for(let i = 0; i < 5; i++){
    verduras.push(prompt('Ingresa una verdura:'));
}

// Con la función "ordenarItems", ordenamos y mostramos los nuevos listados de Frutas y Verduras.
function ordenarItems(){
    console.table('FRUTAS: ' + frutas.sort().join(', '));
    console.table('VERDURAS: ' + verduras.sort().reverse().join(', '));
}
ordenarItems();
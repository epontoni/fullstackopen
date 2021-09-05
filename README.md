# fullstackopen
Un breve resumen de algunos detalles conceptuales a tener en cuenta.

## `this`
> Al llamar al método a través de una referencia, el método pierde el conocimiento de cuál era el `this` original. A diferencia de otros lenguajes, en JavaScript el valor de `this` se define en función de cómo el método se llama (depende del contexto de ejecución).
### `this` en el contexto global
- En el browser: En el contexto de ejecución global, cuando `this` se usa fuera de cualquier función hace referencia al objeto `window`
```js
this === window // true
```
De igual manera, no importa si estamos en modo estricto, siempre refiere al objeto global windows.
```js
"use strict";
this === window // true
```
- En node también se refiere al objeto global que es llamado `global`.
```node
$ node
> this === global
true
```
Sin embargo esto sólo es cierto en la consola interactiva REPL (Read-Eval-Print-Loop) de node. Si ejecutamos la misma línea en un módulo de node:
```js
console.log(this === global); // false
```
Esto se debe a que en el código de nivel superior de un módulo de node. `this` es equivalente a `module.exports`.
```js
console.log(this === module.exports); // true
```
El motor de node ejecuta cada módulo dentro de la función REPL. Esta función REPL es invocada con un valor de `this` igual a `module.exports`.

¿Cómo ejecutar/invocar una función con un `this` específico usando `call`, `apply` o `bind`?

### `this` en llamada a funciones
En la mayoría de los casos el valor de `this` de una función es determinado por la llamada a la función. Esto sifnifica que el valor de `this` puede ser diferente cada vez que se ejecuta la función.
En node:
```js
function func() {
  console.log(this === global)
}
func() // true
```
```js
"use strict";
function func() {
  console.log(this === undefined)
}
func() // true
```
Esto hay que tenerlo en cuenta si estas escribiendo tu código en modo estricto y a la vez estas usando alguna librería que no esté en modo estricto.
```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const person = Person("Emanuel", "Pontoni");
console.log(person); // undefined
```
Porque no estando en modo estricto `this` hace referencia al objeto global.
```js
console.log(global.firstName);
console.log(global.lastName);
```
En modo estricto, el valor de `this` dentro de la función es igual a `undefined`. Ejecutar el código anterior nos arrojaría un error ya que no se le pueden agregar propiedades a `undefined`. Esto nos evita crear accidentalmente variables globales.
El modo correcto de llamar a la función constructora `Persona`es con el keyword `new`. Esto nos evita llenar el espacio global con las variables `firstName` y `lastName`.
```js
"use strict";
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
const person = new Person("Emanuel", "Pontoni");
console.log(person); // { firstName: "Emanuel", lastName: "Pontoni" }
console.log(global.firstName); // undefined
console.log(global.lastName); // undefined
```
### `this` en llamada de constructores
En JavaScript, no hay funciones constructoras especiales. En cambio, la llamada a una función puede transformarse en la llamada a funa función constructora cuando la función es llamada con el operador `new` en frente de ella. Cuando una función es llamada como constructora, se crea un nuevo objeto y se configura su argumento `this`. Este objeto es luego retornado implicitamente por la función si no se especifica otro de manera explícita. No es un caso muy común retornar un objeto diferente en la función constructora, pero podría tener sentido en ciertos escenarios. Por ejemplo, en un entorno de desarrollo, podríamos envolver el objeto devuelto en un proxy y alertar a los desarrolladores siempre que utilicen ese objeto de forma incorrecta.
Tenga en cuenta que si intentamos devolver algo más que un objeto, el motor de JavaScript simplemente ignorará el valor que proporcionamos y devolverá el objeto creado.

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    info: 'Not default object from constructor function'
  }
}
const person = new Person("Emanuel", "Pontoni");
```

### `this` en llamada de métodos
Cuando se llama a una función como método de un objeto, el argumento `this` de esa función se establece en el objeto en el que se invoca el método. Ese objeto se llama *receptor de la llamadad de la función*.
A menudo, el receptor se pierde cuando invocamos un método como función. Esto sucede particularmente a menudo cuando se pasa un método como devolución de llamada a otra función.

```js
var person = {
  firstName: "Emanuel",
  lastName: "Pontoni",
  sayHi: function() {
    console.log(`Hi ${this.firstName} ${this.lastName}!`);
  }
}

person.sayHi() // el valor this dentro del método sayHi hace referencia al objeto persona.
```
Decimos que `person` es el receptor de la llamada de la función. Este mecanismo receptor no se ve afectado por el lugar donde se definió la función. Por ejemplo, podríamos haber definido la función por separado y luego haberla adjuntado a `person`. Aún escribimos `person.sayHi()`, y por lo tanto `person` seguirá siendo el receptor de la llamada al método.
```js
var person = {
  firstName: "Emanuel",
  lastName: "Pontoni",
  sayHi: sayHi
}

function sayHi () {
  console.log(`Hi ${this.firstName} ${this.lastName}!`);
}

person.sayHi() // el valor this dentro del método sayHi hace referencia al objeto persona.
```


### Especificando usando `.call()` o `.apply()`
El método `.call()` es lo mismo que el método `.bind()`, crear una copia de la función con el `this` especificado y la ejecuta (no devuelve una nueva función). También bindea argumentos.
El método `.apply()` es lo mismo que el método `.call()`, solo que el segundo argumento es un arreglo.
Ejemplos:
```js
var person = {
  name: "Emanuel",
  lastname: "Pontoni",
};

var logName = function(arg1, arg2) {
  console.log(arg1 + ' ' this.name + ' ' + arg2);
}

logName('Hola', ', cómo estas?') // Hola undefined , cómo estas?
logName.call(person, 'Hola', ', cómo estas?') // Hola Emanuel , cómo estas?
logName.apply(person, ['Hola', ', cómo estas?']); // Hola Emanuel , cómo estas?

```
### Vinculando el valor `this` de una función con el método `.bind()` 
```js
var name = "Emanuel";

var person = {
  name: "Manuel",
  lastname: "Await",
};

var logName = function() {
  console.log(this.name);
}

logName() // "Emanuel"

logPersonName = logName.bind(person); // El primer parámetro de bind es el this. Retorna una nueva función con el this especificadoci
logPersonName(); // "Manuel"
```
Bind acepta más parámetros, el primero siempre es `this`, los siguientes sirven para bindear parámetros de una función (esto se conoce como *function currying*).
```js
function multiplicar(a, b) {
  return a*b
}
var multiplicarPorDos = multiplica.bind(this, 2);
// El Bind le 'bideó' el 2 al argumento 'a' y devolvió una función nueva con ese parámetro bindeado.
```
### Capturando `this` con una función flecha.
### `this` en el cuerpo de una clase.
Fuentes:
- [JavaScript's this keyword in depth](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)
- [JavaScript Info](https://es.javascript.info/)

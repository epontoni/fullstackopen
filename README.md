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
### `this` en llamada de métodos
### Especificando usando `.call()` o `.apply()`
### Vinculando el valor `this` de una función con el método `.bind()`
### Capturando `this` con una función flecha.
### `this` en el cuerpo de una clase.
Fuentes:
- [JavaScript's this keyword in depth](https://egghead.io/courses/understand-javascript-s-this-keyword-in-depth)
- [JavaScript Info](https://es.javascript.info/)

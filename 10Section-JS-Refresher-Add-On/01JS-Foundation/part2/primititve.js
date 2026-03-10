// Number
let balance = 120;
let anotherBalance = new Number(120);

// console.log(balance);
// console.log(anotherBalance.valueOf());

// console.log(typeof balance);
// console.log(typeof anotherBalance);

// Boolean
let isActive = true;
let isReallyActive = new Boolean(true); // not recommended

// Null and Undefined

let firstName = null;
let lastName = undefined;
// console.log(firstName);
// console.log(lastName);

// String
let myString = "hello";
let myStringOne = "Hola";
let username = "chinmay";

let oldGreet = myString + " " + "chinmay";
// console.log(oldGreet);

let greetMessage = `Hello ${username} !`;
let demoOne = `Value is ${2 * 2}`;
// console.log(demoOne);

let sm1 = Symbol("chinmay");
let sm2 = Symbol("chinmay");

console.log(sm1);

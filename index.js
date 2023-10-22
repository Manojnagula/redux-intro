// compose function of redux takes multiple functions as arguments and calls them in sequence with same arguments in all.
 import { compose } from "redux";

 function removeSpaces(string){
    return string.split(' ').join('');
 }
 function Uppercases(string){
    return string.toUpperCase();
}
 const string = "hello, Motto."

const composeFunction = compose(removeSpaces,Uppercases);

console.log(composeFunction(string));
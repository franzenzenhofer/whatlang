var whatlang = require('../whatlang.js');
var iA = [
'this is an english string',
'das hier ist eine deutsche zeichenkette',
'questa è una frase italiana',
'esta es una sentencia de español',
'αυτή είναι μια φράση Ελλήνων']
whatlang.wait(10000);
iA.forEach(function(s){ whatlang(s); });
var whatlang = require('../whatlang.js');
var iA = [
'this is an english string',
'das hier ist eine deutsche zeichenkette',
'questa è una frase italiana',
'esta es una sentencia de español',
'αυτή είναι μια φράση Ελλήνων']
//whatlang.wait(100);
iA.forEach(function(s){ whatlang(s); });

 
 var langinfo = whatlang('Ich bin ein kleines maedchen und tanze auf der berliner mauer.', function(langinf){ console.log(langinf.responseData.language); }, { userip:'74.125.224.72'});
 
 

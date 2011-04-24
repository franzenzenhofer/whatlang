whatlang.js for node.js 
===

install

      var whatlang = require('/path/to/whatlang.js');
      
usage

      //whatlang(query, callback, parameterObject)
      whatlang('Ich bin ein kleines maedchen und tanze auf der berliner mauer.');
      
      /* prints on the console
      { responseData: { 
          language: 'de',
          isReliable: true,
          confidence: 0.66124046
          },
        responseDetails: null,
        responseStatus: 200,
        requestData: { 
          query: 'Ich bin ein kleines maedchen und tanze auf der berliner mauer.' 
        } 
      }
      */
      
       //with a custom callback function 
       var langinfo = whatlang('Ich bin ein kleines maedchen.', function(langinf){ console.log(langinf.responseData.language); }); 
       // -> de
       
       //with a parameterObject
       var langinfo = whatlang('Ich bin ein kleines maedchen.', function(langinf){ console.log(langinf.responseData.language); }, { userip:'74.125.224.72', key:'boguskey' });
       //throws an "ResponseStatus 400 Error: invalid key"
       

      
      
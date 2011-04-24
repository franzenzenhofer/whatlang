whatlang.js for node.js 
===

whatlang detects the language of a given string - and is unbelievable easy to use

      var whatlang = require('whatlang');
      whatlang('was fuer eine sprache ist dieser satz, bitte-schoen?');

whatlang uses the google language detection API (V1)

http://code.google.com/apis/language/translate/v1/using_rest_langdetect.html


install
      // on the command linge
      //>npm install whatlang
      var whatlang = require('whatlang');
      //or
      //var whatlang = require('/path/to/whatlang.js');
      
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
       var langinfo = whatlang('Ich bin ein kleines maedchen.',
       function(langinf){ console.log(langinf.responseData.language); }); 
       // -> de
       
       //with a parameterObject
       //see http://code.google.com/apis/language/translate/v1/using_rest_langdetect.html#request_format for list of parameters
       var langinfo = whatlang('Ich bin ein kleines maedchen.',
       function(langinf){ console.log(langinf.responseData.language); },
       { userip:'74.125.224.72', key:'boguskey' });
       //throws an "ResponseStatus 400 Error: invalid key"
       
additional methods (chaining supported)

       whatlang.setDefaultKey('your key here').setDefaultUserIp('74.125.224.72').wait(5000).detect('this is a very english english sentence').detect('das ist ein deutscher satz');
       
       //set your google key
       whatlang.setDefaultKey('your key here');
       
       //set your default user ip
       whatlang.setDefaultUserIp('74.125.224.72');
       
      //whatlang.detect() === whatlog()
       whatlang.detect('a string');
       
       //whatlang.wait(integer)
       //per default whatlang waits 100ms between multiple requests to the Google API
       //the wait-time intervall can be changed via the wait() method
       whatlang.wait(5000);
       

      
      
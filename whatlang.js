https = require("https");
var root = this;
var ticker = 0;
var timeout = 100;
var host = "ajax.googleapis.com";
var base_path = "/ajax/services/language/detect?v=1.0";
var callback = function(data) {
  console.log(data)
};
var userip = undefined;
var key = undefined;

var createPath = function(base, o) {
  var r = base;
  for(var n in o) {
    r = r + "&" + n + "=" + encodeURIComponent(o[n])
  }
  return r
};



var DetectLang = function(s, c) {
  var self = this;
  self.query = s;
  self.callback = c || callback;
  self.parameters = {};
  self.setUserIp(userip);
  self.setKey(key);
  if(self.query !== undefined) {
    self.parameters.q = self.query;
  }
};

DetectLang.prototype.setParam = function(name, value) {
  var self = this;
  if(name!==undefined&&value!==undefined)
  {
    self.parameters[name] = value;
  }
  return self
};
DetectLang.prototype.setKey = function(key) {
  var self = this;
  self.setParam("key", key);
  return self
};
DetectLang.prototype.setUserIp = function(userip) {
  var self = this;
  self.setParam("userip", userip);
  return self
};
DetectLang.prototype.detect = function() {
  var self = this;
  var mypath = createPath(base_path, self.parameters);
  https.get({host:host, path:mypath}, function(res) {
    if(res.statusCode === 200) {
      res.on("data", function(data) {
        
        d = JSON.parse(data);
        
        //console.log(d);
        d.requestData = {query:self.query};
        if(d.responseStatus===200)
        {
          self.callback(d)
        }
        else
        {
          throw new Error('ResponseStatus '+d.responseStatus+' Error: '+d.responseDetails)
        }
      })
    }else {
      throw new Error("STATUS CODE " + res.statusCode + " ERROR");
    }
  }).on("error", function(e) {
    throw new Error(e);
  });
  return self
};
var createDetectLang = function(s, c, paramsO) {
  var dl = new DetectLang(s, c);
  for(var n in paramsO) {
    dl.parameters[n] = paramsO[n]
  }
  if(s!==undefined)
  {
     dl.detect();
  }
  else
  {
    throw new Error('no string given');
  }
  return dl
};


var main = function main(s, c, paramsO) {
  var self = this;
  setTimeout(function() {
    createDetectLang.apply(root, [s, c, paramsO])
  }, ticker);
  ticker = ticker + timeout;
  return module.exports;
};

var wait = function(v)
{
  timeout = v;
  return module.exports;
}

var setDefaultKey = function(k)
{
  key = k;
  return module.exports;
}

var setDefaultUserIp = function(ip)
{
  userip = ip;
  return module.exports;
}


module.exports = main;
module.exports.detect = main;
module.exports.wait = wait;
module.exports.setDefaultKey = setDefaultKey;
module.exports.setDefaultUserIp = setDefaultUserIp;

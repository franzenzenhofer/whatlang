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
var DetectLang = function(s, c) {
  var self = this;
  self.query = s;
  self.callback = c || callback;
  self.parameters = {};
  if(self.query !== undefined) {
    self.parameters.q = self.query;
    self.detect()
  }
};
DetectLang.prototype.setParam = function(name, value) {
  var self = this;
  self.parameters[name] = value;
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
        d.requestData = {query:self.query};
        self.callback(d)
      })
    }else {
      throw new Error("STATUS CODE " + res.statusCode + " ERROR");
    }
  }).on("error", function(e) {
    throw new Error(e);
  });
  return self
};
var createDetectLang = function(s, c, o) {
  var dl = new DetectLang(s, c);
  for(var n in o) {
    dl[n] = o[n]
  }
  return dl
};
var createPath = function(base, o) {
  var r = base;
  for(var n in o) {
    r = r + "&" + n + "=" + encodeURIComponent(o[n])
  }
  return r
};

var main = function main(s, c, o) {
  var self = this;
  setTimeout(function() {
    createDetectLang.apply(root, [s, c, o])
  }, ticker);
  ticker = ticker + timeout;
  return main
};

module.exports = main;

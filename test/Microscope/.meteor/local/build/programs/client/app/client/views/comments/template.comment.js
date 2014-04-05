(function(){
Template.__define__("comment", (function() {
  var self = this;
  var template = this;
  return HTML.LI("\n    ", HTML.H4("\n      ", HTML.SPAN({
    "class": "author"
  }, function() {
    return Spacebars.mustache(self.lookup("author"));
  }), "\n      ", HTML.SPAN({
    "class": "date"
  }, "on ", function() {
    return Spacebars.mustache(self.lookup("submittedText"));
  }), "\n    "), "\n    ", HTML.P(function() {
    return Spacebars.mustache(self.lookup("body"));
  }), "\n  ");
}));

})();

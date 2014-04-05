(function(){
Template.__define__("layout", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "container"
  }, "\n    ", Spacebars.include(self.lookupTemplate("header")), "\n    ", Spacebars.include(self.lookupTemplate("errors")), "\n    ", HTML.DIV({
    id: "main",
    "class": "row-fluid"
  }, "\n      ", Spacebars.include(self.lookupTemplate("yield")), "\n    "), "\n  ");
}));

})();

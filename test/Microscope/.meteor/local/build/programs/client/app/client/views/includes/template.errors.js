(function(){
Template.__define__("errors", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "errors row-fluid"
  }, "    \n    ", UI.Each(function() {
    return Spacebars.call(self.lookup("errors"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", Spacebars.include(self.lookupTemplate("error")), "\n    " ];
  })), "\n  ");
}));

Template.__define__("error", (function() {
  var self = this;
  var template = this;
  return HTML.DIV({
    "class": "alert alert-error"
  }, HTML.Raw('\n    <button type="button" class="close" data-dismiss="alert">&times;</button>\n    '), function() {
    return Spacebars.mustache(self.lookup("message"));
  }, "\n  ");
}));

})();

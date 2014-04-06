(function(){
Template.__define__("header", (function() {
  var self = this;
  var template = this;
  return HTML.HEADER({
    "class": "navbar"
  }, "\n    ", HTML.DIV({
    "class": "navbar-inner"
  }, HTML.Raw('\n      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </a>\n      '), HTML.A({
    "class": "logo",
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "home");
    }
  }, "Maplr"), "\n      ", HTML.DIV({
    "class": "nav-collapse collapse"
  }, "\n        ", HTML.UL({
    "class": "nav"
  }, "\n          ", HTML.LI({
    "class": function() {
      return Spacebars.mustache(self.lookup("activeRouteClass"), "projectsList");
    }
  }, "\n            ", HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("pathFor"), "projectsList");
    }
  }, "Home"), "\n          "), "\n          ", UI.If(function() {
    return Spacebars.call(self.lookup("currentUser"));
  }, UI.block(function() {
    var self = this;
    return [ "\n            ", HTML.LI({
      "class": function() {
        return Spacebars.mustache(self.lookup("activeRouteClass"), "projects");
      }
    }, "\n               ", HTML.A({
      href: function() {
        return Spacebars.mustache(self.lookup("pathFor"), "projects");
      }
    }, "Projects"), "\n            "), "\n            ", HTML.LI({
      "class": function() {
        return Spacebars.mustache(self.lookup("activeRouteClass"), "projectsNew");
      }
    }, "\n              ", HTML.A({
      href: function() {
        return Spacebars.mustache(self.lookup("pathFor"), "projectsNew");
      }
    }, "Create Project"), "\n            "), "\n            ", HTML.LI({
      "class": "dropdown"
    }, "\n                    ", Spacebars.include(self.lookupTemplate("notifications")), "\n            "), "\n          " ];
  })), "\n        "), "\n        ", HTML.UL({
    "class": "nav pull-right"
  }, "\n          ", HTML.LI(Spacebars.include(self.lookupTemplate("loginButtons"))), "\n        "), "\n      "), "\n    "), "\n  ");
}));

})();

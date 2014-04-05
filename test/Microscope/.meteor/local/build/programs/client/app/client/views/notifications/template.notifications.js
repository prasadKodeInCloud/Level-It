(function(){
Template.__define__("notifications", (function() {
  var self = this;
  var template = this;
  return [ HTML.A({
    href: "#",
    "class": "dropdown-toggle",
    "data-toggle": "dropdown"
  }, "\n    Notifications\n    ", UI.If(function() {
    return Spacebars.call(self.lookup("notificationCount"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", HTML.SPAN({
      "class": "badge badge-inverse"
    }, function() {
      return Spacebars.mustache(self.lookup("notificationCount"));
    }), "\n    " ];
  })), HTML.Raw('\n    <b class="caret"></b>\n  ')), "\n  ", HTML.UL({
    "class": "notification dropdown-menu"
  }, "\n    ", UI.If(function() {
    return Spacebars.call(self.lookup("notificationCount"));
  }, UI.block(function() {
    var self = this;
    return [ "\n      ", UI.Each(function() {
      return Spacebars.call(self.lookup("notifications"));
    }, UI.block(function() {
      var self = this;
      return [ "\n        ", Spacebars.include(self.lookupTemplate("notification")), "\n      " ];
    })), "\n    " ];
  }), UI.block(function() {
    var self = this;
    return [ "\n      ", HTML.LI(HTML.SPAN("No Notifications")), "\n    " ];
  })), "\n  ") ];
}));

Template.__define__("notification", (function() {
  var self = this;
  var template = this;
  return HTML.LI("\n    ", HTML.A({
    href: function() {
      return Spacebars.mustache(self.lookup("notificationPostPath"));
    }
  }, "\n      ", HTML.STRONG(function() {
    return Spacebars.mustache(self.lookup("commenterName"));
  }), " commented on your post\n    "), "\n  ");
}));

})();

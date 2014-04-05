(function(){
Template.__define__("postSubmit", (function() {
  var self = this;
  var template = this;
  return HTML.FORM({
    "class": "main"
  }, HTML.Raw('\n\n    <div class="control-group">\n        <label class="control-label" for="title">Project Title</label>\n        <div class="controls">\n            <input name="title" type="text" value="" placeholder="Name your post">\n        </div>\n    </div>\n\n    '), HTML.DIV({
    "class": "control-group"
  }, HTML.Raw('\n        <label class="control-label" for="message">Project Description</label>\n        '), HTML.DIV({
    "class": "controls"
  }, "\n            ", HTML.TEXTAREA({
    name: "message",
    type: "text",
    value: ""
  }), "\n        "), "\n    "), HTML.Raw(' \n\n    <div class="control-group">\n        <div class="controls">\n            <input type="submit" value="Submit" class="btn btn-primary">\n        </div>\n    </div>\n  '));
}));

})();

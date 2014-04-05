//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var _ = Package.underscore._;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Layout, BlazeUIManager;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/blaze-layout/layout.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
//XXX Infinite loop issue in this circumstance:                                                                       // 1
// {{#Layout template="MyLayout"}}                                                                                    // 2
//  {{> yield}}                                                                                                       // 3
// {{/Layout}}                                                                                                        // 4
//                                                                                                                    // 5
// because content does a yield lookup for the main region, which in turn                                             // 6
// yields, which results in a stack overflow.                                                                         // 7
                                                                                                                      // 8
var isLogging = false;                                                                                                // 9
                                                                                                                      // 10
var log = function (msg) {                                                                                            // 11
  if (!isLogging)                                                                                                     // 12
    return;                                                                                                           // 13
                                                                                                                      // 14
  if (arguments.length > 1)                                                                                           // 15
    msg = _.toArray(arguments).join(' ');                                                                             // 16
  console.log('%c<BlazeLayout> ' + msg, 'color: green; font-weight: bold; font-size: 1.3em;');                        // 17
};                                                                                                                    // 18
                                                                                                                      // 19
/*****************************************************************************/                                       // 20
/* Meteor Functions */                                                                                                // 21
/*                                                                                                                    // 22
 * These are copied from Core because we need to throw an error at lookup time                                        // 23
 * if a template is not found. The Component.lookup method does not give us a                                         // 24
 * way to do that. We should construct a proper pull request and send to Meteor.                                      // 25
 * Probably the ability to pass a not found callback or something to the lookup                                       // 26
 * method as an option.                                                                                               // 27
/*****************************************************************************/                                       // 28
var findComponentWithProp = function (id, comp) {                                                                     // 29
  while (comp) {                                                                                                      // 30
    if (typeof comp[id] !== 'undefined')                                                                              // 31
      return comp;                                                                                                    // 32
    comp = comp.parent;                                                                                               // 33
  }                                                                                                                   // 34
  return null;                                                                                                        // 35
};                                                                                                                    // 36
                                                                                                                      // 37
var getComponentData = function (comp) {                                                                              // 38
  comp = findComponentWithProp('data', comp);                                                                         // 39
  return (comp ?                                                                                                      // 40
          (typeof comp.data === 'function' ?                                                                          // 41
           comp.data() : comp.data) :                                                                                 // 42
          null);                                                                                                      // 43
};                                                                                                                    // 44
/*****************************************************************************/                                       // 45
/* End Meteor Functions */                                                                                            // 46
/*****************************************************************************/                                       // 47
                                                                                                                      // 48
/**                                                                                                                   // 49
 * Find a template object.                                                                                            // 50
 *                                                                                                                    // 51
 * Similar to Component.lookupTemplate with two differences:                                                          // 52
 *                                                                                                                    // 53
 * 1. Throw an error if we can't find the template. This is useful in debugging                                       // 54
 * vs. silently failing.                                                                                              // 55
 *                                                                                                                    // 56
 * 2. If the template is a property on the component, don't call                                                      // 57
 * getComponentData(self), thereby creating an unnecessary data dependency. This                                      // 58
 * was initially causing problems with {{> yield}}                                                                    // 59
 */                                                                                                                   // 60
var lookupTemplate = function (name) {                                                                                // 61
  // self should be an instance of Layout                                                                             // 62
  var self = this;                                                                                                    // 63
  var comp;                                                                                                           // 64
  var result;                                                                                                         // 65
  var contentBlocksByRegion = self._contentBlocksByRegion;                                                            // 66
                                                                                                                      // 67
  if (!name)                                                                                                          // 68
    throw new Error("BlazeLayout: You must pass a name to lookupTemplate");                                           // 69
                                                                                                                      // 70
  if (contentBlocksByRegion[name]) {                                                                                  // 71
    result = contentBlocksByRegion[name];                                                                             // 72
  } else if ((comp = findComponentWithProp(name, self))) {                                                            // 73
    result = comp[name];                                                                                              // 74
  } else if (_.has(Template, name)) {                                                                                 // 75
    result = Template[name];                                                                                          // 76
  } else if (result = UI._globalHelper(name)) {}                                                                      // 77
                                                                                                                      // 78
  if (typeof result === 'function' && !result._isEmboxedConstant) {                                                   // 79
    return function (/* args */ ) {                                                                                   // 80
      // modified from Core to call function in context of the                                                        // 81
      // component, not a data context.                                                                               // 82
      return result.apply(self, arguments);                                                                           // 83
    }                                                                                                                 // 84
  } else if (result) {                                                                                                // 85
    return result                                                                                                     // 86
  } else {                                                                                                            // 87
    throw new Error("BlazeLayout: Sorry, couldn't find a template named " + name + ". Are you sure you defined it?"); // 88
  }                                                                                                                   // 89
}                                                                                                                     // 90
                                                                                                                      // 91
Layout = UI.Component.extend({                                                                                        // 92
  kind: 'Layout',                                                                                                     // 93
                                                                                                                      // 94
  __helperHost: true,                                                                                                 // 95
                                                                                                                      // 96
  init: function () {                                                                                                 // 97
    var self = this;                                                                                                  // 98
                                                                                                                      // 99
    var layout = this;                                                                                                // 100
                                                                                                                      // 101
    var tmpl = Deps.nonreactive(function () {                                                                         // 102
      return self.get('template') || self.template || '_defaultLayout';                                               // 103
    });                                                                                                               // 104
                                                                                                                      // 105
    var tmplDep = new Deps.Dependency;                                                                                // 106
                                                                                                                      // 107
    // get the initial data value                                                                                     // 108
    var data = Deps.nonreactive(function () { return self.get(); });                                                  // 109
    var dataDep = new Deps.Dependency;                                                                                // 110
    var regions = this._regions = new ReactiveDict;                                                                   // 111
    var content = this.__content;                                                                                     // 112
                                                                                                                      // 113
    // a place to put content defined like this:                                                                      // 114
    // {{#contentFor region="footer"}}content{{/contentFor}}                                                          // 115
    // this will be searched in the lookup chain.                                                                     // 116
    var contentBlocksByRegion = this._contentBlocksByRegion = {};                                                     // 117
                                                                                                                      // 118
    /**                                                                                                               // 119
    * instance methods                                                                                                // 120
    */                                                                                                                // 121
                                                                                                                      // 122
    this.template = function (value) {                                                                                // 123
      if (typeof value !== 'undefined') {                                                                             // 124
                                                                                                                      // 125
        // make sure we convert false and null                                                                        // 126
        // values to the _defaultLayout so when                                                                       // 127
        // we compare to our existing template                                                                        // 128
        // we don't re-render the default layout                                                                      // 129
        // unnecessarily.                                                                                             // 130
        // XXX this is a problem becuase this _defaultLayout                                                          // 131
        // will never get found becuase it's a helper on the layout                                                   // 132
        // instance                                                                                                   // 133
        if (value === false || value === null)                                                                        // 134
          value = '_defaultLayout';                                                                                   // 135
                                                                                                                      // 136
        if (!EJSON.equals(value, tmpl)) {                                                                             // 137
          tmpl = value;                                                                                               // 138
          tmplDep.changed();                                                                                          // 139
        }                                                                                                             // 140
      } else {                                                                                                        // 141
        tmplDep.depend();                                                                                             // 142
        //XXX changed to just return tmpl instead                                                                     // 143
        //of a _defaultLayout                                                                                         // 144
        return tmpl;                                                                                                  // 145
      }                                                                                                               // 146
    };                                                                                                                // 147
                                                                                                                      // 148
    var emboxedData = UI.emboxValue(function () {                                                                     // 149
      log('return data()');                                                                                           // 150
      dataDep.depend();                                                                                               // 151
      return data;                                                                                                    // 152
    });                                                                                                               // 153
                                                                                                                      // 154
    this.setData = function (value) {                                                                                 // 155
      log('setData', value);                                                                                          // 156
      if (!EJSON.equals(value, data)) {                                                                               // 157
        data = value;                                                                                                 // 158
        dataDep.changed();                                                                                            // 159
      }                                                                                                               // 160
    };                                                                                                                // 161
                                                                                                                      // 162
    this.getData = function () {                                                                                      // 163
      return emboxedData();                                                                                           // 164
    };                                                                                                                // 165
                                                                                                                      // 166
    this.data = function () {                                                                                         // 167
      return self.getData();                                                                                          // 168
    };                                                                                                                // 169
                                                                                                                      // 170
    /**                                                                                                               // 171
     * Set a region template.                                                                                         // 172
     *                                                                                                                // 173
     * If you want to get the template for a region                                                                   // 174
     * you need to call this._regions.get('key');                                                                     // 175
     *                                                                                                                // 176
     */                                                                                                               // 177
    this.setRegion = function (key, value) {                                                                          // 178
      if (arguments.length < 2) {                                                                                     // 179
        value = key;                                                                                                  // 180
        key = 'main';                                                                                                 // 181
      } else if (typeof key === 'undefined') {                                                                        // 182
        key = 'main';                                                                                                 // 183
      }                                                                                                               // 184
                                                                                                                      // 185
      regions.set(key, value);                                                                                        // 186
    };                                                                                                                // 187
                                                                                                                      // 188
    //TODO add test                                                                                                   // 189
    this.getRegionKeys = function () {                                                                                // 190
      return _.keys(regions.keys);                                                                                    // 191
    };                                                                                                                // 192
                                                                                                                      // 193
    //TODO add test                                                                                                   // 194
    this.clearRegion = function (key) {                                                                               // 195
      regions.set(key, null);                                                                                         // 196
    };                                                                                                                // 197
                                                                                                                      // 198
    // define a yield region to render templates into                                                                 // 199
    this.yield = UI.Component.extend({                                                                                // 200
      init: function () {                                                                                             // 201
        var self = this;                                                                                              // 202
                                                                                                                      // 203
        var data = Deps.nonreactive(function () { return self.get(); });                                              // 204
        var region = self.region = (data && data.region) || 'main';                                                   // 205
                                                                                                                      // 206
        // reset the data function to use the layout's                                                                // 207
        // data                                                                                                       // 208
        this.data = function () {                                                                                     // 209
          return layout.getData();                                                                                    // 210
        };                                                                                                            // 211
      },                                                                                                              // 212
                                                                                                                      // 213
      render: function () {                                                                                           // 214
        var self = this;                                                                                              // 215
        var region = self.region;                                                                                     // 216
                                                                                                                      // 217
        // returning a function tells UI.materialize to                                                               // 218
        // create a computation. then, if the region template                                                         // 219
        // changes, this comp will be rerun and the new template                                                      // 220
        // will get put on the screen.                                                                                // 221
        return function () {                                                                                          // 222
          var regions = layout._regions;                                                                              // 223
          // create a reactive dep                                                                                    // 224
          var tmpl = regions.get(region);                                                                             // 225
                                                                                                                      // 226
          if (tmpl)                                                                                                   // 227
            return lookupTemplate.call(layout, tmpl);                                                                 // 228
          else if (region === 'main' && content) {                                                                    // 229
            return content;                                                                                           // 230
          }                                                                                                           // 231
          else                                                                                                        // 232
            return null;                                                                                              // 233
        };                                                                                                            // 234
      }                                                                                                               // 235
    });                                                                                                               // 236
                                                                                                                      // 237
    // render content into a yield region using markup. when you call setRegion                                       // 238
    // manually, you specify a string, not a content block. And the                                                   // 239
    // lookupTemplate method uses this string name to find the template. Since                                        // 240
    // contentFor creates anonymous content we need a way to add this into the                                        // 241
    // lookup chain. But then we need to destroy it if it's not used anymore.                                         // 242
    // not sure how to do this.                                                                                       // 243
    this.contentFor = UI.Component.extend({                                                                           // 244
      init: function () {                                                                                             // 245
        var self = this;                                                                                              // 246
        var data = Deps.nonreactive(function () { return self.get(); });                                              // 247
        var region = self.region = data.region;                                                                       // 248
                                                                                                                      // 249
        if (!region)                                                                                                  // 250
          throw new Error("{{#contentFor}} requires a region argument like this: {{#contentFor region='footer'}}");   // 251
      },                                                                                                              // 252
                                                                                                                      // 253
      render: function () {                                                                                           // 254
        var self = this;                                                                                              // 255
        var region = self.region;                                                                                     // 256
                                                                                                                      // 257
        var contentBlocksByRegion = layout._contentBlocksByRegion;                                                    // 258
                                                                                                                      // 259
        if (contentBlocksByRegion[region]) {                                                                          // 260
          delete contentBlocksByRegion[region];                                                                       // 261
        }                                                                                                             // 262
                                                                                                                      // 263
        // store away the content block so we can find it during lookup                                               // 264
        // which happens in the yield function.                                                                       // 265
        contentBlocksByRegion[region] = self.__content;                                                               // 266
                                                                                                                      // 267
        // this will just set the region to itself but when the lookupTemplate                                        // 268
        // function searches it will check contentBlocksByRegion first, so we'll                                      // 269
        // find the content block there.                                                                              // 270
        layout.setRegion(region, region);                                                                             // 271
                                                                                                                      // 272
        // don't render anything for now. let the yield template control this.                                        // 273
        return null;                                                                                                  // 274
      }                                                                                                               // 275
    });                                                                                                               // 276
                                                                                                                      // 277
    this._defaultLayout = function () {                                                                               // 278
      return UI.block(function () {                                                                                   // 279
        return lookupTemplate.call(layout, 'yield');                                                                  // 280
      });                                                                                                             // 281
    };                                                                                                                // 282
  },                                                                                                                  // 283
                                                                                                                      // 284
  render: function () {                                                                                               // 285
    var self = this;                                                                                                  // 286
    // return a function to create a reactive                                                                         // 287
    // computation. so if the template changes                                                                        // 288
    // the layout is re-endered.                                                                                      // 289
    return function () {                                                                                              // 290
      // reactive                                                                                                     // 291
      var tmplName = self.template();                                                                                 // 292
                                                                                                                      // 293
      //XXX hack to make work with null/false values.                                                                 // 294
      //see this.template = in ctor function.                                                                         // 295
      if (tmplName === '_defaultLayout')                                                                              // 296
        return self._defaultLayout;                                                                                   // 297
      else if (tmplName) {                                                                                            // 298
        return lookupTemplate.call(self, tmplName);                                                                   // 299
      }                                                                                                               // 300
      else {                                                                                                          // 301
        return self['yield'];                                                                                         // 302
      }                                                                                                               // 303
    };                                                                                                                // 304
  }                                                                                                                   // 305
});                                                                                                                   // 306
                                                                                                                      // 307
/**                                                                                                                   // 308
 * Put Layout into the template lookup chain so                                                                       // 309
 * we can do this:                                                                                                    // 310
 * {{#Layout template="MyLayout"}}                                                                                    // 311
 *  Some content                                                                                                      // 312
 * {{/Layout}}                                                                                                        // 313
 */                                                                                                                   // 314
Template.Layout = Layout;                                                                                             // 315
                                                                                                                      // 316
BlazeUIManager = function (router) {                                                                                  // 317
  var self = this;                                                                                                    // 318
  this.router = router;                                                                                               // 319
  this._component = null;                                                                                             // 320
                                                                                                                      // 321
  _.each([                                                                                                            // 322
    'setRegion',                                                                                                      // 323
    'clearRegion',                                                                                                    // 324
    'getRegionKeys',                                                                                                  // 325
    'getData',                                                                                                        // 326
    'setData'                                                                                                         // 327
  ], function (method) {                                                                                              // 328
    self[method] = function () {                                                                                      // 329
      if (self._component) {                                                                                          // 330
        return self._component[method].apply(this, arguments);                                                        // 331
      }                                                                                                               // 332
    };                                                                                                                // 333
  });                                                                                                                 // 334
                                                                                                                      // 335
  // proxy the "layout" method to the underlying component's                                                          // 336
  // "template" method.                                                                                               // 337
  self.layout = function () {                                                                                         // 338
    if (self._component)                                                                                              // 339
      return self._component.template.apply(self, arguments);                                                         // 340
    else                                                                                                              // 341
      throw new Error('Layout has not been rendered yet');                                                            // 342
  };                                                                                                                  // 343
};                                                                                                                    // 344
                                                                                                                      // 345
BlazeUIManager.prototype = {                                                                                          // 346
  render: function (props, parentComponent) {                                                                         // 347
    this._component = UI.render(Layout.extend(props || {}), parentComponent || UI.body);                              // 348
    return this._component;                                                                                           // 349
  },                                                                                                                  // 350
                                                                                                                      // 351
  insert: function (parentDom, parentComponent, props) {                                                              // 352
    UI.DomRange.insert(this.render(props, parentComponent).dom, parentDom || document.body);                          // 353
  }                                                                                                                   // 354
};                                                                                                                    // 355
                                                                                                                      // 356
var findComponentOfKind = function (kind, comp) {                                                                     // 357
  while (comp) {                                                                                                      // 358
    if (comp.kind === kind)                                                                                           // 359
      return comp;                                                                                                    // 360
    comp = comp.parent;                                                                                               // 361
  }                                                                                                                   // 362
  return null;                                                                                                        // 363
};                                                                                                                    // 364
                                                                                                                      // 365
// Override {{> yield}} and {{#contentFor}} to find the closest                                                       // 366
// enclosing layout                                                                                                   // 367
var origLookup = UI.Component.lookup;                                                                                 // 368
UI.Component.lookup = function (id, opts) {                                                                           // 369
  if (id === 'yield' || id === 'contentFor') {                                                                        // 370
    var layout = findComponentOfKind('Layout', this);                                                                 // 371
    if (!layout)                                                                                                      // 372
      throw new Error("Couldn't find a Layout component in the rendered component tree");                             // 373
    else {                                                                                                            // 374
      return layout[id];                                                                                              // 375
    }                                                                                                                 // 376
  } else {                                                                                                            // 377
    return origLookup.apply(this, arguments);                                                                         // 378
  }                                                                                                                   // 379
};                                                                                                                    // 380
                                                                                                                      // 381
if (Package['iron-router']) {                                                                                         // 382
  Package['iron-router'].Router.configure({                                                                           // 383
    uiManager: new BlazeUIManager                                                                                     // 384
  });                                                                                                                 // 385
}                                                                                                                     // 386
                                                                                                                      // 387
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['blaze-layout'] = {
  Layout: Layout
};

})();

//# sourceMappingURL=3dc9f80fff25f73dbaaad071907ff24046419cb4.map

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
var Deps = Package.deps.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package.templating.Template;
var Session = Package.session.Session;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var passwordSignupFields, displayName, getLoginServices, hasPasswordService, dropdown, validateUsername, validateEmail, validatePassword;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/accounts_ui.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
Accounts.ui = {};                                                                                                    // 1
                                                                                                                     // 2
Accounts.ui._options = {                                                                                             // 3
  requestPermissions: {},                                                                                            // 4
  requestOfflineToken: {}                                                                                            // 5
};                                                                                                                   // 6
                                                                                                                     // 7
Accounts.ui.config = function(options) {                                                                             // 8
  // validate options keys                                                                                           // 9
  var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'requestOfflineToken'];                            // 10
  _.each(_.keys(options), function (key) {                                                                           // 11
    if (!_.contains(VALID_KEYS, key))                                                                                // 12
      throw new Error("Accounts.ui.config: Invalid key: " + key);                                                    // 13
  });                                                                                                                // 14
                                                                                                                     // 15
  // deal with `passwordSignupFields`                                                                                // 16
  if (options.passwordSignupFields) {                                                                                // 17
    if (_.contains([                                                                                                 // 18
      "USERNAME_AND_EMAIL",                                                                                          // 19
      "USERNAME_AND_OPTIONAL_EMAIL",                                                                                 // 20
      "USERNAME_ONLY",                                                                                               // 21
      "EMAIL_ONLY"                                                                                                   // 22
    ], options.passwordSignupFields)) {                                                                              // 23
      if (Accounts.ui._options.passwordSignupFields)                                                                 // 24
        throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");                      // 25
      else                                                                                                           // 26
        Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;                                    // 27
    } else {                                                                                                         // 28
      throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
    }                                                                                                                // 30
  }                                                                                                                  // 31
                                                                                                                     // 32
  // deal with `requestPermissions`                                                                                  // 33
  if (options.requestPermissions) {                                                                                  // 34
    _.each(options.requestPermissions, function (scope, service) {                                                   // 35
      if (Accounts.ui._options.requestPermissions[service]) {                                                        // 36
        throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);         // 37
      } else if (!(scope instanceof Array)) {                                                                        // 38
        throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");                      // 39
      } else {                                                                                                       // 40
        Accounts.ui._options.requestPermissions[service] = scope;                                                    // 41
      }                                                                                                              // 42
    });                                                                                                              // 43
  }                                                                                                                  // 44
                                                                                                                     // 45
  // deal with `requestOfflineToken`                                                                                 // 46
  if (options.requestOfflineToken) {                                                                                 // 47
    _.each(options.requestOfflineToken, function (value, service) {                                                  // 48
      if (service !== 'google')                                                                                      // 49
        throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment."); // 50
                                                                                                                     // 51
      if (Accounts.ui._options.requestOfflineToken[service]) {                                                       // 52
        throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);        // 53
      } else {                                                                                                       // 54
        Accounts.ui._options.requestOfflineToken[service] = value;                                                   // 55
      }                                                                                                              // 56
    });                                                                                                              // 57
  }                                                                                                                  // 58
};                                                                                                                   // 59
                                                                                                                     // 60
passwordSignupFields = function () {                                                                                 // 61
  return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";                                                  // 62
};                                                                                                                   // 63
                                                                                                                     // 64
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/template.login_buttons.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__define__("loginButtons", (function() {                                                                    // 2
  var self = this;                                                                                                   // 3
  var template = this;                                                                                               // 4
  return Spacebars.include(self.lookupTemplate("_loginButtons"));                                                    // 5
}));                                                                                                                 // 6
                                                                                                                     // 7
Template.__define__("_loginButtons", (function() {                                                                   // 8
  var self = this;                                                                                                   // 9
  var template = this;                                                                                               // 10
  return HTML.DIV({                                                                                                  // 11
    id: "login-buttons",                                                                                             // 12
    "class": [ "login-buttons-dropdown-align-", function() {                                                         // 13
      return Spacebars.mustache(self.lookup("align"));                                                               // 14
    } ]                                                                                                              // 15
  }, "\n    ", UI.If(function() {                                                                                    // 16
    return Spacebars.call(self.lookup("currentUser"));                                                               // 17
  }, UI.block(function() {                                                                                           // 18
    var self = this;                                                                                                 // 19
    return [ "\n      ", UI.If(function() {                                                                          // 20
      return Spacebars.call(self.lookup("loggingIn"));                                                               // 21
    }, UI.block(function() {                                                                                         // 22
      var self = this;                                                                                               // 23
      return [ "\n        \n        ", UI.If(function() {                                                            // 24
        return Spacebars.call(self.lookup("dropdown"));                                                              // 25
      }, UI.block(function() {                                                                                       // 26
        var self = this;                                                                                             // 27
        return [ "\n          ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];   // 28
      }), UI.block(function() {                                                                                      // 29
        var self = this;                                                                                             // 30
        return [ "\n          ", HTML.DIV({                                                                          // 31
          "class": "login-buttons-with-only-one-button"                                                              // 32
        }, "\n            ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n          "), "\n        " ];
      })), "\n      " ];                                                                                             // 34
    }), UI.block(function() {                                                                                        // 35
      var self = this;                                                                                               // 36
      return [ "\n        ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedIn")), "\n      " ];          // 37
    })), "\n    " ];                                                                                                 // 38
  }), UI.block(function() {                                                                                          // 39
    var self = this;                                                                                                 // 40
    return [ "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOut")), "\n    " ];               // 41
  })), "\n  ");                                                                                                      // 42
}));                                                                                                                 // 43
                                                                                                                     // 44
Template.__define__("_loginButtonsLoggedIn", (function() {                                                           // 45
  var self = this;                                                                                                   // 46
  var template = this;                                                                                               // 47
  return UI.If(function() {                                                                                          // 48
    return Spacebars.call(self.lookup("dropdown"));                                                                  // 49
  }, UI.block(function() {                                                                                           // 50
    var self = this;                                                                                                 // 51
    return [ "\n    ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n  " ];            // 52
  }), UI.block(function() {                                                                                          // 53
    var self = this;                                                                                                 // 54
    return [ "\n    ", HTML.DIV({                                                                                    // 55
      "class": "login-buttons-with-only-one-button"                                                                  // 56
    }, "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n    "), "\n  " ];
  }));                                                                                                               // 58
}));                                                                                                                 // 59
                                                                                                                     // 60
Template.__define__("_loginButtonsLoggedOut", (function() {                                                          // 61
  var self = this;                                                                                                   // 62
  var template = this;                                                                                               // 63
  return UI.If(function() {                                                                                          // 64
    return Spacebars.call(self.lookup("services"));                                                                  // 65
  }, UI.block(function() {                                                                                           // 66
    var self = this;                                                                                                 // 67
    return [ " \n    ", UI.If(function() {                                                                           // 68
      return Spacebars.call(self.lookup("configurationLoaded"));                                                     // 69
    }, UI.block(function() {                                                                                         // 70
      var self = this;                                                                                               // 71
      return [ "\n      ", UI.If(function() {                                                                        // 72
        return Spacebars.call(self.lookup("dropdown"));                                                              // 73
      }, UI.block(function() {                                                                                       // 74
        var self = this;                                                                                             // 75
        return [ " \n        ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n      " ];
      }), UI.block(function() {                                                                                      // 77
        var self = this;                                                                                             // 78
        return [ "\n        ", Spacebars.With(function() {                                                           // 79
          return Spacebars.call(self.lookup("singleService"));                                                       // 80
        }, UI.block(function() {                                                                                     // 81
          var self = this;                                                                                           // 82
          return [ " \n          ", HTML.DIV({                                                                       // 83
            "class": "login-buttons-with-only-one-button"                                                            // 84
          }, "\n            ", UI.If(function() {                                                                    // 85
            return Spacebars.call(self.lookup("loggingIn"));                                                         // 86
          }, UI.block(function() {                                                                                   // 87
            var self = this;                                                                                         // 88
            return [ "\n              ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n            " ];
          }), UI.block(function() {                                                                                  // 90
            var self = this;                                                                                         // 91
            return [ "\n              ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n            " ];
          })), "\n          "), "\n        " ];                                                                      // 93
        })), "\n      " ];                                                                                           // 94
      })), "\n    " ];                                                                                               // 95
    })), "\n  " ];                                                                                                   // 96
  }), UI.block(function() {                                                                                          // 97
    var self = this;                                                                                                 // 98
    return [ "\n    ", HTML.DIV({                                                                                    // 99
      "class": "no-services"                                                                                         // 100
    }, "No login services configured"), "\n  " ];                                                                    // 101
  }));                                                                                                               // 102
}));                                                                                                                 // 103
                                                                                                                     // 104
Template.__define__("_loginButtonsMessages", (function() {                                                           // 105
  var self = this;                                                                                                   // 106
  var template = this;                                                                                               // 107
  return [ UI.If(function() {                                                                                        // 108
    return Spacebars.call(self.lookup("errorMessage"));                                                              // 109
  }, UI.block(function() {                                                                                           // 110
    var self = this;                                                                                                 // 111
    return [ "\n    ", HTML.DIV({                                                                                    // 112
      "class": "alert alert-error"                                                                                   // 113
    }, function() {                                                                                                  // 114
      return Spacebars.mustache(self.lookup("errorMessage"));                                                        // 115
    }), "\n  " ];                                                                                                    // 116
  })), "\n  ", UI.If(function() {                                                                                    // 117
    return Spacebars.call(self.lookup("infoMessage"));                                                               // 118
  }, UI.block(function() {                                                                                           // 119
    var self = this;                                                                                                 // 120
    return [ "\n    ", HTML.DIV({                                                                                    // 121
      "class": "alert alert-success no-margin"                                                                       // 122
    }, function() {                                                                                                  // 123
      return Spacebars.mustache(self.lookup("infoMessage"));                                                         // 124
    }), "\n  " ];                                                                                                    // 125
  })) ];                                                                                                             // 126
}));                                                                                                                 // 127
                                                                                                                     // 128
Template.__define__("_loginButtonsLoggingIn", (function() {                                                          // 129
  var self = this;                                                                                                   // 130
  var template = this;                                                                                               // 131
  return [ Spacebars.include(self.lookupTemplate("_loginButtonsLoggingInPadding")), HTML.Raw('\n  <div class="loading">&nbsp;</div>\n  '), Spacebars.include(self.lookupTemplate("_loginButtonsLoggingInPadding")) ];
}));                                                                                                                 // 133
                                                                                                                     // 134
Template.__define__("_loginButtonsLoggingInPadding", (function() {                                                   // 135
  var self = this;                                                                                                   // 136
  var template = this;                                                                                               // 137
  return UI.Unless(function() {                                                                                      // 138
    return Spacebars.call(self.lookup("dropdown"));                                                                  // 139
  }, UI.block(function() {                                                                                           // 140
    var self = this;                                                                                                 // 141
    return [ "\n    \n    ", HTML.DIV({                                                                              // 142
      "class": "login-buttons-padding"                                                                               // 143
    }, "\n      ", HTML.DIV({                                                                                        // 144
      "class": "login-button single-login-button",                                                                   // 145
      style: "visibility: hidden;",                                                                                  // 146
      id: "login-buttons-logout"                                                                                     // 147
    }, HTML.CharRef({                                                                                                // 148
      html: "&nbsp;",                                                                                                // 149
      str: " "                                                                                                       // 150
    })), "\n    "), "\n  " ];                                                                                        // 151
  }), UI.block(function() {                                                                                          // 152
    var self = this;                                                                                                 // 153
    return [ "\n    \n    ", HTML.DIV({                                                                              // 154
      "class": "login-buttons-padding"                                                                               // 155
    }), "\n  " ];                                                                                                    // 156
  }));                                                                                                               // 157
}));                                                                                                                 // 158
                                                                                                                     // 159
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/template.login_buttons_single.js                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__define__("_loginButtonsLoggedOutSingleLoginButton", (function() {                                         // 2
  var self = this;                                                                                                   // 3
  var template = this;                                                                                               // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "login-text-and-button"                                                                                 // 6
  }, "\n    ", HTML.DIV({                                                                                            // 7
    "class": [ "login-button single-login-button ", UI.Unless(function() {                                           // 8
      return Spacebars.call(self.lookup("configured"));                                                              // 9
    }, UI.block(function() {                                                                                         // 10
      var self = this;                                                                                               // 11
      return "configure-button";                                                                                     // 12
    })) ],                                                                                                           // 13
    id: [ "login-buttons-", function() {                                                                             // 14
      return Spacebars.mustache(self.lookup("name"));                                                                // 15
    } ]                                                                                                              // 16
  }, "\n      ", HTML.DIV({                                                                                          // 17
    "class": "login-image",                                                                                          // 18
    id: [ "login-buttons-image-", function() {                                                                       // 19
      return Spacebars.mustache(self.lookup("name"));                                                                // 20
    } ]                                                                                                              // 21
  }), "\n      ", UI.If(function() {                                                                                 // 22
    return Spacebars.call(self.lookup("configured"));                                                                // 23
  }, UI.block(function() {                                                                                           // 24
    var self = this;                                                                                                 // 25
    return [ "\n        ", HTML.SPAN({                                                                               // 26
      "class": [ "text-besides-image sign-in-text-", function() {                                                    // 27
        return Spacebars.mustache(self.lookup("name"));                                                              // 28
      } ]                                                                                                            // 29
    }, "Sign in with ", function() {                                                                                 // 30
      return Spacebars.mustache(self.lookup("capitalizedName"));                                                     // 31
    }), "\n      " ];                                                                                                // 32
  }), UI.block(function() {                                                                                          // 33
    var self = this;                                                                                                 // 34
    return [ "\n        ", HTML.SPAN({                                                                               // 35
      "class": [ "text-besides-image configure-text-", function() {                                                  // 36
        return Spacebars.mustache(self.lookup("name"));                                                              // 37
      } ]                                                                                                            // 38
    }, "Configure ", function() {                                                                                    // 39
      return Spacebars.mustache(self.lookup("capitalizedName"));                                                     // 40
    }, " Login"), "\n      " ];                                                                                      // 41
  })), "\n    "), "\n  ");                                                                                           // 42
}));                                                                                                                 // 43
                                                                                                                     // 44
Template.__define__("_loginButtonsLoggingInSingleLoginButton", (function() {                                         // 45
  var self = this;                                                                                                   // 46
  var template = this;                                                                                               // 47
  return HTML.DIV({                                                                                                  // 48
    "class": "login-text-and-button"                                                                                 // 49
  }, "\n    ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggingIn")), "\n  ");                            // 50
}));                                                                                                                 // 51
                                                                                                                     // 52
Template.__define__("_loginButtonsLoggedInSingleLogoutButton", (function() {                                         // 53
  var self = this;                                                                                                   // 54
  var template = this;                                                                                               // 55
  return HTML.DIV({                                                                                                  // 56
    "class": "login-text-and-button"                                                                                 // 57
  }, "\n    ", HTML.DIV({                                                                                            // 58
    "class": "login-display-name"                                                                                    // 59
  }, "\n      ", function() {                                                                                        // 60
    return Spacebars.mustache(self.lookup("displayName"));                                                           // 61
  }, "\n    "), HTML.Raw('\n    <div class="login-button single-login-button" id="login-buttons-logout">Sign Out</div>\n  '));
}));                                                                                                                 // 63
                                                                                                                     // 64
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/template.login_buttons_dropdown.js                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__define__("_loginButtonsLoggedInDropdown", (function() {                                                   // 2
  var self = this;                                                                                                   // 3
  var template = this;                                                                                               // 4
  return HTML.DIV({                                                                                                  // 5
    "class": "dropdown"                                                                                              // 6
  }, "\n    ", HTML.UL({                                                                                             // 7
    "class": "nav pull-right"                                                                                        // 8
  }, "\n      ", HTML.LI({                                                                                           // 9
    id: "login-dropdown-list"                                                                                        // 10
  }, "\n        ", HTML.A({                                                                                          // 11
    "class": "dropdown-toggle",                                                                                      // 12
    href: "#",                                                                                                       // 13
    "data-toggle": "dropdown"                                                                                        // 14
  }, function() {                                                                                                    // 15
    return Spacebars.mustache(self.lookup("displayName"));                                                           // 16
  }, HTML.Raw('<strong class="caret"></strong>')), "\n        ", HTML.DIV({                                          // 17
    "class": "dropdown-menu",                                                                                        // 18
    style: "padding: 20px; padding-bottom: 20px;"                                                                    // 19
  }, "   \n          ", UI.If(function() {                                                                           // 20
    return Spacebars.call(self.lookup("inMessageOnlyFlow"));                                                         // 21
  }, UI.block(function() {                                                                                           // 22
    var self = this;                                                                                                 // 23
    return [ "\n            ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n          " ];    // 24
  }), UI.block(function() {                                                                                          // 25
    var self = this;                                                                                                 // 26
    return [ "\n            ", UI.If(function() {                                                                    // 27
      return Spacebars.call(self.lookup("inChangePasswordFlow"));                                                    // 28
    }, UI.block(function() {                                                                                         // 29
      var self = this;                                                                                               // 30
      return [ "\n              ", Spacebars.include(self.lookupTemplate("_loginButtonsChangePassword")), "\n            " ];
    }), UI.block(function() {                                                                                        // 32
      var self = this;                                                                                               // 33
      return [ "\n              ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n            " ];
    })), "\n          " ];                                                                                           // 35
  })), "\n        "), "\n      "), "\n    "), "\n  ");                                                               // 36
}));                                                                                                                 // 37
                                                                                                                     // 38
Template.__define__("_loginButtonsLoggedInDropdownActions", (function() {                                            // 39
  var self = this;                                                                                                   // 40
  var template = this;                                                                                               // 41
  return [ HTML.Raw('<button class="btn btn-block btn-primary" id="login-buttons-logout">Sign out</button>\n  '), UI.If(function() {
    return Spacebars.call(self.lookup("allowChangingPassword"));                                                     // 43
  }, UI.block(function() {                                                                                           // 44
    var self = this;                                                                                                 // 45
    return [ "\n    ", HTML.BUTTON({                                                                                 // 46
      "class": "btn btn-block",                                                                                      // 47
      id: "login-buttons-open-change-password"                                                                       // 48
    }, "Change password"), "\n  " ];                                                                                 // 49
  })) ];                                                                                                             // 50
}));                                                                                                                 // 51
                                                                                                                     // 52
Template.__define__("_loginButtonsLoggedOutDropdown", (function() {                                                  // 53
  var self = this;                                                                                                   // 54
  var template = this;                                                                                               // 55
  return HTML.DIV({                                                                                                  // 56
    "class": "nav-collapse collapse"                                                                                 // 57
  }, "\n    ", HTML.UL({                                                                                             // 58
    "class": "nav pull-right"                                                                                        // 59
  }, "\n      ", HTML.LI({                                                                                           // 60
    id: "login-dropdown-list",                                                                                       // 61
    "class": "dropdown"                                                                                              // 62
  }, HTML.Raw('\n        <a class="dropdown-toggle" href="#" data-toggle="dropdown">Sign In / Up <strong class="caret"></strong></a>\n        '), HTML.DIV({
    "class": "dropdown-menu",                                                                                        // 64
    style: "padding: 20px; padding-bottom: 20px;"                                                                    // 65
  }, "   \n          ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n        "), "\n      "), "\n    "), "\n  ");
}));                                                                                                                 // 67
                                                                                                                     // 68
Template.__define__("_loginButtonsLoggedOutAllServices", (function() {                                               // 69
  var self = this;                                                                                                   // 70
  var template = this;                                                                                               // 71
  return [ UI.Each(function() {                                                                                      // 72
    return Spacebars.call(self.lookup("services"));                                                                  // 73
  }, UI.block(function() {                                                                                           // 74
    var self = this;                                                                                                 // 75
    return [ "\n    ", UI.If(function() {                                                                            // 76
      return Spacebars.call(self.lookup("isPasswordService"));                                                       // 77
    }, UI.block(function() {                                                                                         // 78
      var self = this;                                                                                               // 79
      return [ "\n      ", UI.If(function() {                                                                        // 80
        return Spacebars.call(self.lookup("hasOtherServices"));                                                      // 81
      }, UI.block(function() {                                                                                       // 82
        var self = this;                                                                                             // 83
        return [ " \n        ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n      " ];
      })), "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n    " ];  // 85
    }), UI.block(function() {                                                                                        // 86
      var self = this;                                                                                               // 87
      return [ "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n    " ];
    })), "\n  " ];                                                                                                   // 89
  })), "\n  ", UI.Unless(function() {                                                                                // 90
    return Spacebars.call(self.lookup("hasPasswordService"));                                                        // 91
  }, UI.block(function() {                                                                                           // 92
    var self = this;                                                                                                 // 93
    return [ "\n    ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n  " ];                    // 94
  })) ];                                                                                                             // 95
}));                                                                                                                 // 96
                                                                                                                     // 97
Template.__define__("_loginButtonsLoggedOutPasswordServiceSeparator", (function() {                                  // 98
  var self = this;                                                                                                   // 99
  var template = this;                                                                                               // 100
  return HTML.Raw('<div class="or">\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n    <span class="or-text">or</span>\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n  </div>');
}));                                                                                                                 // 102
                                                                                                                     // 103
Template.__define__("_loginButtonsLoggedOutPasswordService", (function() {                                           // 104
  var self = this;                                                                                                   // 105
  var template = this;                                                                                               // 106
  return UI.If(function() {                                                                                          // 107
    return Spacebars.call(self.lookup("inForgotPasswordFlow"));                                                      // 108
  }, UI.block(function() {                                                                                           // 109
    var self = this;                                                                                                 // 110
    return [ "\n    ", Spacebars.include(self.lookupTemplate("_forgotPasswordForm")), "\n  " ];                      // 111
  }), UI.block(function() {                                                                                          // 112
    var self = this;                                                                                                 // 113
    return [ "\n    ", UI.Each(function() {                                                                          // 114
      return Spacebars.call(self.lookup("fields"));                                                                  // 115
    }, UI.block(function() {                                                                                         // 116
      var self = this;                                                                                               // 117
      return [ "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsFormField")), "\n    " ];             // 118
    })), "\n    ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n    ", HTML.BUTTON({          // 119
      "class": "btn btn-primary",                                                                                    // 120
      id: "login-buttons-password",                                                                                  // 121
      type: "button"                                                                                                 // 122
    }, "\n      ", UI.If(function() {                                                                                // 123
      return Spacebars.call(self.lookup("inSignupFlow"));                                                            // 124
    }, UI.block(function() {                                                                                         // 125
      var self = this;                                                                                               // 126
      return "\n        Create\n      ";                                                                             // 127
    }), UI.block(function() {                                                                                        // 128
      var self = this;                                                                                               // 129
      return "\n        Sign in\n      ";                                                                            // 130
    })), "\n    "), "\n    ", UI.If(function() {                                                                     // 131
      return Spacebars.call(self.lookup("inLoginFlow"));                                                             // 132
    }, UI.block(function() {                                                                                         // 133
      var self = this;                                                                                               // 134
      return [ "\n      ", UI.If(function() {                                                                        // 135
        return Spacebars.call(self.lookup("showCreateAccountLink"));                                                 // 136
      }, UI.block(function() {                                                                                       // 137
        var self = this;                                                                                             // 138
        return [ "\n        ", HTML.BUTTON({                                                                         // 139
          id: "signup-link",                                                                                         // 140
          "class": "btn",                                                                                            // 141
          type: "button"                                                                                             // 142
        }, "Create account"), "\n      " ];                                                                          // 143
      })), "\n      ", UI.If(function() {                                                                            // 144
        return Spacebars.call(self.lookup("showForgotPasswordLink"));                                                // 145
      }, UI.block(function() {                                                                                       // 146
        var self = this;                                                                                             // 147
        return [ "\n      ", HTML.DIV("\n        ", HTML.A({                                                         // 148
          id: "forgot-password-link"                                                                                 // 149
        }, "Forgot password"), "\n      "), "\n      " ];                                                            // 150
      })), "\n    " ];                                                                                               // 151
    })), "\n    ", UI.If(function() {                                                                                // 152
      return Spacebars.call(self.lookup("inSignupFlow"));                                                            // 153
    }, UI.block(function() {                                                                                         // 154
      var self = this;                                                                                               // 155
      return [ "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsBackToLoginLink")), "\n    " ];       // 156
    })), "\n  " ];                                                                                                   // 157
  }));                                                                                                               // 158
}));                                                                                                                 // 159
                                                                                                                     // 160
Template.__define__("_forgotPasswordForm", (function() {                                                             // 161
  var self = this;                                                                                                   // 162
  var template = this;                                                                                               // 163
  return HTML.DIV({                                                                                                  // 164
    "class": "login-form"                                                                                            // 165
  }, HTML.Raw('\n    <div id="forgot-password-email-label-and-input"> \n      <label id="forgot-password-email-label" for="forgot-password-email">Email</label>\n      <input id="forgot-password-email" type="email">\n    </div>\n    '), Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n    <button class="btn btn-primary login-button-form-submit" id="login-buttons-forgot-password">Reset password</button>\n    '), Spacebars.include(self.lookupTemplate("_loginButtonsBackToLoginLink")), "\n  ");
}));                                                                                                                 // 167
                                                                                                                     // 168
Template.__define__("_loginButtonsBackToLoginLink", (function() {                                                    // 169
  var self = this;                                                                                                   // 170
  var template = this;                                                                                               // 171
  return HTML.Raw('<button id="back-to-login-link" class="btn">Cancel</button>');                                    // 172
}));                                                                                                                 // 173
                                                                                                                     // 174
Template.__define__("_loginButtonsFormField", (function() {                                                          // 175
  var self = this;                                                                                                   // 176
  var template = this;                                                                                               // 177
  return UI.If(function() {                                                                                          // 178
    return Spacebars.call(self.lookup("visible"));                                                                   // 179
  }, UI.block(function() {                                                                                           // 180
    var self = this;                                                                                                 // 181
    return [ "\n    ", HTML.LABEL({                                                                                  // 182
      id: [ "login-", function() {                                                                                   // 183
        return Spacebars.mustache(self.lookup("fieldName"));                                                         // 184
      }, "-label" ],                                                                                                 // 185
      "for": [ "login-", function() {                                                                                // 186
        return Spacebars.mustache(self.lookup("fieldName"));                                                         // 187
      } ]                                                                                                            // 188
    }, function() {                                                                                                  // 189
      return Spacebars.mustache(self.lookup("fieldLabel"));                                                          // 190
    }), "\n    ", HTML.INPUT({                                                                                       // 191
      id: [ "login-", function() {                                                                                   // 192
        return Spacebars.mustache(self.lookup("fieldName"));                                                         // 193
      } ],                                                                                                           // 194
      type: function() {                                                                                             // 195
        return Spacebars.mustache(self.lookup("inputType"));                                                         // 196
      }                                                                                                              // 197
    }), "\n  " ];                                                                                                    // 198
  }));                                                                                                               // 199
}));                                                                                                                 // 200
                                                                                                                     // 201
Template.__define__("_loginButtonsChangePassword", (function() {                                                     // 202
  var self = this;                                                                                                   // 203
  var template = this;                                                                                               // 204
  return [ UI.Each(function() {                                                                                      // 205
    return Spacebars.call(self.lookup("fields"));                                                                    // 206
  }, UI.block(function() {                                                                                           // 207
    var self = this;                                                                                                 // 208
    return [ "\n    ", Spacebars.include(self.lookupTemplate("_loginButtonsFormField")), "\n  " ];                   // 209
  })), "\n  ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n  <div>\n    <button class="btn btn-primary" id="login-buttons-do-change-password">Change password</button>\n    <button class="btn login-close">Close</button>\n  </div>') ];
}));                                                                                                                 // 211
                                                                                                                     // 212
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/template.login_buttons_dialogs.js                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
UI.body.contentParts.push(UI.Component.extend({render: (function() {                                                 // 2
  var self = this;                                                                                                   // 3
  return [ Spacebars.include(self.lookupTemplate("_resetPasswordDialog")), "\n  ", Spacebars.include(self.lookupTemplate("_enrollAccountDialog")), "\n  ", Spacebars.include(self.lookupTemplate("_justVerifiedEmailDialog")), "\n  ", Spacebars.include(self.lookupTemplate("_configureLoginServiceDialog")), HTML.Raw("\n\n  <!-- if we're not showing a dropdown, we need some other place to show messages -->\n  "), Spacebars.include(self.lookupTemplate("_loginButtonsMessagesDialog")) ];
})}));                                                                                                               // 5
Meteor.startup(function () { if (! UI.body.INSTANTIATED) { UI.body.INSTANTIATED = true; UI.DomRange.insert(UI.render(UI.body).dom, document.body); } });
                                                                                                                     // 7
Template.__define__("_resetPasswordDialog", (function() {                                                            // 8
  var self = this;                                                                                                   // 9
  var template = this;                                                                                               // 10
  return UI.If(function() {                                                                                          // 11
    return Spacebars.call(self.lookup("inResetPasswordFlow"));                                                       // 12
  }, UI.block(function() {                                                                                           // 13
    var self = this;                                                                                                 // 14
    return [ "\n    ", HTML.DIV({                                                                                    // 15
      "class": "hide-background"                                                                                     // 16
    }), "\n\n    ", HTML.DIV({                                                                                       // 17
      "class": "accounts-dialog accounts-centered-dialog"                                                            // 18
    }, "\n      ", HTML.LABEL({                                                                                      // 19
      id: "reset-password-new-password-label",                                                                       // 20
      "for": "reset-password-new-password"                                                                           // 21
    }, "\n        New password\n      "), "\n      ", HTML.INPUT({                                                   // 22
      id: "reset-password-new-password",                                                                             // 23
      type: "password"                                                                                               // 24
    }), "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({          // 25
      "class": "login-button login-button-form-submit",                                                              // 26
      id: "login-buttons-reset-password-button"                                                                      // 27
    }, "\n        Set password\n      "), "\n      ", HTML.A({                                                       // 28
      "class": "accounts-close",                                                                                     // 29
      id: "login-buttons-cancel-reset-password"                                                                      // 30
    }, HTML.CharRef({                                                                                                // 31
      html: "&times;",                                                                                               // 32
      str: "×"                                                                                                       // 33
    })), "\n    "), "\n  " ];                                                                                        // 34
  }));                                                                                                               // 35
}));                                                                                                                 // 36
                                                                                                                     // 37
Template.__define__("_enrollAccountDialog", (function() {                                                            // 38
  var self = this;                                                                                                   // 39
  var template = this;                                                                                               // 40
  return UI.If(function() {                                                                                          // 41
    return Spacebars.call(self.lookup("inEnrollAccountFlow"));                                                       // 42
  }, UI.block(function() {                                                                                           // 43
    var self = this;                                                                                                 // 44
    return [ "\n    ", HTML.DIV({                                                                                    // 45
      "class": "hide-background"                                                                                     // 46
    }), "\n    ", HTML.DIV({                                                                                         // 47
      "class": "accounts-dialog accounts-centered-dialog"                                                            // 48
    }, "\n      ", HTML.LABEL({                                                                                      // 49
      id: "enroll-account-password-label",                                                                           // 50
      "for": "enroll-account-password"                                                                               // 51
    }, "\n        Choose a password\n      "), "\n      ", HTML.INPUT({                                              // 52
      id: "enroll-account-password",                                                                                 // 53
      type: "password"                                                                                               // 54
    }), "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({          // 55
      "class": "login-button login-button-form-submit",                                                              // 56
      id: "login-buttons-enroll-account-button"                                                                      // 57
    }, "\n        Create account\n      "), "\n      ", HTML.A({                                                     // 58
      "class": "accounts-close",                                                                                     // 59
      id: "login-buttons-cancel-enroll-account"                                                                      // 60
    }, HTML.CharRef({                                                                                                // 61
      html: "&times;",                                                                                               // 62
      str: "×"                                                                                                       // 63
    })), "\n    "), "\n  " ];                                                                                        // 64
  }));                                                                                                               // 65
}));                                                                                                                 // 66
                                                                                                                     // 67
Template.__define__("_justVerifiedEmailDialog", (function() {                                                        // 68
  var self = this;                                                                                                   // 69
  var template = this;                                                                                               // 70
  return UI.If(function() {                                                                                          // 71
    return Spacebars.call(self.lookup("visible"));                                                                   // 72
  }, UI.block(function() {                                                                                           // 73
    var self = this;                                                                                                 // 74
    return [ "\n    ", HTML.DIV({                                                                                    // 75
      "class": "accounts-dialog accounts-centered-dialog"                                                            // 76
    }, "\n      Email verified\n      ", HTML.DIV({                                                                  // 77
      "class": "login-button",                                                                                       // 78
      id: "just-verified-dismiss-button"                                                                             // 79
    }, "Dismiss"), "\n    "), "\n  " ];                                                                              // 80
  }));                                                                                                               // 81
}));                                                                                                                 // 82
                                                                                                                     // 83
Template.__define__("_configureLoginServiceDialog", (function() {                                                    // 84
  var self = this;                                                                                                   // 85
  var template = this;                                                                                               // 86
  return UI.If(function() {                                                                                          // 87
    return Spacebars.call(self.lookup("visible"));                                                                   // 88
  }, UI.block(function() {                                                                                           // 89
    var self = this;                                                                                                 // 90
    return [ "\n    ", HTML.DIV({                                                                                    // 91
      id: "configure-login-service-dialog",                                                                          // 92
      "class": "accounts-dialog accounts-centered-dialog"                                                            // 93
    }, "\n      ", function() {                                                                                      // 94
      return Spacebars.makeRaw(Spacebars.mustache(self.lookup("configurationSteps")));                               // 95
    }, "\n      ", HTML.P("\n        Now, copy over some details.\n      "), "\n      ", HTML.P("\n        ", HTML.TABLE("\n          ", HTML.COLGROUP("\n            ", HTML.COL({
      span: "1",                                                                                                     // 97
      "class": "configuration_labels"                                                                                // 98
    }), "\n            ", HTML.COL({                                                                                 // 99
      span: "1",                                                                                                     // 100
      "class": "configuration_inputs"                                                                                // 101
    }), "\n          "), "\n          ", UI.Each(function() {                                                        // 102
      return Spacebars.call(self.lookup("configurationFields"));                                                     // 103
    }, UI.block(function() {                                                                                         // 104
      var self = this;                                                                                               // 105
      return [ "\n            ", HTML.TR("\n              ", HTML.TD("\n                ", HTML.LABEL({              // 106
        "for": [ "configure-login-service-dialog-", function() {                                                     // 107
          return Spacebars.mustache(self.lookup("property"));                                                        // 108
        } ]                                                                                                          // 109
      }, function() {                                                                                                // 110
        return Spacebars.mustache(self.lookup("label"));                                                             // 111
      }), "\n              "), "\n              ", HTML.TD("\n                ", HTML.INPUT({                        // 112
        id: [ "configure-login-service-dialog-", function() {                                                        // 113
          return Spacebars.mustache(self.lookup("property"));                                                        // 114
        } ],                                                                                                         // 115
        type: "text"                                                                                                 // 116
      }), "\n              "), "\n            "), "\n          " ];                                                  // 117
    })), "\n        "), "\n      "), "\n      ", HTML.DIV({                                                          // 118
      "class": "new-section"                                                                                         // 119
    }, "\n        ", HTML.DIV({                                                                                      // 120
      "class": "login-button configure-login-service-dismiss-button"                                                 // 121
    }, "\n          I'll do this later\n        "), "\n        ", HTML.A({                                           // 122
      "class": "accounts-close configure-login-service-dismiss-button"                                               // 123
    }, HTML.CharRef({                                                                                                // 124
      html: "&times;",                                                                                               // 125
      str: "×"                                                                                                       // 126
    })), "\n\n        ", HTML.DIV({                                                                                  // 127
      "class": [ "login-button login-button-configure ", UI.If(function() {                                          // 128
        return Spacebars.call(self.lookup("saveDisabled"));                                                          // 129
      }, UI.block(function() {                                                                                       // 130
        var self = this;                                                                                             // 131
        return "login-button-disabled";                                                                              // 132
      })) ],                                                                                                         // 133
      id: "configure-login-service-dialog-save-configuration"                                                        // 134
    }, "\n          Save Configuration\n        "), "\n      "), "\n    "), "\n  " ];                                // 135
  }));                                                                                                               // 136
}));                                                                                                                 // 137
                                                                                                                     // 138
Template.__define__("_loginButtonsMessagesDialog", (function() {                                                     // 139
  var self = this;                                                                                                   // 140
  var template = this;                                                                                               // 141
  return UI.If(function() {                                                                                          // 142
    return Spacebars.call(self.lookup("visible"));                                                                   // 143
  }, UI.block(function() {                                                                                           // 144
    var self = this;                                                                                                 // 145
    return [ "\n    ", HTML.DIV({                                                                                    // 146
      "class": "accounts-dialog accounts-centered-dialog",                                                           // 147
      id: "login-buttons-message-dialog"                                                                             // 148
    }, "\n      ", Spacebars.include(self.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({           // 149
      "class": "login-button",                                                                                       // 150
      id: "messages-dialog-dismiss-button"                                                                           // 151
    }, "Dismiss"), "\n    "), "\n  " ];                                                                              // 152
  }));                                                                                                               // 153
}));                                                                                                                 // 154
                                                                                                                     // 155
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/login_buttons_session.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var VALID_KEYS = [                                                                                                   // 1
  'dropdownVisible',                                                                                                 // 2
                                                                                                                     // 3
  // XXX consider replacing these with one key that has an enum for values.                                          // 4
  'inSignupFlow',                                                                                                    // 5
  'inForgotPasswordFlow',                                                                                            // 6
  'inChangePasswordFlow',                                                                                            // 7
  'inMessageOnlyFlow',                                                                                               // 8
                                                                                                                     // 9
  'errorMessage',                                                                                                    // 10
  'infoMessage',                                                                                                     // 11
                                                                                                                     // 12
  // dialogs with messages (info and error)                                                                          // 13
  'resetPasswordToken',                                                                                              // 14
  'enrollAccountToken',                                                                                              // 15
  'justVerifiedEmail',                                                                                               // 16
                                                                                                                     // 17
  'configureLoginServiceDialogVisible',                                                                              // 18
  'configureLoginServiceDialogServiceName',                                                                          // 19
  'configureLoginServiceDialogSaveDisabled'                                                                          // 20
];                                                                                                                   // 21
                                                                                                                     // 22
var validateKey = function (key) {                                                                                   // 23
  if (!_.contains(VALID_KEYS, key))                                                                                  // 24
    throw new Error("Invalid key in loginButtonsSession: " + key);                                                   // 25
};                                                                                                                   // 26
                                                                                                                     // 27
var KEY_PREFIX = "Meteor.loginButtons.";                                                                             // 28
                                                                                                                     // 29
// XXX This should probably be package scope rather than exported                                                    // 30
// (there was even a comment to that effect here from before we had                                                  // 31
// namespacing) but accounts-ui-viewer uses it, so leave it as is for                                                // 32
// now                                                                                                               // 33
Accounts._loginButtonsSession = {                                                                                    // 34
  set: function(key, value) {                                                                                        // 35
    validateKey(key);                                                                                                // 36
    if (_.contains(['errorMessage', 'infoMessage'], key))                                                            // 37
      throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");
                                                                                                                     // 39
    this._set(key, value);                                                                                           // 40
  },                                                                                                                 // 41
                                                                                                                     // 42
  _set: function(key, value) {                                                                                       // 43
    Session.set(KEY_PREFIX + key, value);                                                                            // 44
  },                                                                                                                 // 45
                                                                                                                     // 46
  get: function(key) {                                                                                               // 47
    validateKey(key);                                                                                                // 48
    return Session.get(KEY_PREFIX + key);                                                                            // 49
  },                                                                                                                 // 50
                                                                                                                     // 51
  closeDropdown: function () {                                                                                       // 52
    this.set('inSignupFlow', false);                                                                                 // 53
    this.set('inForgotPasswordFlow', false);                                                                         // 54
    this.set('inChangePasswordFlow', false);                                                                         // 55
    this.set('inMessageOnlyFlow', false);                                                                            // 56
    this.set('dropdownVisible', false);                                                                              // 57
    this.resetMessages();                                                                                            // 58
  },                                                                                                                 // 59
                                                                                                                     // 60
  infoMessage: function(message) {                                                                                   // 61
    this._set("errorMessage", null);                                                                                 // 62
    this._set("infoMessage", message);                                                                               // 63
    this.ensureMessageVisible();                                                                                     // 64
  },                                                                                                                 // 65
                                                                                                                     // 66
  errorMessage: function(message) {                                                                                  // 67
    this._set("errorMessage", message);                                                                              // 68
    this._set("infoMessage", null);                                                                                  // 69
    this.ensureMessageVisible();                                                                                     // 70
  },                                                                                                                 // 71
                                                                                                                     // 72
  // is there a visible dialog that shows messages (info and error)                                                  // 73
  isMessageDialogVisible: function () {                                                                              // 74
    return this.get('resetPasswordToken') ||                                                                         // 75
      this.get('enrollAccountToken') ||                                                                              // 76
      this.get('justVerifiedEmail');                                                                                 // 77
  },                                                                                                                 // 78
                                                                                                                     // 79
  // ensure that somethings displaying a message (info or error) is                                                  // 80
  // visible.  if a dialog with messages is open, do nothing;                                                        // 81
  // otherwise open the dropdown.                                                                                    // 82
  //                                                                                                                 // 83
  // notably this doesn't matter when only displaying a single login                                                 // 84
  // button since then we have an explicit message dialog                                                            // 85
  // (_loginButtonsMessageDialog), and dropdownVisible is ignored in                                                 // 86
  // this case.                                                                                                      // 87
  ensureMessageVisible: function () {                                                                                // 88
    if (!this.isMessageDialogVisible())                                                                              // 89
      this.set("dropdownVisible", true);                                                                             // 90
  },                                                                                                                 // 91
                                                                                                                     // 92
  resetMessages: function () {                                                                                       // 93
    this._set("errorMessage", null);                                                                                 // 94
    this._set("infoMessage", null);                                                                                  // 95
  },                                                                                                                 // 96
                                                                                                                     // 97
  configureService: function (name) {                                                                                // 98
    this.set('configureLoginServiceDialogVisible', true);                                                            // 99
    this.set('configureLoginServiceDialogServiceName', name);                                                        // 100
    this.set('configureLoginServiceDialogSaveDisabled', true);                                                       // 101
  }                                                                                                                  // 102
};                                                                                                                   // 103
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/login_buttons.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// for convenience                                                                                                   // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                             // 2
                                                                                                                     // 3
// shared between dropdown and single mode                                                                           // 4
Template._loginButtons.events({                                                                                      // 5
  'click #login-buttons-logout': function() {                                                                        // 6
    Meteor.logout(function () {                                                                                      // 7
      loginButtonsSession.closeDropdown();                                                                           // 8
    });                                                                                                              // 9
  }                                                                                                                  // 10
});                                                                                                                  // 11
                                                                                                                     // 12
UI.registerHelper('loginButtons', function () {                                                                      // 13
  throw new Error("Use {{> loginButtons}} instead of {{loginButtons}}");                                             // 14
});                                                                                                                  // 15
                                                                                                                     // 16
//                                                                                                                   // 17
// helpers                                                                                                           // 18
//                                                                                                                   // 19
                                                                                                                     // 20
displayName = function () {                                                                                          // 21
  var user = Meteor.user();                                                                                          // 22
  if (!user)                                                                                                         // 23
    return '';                                                                                                       // 24
                                                                                                                     // 25
  if (user.profile && user.profile.name)                                                                             // 26
    return user.profile.name;                                                                                        // 27
  if (user.username)                                                                                                 // 28
    return user.username;                                                                                            // 29
  if (user.emails && user.emails[0] && user.emails[0].address)                                                       // 30
    return user.emails[0].address;                                                                                   // 31
                                                                                                                     // 32
  return '';                                                                                                         // 33
};                                                                                                                   // 34
                                                                                                                     // 35
// returns an array of the login services used by this app. each                                                     // 36
// element of the array is an object (eg {name: 'facebook'}), since                                                  // 37
// that makes it useful in combination with UI {{#each}}.                                                            // 38
//                                                                                                                   // 39
// don't cache the output of this function: if called during startup (before                                         // 40
// oauth packages load) it might not include them all.                                                               // 41
//                                                                                                                   // 42
// NOTE: It is very important to have this return password last                                                      // 43
// because of the way we render the different providers in                                                           // 44
// login_buttons_dropdown.html                                                                                       // 45
getLoginServices = function () {                                                                                     // 46
  var self = this;                                                                                                   // 47
                                                                                                                     // 48
  // First look for OAuth services.                                                                                  // 49
  var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];                                     // 50
                                                                                                                     // 51
  // Be equally kind to all login services. This also preserves                                                      // 52
  // backwards-compatibility. (But maybe order should be                                                             // 53
  // configurable?)                                                                                                  // 54
  services.sort();                                                                                                   // 55
                                                                                                                     // 56
  // Add password, if it's there; it must come last.                                                                 // 57
  if (hasPasswordService())                                                                                          // 58
    services.push('password');                                                                                       // 59
                                                                                                                     // 60
  return _.map(services, function(name) {                                                                            // 61
    return {name: name};                                                                                             // 62
  });                                                                                                                // 63
};                                                                                                                   // 64
                                                                                                                     // 65
hasPasswordService = function () {                                                                                   // 66
  return !!Package['accounts-password'];                                                                             // 67
};                                                                                                                   // 68
                                                                                                                     // 69
dropdown = function () {                                                                                             // 70
  return hasPasswordService() || getLoginServices().length > 1;                                                      // 71
};                                                                                                                   // 72
                                                                                                                     // 73
// XXX improve these. should this be in accounts-password instead?                                                   // 74
//                                                                                                                   // 75
// XXX these will become configurable, and will be validated on                                                      // 76
// the server as well.                                                                                               // 77
validateUsername = function (username) {                                                                             // 78
  if (username.length >= 3) {                                                                                        // 79
    return true;                                                                                                     // 80
  } else {                                                                                                           // 81
    loginButtonsSession.errorMessage("Username must be at least 3 characters long");                                 // 82
    return false;                                                                                                    // 83
  }                                                                                                                  // 84
};                                                                                                                   // 85
validateEmail = function (email) {                                                                                   // 86
  if (passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')                                      // 87
    return true;                                                                                                     // 88
                                                                                                                     // 89
  if (email.indexOf('@') !== -1) {                                                                                   // 90
    return true;                                                                                                     // 91
  } else {                                                                                                           // 92
    loginButtonsSession.errorMessage("Invalid email");                                                               // 93
    return false;                                                                                                    // 94
  }                                                                                                                  // 95
};                                                                                                                   // 96
validatePassword = function (password) {                                                                             // 97
  if (password.length >= 6) {                                                                                        // 98
    return true;                                                                                                     // 99
  } else {                                                                                                           // 100
    loginButtonsSession.errorMessage("Password must be at least 6 characters long");                                 // 101
    return false;                                                                                                    // 102
  }                                                                                                                  // 103
};                                                                                                                   // 104
                                                                                                                     // 105
//                                                                                                                   // 106
// loginButtonLoggedOut template                                                                                     // 107
//                                                                                                                   // 108
                                                                                                                     // 109
Template._loginButtonsLoggedOut.dropdown = dropdown;                                                                 // 110
                                                                                                                     // 111
Template._loginButtonsLoggedOut.services = getLoginServices;                                                         // 112
                                                                                                                     // 113
Template._loginButtonsLoggedOut.singleService = function () {                                                        // 114
  var services = getLoginServices();                                                                                 // 115
  if (services.length !== 1)                                                                                         // 116
    throw new Error(                                                                                                 // 117
      "Shouldn't be rendering this template with more than one configured service");                                 // 118
  return services[0];                                                                                                // 119
};                                                                                                                   // 120
                                                                                                                     // 121
Template._loginButtonsLoggedOut.configurationLoaded = function () {                                                  // 122
  return Accounts.loginServicesConfigured();                                                                         // 123
};                                                                                                                   // 124
                                                                                                                     // 125
                                                                                                                     // 126
//                                                                                                                   // 127
// loginButtonsLoggedIn template                                                                                     // 128
//                                                                                                                   // 129
                                                                                                                     // 130
// decide whether we should show a dropdown rather than a row of                                                     // 131
// buttons                                                                                                           // 132
Template._loginButtonsLoggedIn.dropdown = dropdown;                                                                  // 133
                                                                                                                     // 134
                                                                                                                     // 135
                                                                                                                     // 136
//                                                                                                                   // 137
// loginButtonsLoggedInSingleLogoutButton template                                                                   // 138
//                                                                                                                   // 139
                                                                                                                     // 140
Template._loginButtonsLoggedInSingleLogoutButton.displayName = displayName;                                          // 141
                                                                                                                     // 142
                                                                                                                     // 143
                                                                                                                     // 144
//                                                                                                                   // 145
// loginButtonsMessage template                                                                                      // 146
//                                                                                                                   // 147
                                                                                                                     // 148
Template._loginButtonsMessages.errorMessage = function () {                                                          // 149
  return loginButtonsSession.get('errorMessage');                                                                    // 150
};                                                                                                                   // 151
                                                                                                                     // 152
Template._loginButtonsMessages.infoMessage = function () {                                                           // 153
  return loginButtonsSession.get('infoMessage');                                                                     // 154
};                                                                                                                   // 155
                                                                                                                     // 156
                                                                                                                     // 157
//                                                                                                                   // 158
// loginButtonsLoggingInPadding template                                                                             // 159
//                                                                                                                   // 160
                                                                                                                     // 161
Template._loginButtonsLoggingInPadding.dropdown = dropdown;                                                          // 162
                                                                                                                     // 163
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/login_buttons_single.js                                                   //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// for convenience                                                                                                   // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                             // 2
                                                                                                                     // 3
Template._loginButtonsLoggedOutSingleLoginButton.events({                                                            // 4
  'click .login-button': function () {                                                                               // 5
    var serviceName = this.name;                                                                                     // 6
    loginButtonsSession.resetMessages();                                                                             // 7
    var callback = function (err) {                                                                                  // 8
      if (!err) {                                                                                                    // 9
        loginButtonsSession.closeDropdown();                                                                         // 10
      } else if (err instanceof Accounts.LoginCancelledError) {                                                      // 11
        // do nothing                                                                                                // 12
      } else if (err instanceof ServiceConfiguration.ConfigError) {                                                  // 13
        loginButtonsSession.configureService(serviceName);                                                           // 14
      } else {                                                                                                       // 15
        loginButtonsSession.errorMessage(err.reason || "Unknown error");                                             // 16
      }                                                                                                              // 17
    };                                                                                                               // 18
                                                                                                                     // 19
    // XXX Service providers should be able to specify their                                                         // 20
    // `Meteor.loginWithX` method name.                                                                              // 21
    var loginWithService = Meteor["loginWith" +                                                                      // 22
                                  (serviceName === 'meteor-developer' ?                                              // 23
                                   'MeteorDeveloperAccount' :                                                        // 24
                                   capitalize(serviceName))];                                                        // 25
                                                                                                                     // 26
    var options = {}; // use default scope unless specified                                                          // 27
    if (Accounts.ui._options.requestPermissions[serviceName])                                                        // 28
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];                             // 29
    if (Accounts.ui._options.requestOfflineToken[serviceName])                                                       // 30
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];                           // 31
                                                                                                                     // 32
    loginWithService(options, callback);                                                                             // 33
  }                                                                                                                  // 34
});                                                                                                                  // 35
                                                                                                                     // 36
Template._loginButtonsLoggedOutSingleLoginButton.configured = function () {                                          // 37
  return !!ServiceConfiguration.configurations.findOne({service: this.name});                                        // 38
};                                                                                                                   // 39
                                                                                                                     // 40
Template._loginButtonsLoggedOutSingleLoginButton.capitalizedName = function () {                                     // 41
  if (this.name === 'github')                                                                                        // 42
    // XXX we should allow service packages to set their capitalized name                                            // 43
    return 'GitHub';                                                                                                 // 44
  else if (this.name === 'meteor-developer')                                                                         // 45
    return 'Meteor';                                                                                                 // 46
  else                                                                                                               // 47
    return capitalize(this.name);                                                                                    // 48
};                                                                                                                   // 49
                                                                                                                     // 50
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                       // 51
var capitalize = function(str){                                                                                      // 52
  str = str == null ? '' : String(str);                                                                              // 53
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                 // 54
};                                                                                                                   // 55
                                                                                                                     // 56
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/login_buttons_dropdown.js                                                 //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// for convenience                                                                                                   // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                             // 2
                                                                                                                     // 3
// events shared between loginButtonsLoggedOutDropdown and                                                           // 4
// loginButtonsLoggedInDropdown                                                                                      // 5
Template._loginButtons.events({                                                                                      // 6
  'click input, click label, click button, click .dropdown-menu, click .alert': function(event) {                    // 7
    event.stopPropagation();                                                                                         // 8
  },                                                                                                                 // 9
  'click #login-name-link, click #login-sign-in-link': function () {                                                 // 10
    event.stopPropagation();                                                                                         // 11
    loginButtonsSession.set('dropdownVisible', true);                                                                // 12
    Deps.flush();                                                                                                    // 13
  },                                                                                                                 // 14
  'click .login-close': function () {                                                                                // 15
    loginButtonsSession.closeDropdown();                                                                             // 16
  }                                                                                                                  // 17
});                                                                                                                  // 18
                                                                                                                     // 19
                                                                                                                     // 20
//                                                                                                                   // 21
// loginButtonsLoggedInDropdown template and related                                                                 // 22
//                                                                                                                   // 23
                                                                                                                     // 24
Template._loginButtonsLoggedInDropdown.events({                                                                      // 25
  'click #login-buttons-open-change-password': function(event) {                                                     // 26
    event.stopPropagation();                                                                                         // 27
    loginButtonsSession.resetMessages();                                                                             // 28
    loginButtonsSession.set('inChangePasswordFlow', true);                                                           // 29
    Deps.flush();                                                                                                    // 30
    toggleDropdown();                                                                                                // 31
  }                                                                                                                  // 32
});                                                                                                                  // 33
                                                                                                                     // 34
Template._loginButtonsLoggedInDropdown.displayName = displayName;                                                    // 35
                                                                                                                     // 36
Template._loginButtonsLoggedInDropdown.inChangePasswordFlow = function () {                                          // 37
  return loginButtonsSession.get('inChangePasswordFlow');                                                            // 38
};                                                                                                                   // 39
                                                                                                                     // 40
Template._loginButtonsLoggedInDropdown.inMessageOnlyFlow = function () {                                             // 41
  return loginButtonsSession.get('inMessageOnlyFlow');                                                               // 42
};                                                                                                                   // 43
                                                                                                                     // 44
Template._loginButtonsLoggedInDropdown.dropdownVisible = function () {                                               // 45
  return loginButtonsSession.get('dropdownVisible');                                                                 // 46
};                                                                                                                   // 47
                                                                                                                     // 48
Template._loginButtonsLoggedInDropdownActions.allowChangingPassword = function () {                                  // 49
  // it would be more correct to check whether the user has a password set,                                          // 50
  // but in order to do that we'd have to send more data down to the client,                                         // 51
  // and it'd be preferable not to send down the entire service.password document.                                   // 52
  //                                                                                                                 // 53
  // instead we use the heuristic: if the user has a username or email set.                                          // 54
  var user = Meteor.user();                                                                                          // 55
  return user.username || (user.emails && user.emails[0] && user.emails[0].address);                                 // 56
};                                                                                                                   // 57
                                                                                                                     // 58
                                                                                                                     // 59
//                                                                                                                   // 60
// loginButtonsLoggedOutDropdown template and related                                                                // 61
//                                                                                                                   // 62
                                                                                                                     // 63
Template._loginButtonsLoggedOutDropdown.events({                                                                     // 64
  'click #login-buttons-password': function () {                                                                     // 65
    loginOrSignup();                                                                                                 // 66
  },                                                                                                                 // 67
                                                                                                                     // 68
  'keypress #forgot-password-email': function (event) {                                                              // 69
    if (event.keyCode === 13)                                                                                        // 70
      forgotPassword();                                                                                              // 71
  },                                                                                                                 // 72
                                                                                                                     // 73
  'click #login-buttons-forgot-password': function (event) {                                                         // 74
    event.stopPropagation();                                                                                         // 75
    forgotPassword();                                                                                                // 76
  },                                                                                                                 // 77
                                                                                                                     // 78
  'click #signup-link': function (event) {                                                                           // 79
    event.stopPropagation();                                                                                         // 80
    loginButtonsSession.resetMessages();                                                                             // 81
                                                                                                                     // 82
    // store values of fields before swtiching to the signup form                                                    // 83
    var username = trimmedElementValueById('login-username');                                                        // 84
    var email = trimmedElementValueById('login-email');                                                              // 85
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                        // 86
    // notably not trimmed. a password could (?) start or end with a space                                           // 87
    var password = elementValueById('login-password');                                                               // 88
                                                                                                                     // 89
    loginButtonsSession.set('inSignupFlow', true);                                                                   // 90
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                          // 91
                                                                                                                     // 92
    // force the ui to update so that we have the approprate fields to fill in                                       // 93
    Deps.flush();                                                                                                    // 94
                                                                                                                     // 95
    // update new fields with appropriate defaults                                                                   // 96
    if (username !== null)                                                                                           // 97
      document.getElementById('login-username').value = username;                                                    // 98
    else if (email !== null)                                                                                         // 99
      document.getElementById('login-email').value = email;                                                          // 100
    else if (usernameOrEmail !== null)                                                                               // 101
      if (usernameOrEmail.indexOf('@') === -1)                                                                       // 102
        document.getElementById('login-username').value = usernameOrEmail;                                           // 103
    else                                                                                                             // 104
      document.getElementById('login-email').value = usernameOrEmail;                                                // 105
  },                                                                                                                 // 106
  'click #forgot-password-link': function (event) {                                                                  // 107
    event.stopPropagation();                                                                                         // 108
    loginButtonsSession.resetMessages();                                                                             // 109
                                                                                                                     // 110
    // store values of fields before swtiching to the signup form                                                    // 111
    var email = trimmedElementValueById('login-email');                                                              // 112
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                        // 113
                                                                                                                     // 114
    loginButtonsSession.set('inSignupFlow', false);                                                                  // 115
    loginButtonsSession.set('inForgotPasswordFlow', true);                                                           // 116
                                                                                                                     // 117
    // force the ui to update so that we have the approprate fields to fill in                                       // 118
    Deps.flush();                                                                                                    // 119
    //toggleDropdown();                                                                                              // 120
                                                                                                                     // 121
    // update new fields with appropriate defaults                                                                   // 122
    if (email !== null)                                                                                              // 123
      document.getElementById('forgot-password-email').value = email;                                                // 124
    else if (usernameOrEmail !== null)                                                                               // 125
      if (usernameOrEmail.indexOf('@') !== -1)                                                                       // 126
        document.getElementById('forgot-password-email').value = usernameOrEmail;                                    // 127
  },                                                                                                                 // 128
  'click #back-to-login-link': function () {                                                                         // 129
    loginButtonsSession.resetMessages();                                                                             // 130
                                                                                                                     // 131
    var username = trimmedElementValueById('login-username');                                                        // 132
    var email = trimmedElementValueById('login-email')                                                               // 133
          || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?                        // 134
                                                                                                                     // 135
    loginButtonsSession.set('inSignupFlow', false);                                                                  // 136
    loginButtonsSession.set('inForgotPasswordFlow', false);                                                          // 137
    // force the ui to update so that we have the approprate fields to fill in                                       // 138
    Deps.flush();                                                                                                    // 139
                                                                                                                     // 140
    if (document.getElementById('login-username'))                                                                   // 141
      document.getElementById('login-username').value = username;                                                    // 142
    if (document.getElementById('login-email'))                                                                      // 143
      document.getElementById('login-email').value = email;                                                          // 144
    // "login-password" is preserved thanks to the preserve-inputs package                                           // 145
    if (document.getElementById('login-username-or-email'))                                                          // 146
      document.getElementById('login-username-or-email').value = email || username;                                  // 147
  },                                                                                                                 // 148
  'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function (event) {
    if (event.keyCode === 13)                                                                                        // 150
      loginOrSignup();                                                                                               // 151
  }                                                                                                                  // 152
});                                                                                                                  // 153
                                                                                                                     // 154
// additional classes that can be helpful in styling the dropdown                                                    // 155
Template._loginButtonsLoggedOutDropdown.additionalClasses = function () {                                            // 156
  if (!hasPasswordService()) {                                                                                       // 157
    return false;                                                                                                    // 158
  } else {                                                                                                           // 159
    if (loginButtonsSession.get('inSignupFlow')) {                                                                   // 160
      return 'login-form-create-account';                                                                            // 161
    } else if (loginButtonsSession.get('inForgotPasswordFlow')) {                                                    // 162
      return 'login-form-forgot-password';                                                                           // 163
    } else {                                                                                                         // 164
      return 'login-form-sign-in';                                                                                   // 165
    }                                                                                                                // 166
  }                                                                                                                  // 167
};                                                                                                                   // 168
                                                                                                                     // 169
Template._loginButtonsLoggedOutDropdown.dropdownVisible = function () {                                              // 170
  return loginButtonsSession.get('dropdownVisible');                                                                 // 171
};                                                                                                                   // 172
                                                                                                                     // 173
Template._loginButtonsLoggedOutDropdown.hasPasswordService = hasPasswordService;                                     // 174
                                                                                                                     // 175
// return all login services, with password last                                                                     // 176
Template._loginButtonsLoggedOutAllServices.services = getLoginServices;                                              // 177
                                                                                                                     // 178
Template._loginButtonsLoggedOutAllServices.isPasswordService = function () {                                         // 179
  return this.name === 'password';                                                                                   // 180
};                                                                                                                   // 181
                                                                                                                     // 182
Template._loginButtonsLoggedOutAllServices.hasOtherServices = function () {                                          // 183
  return getLoginServices().length > 1;                                                                              // 184
};                                                                                                                   // 185
                                                                                                                     // 186
Template._loginButtonsLoggedOutAllServices.hasPasswordService =                                                      // 187
  hasPasswordService;                                                                                                // 188
                                                                                                                     // 189
Template._loginButtonsLoggedOutPasswordService.fields = function () {                                                // 190
  var loginFields = [                                                                                                // 191
    {fieldName: 'username-or-email', fieldLabel: 'Username or Email',                                                // 192
     visible: function () {                                                                                          // 193
       return _.contains(                                                                                            // 194
         ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],                                                      // 195
         passwordSignupFields());                                                                                    // 196
     }},                                                                                                             // 197
    {fieldName: 'username', fieldLabel: 'Username',                                                                  // 198
     visible: function () {                                                                                          // 199
       return passwordSignupFields() === "USERNAME_ONLY";                                                            // 200
     }},                                                                                                             // 201
    {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 202
     visible: function () {                                                                                          // 203
       return passwordSignupFields() === "EMAIL_ONLY";                                                               // 204
     }},                                                                                                             // 205
    {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 206
     visible: function () {                                                                                          // 207
       return true;                                                                                                  // 208
     }}                                                                                                              // 209
  ];                                                                                                                 // 210
                                                                                                                     // 211
  var signupFields = [                                                                                               // 212
    {fieldName: 'username', fieldLabel: 'Username',                                                                  // 213
     visible: function () {                                                                                          // 214
       return _.contains(                                                                                            // 215
         ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                     // 216
         passwordSignupFields());                                                                                    // 217
     }},                                                                                                             // 218
    {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',                                                    // 219
     visible: function () {                                                                                          // 220
       return _.contains(                                                                                            // 221
         ["USERNAME_AND_EMAIL", "EMAIL_ONLY"],                                                                       // 222
         passwordSignupFields());                                                                                    // 223
     }},                                                                                                             // 224
    {fieldName: 'email', fieldLabel: 'Email (optional)', inputType: 'email',                                         // 225
     visible: function () {                                                                                          // 226
       return passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";                                              // 227
     }},                                                                                                             // 228
    {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',                                           // 229
     visible: function () {                                                                                          // 230
       return true;                                                                                                  // 231
     }},                                                                                                             // 232
    {fieldName: 'password-again', fieldLabel: 'Password (again)',                                                    // 233
     inputType: 'password',                                                                                          // 234
     visible: function () {                                                                                          // 235
       // No need to make users double-enter their password if                                                       // 236
       // they'll necessarily have an email set, since they can use                                                  // 237
       // the "forgot password" flow.                                                                                // 238
       return _.contains(                                                                                            // 239
         ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 240
         passwordSignupFields());                                                                                    // 241
     }}                                                                                                              // 242
  ];                                                                                                                 // 243
                                                                                                                     // 244
  return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;                                       // 245
};                                                                                                                   // 246
                                                                                                                     // 247
Template._loginButtonsLoggedOutPasswordService.inForgotPasswordFlow = function () {                                  // 248
  return loginButtonsSession.get('inForgotPasswordFlow');                                                            // 249
};                                                                                                                   // 250
                                                                                                                     // 251
Template._loginButtonsLoggedOutPasswordService.inLoginFlow = function () {                                           // 252
  return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');               // 253
};                                                                                                                   // 254
                                                                                                                     // 255
Template._loginButtonsLoggedOutPasswordService.inSignupFlow = function () {                                          // 256
  return loginButtonsSession.get('inSignupFlow');                                                                    // 257
};                                                                                                                   // 258
                                                                                                                     // 259
Template._loginButtonsLoggedOutPasswordService.showCreateAccountLink = function () {                                 // 260
  return !Accounts._options.forbidClientAccountCreation;                                                             // 261
};                                                                                                                   // 262
                                                                                                                     // 263
Template._loginButtonsLoggedOutPasswordService.showForgotPasswordLink = function () {                                // 264
  return _.contains(                                                                                                 // 265
    ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],                                             // 266
    passwordSignupFields());                                                                                         // 267
};                                                                                                                   // 268
                                                                                                                     // 269
Template._loginButtonsFormField.inputType = function () {                                                            // 270
  return this.inputType || "text";                                                                                   // 271
};                                                                                                                   // 272
                                                                                                                     // 273
                                                                                                                     // 274
//                                                                                                                   // 275
// loginButtonsChangePassword template                                                                               // 276
//                                                                                                                   // 277
                                                                                                                     // 278
Template._loginButtonsChangePassword.events({                                                                        // 279
  'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function (event) {       // 280
    if (event.keyCode === 13)                                                                                        // 281
      changePassword();                                                                                              // 282
  },                                                                                                                 // 283
  'click #login-buttons-do-change-password': function (event) {                                                      // 284
    event.stopPropagation();                                                                                         // 285
    changePassword();                                                                                                // 286
  }                                                                                                                  // 287
});                                                                                                                  // 288
                                                                                                                     // 289
Template._loginButtonsChangePassword.fields = function () {                                                          // 290
  return [                                                                                                           // 291
    {fieldName: 'old-password', fieldLabel: 'Current Password', inputType: 'password',                               // 292
     visible: function () {                                                                                          // 293
       return true;                                                                                                  // 294
     }},                                                                                                             // 295
    {fieldName: 'password', fieldLabel: 'New Password', inputType: 'password',                                       // 296
     visible: function () {                                                                                          // 297
       return true;                                                                                                  // 298
     }},                                                                                                             // 299
    {fieldName: 'password-again', fieldLabel: 'New Password (again)',                                                // 300
     inputType: 'password',                                                                                          // 301
     visible: function () {                                                                                          // 302
       // No need to make users double-enter their password if                                                       // 303
       // they'll necessarily have an email set, since they can use                                                  // 304
       // the "forgot password" flow.                                                                                // 305
       return _.contains(                                                                                            // 306
         ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],                                                           // 307
         passwordSignupFields());                                                                                    // 308
     }}                                                                                                              // 309
  ];                                                                                                                 // 310
};                                                                                                                   // 311
                                                                                                                     // 312
                                                                                                                     // 313
//                                                                                                                   // 314
// helpers                                                                                                           // 315
//                                                                                                                   // 316
                                                                                                                     // 317
var elementValueById = function(id) {                                                                                // 318
  var element = document.getElementById(id);                                                                         // 319
  if (!element)                                                                                                      // 320
    return null;                                                                                                     // 321
  else                                                                                                               // 322
    return element.value;                                                                                            // 323
};                                                                                                                   // 324
                                                                                                                     // 325
var trimmedElementValueById = function(id) {                                                                         // 326
  var element = document.getElementById(id);                                                                         // 327
  if (!element)                                                                                                      // 328
    return null;                                                                                                     // 329
  else                                                                                                               // 330
    return element.value.replace(/^\s*|\s*$/g, ""); // trim() doesn't work on IE8;                                   // 331
};                                                                                                                   // 332
                                                                                                                     // 333
var loginOrSignup = function () {                                                                                    // 334
  if (loginButtonsSession.get('inSignupFlow'))                                                                       // 335
    signup();                                                                                                        // 336
  else                                                                                                               // 337
    login();                                                                                                         // 338
};                                                                                                                   // 339
                                                                                                                     // 340
var login = function () {                                                                                            // 341
  loginButtonsSession.resetMessages();                                                                               // 342
                                                                                                                     // 343
  var username = trimmedElementValueById('login-username');                                                          // 344
  var email = trimmedElementValueById('login-email');                                                                // 345
  var usernameOrEmail = trimmedElementValueById('login-username-or-email');                                          // 346
  // notably not trimmed. a password could (?) start or end with a space                                             // 347
  var password = elementValueById('login-password');                                                                 // 348
                                                                                                                     // 349
  var loginSelector;                                                                                                 // 350
  if (username !== null) {                                                                                           // 351
    if (!validateUsername(username))                                                                                 // 352
      return;                                                                                                        // 353
    else                                                                                                             // 354
      loginSelector = {username: username};                                                                          // 355
  } else if (email !== null) {                                                                                       // 356
    if (!validateEmail(email))                                                                                       // 357
      return;                                                                                                        // 358
    else                                                                                                             // 359
      loginSelector = {email: email};                                                                                // 360
  } else if (usernameOrEmail !== null) {                                                                             // 361
    // XXX not sure how we should validate this. but this seems good enough (for now),                               // 362
    // since an email must have at least 3 characters anyways                                                        // 363
    if (!validateUsername(usernameOrEmail))                                                                          // 364
      return;                                                                                                        // 365
    else                                                                                                             // 366
      loginSelector = usernameOrEmail;                                                                               // 367
  } else {                                                                                                           // 368
    throw new Error("Unexpected -- no element to use as a login user selector");                                     // 369
  }                                                                                                                  // 370
                                                                                                                     // 371
  Meteor.loginWithPassword(loginSelector, password, function (error, result) {                                       // 372
    if (error) {                                                                                                     // 373
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 374
    } else {                                                                                                         // 375
      loginButtonsSession.closeDropdown();                                                                           // 376
    }                                                                                                                // 377
  });                                                                                                                // 378
};                                                                                                                   // 379
                                                                                                                     // 380
var toggleDropdown = function() {                                                                                    // 381
  $('#login-dropdown-list .dropdown-menu').dropdown('toggle');                                                       // 382
};                                                                                                                   // 383
                                                                                                                     // 384
var signup = function () {                                                                                           // 385
  loginButtonsSession.resetMessages();                                                                               // 386
                                                                                                                     // 387
  var options = {}; // to be passed to Accounts.createUser                                                           // 388
                                                                                                                     // 389
  var username = trimmedElementValueById('login-username');                                                          // 390
  if (username !== null) {                                                                                           // 391
    if (!validateUsername(username))                                                                                 // 392
      return;                                                                                                        // 393
    else                                                                                                             // 394
      options.username = username;                                                                                   // 395
  }                                                                                                                  // 396
                                                                                                                     // 397
  var email = trimmedElementValueById('login-email');                                                                // 398
  if (email !== null) {                                                                                              // 399
    if (!validateEmail(email))                                                                                       // 400
      return;                                                                                                        // 401
    else                                                                                                             // 402
      options.email = email;                                                                                         // 403
  }                                                                                                                  // 404
                                                                                                                     // 405
  // notably not trimmed. a password could (?) start or end with a space                                             // 406
  var password = elementValueById('login-password');                                                                 // 407
  if (!validatePassword(password))                                                                                   // 408
    return;                                                                                                          // 409
  else                                                                                                               // 410
    options.password = password;                                                                                     // 411
                                                                                                                     // 412
  if (!matchPasswordAgainIfPresent())                                                                                // 413
    return;                                                                                                          // 414
                                                                                                                     // 415
  Accounts.createUser(options, function (error) {                                                                    // 416
    if (error) {                                                                                                     // 417
      loginButtonsSession.errorMessage(error.reason || "Unknown error");                                             // 418
    } else {                                                                                                         // 419
      loginButtonsSession.closeDropdown();                                                                           // 420
    }                                                                                                                // 421
  });                                                                                                                // 422
};                                                                                                                   // 423
                                                                                                                     // 424
var forgotPassword = function () {                                                                                   // 425
  loginButtonsSession.resetMessages();                                                                               // 426
                                                                                                                     // 427
  var email = trimmedElementValueById("forgot-password-email");                                                      // 428
  if (email.indexOf('@') !== -1) {                                                                                   // 429
    Accounts.forgotPassword({email: email}, function (error) {                                                       // 430
      if (error)                                                                                                     // 431
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                           // 432
      else                                                                                                           // 433
        loginButtonsSession.infoMessage("Email sent");                                                               // 434
    });                                                                                                              // 435
  } else {                                                                                                           // 436
    loginButtonsSession.infoMessage("Email sent");                                                                   // 437
  }                                                                                                                  // 438
};                                                                                                                   // 439
                                                                                                                     // 440
var changePassword = function () {                                                                                   // 441
  loginButtonsSession.resetMessages();                                                                               // 442
                                                                                                                     // 443
  // notably not trimmed. a password could (?) start or end with a space                                             // 444
  var oldPassword = elementValueById('login-old-password');                                                          // 445
                                                                                                                     // 446
  // notably not trimmed. a password could (?) start or end with a space                                             // 447
  var password = elementValueById('login-password');                                                                 // 448
  if (!validatePassword(password))                                                                                   // 449
    return;                                                                                                          // 450
                                                                                                                     // 451
  if (!matchPasswordAgainIfPresent())                                                                                // 452
    return;                                                                                                          // 453
                                                                                                                     // 454
  Accounts.changePassword(oldPassword, password, function (error) {                                                  // 455
    if (error) {                                                                                                     // 456
       loginButtonsSession.errorMessage(error.reason || "Unknown error");                                            // 457
    } else {                                                                                                         // 458
      loginButtonsSession.infoMessage("Password changed");                                                           // 459
                                                                                                                     // 460
      // wait 3 seconds, then expire the msg                                                                         // 461
      Meteor.setTimeout(function() {                                                                                 // 462
        loginButtonsSession.resetMessages();                                                                         // 463
      }, 3000);                                                                                                      // 464
      // loginButtonsSession.set('inChangePasswordFlow', false);                                                     // 465
      // loginButtonsSession.set('inMessageOnlyFlow', true);                                                         // 466
      // loginButtonsSession.infoMessage("Password changed");                                                        // 467
    }                                                                                                                // 468
  });                                                                                                                // 469
};                                                                                                                   // 470
                                                                                                                     // 471
var matchPasswordAgainIfPresent = function () {                                                                      // 472
  // notably not trimmed. a password could (?) start or end with a space                                             // 473
  var passwordAgain = elementValueById('login-password-again');                                                      // 474
  if (passwordAgain !== null) {                                                                                      // 475
    // notably not trimmed. a password could (?) start or end with a space                                           // 476
    var password = elementValueById('login-password');                                                               // 477
    if (password !== passwordAgain) {                                                                                // 478
      loginButtonsSession.errorMessage("Passwords don't match");                                                     // 479
      return false;                                                                                                  // 480
    }                                                                                                                // 481
  }                                                                                                                  // 482
  return true;                                                                                                       // 483
};                                                                                                                   // 484
                                                                                                                     // 485
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/accounts-ui-bootstrap-dropdown/login_buttons_dialogs.js                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// for convenience                                                                                                   // 1
var loginButtonsSession = Accounts._loginButtonsSession;                                                             // 2
                                                                                                                     // 3
                                                                                                                     // 4
//                                                                                                                   // 5
// populate the session so that the appropriate dialogs are                                                          // 6
// displayed by reading variables set by accounts-urls, which parses                                                 // 7
// special URLs. since accounts-ui depends on accounts-urls, we are                                                  // 8
// guaranteed to have these set at this point.                                                                       // 9
//                                                                                                                   // 10
                                                                                                                     // 11
if (Accounts._resetPasswordToken) {                                                                                  // 12
  loginButtonsSession.set('resetPasswordToken', Accounts._resetPasswordToken);                                       // 13
}                                                                                                                    // 14
                                                                                                                     // 15
if (Accounts._enrollAccountToken) {                                                                                  // 16
  loginButtonsSession.set('enrollAccountToken', Accounts._enrollAccountToken);                                       // 17
}                                                                                                                    // 18
                                                                                                                     // 19
// Needs to be in Meteor.startup because of a package loading order                                                  // 20
// issue. We can't be sure that accounts-password is loaded earlier                                                  // 21
// than accounts-ui so Accounts.verifyEmail might not be defined.                                                    // 22
Meteor.startup(function () {                                                                                         // 23
  if (Accounts._verifyEmailToken) {                                                                                  // 24
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {                                               // 25
      Accounts._enableAutoLogin();                                                                                   // 26
      if (!error)                                                                                                    // 27
        loginButtonsSession.set('justVerifiedEmail', true);                                                          // 28
      // XXX show something if there was an error.                                                                   // 29
    });                                                                                                              // 30
  }                                                                                                                  // 31
});                                                                                                                  // 32
                                                                                                                     // 33
                                                                                                                     // 34
//                                                                                                                   // 35
// resetPasswordDialog template                                                                                      // 36
//                                                                                                                   // 37
                                                                                                                     // 38
Template._resetPasswordDialog.events({                                                                               // 39
  'click #login-buttons-reset-password-button': function () {                                                        // 40
    resetPassword();                                                                                                 // 41
  },                                                                                                                 // 42
  'keypress #reset-password-new-password': function (event) {                                                        // 43
    if (event.keyCode === 13)                                                                                        // 44
      resetPassword();                                                                                               // 45
  },                                                                                                                 // 46
  'click #login-buttons-cancel-reset-password': function () {                                                        // 47
    loginButtonsSession.set('resetPasswordToken', null);                                                             // 48
    Accounts._enableAutoLogin();                                                                                     // 49
  }                                                                                                                  // 50
});                                                                                                                  // 51
                                                                                                                     // 52
var resetPassword = function () {                                                                                    // 53
  loginButtonsSession.resetMessages();                                                                               // 54
  var newPassword = document.getElementById('reset-password-new-password').value;                                    // 55
  if (!validatePassword(newPassword))                                                                                // 56
    return;                                                                                                          // 57
                                                                                                                     // 58
  Accounts.resetPassword(                                                                                            // 59
    loginButtonsSession.get('resetPasswordToken'), newPassword,                                                      // 60
    function (error) {                                                                                               // 61
      if (error) {                                                                                                   // 62
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                           // 63
      } else {                                                                                                       // 64
        loginButtonsSession.set('resetPasswordToken', null);                                                         // 65
        Accounts._enableAutoLogin();                                                                                 // 66
      }                                                                                                              // 67
    });                                                                                                              // 68
};                                                                                                                   // 69
                                                                                                                     // 70
Template._resetPasswordDialog.inResetPasswordFlow = function () {                                                    // 71
  return loginButtonsSession.get('resetPasswordToken');                                                              // 72
};                                                                                                                   // 73
                                                                                                                     // 74
                                                                                                                     // 75
//                                                                                                                   // 76
// enrollAccountDialog template                                                                                      // 77
//                                                                                                                   // 78
                                                                                                                     // 79
Template._enrollAccountDialog.events({                                                                               // 80
  'click #login-buttons-enroll-account-button': function () {                                                        // 81
    enrollAccount();                                                                                                 // 82
  },                                                                                                                 // 83
  'keypress #enroll-account-password': function (event) {                                                            // 84
    if (event.keyCode === 13)                                                                                        // 85
      enrollAccount();                                                                                               // 86
  },                                                                                                                 // 87
  'click #login-buttons-cancel-enroll-account': function () {                                                        // 88
    loginButtonsSession.set('enrollAccountToken', null);                                                             // 89
    Accounts._enableAutoLogin();                                                                                     // 90
  }                                                                                                                  // 91
});                                                                                                                  // 92
                                                                                                                     // 93
var enrollAccount = function () {                                                                                    // 94
  loginButtonsSession.resetMessages();                                                                               // 95
  var password = document.getElementById('enroll-account-password').value;                                           // 96
  if (!validatePassword(password))                                                                                   // 97
    return;                                                                                                          // 98
                                                                                                                     // 99
  Accounts.resetPassword(                                                                                            // 100
    loginButtonsSession.get('enrollAccountToken'), password,                                                         // 101
    function (error) {                                                                                               // 102
      if (error) {                                                                                                   // 103
        loginButtonsSession.errorMessage(error.reason || "Unknown error");                                           // 104
      } else {                                                                                                       // 105
        loginButtonsSession.set('enrollAccountToken', null);                                                         // 106
        Accounts._enableAutoLogin();                                                                                 // 107
      }                                                                                                              // 108
    });                                                                                                              // 109
};                                                                                                                   // 110
                                                                                                                     // 111
Template._enrollAccountDialog.inEnrollAccountFlow = function () {                                                    // 112
  return loginButtonsSession.get('enrollAccountToken');                                                              // 113
};                                                                                                                   // 114
                                                                                                                     // 115
                                                                                                                     // 116
//                                                                                                                   // 117
// justVerifiedEmailDialog template                                                                                  // 118
//                                                                                                                   // 119
                                                                                                                     // 120
Template._justVerifiedEmailDialog.events({                                                                           // 121
  'click #just-verified-dismiss-button': function () {                                                               // 122
    loginButtonsSession.set('justVerifiedEmail', false);                                                             // 123
  }                                                                                                                  // 124
});                                                                                                                  // 125
                                                                                                                     // 126
Template._justVerifiedEmailDialog.visible = function () {                                                            // 127
  return loginButtonsSession.get('justVerifiedEmail');                                                               // 128
};                                                                                                                   // 129
                                                                                                                     // 130
                                                                                                                     // 131
//                                                                                                                   // 132
// loginButtonsMessagesDialog template                                                                               // 133
//                                                                                                                   // 134
                                                                                                                     // 135
Template._loginButtonsMessagesDialog.events({                                                                        // 136
  'click #messages-dialog-dismiss-button': function () {                                                             // 137
    loginButtonsSession.resetMessages();                                                                             // 138
  }                                                                                                                  // 139
});                                                                                                                  // 140
                                                                                                                     // 141
Template._loginButtonsMessagesDialog.visible = function () {                                                         // 142
  var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');                // 143
  return !dropdown() && hasMessage;                                                                                  // 144
};                                                                                                                   // 145
                                                                                                                     // 146
                                                                                                                     // 147
//                                                                                                                   // 148
// configureLoginServiceDialog template                                                                              // 149
//                                                                                                                   // 150
                                                                                                                     // 151
Template._configureLoginServiceDialog.events({                                                                       // 152
  'click .configure-login-service-dismiss-button': function () {                                                     // 153
    loginButtonsSession.set('configureLoginServiceDialogVisible', false);                                            // 154
  },                                                                                                                 // 155
  'click #configure-login-service-dialog-save-configuration': function () {                                          // 156
    if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&                                             // 157
        ! loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {                                      // 158
      // Prepare the configuration document for this login service                                                   // 159
      var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                           // 160
      var configuration = {                                                                                          // 161
        service: serviceName                                                                                         // 162
      };                                                                                                             // 163
                                                                                                                     // 164
      // Fetch the value of each input field                                                                         // 165
      _.each(configurationFields(), function(field) {                                                                // 166
        configuration[field.property] = document.getElementById(                                                     // 167
          'configure-login-service-dialog-' + field.property).value                                                  // 168
          .replace(/^\s*|\s*$/g, ""); // trim;                                                                       // 169
      });                                                                                                            // 170
                                                                                                                     // 171
      // Configure this login service                                                                                // 172
      Accounts.connection.call(                                                                                      // 173
        "configureLoginService", configuration, function (error, result) {                                           // 174
          if (error)                                                                                                 // 175
            Meteor._debug("Error configuring login service " + serviceName,                                          // 176
                          error);                                                                                    // 177
          else                                                                                                       // 178
            loginButtonsSession.set('configureLoginServiceDialogVisible',                                            // 179
                                    false);                                                                          // 180
      });                                                                                                            // 181
    }                                                                                                                // 182
  },                                                                                                                 // 183
  // IE8 doesn't support the 'input' event, so we'll run this on the keyup as                                        // 184
  // well. (Keeping the 'input' event means that this also fires when you use                                        // 185
  // the mouse to change the contents of the field, eg 'Cut' menu item.)                                             // 186
  'input, keyup input': function (event) {                                                                           // 187
    // if the event fired on one of the configuration input fields,                                                  // 188
    // check whether we should enable the 'save configuration' button                                                // 189
    if (event.target.id.indexOf('configure-login-service-dialog') === 0)                                             // 190
      updateSaveDisabled();                                                                                          // 191
  }                                                                                                                  // 192
});                                                                                                                  // 193
                                                                                                                     // 194
// check whether the 'save configuration' button should be enabled.                                                  // 195
// this is a really strange way to implement this and a Forms                                                        // 196
// Abstraction would make all of this reactive, and simpler.                                                         // 197
var updateSaveDisabled = function () {                                                                               // 198
  var anyFieldEmpty = _.any(configurationFields(), function(field) {                                                 // 199
    return document.getElementById(                                                                                  // 200
      'configure-login-service-dialog-' + field.property).value === '';                                              // 201
  });                                                                                                                // 202
                                                                                                                     // 203
  loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);                                 // 204
};                                                                                                                   // 205
                                                                                                                     // 206
// Returns the appropriate template for this login service.  This                                                    // 207
// template should be defined in the service's package                                                               // 208
var configureLoginServiceDialogTemplateForService = function () {                                                    // 209
  var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');                               // 210
  // XXX Service providers should be able to specify their configuration                                             // 211
  // template name.                                                                                                  // 212
  return Template['configureLoginServiceDialogFor' +                                                                 // 213
                  (serviceName === 'meteor-developer' ?                                                              // 214
                   'MeteorDeveloper' :                                                                               // 215
                   capitalize(serviceName))];                                                                        // 216
};                                                                                                                   // 217
                                                                                                                     // 218
var configurationFields = function () {                                                                              // 219
  var template = configureLoginServiceDialogTemplateForService();                                                    // 220
  return template.fields();                                                                                          // 221
};                                                                                                                   // 222
                                                                                                                     // 223
Template._configureLoginServiceDialog.configurationFields = function () {                                            // 224
  return configurationFields();                                                                                      // 225
};                                                                                                                   // 226
                                                                                                                     // 227
Template._configureLoginServiceDialog.visible = function () {                                                        // 228
  return loginButtonsSession.get('configureLoginServiceDialogVisible');                                              // 229
};                                                                                                                   // 230
                                                                                                                     // 231
Template._configureLoginServiceDialog.configurationSteps = function () {                                             // 232
  // renders the appropriate template                                                                                // 233
  return configureLoginServiceDialogTemplateForService()();                                                          // 234
};                                                                                                                   // 235
                                                                                                                     // 236
Template._configureLoginServiceDialog.saveDisabled = function () {                                                   // 237
  return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');                                         // 238
};                                                                                                                   // 239
                                                                                                                     // 240
                                                                                                                     // 241
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js                                       // 242
var capitalize = function(str){                                                                                      // 243
  str = str == null ? '' : String(str);                                                                              // 244
  return str.charAt(0).toUpperCase() + str.slice(1);                                                                 // 245
};                                                                                                                   // 246
                                                                                                                     // 247
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-ui-bootstrap-dropdown'] = {};

})();

//# sourceMappingURL=b13d2b0f51e82fdd8321b7f7ea90ca0a2a5a73bc.map

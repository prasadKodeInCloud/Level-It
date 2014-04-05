(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var Email = Package.email.Email;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var DDP = Package.livedata.DDP;
var DDPServer = Package.livedata.DDPServer;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/accounts-password/email_templates.js                                              //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Accounts.emailTemplates = {                                                                   // 1
  from: "Meteor Accounts <no-reply@meteor.com>",                                              // 2
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),              // 3
                                                                                              // 4
  resetPassword: {                                                                            // 5
    subject: function(user) {                                                                 // 6
      return "How to reset your password on " + Accounts.emailTemplates.siteName;             // 7
    },                                                                                        // 8
    text: function(user, url) {                                                               // 9
      var greeting = (user.profile && user.profile.name) ?                                    // 10
            ("Hello " + user.profile.name + ",") : "Hello,";                                  // 11
      return greeting + "\n"                                                                  // 12
        + "\n"                                                                                // 13
        + "To reset your password, simply click the link below.\n"                            // 14
        + "\n"                                                                                // 15
        + url + "\n"                                                                          // 16
        + "\n"                                                                                // 17
        + "Thanks.\n";                                                                        // 18
    }                                                                                         // 19
  },                                                                                          // 20
  verifyEmail: {                                                                              // 21
    subject: function(user) {                                                                 // 22
      return "How to verify email address on " + Accounts.emailTemplates.siteName;            // 23
    },                                                                                        // 24
    text: function(user, url) {                                                               // 25
      var greeting = (user.profile && user.profile.name) ?                                    // 26
            ("Hello " + user.profile.name + ",") : "Hello,";                                  // 27
      return greeting + "\n"                                                                  // 28
        + "\n"                                                                                // 29
        + "To verify your account email, simply click the link below.\n"                      // 30
        + "\n"                                                                                // 31
        + url + "\n"                                                                          // 32
        + "\n"                                                                                // 33
        + "Thanks.\n";                                                                        // 34
    }                                                                                         // 35
  },                                                                                          // 36
  enrollAccount: {                                                                            // 37
    subject: function(user) {                                                                 // 38
      return "An account has been created for you on " + Accounts.emailTemplates.siteName;    // 39
    },                                                                                        // 40
    text: function(user, url) {                                                               // 41
      var greeting = (user.profile && user.profile.name) ?                                    // 42
            ("Hello " + user.profile.name + ",") : "Hello,";                                  // 43
      return greeting + "\n"                                                                  // 44
        + "\n"                                                                                // 45
        + "To start using the service, simply click the link below.\n"                        // 46
        + "\n"                                                                                // 47
        + url + "\n"                                                                          // 48
        + "\n"                                                                                // 49
        + "Thanks.\n";                                                                        // 50
    }                                                                                         // 51
  }                                                                                           // 52
};                                                                                            // 53
                                                                                              // 54
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages/accounts-password/password_server.js                                              //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
///                                                                                           // 1
/// LOGIN                                                                                     // 2
///                                                                                           // 3
                                                                                              // 4
// Users can specify various keys to identify themselves with.                                // 5
// @param user {Object} with one of `id`, `username`, or `email`.                             // 6
// @returns A selector to pass to mongo to get the user record.                               // 7
                                                                                              // 8
var selectorFromUserQuery = function (user) {                                                 // 9
  if (user.id)                                                                                // 10
    return {_id: user.id};                                                                    // 11
  else if (user.username)                                                                     // 12
    return {username: user.username};                                                         // 13
  else if (user.email)                                                                        // 14
    return {"emails.address": user.email};                                                    // 15
  throw new Error("shouldn't happen (validation missed something)");                          // 16
};                                                                                            // 17
                                                                                              // 18
// XXX maybe this belongs in the check package                                                // 19
var NonEmptyString = Match.Where(function (x) {                                               // 20
  check(x, String);                                                                           // 21
  return x.length > 0;                                                                        // 22
});                                                                                           // 23
                                                                                              // 24
var userQueryValidator = Match.Where(function (user) {                                        // 25
  check(user, {                                                                               // 26
    id: Match.Optional(NonEmptyString),                                                       // 27
    username: Match.Optional(NonEmptyString),                                                 // 28
    email: Match.Optional(NonEmptyString)                                                     // 29
  });                                                                                         // 30
  if (_.keys(user).length !== 1)                                                              // 31
    throw new Match.Error("User property must have exactly one field");                       // 32
  return true;                                                                                // 33
});                                                                                           // 34
                                                                                              // 35
// Step 1 of SRP password exchange. This puts an `M` value in the                             // 36
// session data for this connection. If a client later sends the same                         // 37
// `M` value to a method on this connection, it proves they know the                          // 38
// password for this user. We can then prove we know the password to                          // 39
// them by sending our `HAMK` value.                                                          // 40
//                                                                                            // 41
// @param request {Object} with fields:                                                       // 42
//   user: either {username: (username)}, {email: (email)}, or {id: (userId)}                 // 43
//   A: hex encoded int. the client's public key for this exchange                            // 44
// @returns {Object} with fields:                                                             // 45
//   identity: random string ID                                                               // 46
//   salt: random string ID                                                                   // 47
//   B: hex encoded int. server's public key for this exchange                                // 48
Meteor.methods({beginPasswordExchange: function (request) {                                   // 49
  var self = this;                                                                            // 50
  try {                                                                                       // 51
    check(request, {                                                                          // 52
      user: userQueryValidator,                                                               // 53
      A: String                                                                               // 54
    });                                                                                       // 55
    var selector = selectorFromUserQuery(request.user);                                       // 56
                                                                                              // 57
    var user = Meteor.users.findOne(selector);                                                // 58
    if (!user)                                                                                // 59
      throw new Meteor.Error(403, "User not found");                                          // 60
                                                                                              // 61
    if (!user.services || !user.services.password ||                                          // 62
        !user.services.password.srp)                                                          // 63
      throw new Meteor.Error(403, "User has no password set");                                // 64
                                                                                              // 65
    var verifier = user.services.password.srp;                                                // 66
    var srp = new SRP.Server(verifier);                                                       // 67
    var challenge = srp.issueChallenge({A: request.A});                                       // 68
                                                                                              // 69
  } catch (err) {                                                                             // 70
    // Report login failure if the method fails, so that login hooks are                      // 71
    // called. If the method succeeds, login hooks will be called when                        // 72
    // the second step method ('login') is called. If a user calls                            // 73
    // 'beginPasswordExchange' but then never calls the second step                           // 74
    // 'login' method, no login hook will fire.                                               // 75
    Accounts._reportLoginFailure(self, 'beginPasswordExchange', arguments, {                  // 76
      type: 'password',                                                                       // 77
      error: err,                                                                             // 78
      userId: user && user._id                                                                // 79
    });                                                                                       // 80
    throw err;                                                                                // 81
  }                                                                                           // 82
                                                                                              // 83
  // Save results so we can verify them later.                                                // 84
  Accounts._setAccountData(this.connection.id, 'srpChallenge',                                // 85
    { userId: user._id, M: srp.M, HAMK: srp.HAMK }                                            // 86
  );                                                                                          // 87
  return challenge;                                                                           // 88
}});                                                                                          // 89
                                                                                              // 90
// Handler to login with password via SRP. Checks the `M` value set by                        // 91
// beginPasswordExchange.                                                                     // 92
Accounts.registerLoginHandler("password", function (options) {                                // 93
  if (!options.srp)                                                                           // 94
    return undefined; // don't handle                                                         // 95
  check(options.srp, {M: String});                                                            // 96
                                                                                              // 97
  // we're always called from within a 'login' method, so this should                         // 98
  // be safe.                                                                                 // 99
  var currentInvocation = DDP._CurrentInvocation.get();                                       // 100
  var serialized = Accounts._getAccountData(currentInvocation.connection.id, 'srpChallenge'); // 101
  if (!serialized || serialized.M !== options.srp.M)                                          // 102
    return {                                                                                  // 103
      userId: serialized && serialized.userId,                                                // 104
      error: new Meteor.Error(403, "Incorrect password")                                      // 105
    };                                                                                        // 106
  // Only can use challenges once.                                                            // 107
  Accounts._setAccountData(currentInvocation.connection.id, 'srpChallenge', undefined);       // 108
                                                                                              // 109
  var userId = serialized.userId;                                                             // 110
  var user = Meteor.users.findOne(userId);                                                    // 111
  // Was the user deleted since the start of this challenge?                                  // 112
  if (!user)                                                                                  // 113
    return {                                                                                  // 114
      userId: userId,                                                                         // 115
      error: new Meteor.Error(403, "User not found")                                          // 116
    };                                                                                        // 117
                                                                                              // 118
  return {                                                                                    // 119
    userId: userId,                                                                           // 120
    options: {HAMK: serialized.HAMK}                                                          // 121
  };                                                                                          // 122
});                                                                                           // 123
                                                                                              // 124
// Handler to login with plaintext password.                                                  // 125
//                                                                                            // 126
// The meteor client doesn't use this, it is for other DDP clients who                        // 127
// haven't implemented SRP. Since it sends the password in plaintext                          // 128
// over the wire, it should only be run over SSL!                                             // 129
//                                                                                            // 130
// Also, it might be nice if servers could turn this off. Or maybe it                         // 131
// should be opt-in, not opt-out? Accounts.config option?                                     // 132
Accounts.registerLoginHandler("password", function (options) {                                // 133
  if (!options.password || !options.user)                                                     // 134
    return undefined; // don't handle                                                         // 135
                                                                                              // 136
  check(options, {user: userQueryValidator, password: String});                               // 137
                                                                                              // 138
  var selector = selectorFromUserQuery(options.user);                                         // 139
  var user = Meteor.users.findOne(selector);                                                  // 140
  if (!user)                                                                                  // 141
    throw new Meteor.Error(403, "User not found");                                            // 142
                                                                                              // 143
  if (!user.services || !user.services.password ||                                            // 144
      !user.services.password.srp)                                                            // 145
    return {                                                                                  // 146
      userId: user._id,                                                                       // 147
      error: new Meteor.Error(403, "User has no password set")                                // 148
    };                                                                                        // 149
                                                                                              // 150
  // Just check the verifier output when the same identity and salt                           // 151
  // are passed. Don't bother with a full exchange.                                           // 152
  var verifier = user.services.password.srp;                                                  // 153
  var newVerifier = SRP.generateVerifier(options.password, {                                  // 154
    identity: verifier.identity, salt: verifier.salt});                                       // 155
                                                                                              // 156
  if (verifier.verifier !== newVerifier.verifier)                                             // 157
    return {                                                                                  // 158
      userId: user._id,                                                                       // 159
      error: new Meteor.Error(403, "Incorrect password")                                      // 160
    };                                                                                        // 161
                                                                                              // 162
  return {userId: user._id};                                                                  // 163
});                                                                                           // 164
                                                                                              // 165
                                                                                              // 166
///                                                                                           // 167
/// CHANGING                                                                                  // 168
///                                                                                           // 169
                                                                                              // 170
// Let the user change their own password if they know the old                                // 171
// password. Checks the `M` value set by beginPasswordExchange.                               // 172
Meteor.methods({changePassword: function (options) {                                          // 173
  if (!this.userId)                                                                           // 174
    throw new Meteor.Error(401, "Must be logged in");                                         // 175
  check(options, {                                                                            // 176
    // If options.M is set, it means we went through a challenge with the old                 // 177
    // password. For now, we don't allow changePassword without knowing the old               // 178
    // password.                                                                              // 179
    M: String,                                                                                // 180
    srp: Match.Optional(SRP.matchVerifier),                                                   // 181
    password: Match.Optional(String)                                                          // 182
  });                                                                                         // 183
                                                                                              // 184
  var serialized = Accounts._getAccountData(this.connection.id, 'srpChallenge');              // 185
  if (!serialized || serialized.M !== options.M)                                              // 186
    throw new Meteor.Error(403, "Incorrect password");                                        // 187
  if (serialized.userId !== this.userId)                                                      // 188
    // No monkey business!                                                                    // 189
    throw new Meteor.Error(403, "Incorrect password");                                        // 190
  // Only can use challenges once.                                                            // 191
  Accounts._setAccountData(this.connection.id, 'srpChallenge', undefined);                    // 192
                                                                                              // 193
  var verifier = options.srp;                                                                 // 194
  if (!verifier && options.password) {                                                        // 195
    verifier = SRP.generateVerifier(options.password);                                        // 196
  }                                                                                           // 197
  if (!verifier)                                                                              // 198
    throw new Meteor.Error(400, "Invalid verifier");                                          // 199
                                                                                              // 200
  // XXX this should invalidate all login tokens other than the current one                   // 201
  // (or it should assign a new login token, replacing existing ones)                         // 202
  Meteor.users.update({_id: this.userId},                                                     // 203
                      {$set: {'services.password.srp': verifier}});                           // 204
                                                                                              // 205
  var ret = {passwordChanged: true};                                                          // 206
  if (serialized)                                                                             // 207
    ret.HAMK = serialized.HAMK;                                                               // 208
  return ret;                                                                                 // 209
}});                                                                                          // 210
                                                                                              // 211
                                                                                              // 212
// Force change the users password.                                                           // 213
Accounts.setPassword = function (userId, newPassword) {                                       // 214
  var user = Meteor.users.findOne(userId);                                                    // 215
  if (!user)                                                                                  // 216
    throw new Meteor.Error(403, "User not found");                                            // 217
  var newVerifier = SRP.generateVerifier(newPassword);                                        // 218
                                                                                              // 219
  Meteor.users.update({_id: user._id}, {                                                      // 220
    $set: {'services.password.srp': newVerifier}});                                           // 221
};                                                                                            // 222
                                                                                              // 223
                                                                                              // 224
///                                                                                           // 225
/// RESETTING VIA EMAIL                                                                       // 226
///                                                                                           // 227
                                                                                              // 228
// Method called by a user to request a password reset email. This is                         // 229
// the start of the reset process.                                                            // 230
Meteor.methods({forgotPassword: function (options) {                                          // 231
  check(options, {email: String});                                                            // 232
                                                                                              // 233
  var user = Meteor.users.findOne({"emails.address": options.email});                         // 234
  if (!user)                                                                                  // 235
    throw new Meteor.Error(403, "User not found");                                            // 236
                                                                                              // 237
  Accounts.sendResetPasswordEmail(user._id, options.email);                                   // 238
}});                                                                                          // 239
                                                                                              // 240
// send the user an email with a link that when opened allows the user                        // 241
// to set a new password, without the old password.                                           // 242
//                                                                                            // 243
Accounts.sendResetPasswordEmail = function (userId, email) {                                  // 244
  // Make sure the user exists, and email is one of their addresses.                          // 245
  var user = Meteor.users.findOne(userId);                                                    // 246
  if (!user)                                                                                  // 247
    throw new Error("Can't find user");                                                       // 248
  // pick the first email if we weren't passed an email.                                      // 249
  if (!email && user.emails && user.emails[0])                                                // 250
    email = user.emails[0].address;                                                           // 251
  // make sure we have a valid email                                                          // 252
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email))                    // 253
    throw new Error("No such email for user.");                                               // 254
                                                                                              // 255
  var token = Random.id();                                                                    // 256
  var when = new Date();                                                                      // 257
  Meteor.users.update(userId, {$set: {                                                        // 258
    "services.password.reset": {                                                              // 259
      token: token,                                                                           // 260
      email: email,                                                                           // 261
      when: when                                                                              // 262
    }                                                                                         // 263
  }});                                                                                        // 264
                                                                                              // 265
  var resetPasswordUrl = Accounts.urls.resetPassword(token);                                  // 266
                                                                                              // 267
  var options = {                                                                             // 268
    to: email,                                                                                // 269
    from: Accounts.emailTemplates.from,                                                       // 270
    subject: Accounts.emailTemplates.resetPassword.subject(user),                             // 271
    text: Accounts.emailTemplates.resetPassword.text(user, resetPasswordUrl)                  // 272
  };                                                                                          // 273
                                                                                              // 274
  if (typeof Accounts.emailTemplates.resetPassword.html === 'function')                       // 275
    options.html =                                                                            // 276
      Accounts.emailTemplates.resetPassword.html(user, resetPasswordUrl);                     // 277
                                                                                              // 278
  Email.send(options);                                                                        // 279
};                                                                                            // 280
                                                                                              // 281
// send the user an email informing them that their account was created, with                 // 282
// a link that when opened both marks their email as verified and forces them                 // 283
// to choose their password. The email must be one of the addresses in the                    // 284
// user's emails field, or undefined to pick the first email automatically.                   // 285
//                                                                                            // 286
// This is not called automatically. It must be called manually if you                        // 287
// want to use enrollment emails.                                                             // 288
//                                                                                            // 289
Accounts.sendEnrollmentEmail = function (userId, email) {                                     // 290
  // XXX refactor! This is basically identical to sendResetPasswordEmail.                     // 291
                                                                                              // 292
  // Make sure the user exists, and email is in their addresses.                              // 293
  var user = Meteor.users.findOne(userId);                                                    // 294
  if (!user)                                                                                  // 295
    throw new Error("Can't find user");                                                       // 296
  // pick the first email if we weren't passed an email.                                      // 297
  if (!email && user.emails && user.emails[0])                                                // 298
    email = user.emails[0].address;                                                           // 299
  // make sure we have a valid email                                                          // 300
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email))                    // 301
    throw new Error("No such email for user.");                                               // 302
                                                                                              // 303
                                                                                              // 304
  var token = Random.id();                                                                    // 305
  var when = new Date();                                                                      // 306
  Meteor.users.update(userId, {$set: {                                                        // 307
    "services.password.reset": {                                                              // 308
      token: token,                                                                           // 309
      email: email,                                                                           // 310
      when: when                                                                              // 311
    }                                                                                         // 312
  }});                                                                                        // 313
                                                                                              // 314
  var enrollAccountUrl = Accounts.urls.enrollAccount(token);                                  // 315
                                                                                              // 316
  var options = {                                                                             // 317
    to: email,                                                                                // 318
    from: Accounts.emailTemplates.from,                                                       // 319
    subject: Accounts.emailTemplates.enrollAccount.subject(user),                             // 320
    text: Accounts.emailTemplates.enrollAccount.text(user, enrollAccountUrl)                  // 321
  };                                                                                          // 322
                                                                                              // 323
  if (typeof Accounts.emailTemplates.enrollAccount.html === 'function')                       // 324
    options.html =                                                                            // 325
      Accounts.emailTemplates.enrollAccount.html(user, enrollAccountUrl);                     // 326
                                                                                              // 327
  Email.send(options);                                                                        // 328
};                                                                                            // 329
                                                                                              // 330
                                                                                              // 331
// Take token from sendResetPasswordEmail or sendEnrollmentEmail, change                      // 332
// the users password, and log them in.                                                       // 333
Meteor.methods({resetPassword: function (token, newVerifier) {                                // 334
  var self = this;                                                                            // 335
  return Accounts._loginMethod(                                                               // 336
    self,                                                                                     // 337
    "resetPassword",                                                                          // 338
    arguments,                                                                                // 339
    "password",                                                                               // 340
    function () {                                                                             // 341
      check(token, String);                                                                   // 342
      check(newVerifier, SRP.matchVerifier);                                                  // 343
                                                                                              // 344
      var user = Meteor.users.findOne({                                                       // 345
        "services.password.reset.token": ""+token});                                          // 346
      if (!user)                                                                              // 347
        throw new Meteor.Error(403, "Token expired");                                         // 348
      var email = user.services.password.reset.email;                                         // 349
      if (!_.include(_.pluck(user.emails || [], 'address'), email))                           // 350
        return {                                                                              // 351
          userId: user._id,                                                                   // 352
          error: new Meteor.Error(403, "Token has invalid email address")                     // 353
        };                                                                                    // 354
                                                                                              // 355
      // NOTE: We're about to invalidate tokens on the user, who we might be                  // 356
      // logged in as. Make sure to avoid logging ourselves out if this                       // 357
      // happens. But also make sure not to leave the connection in a state                   // 358
      // of having a bad token set if things fail.                                            // 359
      var oldToken = Accounts._getLoginToken(self.connection.id);                             // 360
      Accounts._setLoginToken(user._id, self.connection, null);                               // 361
      var resetToOldToken = function () {                                                     // 362
        Accounts._setLoginToken(user._id, self.connection, oldToken);                         // 363
      };                                                                                      // 364
                                                                                              // 365
      try {                                                                                   // 366
        // Update the user record by:                                                         // 367
        // - Changing the password verifier to the new one                                    // 368
        // - Forgetting about the reset token that was just used                              // 369
        // - Verifying their email, since they got the password reset via email.              // 370
        var affectedRecords = Meteor.users.update(                                            // 371
          {                                                                                   // 372
            _id: user._id,                                                                    // 373
            'emails.address': email,                                                          // 374
            'services.password.reset.token': token                                            // 375
          },                                                                                  // 376
          {$set: {'services.password.srp': newVerifier,                                       // 377
                  'emails.$.verified': true},                                                 // 378
           $unset: {'services.password.reset': 1}});                                          // 379
        if (affectedRecords !== 1)                                                            // 380
          return {                                                                            // 381
            userId: user._id,                                                                 // 382
            error: new Meteor.Error(403, "Invalid email")                                     // 383
          };                                                                                  // 384
      } catch (err) {                                                                         // 385
        resetToOldToken();                                                                    // 386
        throw err;                                                                            // 387
      }                                                                                       // 388
                                                                                              // 389
      // Replace all valid login tokens with new ones (changing                               // 390
      // password should invalidate existing sessions).                                       // 391
      Accounts._clearAllLoginTokens(user._id);                                                // 392
                                                                                              // 393
      return {userId: user._id};                                                              // 394
    }                                                                                         // 395
  );                                                                                          // 396
}});                                                                                          // 397
                                                                                              // 398
///                                                                                           // 399
/// EMAIL VERIFICATION                                                                        // 400
///                                                                                           // 401
                                                                                              // 402
                                                                                              // 403
// send the user an email with a link that when opened marks that                             // 404
// address as verified                                                                        // 405
//                                                                                            // 406
Accounts.sendVerificationEmail = function (userId, address) {                                 // 407
  // XXX Also generate a link using which someone can delete this                             // 408
  // account if they own said address but weren't those who created                           // 409
  // this account.                                                                            // 410
                                                                                              // 411
  // Make sure the user exists, and address is one of their addresses.                        // 412
  var user = Meteor.users.findOne(userId);                                                    // 413
  if (!user)                                                                                  // 414
    throw new Error("Can't find user");                                                       // 415
  // pick the first unverified address if we weren't passed an address.                       // 416
  if (!address) {                                                                             // 417
    var email = _.find(user.emails || [],                                                     // 418
                       function (e) { return !e.verified; });                                 // 419
    address = (email || {}).address;                                                          // 420
  }                                                                                           // 421
  // make sure we have a valid address                                                        // 422
  if (!address || !_.contains(_.pluck(user.emails || [], 'address'), address))                // 423
    throw new Error("No such email address for user.");                                       // 424
                                                                                              // 425
                                                                                              // 426
  var tokenRecord = {                                                                         // 427
    token: Random.id(),                                                                       // 428
    address: address,                                                                         // 429
    when: new Date()};                                                                        // 430
  Meteor.users.update(                                                                        // 431
    {_id: userId},                                                                            // 432
    {$push: {'services.email.verificationTokens': tokenRecord}});                             // 433
                                                                                              // 434
  var verifyEmailUrl = Accounts.urls.verifyEmail(tokenRecord.token);                          // 435
                                                                                              // 436
  var options = {                                                                             // 437
    to: address,                                                                              // 438
    from: Accounts.emailTemplates.from,                                                       // 439
    subject: Accounts.emailTemplates.verifyEmail.subject(user),                               // 440
    text: Accounts.emailTemplates.verifyEmail.text(user, verifyEmailUrl)                      // 441
  };                                                                                          // 442
                                                                                              // 443
  if (typeof Accounts.emailTemplates.verifyEmail.html === 'function')                         // 444
    options.html =                                                                            // 445
      Accounts.emailTemplates.verifyEmail.html(user, verifyEmailUrl);                         // 446
                                                                                              // 447
  Email.send(options);                                                                        // 448
};                                                                                            // 449
                                                                                              // 450
// Take token from sendVerificationEmail, mark the email as verified,                         // 451
// and log them in.                                                                           // 452
Meteor.methods({verifyEmail: function (token) {                                               // 453
  var self = this;                                                                            // 454
  return Accounts._loginMethod(                                                               // 455
    self,                                                                                     // 456
    "verifyEmail",                                                                            // 457
    arguments,                                                                                // 458
    "password",                                                                               // 459
    function () {                                                                             // 460
      check(token, String);                                                                   // 461
                                                                                              // 462
      var user = Meteor.users.findOne(                                                        // 463
        {'services.email.verificationTokens.token': token});                                  // 464
      if (!user)                                                                              // 465
        throw new Meteor.Error(403, "Verify email link expired");                             // 466
                                                                                              // 467
      var tokenRecord = _.find(user.services.email.verificationTokens,                        // 468
                               function (t) {                                                 // 469
                                 return t.token == token;                                     // 470
                               });                                                            // 471
      if (!tokenRecord)                                                                       // 472
        return {                                                                              // 473
          userId: user._id,                                                                   // 474
          error: new Meteor.Error(403, "Verify email link expired")                           // 475
        };                                                                                    // 476
                                                                                              // 477
      var emailsRecord = _.find(user.emails, function (e) {                                   // 478
        return e.address == tokenRecord.address;                                              // 479
      });                                                                                     // 480
      if (!emailsRecord)                                                                      // 481
        return {                                                                              // 482
          userId: user._id,                                                                   // 483
          error: new Meteor.Error(403, "Verify email link is for unknown address")            // 484
        };                                                                                    // 485
                                                                                              // 486
      // By including the address in the query, we can use 'emails.$' in the                  // 487
      // modifier to get a reference to the specific object in the emails                     // 488
      // array. See                                                                           // 489
      // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)     // 490
      // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull                        // 491
      Meteor.users.update(                                                                    // 492
        {_id: user._id,                                                                       // 493
         'emails.address': tokenRecord.address},                                              // 494
        {$set: {'emails.$.verified': true},                                                   // 495
         $pull: {'services.email.verificationTokens': {token: token}}});                      // 496
                                                                                              // 497
      return {userId: user._id};                                                              // 498
    }                                                                                         // 499
  );                                                                                          // 500
}});                                                                                          // 501
                                                                                              // 502
                                                                                              // 503
                                                                                              // 504
///                                                                                           // 505
/// CREATING USERS                                                                            // 506
///                                                                                           // 507
                                                                                              // 508
// Shared createUser function called from the createUser method, both                         // 509
// if originates in client or server code. Calls user provided hooks,                         // 510
// does the actual user insertion.                                                            // 511
//                                                                                            // 512
// returns the user id                                                                        // 513
var createUser = function (options) {                                                         // 514
  // Unknown keys allowed, because a onCreateUserHook can take arbitrary                      // 515
  // options.                                                                                 // 516
  check(options, Match.ObjectIncluding({                                                      // 517
    username: Match.Optional(String),                                                         // 518
    email: Match.Optional(String),                                                            // 519
    password: Match.Optional(String),                                                         // 520
    srp: Match.Optional(SRP.matchVerifier)                                                    // 521
  }));                                                                                        // 522
                                                                                              // 523
  var username = options.username;                                                            // 524
  var email = options.email;                                                                  // 525
  if (!username && !email)                                                                    // 526
    throw new Meteor.Error(400, "Need to set a username or email");                           // 527
                                                                                              // 528
  // Raw password. The meteor client doesn't send this, but a DDP                             // 529
  // client that didn't implement SRP could send this. This should                            // 530
  // only be done over SSL.                                                                   // 531
  if (options.password) {                                                                     // 532
    if (options.srp)                                                                          // 533
      throw new Meteor.Error(400, "Don't pass both password and srp in options");             // 534
    options.srp = SRP.generateVerifier(options.password);                                     // 535
  }                                                                                           // 536
                                                                                              // 537
  var user = {services: {}};                                                                  // 538
  if (options.srp)                                                                            // 539
    user.services.password = {srp: options.srp}; // XXX validate verifier                     // 540
  if (username)                                                                               // 541
    user.username = username;                                                                 // 542
  if (email)                                                                                  // 543
    user.emails = [{address: email, verified: false}];                                        // 544
                                                                                              // 545
  return Accounts.insertUserDoc(options, user);                                               // 546
};                                                                                            // 547
                                                                                              // 548
// method for create user. Requests come from the client.                                     // 549
Meteor.methods({createUser: function (options) {                                              // 550
  var self = this;                                                                            // 551
  return Accounts._loginMethod(                                                               // 552
    self,                                                                                     // 553
    "createUser",                                                                             // 554
    arguments,                                                                                // 555
    "password",                                                                               // 556
    function () {                                                                             // 557
      // createUser() above does more checking.                                               // 558
      check(options, Object);                                                                 // 559
      if (Accounts._options.forbidClientAccountCreation)                                      // 560
        return {                                                                              // 561
          error: new Meteor.Error(403, "Signups forbidden")                                   // 562
        };                                                                                    // 563
                                                                                              // 564
      // Create user. result contains id and token.                                           // 565
      var userId = createUser(options);                                                       // 566
      // safety belt. createUser is supposed to throw on error. send 500 error                // 567
      // instead of sending a verification email with empty userid.                           // 568
      if (! userId)                                                                           // 569
        throw new Error("createUser failed to insert new user");                              // 570
                                                                                              // 571
      // If `Accounts._options.sendVerificationEmail` is set, register                        // 572
      // a token to verify the user's primary email, and send it to                           // 573
      // that address.                                                                        // 574
      if (options.email && Accounts._options.sendVerificationEmail)                           // 575
        Accounts.sendVerificationEmail(userId, options.email);                                // 576
                                                                                              // 577
      // client gets logged in as the new user afterwards.                                    // 578
      return {userId: userId};                                                                // 579
    }                                                                                         // 580
  );                                                                                          // 581
}});                                                                                          // 582
                                                                                              // 583
// Create user directly on the server.                                                        // 584
//                                                                                            // 585
// Unlike the client version, this does not log you in as this user                           // 586
// after creation.                                                                            // 587
//                                                                                            // 588
// returns userId or throws an error if it can't create                                       // 589
//                                                                                            // 590
// XXX add another argument ("server options") that gets sent to onCreateUser,                // 591
// which is always empty when called from the createUser method? eg, "admin:                  // 592
// true", which we want to prevent the client from setting, but which a custom                // 593
// method calling Accounts.createUser could set?                                              // 594
//                                                                                            // 595
Accounts.createUser = function (options, callback) {                                          // 596
  options = _.clone(options);                                                                 // 597
                                                                                              // 598
  // XXX allow an optional callback?                                                          // 599
  if (callback) {                                                                             // 600
    throw new Error("Accounts.createUser with callback not supported on the server yet.");    // 601
  }                                                                                           // 602
                                                                                              // 603
  return createUser(options);                                                                 // 604
};                                                                                            // 605
                                                                                              // 606
///                                                                                           // 607
/// PASSWORD-SPECIFIC INDEXES ON USERS                                                        // 608
///                                                                                           // 609
Meteor.users._ensureIndex('emails.validationTokens.token',                                    // 610
                          {unique: 1, sparse: 1});                                            // 611
Meteor.users._ensureIndex('services.password.reset.token',                                    // 612
                          {unique: 1, sparse: 1});                                            // 613
                                                                                              // 614
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();

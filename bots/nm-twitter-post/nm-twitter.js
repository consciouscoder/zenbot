var Nightmare = require('nightmare');
var vo = require('vo');

vo(function* () {
  var nightmare = Nightmare({ show: false });
  var link = yield nightmare
    .goto('http://twitter.com/intent/tweet')
    .type('#status', "this is a test!")
    .type('#username_or_email', "SmilingSimile")
    .type('#password', "joshua12")
    .click('.button')
  yield nightmare.end();
})(function (err, result) {
  if (err) return console.log(err);
});



    // var Nightmare = require('nightmare');
    //   new Nightmare()
    //     .goto('https://twitter.com/')
    //     .type('html body.three-col.logged-out.supports-drag-and-drop div#doc.route-download div.topbar.js-topbar div.global-nav.global-nav--newLoggedOut div.global-nav-inner div.container div.pull-right ul#session.nav.secondary-nav.session-dropdown li.dropdown.js-session.open div#signin-dropdown.dropdown-menu.dropdown-form div.signin-dialog-body form.LoginForm.js-front-signin div.LoginForm-input.LoginForm-username input.text-input.email-input.js-signin-email', 'SmilingSimile')
    //     .type('html body.three-col.logged-out.supports-drag-and-drop div#doc.route-download div.topbar.js-topbar div.global-nav.global-nav--newLoggedOut div.global-nav-inner div.container div.pull-right ul#session.nav.secondary-nav.session-dropdown li.dropdown.js-session.open div#signin-dropdown.dropdown-menu.dropdown-form div.signin-dialog-body form.LoginForm.js-front-signin div.LoginForm-input.LoginForm-password input.text-input', 'joshua12')
    //     .click('html body.three-col.logged-out.supports-drag-and-drop div#doc.route-download div.topbar.js-topbar div.global-nav.global-nav--newLoggedOut div.global-nav-inner div.container div.pull-right ul#session.nav.secondary-nav.session-dropdown li.dropdown.js-session.open div#signin-dropdown.dropdown-menu.dropdown-form div.signin-dialog-body form.LoginForm.js-front-signin input.submit.btn.primary-btn.js-submit')
    //     .run();

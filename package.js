Package.describe({
  name: "dispatch:phantomjs-tests",
  summary: "A helper package for Meteor test driver packages. Runs client tests in PhantomJS.",
  git: "https://github.com/dispatch/meteor-phantomjs-tests.git",
  version: '0.0.3',
  testOnly: true,
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');

  api.use('tmeasday:check-npm-versions@0.1.1', 'server');

  api.addAssets('phantomjsScript.js', 'server');

  api.mainModule('server.js', 'server');
});

# dispatch:phantomjs-tests

This package exports a `startPhantom` function for server code, which runs your client tests within a PhantomJS page. Meteor test driver packages can depend on this package. See the example implementation here: https://github.com/DispatchMe/meteor-mocha-phantomjs

## Usage

In your test driver package `package.js` file, add

```js
api.use('dispatch:phantomjs-tests@0.0.1', 'server');
```

Then in your server code, do something similar to this:

```js
import { startPhantom } from 'meteor/dispatch:phantomjs-tests';

function start() {
  startPhantom({
    stdout(data) {
      console.log(data.toString());
    },
    stderr(data) {
      console.log(data.toString());
    },
    done(failureCount) {
      // Your code to run when client tests are done running
    },
  });
}

export { start };
```

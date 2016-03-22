import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';

// We let the package user install whatever phantomjs-prebuilt version they want
// on the server. This will throw an error if they haven't done so.
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'phantomjs-prebuilt': '2.x.x'
});

// We can't use `import` here because it will be hoisted to before the `checkNpmVersions` call
const phantomjs = require('phantomjs-prebuilt');

const PHANTOMJS_SCRIPT_FILE_NAME = 'phantomjsScript.js';

function startPhantom({
  stdout,
  stderr,
  done,
}) {
  var scriptPath = Assets.absoluteFilePath(PHANTOMJS_SCRIPT_FILE_NAME);

  if (process.env.METEOR_PHANTOMJS_DEBUG) {
    console.log('PhantomJS Path:', phantomjs.path);
    console.log('PhantomJS Script Path:', scriptPath);
  }

  var phantomProcess = childProcess.execFile(phantomjs.path, [scriptPath], {
    env: {
      ROOT_URL: process.env.ROOT_URL,
    }
  });

  phantomProcess.on('error', (error) => {
    throw error;
  });

  phantomProcess.on('exit', done);

  // The PhantomJS script echoes whatever the page prints to the browser console and
  // here we echo that once again.
  phantomProcess.stdout.on('data', stdout);
  phantomProcess.stderr.on('data', stderr);
}

export { startPhantom };

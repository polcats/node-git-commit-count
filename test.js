import { homedir, platform } from 'os';
import execa from 'execa';
import fs from 'fs-extra';
import test from 'ava';


import commitCount from './index';

test.before('create empty git dirs', () => {
  fs.emptyDirSync('../gitEmpty');
  fs.createFileSync('../gitEmpty/index.js');
  fs.emptyDirSync('../gitEmpty2');
  fs.createFileSync('../gitEmpty2/index.js');
  if (platform() === 'win32') {
    execa.shellSync('pushd ../gitEmpty & git init & git add . & git commit -m "Initial commit"');
    execa.shellSync('pushd ../gitEmpty2 & git init');
  } else {
    execa.shellSync('cd ../gitEmpty ; git init ; git add . ; git commit -m "Initial commit"');
    execa.shellSync('cd ../gitEmpty2 ; git init');
  }
});

test.after('delete created git dirs', () => {
  fs.emptyDirSync('../gitEmpty');
  fs.rmdirSync('../gitEmpty');
  fs.emptyDirSync('../gitEmpty2');
  fs.rmdirSync('../gitEmpty2');
});

test('check if process.cwd() has commits', (t) => {
  t.not(commitCount(), 0);
});

test('check if home dir has commits', (t) => {
  t.is(commitCount(homedir()), -1);
});

test('check if another dir has commits', (t) => {
  t.is(commitCount('../gitEmpty'), 1);
});

test('check if another dir has commits', (t) => {
  t.is(commitCount('../gitEmpty2'), 0);
});

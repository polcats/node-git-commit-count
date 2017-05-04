import fs from 'fs-extra';
import { homedir } from 'os';
import test from 'ava';
import path from 'path';

import commitCount from './index';

const fixtures = path.join(process.cwd(), 'test', 'fixtures');

test.before('rename git folders', () => {
  fs.renameSync(path.join(fixtures, 'git-commit-0', 'git'), path.join(fixtures, 'git-commit-0', '.git'));
  fs.renameSync(path.join(fixtures, 'git-commit-1', 'git'), path.join(fixtures, 'git-commit-1', '.git'));
});

test.after.always('rename .git folders', () => {
  fs.renameSync(path.join(fixtures, 'git-commit-0', '.git'), path.join(fixtures, 'git-commit-0', 'git'));
  fs.renameSync(path.join(fixtures, 'git-commit-1', '.git'), path.join(fixtures, 'git-commit-1', 'git'));
});

test('check if process.cwd() has commits', (t) => {
  t.not(commitCount(), 0);
});

test('check if home dir has commits', (t) => {
  t.is(commitCount(homedir()), -1);
});

test('check if another dir has commits', (t) => {
  t.is(commitCount('./test/fixtures/git-commit-1'), 1);
});

test('check if another dir has commits', (t) => {
  t.is(commitCount('./test/fixtures/git-commit-0'), 0);
});

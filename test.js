import { homedir } from 'os';
import test from 'ava';

import commitCount from './index';

test('check if process.cwd() is a git repo', (t) => {
  t.is(0, commitCount());
});

test('check if another dir is a git repo', (t) => {
  t.is(0, commitCount(homedir()));
});

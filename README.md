# is-git-repository

[![Build Status](https://travis-ci.org/rudolfsonjunior/node-git-commit-count.svg?branch=master)](https://travis-ci.org/rudolfsonjunior/node-git-commit-count) [![Coverage Status](https://coveralls.io/repos/github/rudolfsonjunior/node-git-commit-count/badge.svg?branch=master)](https://coveralls.io/github/rudolfsonjunior/node-git-commit-count?branch=master)

Checks how many commits a git repository has
## Installation

```sh
$ npm i git-commit-count --save
```
or
```sh
$ yarn add git-commit-count
```

## Usage

```js
const commitCount = require('git-commit-count');

commitCount(); // number of process.cwd()
commitCount('any/git/repo'); // number
```

## LICENSE

MIT © Lukas Aichbauer

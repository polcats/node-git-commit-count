import execa from 'execa';
import isGit from 'is-git-repository';
import { platform } from 'os';
import path from 'path';
import pathIsAbsolute from 'path-is-absolute';


const cwd = process.cwd();

const commitCount = (altPath = cwd) => {
  let count = 0;
  let obj = {};

  const thisPath = pathIsAbsolute(altPath) ? altPath : path.join(cwd, altPath);

  if (!isGit(thisPath)) {
    return -1;
  }

  try {
    if (platform() === 'win32') {
      obj = execa.shellSync(`pushd ${thisPath} & git rev-list --count HEAD`);
    } else {
      obj = execa.shellSync(`(cd ${thisPath} ; git rev-list --count HEAD)`);
    }

    count = parseInt(obj.stdout, 10);

    return count;
  } catch (e) {
    return 0;
  }
};

export default commitCount;

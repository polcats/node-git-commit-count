import { platform } from 'os';
import execa from 'execa';

const cwd = process.cwd();

const commitCount = (altPath = cwd) => {
  let count = 0;
  let obj = {};

  try {
    if (platform() === 'win32') {
      obj = execa.shellSync(`pushd ${altPath} & git rev-list --all --count`);
    } else {
      obj = execa.shellSync(`cd ${altPath} ; git rev-list --all --count`);
    }

    count = parseInt(obj.stdout, 10);

    return count;
  } catch (e) {
    const error = e.toString().substring(0, 12);

    if (error === 'Error: usage') {
      return count;
    }

    return -1;
  }
};

export default commitCount;

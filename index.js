import { platform } from 'os';
import execa from 'execa';

const cwd = process.cwd();

const commitCount = (altPath = cwd) => {
  let count = 0;
  try {
    if (platform() === 'win32') {
      count = execa.shellSync(`pushd ${altPath} & git rev-list --all --count`);
    } else {
      count = execa.shellSync(`(cd ${altPath} ; git rev-list --all --count`);
    }

    return count;
  } catch (e) {
    return 0;
  }
};

export default commitCount;

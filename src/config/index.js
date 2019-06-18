import local from './local';
import dev from './dev';

/**
 * Select the setting file base on teh value of REACT_APP_ENV
 */
const selectEnvSetting = () => {
  switch (process.env.REACT_APP_ENV) {
    case 'local':
      return local;
    case 'dev':
      return dev;
    default:
      return local;
  }
};

export default selectEnvSetting();

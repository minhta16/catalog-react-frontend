import local from './local';
import dev from './dev';

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

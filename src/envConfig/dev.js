import base from './base';

/**
 * You can put settings that you wish to have exclusively in the dev environments into the object below.
 * Usage: { SAMPLE_PATH: localhost:3000 }
 * Calls: import config from 'envConfig' -> config.SAMPLE_PATH will be localhost:3000
 */
export default { ...base, API_ROOT: 'http://secureserver.com' };

import config from '../config';

import methodsProcessor from './methods';
import computedProcessor from './computed';

function processor(component, hook) {
  switch (hook) {
    case 'methods':
      methodsProcessor(component);
      break;
    case 'computed':
      computedProcessor(component);
      break;
    default:
      console.warn(`[vue-analysis-tool] unknow hook: ${hook}`);
      break;
  }
}

export default processor;

import { lifecycles } from '../config';

import methodsProcessor from './methods';
import computedProcessor from './computed';
import lifecycleProcessor from './lifecycle';

function processor(component, hook) {
  if (hook === 'methods') {
    return methodsProcessor(component);
  } else if (hook === 'computed') {
    return computedProcessor(component);
  } else if (lifecycles.includes(hook)) {
    return lifecycleProcessor(component, hook);
  } else {
    console.warn(`[vue-analysis-tool] unknow hook: ${hook}`);
  }
}

export default processor;

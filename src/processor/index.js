import config from '../config';

import methodsProcessor from './methods';

function processor(component, hook) {
  switch (hook) {
    case 'methods':
      methodsProcessor(component);
      break;
  }
}

export default processor;

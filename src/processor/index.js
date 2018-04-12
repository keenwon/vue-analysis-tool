import config from '../config';

import arrayProcessor from './array';
import objectProcessor from './object';
import accessProcessor from './access';

function processor(component, hook) {
  const processorType = config[hook];

  switch (processorType) {
    case 'object':
      objectProcessor(component, hook);
      break;
    case 'array':
      arrayProcessor(component, hook);
      break;
    case 'access':
      accessProcessor(component, hook);
      break;
  }
}

export default processor;

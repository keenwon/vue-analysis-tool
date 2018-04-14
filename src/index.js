import Analyzer from './analyzer';

export default function (option = {}) {
  if (typeof option === 'function') {
    return Analyzer(option);
  }

  return function (component) {
    return Analyzer(component, option);
  }
}

import processor from './processor';
import { init as reporterInit } from './reporter';
import { defaultHooks } from './config';

export default function Analyzer(option = {}) {

  // 过滤掉用户忽略的
  const hooks = Array.isArray(option.exclude) && option.exclude.length
    ? defaultHooks.filter(h => !option.exclude.includes(h))
    : defaultHooks;

  return component => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // TODO: delete
    console.dir(component);

    reporterInit(component);

    for (const hook of hooks) {
      processor(component, hook);
    }
  };
}

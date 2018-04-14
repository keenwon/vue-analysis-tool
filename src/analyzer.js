import processor from './processor';
import { init as reporterInit } from './reporter';
import { defaultHooks } from './config';

export default function Analyzer(component, option = {}) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  // TODO: delete
  console.dir(component);

  // 过滤掉用户忽略的
  const hooks = Array.isArray(option.exclude) && option.exclude.length
    ? defaultHooks.filter(h => !option.exclude.includes(h))
    : defaultHooks;

  // 初始化 reporter
  reporterInit(component);

  for (const hook of hooks) {
    processor(component, hook);
  }
}

import processor from './processor';
import config from './config';

export default function Analyzer(option = {}) {

  // 过滤掉用户忽略的
  let hooks = Object.keys(config);
  if (Array.isArray(option.exclude) && option.exclude.length) {
    hooks = hooks.filter(h => !option.exclude.includes(h));
  }

  return component => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    // TODO: delete
    console.dir(component.options);

    for (const hook of hooks) {
      const proto = component.options[hook];

      if (!proto) {
        continue;
      }

      processor(component, hook);
    }
  };
}

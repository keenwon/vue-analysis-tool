import { group, groupEnd, log } from '../reporter';

function lifecycleProcessor(component, hook) {
  const componentName = component.name || component.__file;
  const proto = component.options;

  if (!proto[hook] || !proto[hook].length) {
    return;
  }

  const newHook = [];

  for (const fn of proto[hook]) {
    const name = `lifecycle.${hook}`;

    newHook.push(function (...args) {
      group(name);

      const start = performance.now();
      const result = fn.apply(this, args);
      const spend = performance.now() - start;

      log(spend);
      groupEnd();

      return result;
    });
  }

  proto[hook] = newHook;
}

export default lifecycleProcessor;

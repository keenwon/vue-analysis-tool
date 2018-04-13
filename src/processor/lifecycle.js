import spy from '../spy';

function lifecycleProcessor(component, hook) {
  const componentName = component.name || component.__file;
  const proto = component.options;

  if (!proto[hook] || !proto[hook].length) {
    return;
  }

  const newHook = [];

  for (const fn of proto[hook]) {
    newHook.push(spy(`lifecycle.${hook}`, fn));
  }

  proto[hook] = newHook;
}

export default lifecycleProcessor;

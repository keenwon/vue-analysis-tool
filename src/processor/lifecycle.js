function lifecycleProcessor(component, hook) {
  const componentName = component.name || component.__file;
  const proto = component.options;

  if (!proto[hook] || !proto[hook].length) {
    return;
  }

  const newHook = [];

  for (const fn of proto[hook]) {
    const name = `[${componentName}] lifecycle.${hook}`;

    newHook.push(function (...args) {
      console.group(name);
      const start = performance.now();

      const result = fn.apply(this, args);

      const spend = performance.now() - start;
      const spendStr = spend.toFixed(3);

      let style = '';
      if (spend > 5) {
        style = 'color: red; font-weight: bold';
      } else if (spend > 2) {
        style = 'color: orange; font-weight: bold';
      } else if (spend < 1) {
        style = 'color: grey;';
      }

      console.log(`spend: %c${spendStr}ms`, style);
      console.groupEnd();
      return result;
    });
  }

  proto[hook] = newHook;
}

export default lifecycleProcessor;

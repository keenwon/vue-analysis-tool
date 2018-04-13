function hook(name, originalMethod) {
  return function (...argus) {
    console.group(name);
    const start = performance.now();

    const result = originalMethod.apply(this, argus);

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
  };
}

const noop = () => { };

/**
 * computed 的处理器
 */
function computedProcessor(component) {
  const componentName = component.name || component.__file;
  const computeds = Object.keys(component.options.computed);
  const proto = component.prototype;

  if (!proto) {
    return;
  }

  for (const computed of computeds) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, computed);

    for (const accessorName of ['get', 'set']) {
      const name = `[${componentName}] computed.${computed}.${accessorName}`;
      descriptor[accessorName] = hook(name, descriptor[accessorName] || noop);
    }

    Object.defineProperty(proto, computed, descriptor);
  }
}

export default computedProcessor;

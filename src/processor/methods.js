/**
 * 取所有的 watch handler
 */
function getWatchHandlers(component) {
  const handlers = [];
  const proto = component.options && component.options.watch;

  if (!proto) {
    return handlers;
  }

  Object.values(proto).forEach(obj => {
    handlers.push(obj.handler);
  });

  return handlers;
}

/**
 * 生成 console.group 的 name
 */
function getGroupName(componentName, propertyName, isWatch) {
  let name = `[${componentName}] methods.${propertyName}`;

  if (isWatch) {
    name += ' (watch handler)';
  }

  return name;
}

/**
 * methods & watch 的处理器
 */
function methodsProcessor(component) {
  const componentName = component.name || component.__file;
  const proto = component.options && component.options.methods;

  if (!proto) {
    return;
  }

  const watchHandlers = getWatchHandlers(component);

  for (const propertyName of Object.keys(proto)) {
    const isWatchHandler = watchHandlers.includes(propertyName);
    const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

    // 校验
    if (!descriptor || !(descriptor.value instanceof Function)) {
      continue;
    }

    const originalMethod = descriptor.value;
    const name = getGroupName(componentName, propertyName, isWatchHandler);

    descriptor.value = function (...args) {
      console.group(name);
      const start = performance.now();

      const result = originalMethod.apply(this, args);

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

    Object.defineProperty(proto, propertyName, descriptor);
  }
}

export default methodsProcessor;

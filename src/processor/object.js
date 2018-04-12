/**
 * 对象类型的处理器
 */
function objectProcessor(component, hook) {
  const proto = component.options[hook];
  const componentName = component.name;

  for (const propertyName of Object.keys(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

    // 校验
    if (!descriptor || !(descriptor.value instanceof Function)) {
      continue;
    }

    const originalMethod = descriptor.value;
    const name = `[${componentName}] ${hook}.${propertyName}`;

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

export default objectProcessor;

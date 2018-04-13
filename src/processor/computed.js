import spy from '../spy';

/**
 * computed 的处理器
 */
function computedProcessor(component) {
  const componentName = component.name || component.__file;
  const computeds = Object.keys(component.options.computed);
  const proto = component.prototype;

  for (const computed of computeds) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, computed);

    for (const accessorName of ['get', 'set']) {
      const name = `computed.${computed}.${accessorName}`;
      descriptor[accessorName] = spy(name, descriptor[accessorName]);
    }

    Object.defineProperty(proto, computed, descriptor);
  }
}

export default computedProcessor;

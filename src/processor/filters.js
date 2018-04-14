import spy from '../spy';

function filters(component) {
  const proto = component.options.filters;

  for (const propertyName of Object.keys(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

    // 校验
    if (!descriptor || !(descriptor.value instanceof Function)) {
      continue;
    }

    descriptor.value = spy(
      ['filters', propertyName],
      descriptor.value
    );

    Object.defineProperty(proto, propertyName, descriptor);
  }
}

export default filters;

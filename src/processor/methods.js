import spy from '../spy';

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
function getGroupName(propertyName, isWatch) {
  let name = ['methods', `${propertyName}`];

  if (isWatch) {
    name.push('(watch handler)');
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

    descriptor.value = spy(
      getGroupName(propertyName, isWatchHandler),
      descriptor.value
    );

    Object.defineProperty(proto, propertyName, descriptor);
  }
}

export default methodsProcessor;

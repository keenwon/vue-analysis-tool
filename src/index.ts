function hook(
  groupName: string,
  descriptor: PropertyDescriptor,
  proto: any,
  propertyName: string
): void {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.group(groupName);
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const spend = performance.now() - start;
    const spendStr = spend.toFixed(3);
    let style: string = '';

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

function getOwnPropertyDescriptor(
  proto: any,
  propertyName: string,
  type: string
): PropertyDescriptor | undefined {
  let descriptor: PropertyDescriptor | undefined;

  switch (type) {
    case 'watch':
      descriptor = Object.getOwnPropertyDescriptor(proto[propertyName], 'handler');
      break;
    case 'computed.get':
      descriptor = Object.getOwnPropertyDescriptor(proto[propertyName], 'get');
      break;
    case 'computed.set':
      descriptor = Object.getOwnPropertyDescriptor(proto[propertyName], 'set');
      break;
    default:
      descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);
      break;
  }

  return descriptor;
}

// Vue logger
export function VueLogger(ignoreMethods: string[]) {
  return (target: any) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    for (const type of ['methods', 'watch', 'computed.get', 'computed.set']) {
      const proto = type.indexOf('.') === -1
        ? target.options[type]
        : target.options[type.split('.')[0]];

      for (const propertyName of Object.keys(proto)) {
        if (ignoreMethods.includes(propertyName)) {
          continue;
        }

        // 找到 function
        const descriptor = getOwnPropertyDescriptor(proto, propertyName, type);

        if (!descriptor || !(descriptor.value instanceof Function)) {
          continue;
        }

        const groupName = `[${target.name}] ${propertyName} [${type.toUpperCase()}]`;

        hook(groupName, descriptor, proto, propertyName);
      }
    }
  };
}

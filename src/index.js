export default function Analyzer(ignoreMethods = []) {
  return (target) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    console.dir(target);

    for (const proto of [target.options.methods, target.options.watch]) {
      for (const propertyName of Object.keys(proto)) {
        if (ignoreMethods.includes(propertyName)) {
          continue;
        }

        const descriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

        if (!descriptor) {
          continue;
        }

        const isMethod = descriptor.value instanceof Function;

        if (!isMethod) {
          continue;
        }

        const originalMethod = descriptor.value;
        const name = `[${target.name}] ${propertyName}`;

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
  };
}

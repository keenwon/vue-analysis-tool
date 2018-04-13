import { colorMap } from './config';

let componentName = '';

// 初始化
function init(component) {
  componentName = component.name || '';
}

function group(names) {
  const _names = names.concat();
  const hook = _names.shift();

  console.group(
    `%c${componentName}%c ${hook}%c ${_names.join(' ')}`,
    'background: #09f; color: #fafafa; padding: 1px 3px;',
    `background: #fff; color: ${colorMap[hook]}; padding: 1px 3px 1px 0;`,
    'background: #fff; color: #333; padding: 1px 3px 1px 0;'
  );
}

function groupEnd() {
  console.groupEnd();
}

function log(spend) {
  const spendStr = spend.toFixed(3);

  let style = '';

  if (spend > 5) {
    style = 'background: red; color: #fff; padding: 0 2px;';
  } else if (spend > 2) {
    style = 'background: orange; color: #fff; padding: 0 2px;';
  } else if (spend < 1) {
    style = 'color: grey;';
  }

  console.log(`spend: %c${spendStr}ms`, style);
}

export {
  init,
  group,
  groupEnd,
  log
};

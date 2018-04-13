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
    'background-color: #09f; color: #fafafa; padding: 1px 3px;',
    `background-color: #fff; color: ${colorMap[hook]}; padding-right: 3px;`,
    'background-color: #fff; color: #333; padding-right: 3px;'
  );
}

function groupEnd() {
  console.groupEnd();
}

function log(spend) {
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
}

export {
  init,
  group,
  groupEnd,
  log
};

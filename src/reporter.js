let componentName = '';

// 初始化
function init(component) {
  componentName = component.name || '';
}

function group(...argus) {
  console.group(`[${componentName}] ${argus.join(' ')}`);
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

import { group, groupEnd, log } from './reporter';

/**
 * 替换旧函数，记录调用栈 & 耗时等
 */
export default function (groupName, originalMethod) {
  return function (...argus) {
    group(groupName);

    const start = performance.now();
    const result = originalMethod.apply(this, argus);
    const spend = performance.now() - start;

    log(spend);
    groupEnd();

    return result;
  }
}

import { group, groupEnd, argusInfo, time } from './reporter';

/**
 * 替换旧函数，记录调用栈 & 耗时等
 */
export default function (groupName, originalMethod) {
  return function (...argus) {
    group(groupName);

    const start = performance.now();
    const result = originalMethod.apply(this, argus);
    const spend = performance.now() - start;

    argusInfo(argus);
    time(spend);
    groupEnd();

    return result;
  }
}

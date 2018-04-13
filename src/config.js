// vue 生命周期
export const lifecycles = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/**
 * 当前支持的类型
 * 注1：watch 其实就是 methods，也可以主动调用，目前没有区分
 */
export const defaultHooks = [
  'methods', // and watch
  'computed',

  ...lifecycles
];

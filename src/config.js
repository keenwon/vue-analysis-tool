/**
 * vue 生命周期
 */
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
  "methods",
  "computed",
  ...lifecycles
];

// 橙色
const colorOrange = '#CD950C';
// 绿色
const colorGreen = '#00CD66';
// 紫色
const colorPurple = '#7D26CD';

export const colorMap = {
  methods: colorGreen,
  computed: colorPurple,
  lifecycle: colorOrange
}

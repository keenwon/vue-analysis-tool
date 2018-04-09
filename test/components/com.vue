<template>
  <p>{{count}}</p>
</template>

<script>
import Analyzer from '../../src/index';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Analyzer()
@Component
export default class Com extends Vue {
  count = 0;
  num = 0;

  @Watch('count')
  onCountChange() {
    this.num = this.count;
  }
}
</script>

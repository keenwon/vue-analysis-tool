<template>
  <div>
    <p>count: {{count}}</p>
    <p>num: {{num}}</p>
    <button @click="addCount()">count + 1</button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Analyzer from './lib/index';
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

    addCount() {
      this.count++;
    }
  }
</script>

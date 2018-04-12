<template>
  <div>
    <p>count: {{count}}</p>
    <p>num: {{num}}</p>
    <div>
      <p v-if="!isEdit">
        countX2: {{countX2}}
        <a href="javascript:;" @click="isEdit = true">edit</a>
      </p>
      <p v-if="isEdit">
        countX2:
        <input v-model="countX2" />
        <a href="javascript:;" @click="isEdit = false">done</a>
      </p>
    </div>
    <button @click="addCount()">count + 1</button>
    <button @click="reset()">reset</button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Analyzer from './src';
  import { Component, Watch } from 'vue-property-decorator';

  @Analyzer()
  @Component
  export default class Com extends Vue {
    count = 0;
    num = 0;
    isEdit = false;

    get countX2() {
      return this.count * 2;
    }

    set countX2(value) {
      this.count = Math.floor(value / 2);
    }

    created() {
      // do nothing
    }

    @Watch('count')
    onCountChange() {
      this.num = this.count;
    }

    addCount() {
      this.count++;
    }

    reset() {
      this.count = 0;
    }
  }
</script>

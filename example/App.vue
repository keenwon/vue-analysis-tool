<template>
  <div>
    <p>count: {{count}}</p>
    <p>num: {{num | localString}}</p>
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
    <button @click="addCount()">count + 500</button>
    <button @click="reset()">reset</button>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Analyzer from '../src';
  import { Component, Watch } from 'vue-property-decorator';

  const localString = function (n) {
    return n.toLocaleString('en-US');
  }

  @Analyzer()
  @Component({
    filters: {
      localString
    }
  })
  export default class Com extends Vue {
    count = 0;
    num = 0;
    isEdit = false;

    get countX2() {
      console.log('get countX2');
      return this.count * 2;
    }

    set countX2(value) {
      console.log('set countX2');
      this.count = Math.floor(value / 2);
    }

    created() {
      console.log('created');
    }

    updated() {
      console.log('updated');
    }

    @Watch('count')
    onCountChange() {
      console.log('onCountChange');
      this.num = this.count;
    }

    addCount() {
      console.log('addCount');
      this.count = this.count + 500;

      // 耗时+2ms，黄色输出
      const time = Date.now();
      while(true) {
        if (Date.now() - time > 2) {
          break;
        }
      }
    }

    reset() {
      console.log('reset');
      this.count = 0;

      // 耗时+20ms，红色输出
      const time = Date.now();
      while(true) {
        if (Date.now() - time > 20) {
          break;
        }
      }
    }
  }
</script>

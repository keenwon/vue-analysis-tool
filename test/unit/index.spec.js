import { spy } from 'sinon';
import * as chai from 'chai';
import { default as sinonChai } from "sinon-chai";

chai.should();
chai.use(sinonChai);

import Com from '../components/com.vue';

describe('Test', function () {

  let consoleLog;

  beforeEach(function () {
    consoleLog = spy(console, 'log');
  });

  afterEach(function () {
    consoleLog.restore();
  })

  it('# 基本运行', function () {
    consoleLog.should.have.been.calledTwice();
  });
});

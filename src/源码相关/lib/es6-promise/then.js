import {
  invokeCallback,
  subscribe,
  FULFILLED,
  REJECTED,
  noop,
  makePromise,
  PROMISE_ID
} from './-internal'; // 不同模块所引入的 -internal.js 文件都是同一个文件 里面的Math.random()产生的是同一个值 

import { asap } from './asap';

export default function then(onFulfillment, onRejection) {
  const parent = this;
  const child = new this.constructor(noop);
  
  // 什么情况下 child的PROMISE_ID属性可能是 undefined 呢  
  if (child[PROMISE_ID] === undefined) {
    // 补充内部属性
    makePromise(child);
  }
  
  const { _state } = parent;
  
  debugger
  
  /**
   *  PENDING   = void 0;
   *  FULFILLED = 1;
   *  REJECTED  = 2;
   **/
  if (_state) {
    const callback = arguments[_state - 1];
    asap(() => invokeCallback(_state, child, callback, parent._result));
  } else {
    // pending state
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

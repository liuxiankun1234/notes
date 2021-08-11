import { objectOrFunction, isFunction } from "./utils";

import { asap } from "./asap";

import originalThen from "./then";
import originalResolve from "./promise/resolve";

export const PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

const PENDING = void 0;
const FULFILLED = 1;
const REJECTED = 2;

function selfFulfillment() {
    return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
    return new TypeError(
        "A promises callback cannot return that same promise."
    );
}

function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
    try {
        then.call(value, fulfillmentHandler, rejectionHandler);
    } catch (e) {
        return e;
    }
}

function handleForeignThenable(promise, thenable, then) {
    asap((promise) => {
        let sealed = false;
        let error = tryThen(
            then,
            thenable,
            (value) => {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    resolve(promise, value);
                } else {
                    fulfill(promise, value);
                }
            },
            (reason) => {
                if (sealed) {
                    return;
                }
                sealed = true;

                reject(promise, reason);
            },
            "Settle: " + (promise._label || " unknown promise")
        );

        if (!sealed && error) {
            sealed = true;
            reject(promise, error);
        }
    }, promise);
}

function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
        fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
        reject(promise, thenable._result);
    } else {
        subscribe(
            thenable,
            undefined,
            (value) => resolve(promise, value),
            (reason) => reject(promise, reason)
        );
    }
}

/**
 *  @params
 *    promise           new Promise 实例
 *    maybeThenable     resolve的参数
 *    then              resolve的参数的then方法 
 **/
function handleMaybeThenable(promise, maybeThenable, then) {
    /**
     *  maybeThenable(一个Function或者Object)
     *      是一个Promse构造器的实例
     *          handleOwnThenable
     *      不是一个Promse构造器的实例
     *          没有then属性
     *              fulfill
     *          有then方法
     *              thenable对象
     *              handleForeignThenable
     *          其他
     *              fulfill
    **/
    //  是一个Promise构造器的实例
    if (
        maybeThenable.constructor === promise.constructor &&
        then === originalThen &&
        maybeThenable.constructor.resolve === originalResolve
    ) {
        handleOwnThenable(promise, maybeThenable);
    } else {
        // 非Promise构造器实例的函数或对象
        if (then === undefined) {
            fulfill(promise, maybeThenable);
        } else if (isFunction(then)) {
            // thenable对象
            handleForeignThenable(promise, maybeThenable, then);
        } else {
            fulfill(promise, maybeThenable);
        }
    }
}

/**
 *  resolve
 *      Promise的resolve状态执行函数
 *      @params
 *          promise this
 *          value resolve的参数
 *              value === this
 *                  reject
 *              value是一个对象或者function
 *                  
 *              其他值
 *      
 **/
function resolve(promise, value) {
    if (promise === value) {
        reject(promise, selfFulfillment());
    } else if (objectOrFunction(value)) {
        let then;
        try {
            then = value.then;
        } catch (error) {
            reject(promise, error);
            return;
        }
        handleMaybeThenable(promise, value, then);
    } else {
        fulfill(promise, value);
    }
}

function publishRejection(promise) {
    if (promise._onerror) {
        promise._onerror(promise._result);
    }

    publish(promise);
}

function fulfill(promise, value) {
    if (promise._state !== PENDING) {
        return;
    }

    // 绑定状态 和 返回值
    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length !== 0) {
        asap(publish, promise);
    }
}

function reject(promise, reason) {
    if (promise._state !== PENDING) {
        return;
    }
    promise._state = REJECTED;
    promise._result = reason;

    // 编排任务
    asap(publishRejection, promise);
}

/**
 *  订阅方法
 *      _subscribers
 *          给当前的promise添加订阅内容 
 *              i       child
 *              i + 1   onFulfillment(then方法的回调)
 *              i + 2   onRejection(then方法的回调)
 *      调用时机
 *          then方法调用
 *      @param
 *          parent          promise实例    
 *          child           then链式方法返回的 promise 对象
 *          onFulfillment   成功回调
 *          onRejection     失败回调
 *      
 * 
 * 
**/
function subscribe(parent, child, onFulfillment, onRejection) {
    let { _subscribers } = parent;
    let { length } = _subscribers;

    parent._onerror = null;

    _subscribers[length] = child;
    _subscribers[length + FULFILLED] = onFulfillment;
    _subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
        asap(publish, parent);
    }
}

function publish(promise) {
    let subscribers = promise._subscribers;
    let settled = promise._state;

    if (subscribers.length === 0) {
        return;
    }

    let child,
        callback,
        detail = promise._result;

    for (let i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
            invokeCallback(settled, child, callback, detail);
        } else {
            callback(detail);
        }
    }

    promise._subscribers.length = 0;
}
/**
 *  invokeCallback执行then方法的回调函数
 *      settled     当前promise的决议状态
 *      promise     then return出去的promise
 *      callback    执行的回调(成功或失败的回调)
 *      detail      value 或 reason 
**/
function invokeCallback(settled, promise, callback, detail) {
    let hasCallback = isFunction(callback),
        value,
        error,
        succeeded = true;

    if (hasCallback) {
        try {
            value = callback(detail);
        } catch (e) {
            succeeded = false;
            error = e;
        }

        if (promise === value) {
            reject(promise, cannotReturnOwn());
            return;
        }
    } else {
        value = detail;
    }

    if (promise._state !== PENDING) {
        // noop
    } else if (hasCallback && succeeded) {
        resolve(promise, value);
    } else if (succeeded === false) {
        reject(promise, error);
    } else if (settled === FULFILLED) {
        fulfill(promise, value);
    } else if (settled === REJECTED) {
        reject(promise, value);
    }
}

/**
 *  initializePromise
 *      执行Promise构造器的函数参数
 *          resolvePromise
 *              resolve(promise, value)
 *          rejectPromise
 *              reject(promise, reason);
 *  @param
 *    promise   当前Promise构造函数实例
 *    resolver  Promise函数执行器参数
 **/
function initializePromise(promise, resolver) {
    try {
        resolver(
            function resolvePromise(value) {
                // 一个透传 用于补充参数
                resolve(promise, value);
            },
            function rejectPromise(reason) {
                reject(promise, reason);
            }
        );
    } catch (e) {
        reject(promise, e);
    }
}

let id = 0;
function nextId() {
    return id++;
}

function makePromise(promise) {
    promise[PROMISE_ID] = id++;
    promise._state = undefined;
    promise._result = undefined;
    promise._subscribers = [];
}

export {
    nextId,
    makePromise,
    noop,
    resolve,
    reject,
    fulfill,
    subscribe,
    publish,
    publishRejection,
    initializePromise,
    invokeCallback,
    FULFILLED,
    REJECTED,
    PENDING,
    handleMaybeThenable,
};

import { invokeCallback, subscribe } from "./es6-promise/-internal";
import { asap } from "./es6-promise/asap";

function noop() {}

class Promise{
    constructor(resolver) {
        this[PROMISE_ID] = getId();

        this._state = this._result = void 0;
        this._subscribers = [];

        if(resolver === noop) {
            return;
        }

        initializePromise(this, resolver)
    }
    then(onFulfillment, onRejection) {
        const parent = this;
        const child =  new this.constructor(noop);
        const { _state } = parent;

        if(_state) {
            const callback = arguments[_state - 1];
            asap(() => invokeCallback(_state, child, callback, parent._result));
        }else{
            subscribe(parent, child, onFulfillment, onRejection)
        }
    }
}

function subscribe(parent, child, onFulfillment, onRejection) {
    const { _state, _subscribers } = parent;
}

function invokeCallback() {
    
}

function isObjectOrFunction(x) {
    var type = typeof x;
    return x !== null && (type === 'funciton' || type === 'object')
}

function resolve(promise, value) {
    if(value === promise) {
        throw new Error('can not resolve yourself')
    }else if(isObjectOrFunction(value)) {
        // handleThenable
    }else{
        fulfill(promise, value)
    }
}

function fulfill(promise, value) {
    const { _state, _subscribers } = promise;
    if(_state !== PENDING) {
        return;
    }

    promise._state = FULFILLED
    promise._result = value;

    if(_subscribers.length !== 0) {
        asap(publish, promise)
    }
}

function initializePromise(promise, resolver) {
    try{
        resolver(
            function resolvePromise(value) {
                resolve(promise, value)
            },
            function rejectPromise() {

            }
        )
    }catch(e) {
        console.log(e)
    }
}
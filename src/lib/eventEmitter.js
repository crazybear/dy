/**
 * @class
 */
class EventEmitter {
  constructor() {
    this.__EVENTS = {};
  }

  /**
   * 监听事件
   * @param {string} methodName 事件名称
   * @param {(event) => void}  callback 回调方法
   */
  on(methodName, callback) {
    if (!this.__EVENTS[methodName]) {
      this.__EVENTS[methodName] = [];
    }
    this.__EVENTS[methodName].push(callback);
  }

  once(methodName, callback) {
    const cb = (...args) => {
      this.off(methodName, cb);
      callback.apply(this, args);
    };
    this.on(methodName, cb);
  }

  /**
   * 取消监听
   * @param {string} methodName 事件名称
   * @param {(event) => void} callback 要取消的回调用，不传则取消 methodName 下所有 callback
   */
  off(methodName, callback) {
    let e = this.__EVENTS[methodName];
    const removeAll = () => {
      delete this.__EVENTS[methodName];
    };
    if (e) {
      if (callback) {
        // eslint-disable-next-line array-callback-return
        e = e.filter(cb => {
          if (cb !== callback) {
            return cb;
          }
        });
        if (e.length === 0) {
          this.__EVENTS[methodName] = [];
          removeAll();
        } else {
          this.__EVENTS[methodName] = e;
        }
      } else {
        removeAll();
      }
    }
  }

  /**
   * 派发事件
   * @param {string} methodName 事件名称
   * @param  {...any} args 派发的参数...
   */
  emit(methodName, ...args) {
    const e = this.__EVENTS[methodName];
    if (e && e.length > 0) {
      e.forEach((callback) => {
        callback.apply(this, args);
      });
    }
  }
}
export default EventEmitter;
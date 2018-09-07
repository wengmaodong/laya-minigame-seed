
export default class Event {
  constructor() {
    this._events = {};
  }

  on(event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
  }

  off(event, fn) {
    if (!arguments.length) {
      this._events = Object.create(null);
    }

    const cbs = this._events[event];
    if (!cbs) return;
    if (!fn) this._events[event] = null;
    else {
      let cb,
        i = cbs.length;

      while (i--) {
        cb = cbs[i];
        if (cb === fn) {
          cbs.splice(i, 1);
          break;
        }
      }
    }

    this._events[event] = cbs;
  }

  emit(event, details) {
    let cbs = this._events[event];
    if (cbs && cbs.length) {
      for (let i = 0, len = cbs.length; i < len; i++) {
        try {
          cbs[i](details);
        } catch (e) {
          console.log('error in emit:' + e);
        }
      }
    }
  }

  _toArray(list, start) {
    start = start || 0
    let i = list.length - start
    const ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start]
    }
    return ret
  }

  resetEvent() {
    this._events = {};
  }

}

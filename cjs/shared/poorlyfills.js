'use strict';
const {UID} = require('./constants.js');

let Event = global.Event;
try {
  new Event('Event');
} catch(o_O) {
  Event = function (type) {
    const e = document.createEvent('Event');
    e.initEvent(type, false, false);
    return e;
  };
}
exports.Event = Event;

const Map = global.Map || function Map() {
  const keys = [], values = [];
  return {
    get(obj) {
      return values[keys.indexOf(obj)];
    },
    set(obj, value) {
      values[keys.push(obj) - 1] = value;
    }
  };
};
exports.Map = Map;

const WeakMap = global.WeakMap || function WeakMap() {
  return {
    delete(obj) { delete obj[UID]; },
    get(obj) { return obj[UID]; },
    has(obj) { return UID in obj; },
    set(obj, value) {
      Object.defineProperty(obj, UID, {
        configurable: true,
        value
      });
    }
  };
};
exports.WeakMap = WeakMap;

const WeakSet = global.WeakSet || function WeakSet() {
  const wm = new WeakMap;
  return {
    add(obj) { wm.set(obj, true); },
    has(obj) { return wm.get(obj) === true; }
  };
};
exports.WeakSet = WeakSet;

// TODO: which browser needs these partial polyfills here?
const isArray = Array.isArray || (toString =>
  arr => toString.call(arr) === '[object Array]'
)({}.toString);
exports.isArray = isArray;

const trim = UID.trim || function () {
  return this.replace(/^\s+|\s+$/g, '');
};
exports.trim = trim;

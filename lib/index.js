'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('core-js/modules/es.array.for-each.js');
require('core-js/modules/es.object.to-string.js');
require('core-js/modules/web.dom-collections.for-each.js');
require('core-js/modules/es.object.keys.js');
require('core-js/modules/es.array.includes.js');
require('core-js/modules/es.regexp.exec.js');
require('core-js/modules/es.string.replace.js');
require('core-js/modules/es.array.is-array.js');
require('core-js/modules/es.array.iterator.js');
require('core-js/modules/es.string.iterator.js');
require('core-js/modules/es.weak-map.js');
require('core-js/modules/web.dom-collections.iterator.js');
require('core-js/modules/es.array.index-of.js');

/**
 * 判断数据类型
 * https://github.com/iview/iview/blob/2.0/src/utils/assist.js
 */

var judgeType = function judgeType(obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }; // @ts-ignore

  return map[toString.call(obj)];
};

exports.judgeType = judgeType;

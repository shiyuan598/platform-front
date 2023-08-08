/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Md5": () => (/* binding */ Md5)
/* harmony export */ });
var Md5 = /** @class */ (function () {
    function Md5() {
    }
    Md5.AddUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (!!(lX4 & lY4)) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (!!(lX4 | lY4)) {
            if (!!(lResult & 0x40000000)) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    };
    Md5.FF = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.GG = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.HH = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.II = function (a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
    };
    Md5.ConvertToWordArray = function (string) {
        var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    Md5.WordToHex = function (lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };
    Md5.Utf8Encode = function (string) {
        var utftext = "", c;
        string = string.replace(/\r\n/g, "\n");
        for (var n = 0; n < string.length; n++) {
            c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Md5.init = function (string) {
        var temp;
        if (typeof string !== 'string')
            string = JSON.stringify(string);
        this._string = this.Utf8Encode(string);
        this.x = this.ConvertToWordArray(this._string);
        this.a = 0x67452301;
        this.b = 0xEFCDAB89;
        this.c = 0x98BADCFE;
        this.d = 0x10325476;
        for (this.k = 0; this.k < this.x.length; this.k += 16) {
            this.AA = this.a;
            this.BB = this.b;
            this.CC = this.c;
            this.DD = this.d;
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 0xD76AA478);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 0xE8C7B756);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 0x242070DB);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 0xC1BDCEEE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 0xF57C0FAF);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 0x4787C62A);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 0xA8304613);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 0xFD469501);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 0x698098D8);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 0x8B44F7AF);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 0xFFFF5BB1);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 0x895CD7BE);
            this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 0x6B901122);
            this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 0xFD987193);
            this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 0xA679438E);
            this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 0x49B40821);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 0xF61E2562);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 0xC040B340);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 0x265E5A51);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 0xE9B6C7AA);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 0xD62F105D);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 0x2441453);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 0xD8A1E681);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 0xE7D3FBC8);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 0x21E1CDE6);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 0xC33707D6);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 0xF4D50D87);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 0x455A14ED);
            this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 0xA9E3E905);
            this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 0xFCEFA3F8);
            this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 0x676F02D9);
            this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 0x8D2A4C8A);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 0xFFFA3942);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 0x8771F681);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 0x6D9D6122);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 0xFDE5380C);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 0xA4BEEA44);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 0x4BDECFA9);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 0xF6BB4B60);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 0xBEBFBC70);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 0x289B7EC6);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 0xEAA127FA);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 0xD4EF3085);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 0x4881D05);
            this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 0xD9D4D039);
            this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 0xE6DB99E5);
            this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 0x1FA27CF8);
            this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 0xC4AC5665);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 0xF4292244);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 0x432AFF97);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 0xAB9423A7);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 0xFC93A039);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 0x655B59C3);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 0x8F0CCC92);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 0xFFEFF47D);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 0x85845DD1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 0x6FA87E4F);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 0xFE2CE6E0);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 0xA3014314);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 0x4E0811A1);
            this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 0xF7537E82);
            this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 0xBD3AF235);
            this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 0x2AD7D2BB);
            this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 0xEB86D391);
            this.a = this.AddUnsigned(this.a, this.AA);
            this.b = this.AddUnsigned(this.b, this.BB);
            this.c = this.AddUnsigned(this.c, this.CC);
            this.d = this.AddUnsigned(this.d, this.DD);
        }
        temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
        return temp.toLowerCase();
    };
    Md5.x = Array();
    Md5.S11 = 7;
    Md5.S12 = 12;
    Md5.S13 = 17;
    Md5.S14 = 22;
    Md5.S21 = 5;
    Md5.S22 = 9;
    Md5.S23 = 14;
    Md5.S24 = 20;
    Md5.S31 = 4;
    Md5.S32 = 11;
    Md5.S33 = 16;
    Md5.S34 = 23;
    Md5.S41 = 6;
    Md5.S42 = 10;
    Md5.S43 = 15;
    Md5.S44 = 21;
    Md5.RotateLeft = function (lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); };
    Md5.F = function (x, y, z) { return (x & y) | ((~x) & z); };
    Md5.G = function (x, y, z) { return (x & z) | (y & (~z)); };
    Md5.H = function (x, y, z) { return (x ^ y ^ z); };
    Md5.I = function (x, y, z) { return (y ^ (x | (~z))); };
    return Md5;
}());

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 271:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) /* global define */
  } else {}
}(this, function() {
  'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty
  var toString = Object.prototype.toString
  var hasSticky = typeof new RegExp().sticky === 'boolean'

  /***************************************************************************/

  function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
  function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

  function reEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  function reGroups(s) {
    var re = new RegExp('|' + s)
    return re.exec('').length - 1
  }
  function reCapture(s) {
    return '(' + s + ')'
  }
  function reUnion(regexps) {
    if (!regexps.length) return '(?!)'
    var source =  regexps.map(function(s) {
      return "(?:" + s + ")"
    }).join('|')
    return "(?:" + source + ")"
  }

  function regexpOrLiteral(obj) {
    if (typeof obj === 'string') {
      return '(?:' + reEscape(obj) + ')'

    } else if (isRegExp(obj)) {
      // TODO: consider /u support
      if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
      if (obj.global) throw new Error('RegExp /g flag is implied')
      if (obj.sticky) throw new Error('RegExp /y flag is implied')
      if (obj.multiline) throw new Error('RegExp /m flag is implied')
      return obj.source

    } else {
      throw new Error('Not a pattern: ' + obj)
    }
  }

  function objectToRules(object) {
    var keys = Object.getOwnPropertyNames(object)
    var result = []
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var thing = object[key]
      var rules = [].concat(thing)
      if (key === 'include') {
        for (var j = 0; j < rules.length; j++) {
          result.push({include: rules[j]})
        }
        continue
      }
      var match = []
      rules.forEach(function(rule) {
        if (isObject(rule)) {
          if (match.length) result.push(ruleOptions(key, match))
          result.push(ruleOptions(key, rule))
          match = []
        } else {
          match.push(rule)
        }
      })
      if (match.length) result.push(ruleOptions(key, match))
    }
    return result
  }

  function arrayToRules(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      var obj = array[i]
      if (obj.include) {
        var include = [].concat(obj.include)
        for (var j = 0; j < include.length; j++) {
          result.push({include: include[j]})
        }
        continue
      }
      if (!obj.type) {
        throw new Error('Rule has no type: ' + JSON.stringify(obj))
      }
      result.push(ruleOptions(obj.type, obj))
    }
    return result
  }

  function ruleOptions(type, obj) {
    if (!isObject(obj)) {
      obj = { match: obj }
    }
    if (obj.include) {
      throw new Error('Matching rules cannot also include states')
    }

    // nb. error and fallback imply lineBreaks
    var options = {
      defaultType: type,
      lineBreaks: !!obj.error || !!obj.fallback,
      pop: false,
      next: null,
      push: null,
      error: false,
      fallback: false,
      value: null,
      type: null,
      shouldThrow: false,
    }

    // Avoid Object.assign(), so we support IE9+
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        options[key] = obj[key]
      }
    }

    // type transform cannot be a string
    if (typeof options.type === 'string' && type !== options.type) {
      throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
    }

    // convert to array
    var match = options.match
    options.match = Array.isArray(match) ? match : match ? [match] : []
    options.match.sort(function(a, b) {
      return isRegExp(a) && isRegExp(b) ? 0
           : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
    })
    return options
  }

  function toRules(spec) {
    return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
  }

  var defaultErrorRule = ruleOptions('error', {lineBreaks: true, shouldThrow: true})
  function compileRules(rules, hasStates) {
    var errorRule = null
    var fast = Object.create(null)
    var fastAllowed = true
    var unicodeFlag = null
    var groups = []
    var parts = []

    // If there is a fallback rule, then disable fast matching
    for (var i = 0; i < rules.length; i++) {
      if (rules[i].fallback) {
        fastAllowed = false
      }
    }

    for (var i = 0; i < rules.length; i++) {
      var options = rules[i]

      if (options.include) {
        // all valid inclusions are removed by states() preprocessor
        throw new Error('Inheritance is not allowed in stateless lexers')
      }

      if (options.error || options.fallback) {
        // errorRule can only be set once
        if (errorRule) {
          if (!options.fallback === !errorRule.fallback) {
            throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
          } else {
            throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
          }
        }
        errorRule = options
      }

      var match = options.match.slice()
      if (fastAllowed) {
        while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
          var word = match.shift()
          fast[word.charCodeAt(0)] = options
        }
      }

      // Warn about inappropriate state-switching options
      if (options.pop || options.push || options.next) {
        if (!hasStates) {
          throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
        }
        if (options.fallback) {
          throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
        }
      }

      // Only rules with a .match are included in the RegExp
      if (match.length === 0) {
        continue
      }
      fastAllowed = false

      groups.push(options)

      // Check unicode flag is used everywhere or nowhere
      for (var j = 0; j < match.length; j++) {
        var obj = match[j]
        if (!isRegExp(obj)) {
          continue
        }

        if (unicodeFlag === null) {
          unicodeFlag = obj.unicode
        } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
          throw new Error('If one rule is /u then all must be')
        }
      }

      // convert to RegExp
      var pat = reUnion(match.map(regexpOrLiteral))

      // validate
      var regexp = new RegExp(pat)
      if (regexp.test("")) {
        throw new Error("RegExp matches empty string: " + regexp)
      }
      var groupCount = reGroups(pat)
      if (groupCount > 0) {
        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
      }

      // try and detect rules matching newlines
      if (!options.lineBreaks && regexp.test('\n')) {
        throw new Error('Rule should declare lineBreaks: ' + regexp)
      }

      // store regex
      parts.push(reCapture(pat))
    }


    // If there's no fallback rule, use the sticky flag so we only look for
    // matches at the current index.
    //
    // If we don't support the sticky flag, then fake it using an irrefutable
    // match (i.e. an empty pattern).
    var fallbackRule = errorRule && errorRule.fallback
    var flags = hasSticky && !fallbackRule ? 'ym' : 'gm'
    var suffix = hasSticky || fallbackRule ? '' : '|'

    if (unicodeFlag === true) flags += "u"
    var combined = new RegExp(reUnion(parts) + suffix, flags)
    return {regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule}
  }

  function compile(rules) {
    var result = compileRules(toRules(rules))
    return new Lexer({start: result}, 'start')
  }

  function checkStateGroup(g, name, map) {
    var state = g && (g.push || g.next)
    if (state && !map[state]) {
      throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
    }
    if (g && g.pop && +g.pop !== 1) {
      throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
    }
  }
  function compileStates(states, start) {
    var all = states.$all ? toRules(states.$all) : []
    delete states.$all

    var keys = Object.getOwnPropertyNames(states)
    if (!start) start = keys[0]

    var ruleMap = Object.create(null)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      ruleMap[key] = toRules(states[key]).concat(all)
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var rules = ruleMap[key]
      var included = Object.create(null)
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j]
        if (!rule.include) continue
        var splice = [j, 1]
        if (rule.include !== key && !included[rule.include]) {
          included[rule.include] = true
          var newRules = ruleMap[rule.include]
          if (!newRules) {
            throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
          }
          for (var k = 0; k < newRules.length; k++) {
            var newRule = newRules[k]
            if (rules.indexOf(newRule) !== -1) continue
            splice.push(newRule)
          }
        }
        rules.splice.apply(rules, splice)
        j--
      }
    }

    var map = Object.create(null)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      map[key] = compileRules(ruleMap[key], true)
    }

    for (var i = 0; i < keys.length; i++) {
      var name = keys[i]
      var state = map[name]
      var groups = state.groups
      for (var j = 0; j < groups.length; j++) {
        checkStateGroup(groups[j], name, map)
      }
      var fastKeys = Object.getOwnPropertyNames(state.fast)
      for (var j = 0; j < fastKeys.length; j++) {
        checkStateGroup(state.fast[fastKeys[j]], name, map)
      }
    }

    return new Lexer(map, start)
  }

  function keywordTransform(map) {
    var reverseMap = Object.create(null)
    var byLength = Object.create(null)
    var types = Object.getOwnPropertyNames(map)
    for (var i = 0; i < types.length; i++) {
      var tokenType = types[i]
      var item = map[tokenType]
      var keywordList = Array.isArray(item) ? item : [item]
      keywordList.forEach(function(keyword) {
        (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword)
        if (typeof keyword !== 'string') {
          throw new Error("keyword must be string (in keyword '" + tokenType + "')")
        }
        reverseMap[keyword] = tokenType
      })
    }

    // fast string lookup
    // https://jsperf.com/string-lookups
    function str(x) { return JSON.stringify(x) }
    var source = ''
    source += 'switch (value.length) {\n'
    for (var length in byLength) {
      var keywords = byLength[length]
      source += 'case ' + length + ':\n'
      source += 'switch (value) {\n'
      keywords.forEach(function(keyword) {
        var tokenType = reverseMap[keyword]
        source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n'
      })
      source += '}\n'
    }
    source += '}\n'
    return Function('value', source) // type
  }

  /***************************************************************************/

  var Lexer = function(states, state) {
    this.startState = state
    this.states = states
    this.buffer = ''
    this.stack = []
    this.reset()
  }

  Lexer.prototype.reset = function(data, info) {
    this.buffer = data || ''
    this.index = 0
    this.line = info ? info.line : 1
    this.col = info ? info.col : 1
    this.queuedToken = info ? info.queuedToken : null
    this.queuedThrow = info ? info.queuedThrow : null
    this.setState(info ? info.state : this.startState)
    this.stack = info && info.stack ? info.stack.slice() : []
    return this
  }

  Lexer.prototype.save = function() {
    return {
      line: this.line,
      col: this.col,
      state: this.state,
      stack: this.stack.slice(),
      queuedToken: this.queuedToken,
      queuedThrow: this.queuedThrow,
    }
  }

  Lexer.prototype.setState = function(state) {
    if (!state || this.state === state) return
    this.state = state
    var info = this.states[state]
    this.groups = info.groups
    this.error = info.error
    this.re = info.regexp
    this.fast = info.fast
  }

  Lexer.prototype.popState = function() {
    this.setState(this.stack.pop())
  }

  Lexer.prototype.pushState = function(state) {
    this.stack.push(this.state)
    this.setState(state)
  }

  var eat = hasSticky ? function(re, buffer) { // assume re is /y
    return re.exec(buffer)
  } : function(re, buffer) { // assume re is /g
    var match = re.exec(buffer)
    // will always match, since we used the |(?:) trick
    if (match[0].length === 0) {
      return null
    }
    return match
  }

  Lexer.prototype._getGroup = function(match) {
    var groupCount = this.groups.length
    for (var i = 0; i < groupCount; i++) {
      if (match[i + 1] !== undefined) {
        return this.groups[i]
      }
    }
    throw new Error('Cannot find token type for matched text')
  }

  function tokenToString() {
    return this.value
  }

  Lexer.prototype.next = function() {
    var index = this.index

    // If a fallback token matched, we don't need to re-run the RegExp
    if (this.queuedGroup) {
      var token = this._token(this.queuedGroup, this.queuedText, index)
      this.queuedGroup = null
      this.queuedText = ""
      return token
    }

    var buffer = this.buffer
    if (index === buffer.length) {
      return // EOF
    }

    // Fast matching for single characters
    var group = this.fast[buffer.charCodeAt(index)]
    if (group) {
      return this._token(group, buffer.charAt(index), index)
    }

    // Execute RegExp
    var re = this.re
    re.lastIndex = index
    var match = eat(re, buffer)

    // Error tokens match the remaining buffer
    var error = this.error
    if (match == null) {
      return this._token(error, buffer.slice(index, buffer.length), index)
    }

    var group = this._getGroup(match)
    var text = match[0]

    if (error.fallback && match.index !== index) {
      this.queuedGroup = group
      this.queuedText = text

      // Fallback tokens contain the unmatched portion of the buffer
      return this._token(error, buffer.slice(index, match.index), index)
    }

    return this._token(group, text, index)
  }

  Lexer.prototype._token = function(group, text, offset) {
    // count line breaks
    var lineBreaks = 0
    if (group.lineBreaks) {
      var matchNL = /\n/g
      var nl = 1
      if (text === '\n') {
        lineBreaks = 1
      } else {
        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex }
      }
    }

    var token = {
      type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
      value: typeof group.value === 'function' ? group.value(text) : text,
      text: text,
      toString: tokenToString,
      offset: offset,
      lineBreaks: lineBreaks,
      line: this.line,
      col: this.col,
    }
    // nb. adding more props to token object will make V8 sad!

    var size = text.length
    this.index += size
    this.line += lineBreaks
    if (lineBreaks !== 0) {
      this.col = size - nl + 1
    } else {
      this.col += size
    }

    // throw, if no rule with {error: true}
    if (group.shouldThrow) {
      throw new Error(this.formatError(token, "invalid syntax"))
    }

    if (group.pop) this.popState()
    else if (group.push) this.pushState(group.push)
    else if (group.next) this.setState(group.next)

    return token
  }

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    var LexerIterator = function(lexer) {
      this.lexer = lexer
    }

    LexerIterator.prototype.next = function() {
      var token = this.lexer.next()
      return {value: token, done: !token}
    }

    LexerIterator.prototype[Symbol.iterator] = function() {
      return this
    }

    Lexer.prototype[Symbol.iterator] = function() {
      return new LexerIterator(this)
    }
  }

  Lexer.prototype.formatError = function(token, message) {
    if (token == null) {
      // An undefined token indicates EOF
      var text = this.buffer.slice(this.index)
      var token = {
        text: text,
        offset: this.index,
        lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
        line: this.line,
        col: this.col,
      }
    }
    var start = Math.max(0, token.offset - token.col + 1)
    var eol = token.lineBreaks ? token.text.indexOf('\n') : token.text.length
    var firstLine = this.buffer.substring(start, token.offset + eol)
    message += " at line " + token.line + " col " + token.col + ":\n\n"
    message += "  " + firstLine + "\n"
    message += "  " + Array(token.col).join(" ") + "^"
    return message
  }

  Lexer.prototype.clone = function() {
    return new Lexer(this.states, this.state)
  }

  Lexer.prototype.has = function(tokenType) {
    return true
  }


  return {
    compile: compile,
    states: compileStates,
    error: Object.freeze({error: true}),
    fallback: Object.freeze({fallback: true}),
    keywords: keywordTransform,
  }

}));


/***/ }),

/***/ 558:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Generated automatically by nearley, version unknown
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = __webpack_require__(271);
const lexer = moo.compile({
  space: {match: /\s+/, lineBreaks: true},
  number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  comment: /#[^\n]*/,
  '[': '[',
  ']': ']',
  assignment: /=[^\n]*/,
  // Leading underscores are disallowed in field names, while constant names have no explicit restrictions.
  // So we are more lenient in lexing here, and the validation steps below are more strict.
  // See: https://github.com/ros/genmsg/blob/7d8b6ce6f43b6e39ea8261125d270f2d3062356f/src/genmsg/msg_loader.py#L188-L238
  fieldOrType: /[a-zA-Z_][a-zA-Z0-9_]*(?:\/[a-zA-Z][a-zA-Z0-9_]*)?/,
});


function extend(objs) {
  return objs.reduce((r, p) => ({ ...r, ...p }), {});
}
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "boolType", "arrayType", "__", "field", "_", "main$ebnf$1", "simple"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$2", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "bigintType", "arrayType", "__", "field", "_", "main$ebnf$2", "simple"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$3", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "numericType", "arrayType", "__", "field", "_", "main$ebnf$3", "simple"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$4", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "stringType", "arrayType", "__", "field", "_", "main$ebnf$4", "simple"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$5", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "timeType", "arrayType", "__", "field", "_", "main$ebnf$5", "simple"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$6", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "customType", "arrayType", "__", "field", "_", "main$ebnf$6", "complex"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$7", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$7", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "boolType", "__", "constantField", "_", "boolConstantValue", "_", "main$ebnf$7"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$8", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$8", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "bigintType", "__", "constantField", "_", "bigintConstantValue", "_", "main$ebnf$8"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$9", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$9", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "numericType", "__", "constantField", "_", "numericConstantValue", "_", "main$ebnf$9"], "postprocess": function(d) { return extend(d) }},
    {"name": "main$ebnf$10", "symbols": ["comment"], "postprocess": id},
    {"name": "main$ebnf$10", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["_", "stringType", "__", "constantField", "_", "stringConstantValue", "_", "main$ebnf$10"], "postprocess": function(d) { return extend(d) }},
    {"name": "main", "symbols": ["comment"], "postprocess": function(d) { return null }},
    {"name": "main", "symbols": ["blankLine"], "postprocess": function(d) { return null }},
    {"name": "boolType", "symbols": [{"literal":"bool"}], "postprocess": function(d) { return { type: d[0].value } }},
    {"name": "bigintType$subexpression$1", "symbols": [{"literal":"int64"}]},
    {"name": "bigintType$subexpression$1", "symbols": [{"literal":"uint64"}]},
    {"name": "bigintType", "symbols": ["bigintType$subexpression$1"], "postprocess": function(d) { return { type: d[0][0].value } }},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"byte"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"char"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"float32"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"float64"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"int8"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"uint8"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"int16"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"uint16"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"int32"}]},
    {"name": "numericType$subexpression$1", "symbols": [{"literal":"uint32"}]},
    {"name": "numericType", "symbols": ["numericType$subexpression$1"], "postprocess": function(d) { return { type: d[0][0].value } }},
    {"name": "stringType", "symbols": [{"literal":"string"}], "postprocess": function(d) { return { type: d[0].value } }},
    {"name": "timeType$subexpression$1", "symbols": [{"literal":"time"}]},
    {"name": "timeType$subexpression$1", "symbols": [{"literal":"duration"}]},
    {"name": "timeType", "symbols": ["timeType$subexpression$1"], "postprocess": function(d) { return { type: d[0][0].value } }},
    {"name": "customType", "symbols": [(lexer.has("fieldOrType") ? {type: "fieldOrType"} : fieldOrType)], "postprocess":  function(d, _, reject) {
          const PRIMITIVE_TYPES = ["bool", "byte", "char", "float32", "float64", "int8", "uint8", "int16", "uint16", "int32", "uint32", "int64", "uint64", "string", "time", "duration"];
          const type = d[0].value;
          if (PRIMITIVE_TYPES.includes(type)) return reject;
          return { type };
        } },
    {"name": "arrayType", "symbols": [{"literal":"["}, "_", {"literal":"]"}], "postprocess": function(d) { return { isArray: true } }},
    {"name": "arrayType", "symbols": [{"literal":"["}, "_", "number", "_", {"literal":"]"}], "postprocess": function(d) { return { isArray: true, arrayLength: d[2] } }},
    {"name": "arrayType", "symbols": ["_"], "postprocess": function(d) { return { isArray: false } }},
    {"name": "field", "symbols": [(lexer.has("fieldOrType") ? {type: "fieldOrType"} : fieldOrType)], "postprocess":  function(d, _, reject) {
          const name = d[0].value;
          // Leading underscores or digits are not allowed in field names
          if (name.match(/^[a-zA-Z][a-zA-Z0-9_]*$/) == undefined) return reject;
          return { name };
        } },
    {"name": "constantField", "symbols": [(lexer.has("fieldOrType") ? {type: "fieldOrType"} : fieldOrType)], "postprocess":  function(d, _, reject) {
          const name = d[0].value;
          // Leading digits are not allowed in constant names (the ROS genmsg parser
          // allows them, but loading the generated Python code fails later)
          if (name.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) == undefined) return reject;
          return { name, isConstant: true };
        } },
    {"name": "boolConstantValue", "symbols": ["assignment"], "postprocess":  function(d, _, reject) {
          const valueText = d[0].split("#")[0].trim();
          if (valueText === "True" || valueText === "1") return { value: true, valueText };
          if (valueText === "False" || valueText === "0") return { value: false, valueText };
          return reject;
        } },
    {"name": "numericConstantValue", "symbols": ["assignment"], "postprocess":  function(d, _, reject) {
          const valueText = d[0].split("#")[0].trim();
          const value = parseFloat(valueText);
          return !isNaN(value) ? { value, valueText } : reject;
        } },
    {"name": "bigintConstantValue", "symbols": ["assignment"], "postprocess":  function(d, _, reject) {
          const valueText = d[0].split("#")[0].trim();
          try {
            const value = BigInt(valueText);
            return { value, valueText };
          } catch {
            return reject;
          }
        } },
    {"name": "stringConstantValue", "symbols": ["assignment"], "postprocess": function(d) { return { value: d[0], valueText: d[0] } }},
    {"name": "bool$subexpression$1", "symbols": [{"literal":"True"}]},
    {"name": "bool$subexpression$1", "symbols": [{"literal":"1"}]},
    {"name": "bool", "symbols": ["bool$subexpression$1"], "postprocess": function(d) { return true }},
    {"name": "bool$subexpression$2", "symbols": [{"literal":"False"}]},
    {"name": "bool$subexpression$2", "symbols": [{"literal":"0"}]},
    {"name": "bool", "symbols": ["bool$subexpression$2"], "postprocess": function(d) { return false }},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": function(d) { return parseFloat(d[0].value) }},
    {"name": "assignment", "symbols": [(lexer.has("assignment") ? {type: "assignment"} : assignment)], "postprocess": function(d) { return d[0].value.substr(1).trim() }},
    {"name": "comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": function(d) { return null }},
    {"name": "blankLine", "symbols": ["_"], "postprocess": function(d) { return null }},
    {"name": "_$subexpression$1", "symbols": []},
    {"name": "_$subexpression$1", "symbols": [(lexer.has("space") ? {type: "space"} : space)]},
    {"name": "_", "symbols": ["_$subexpression$1"], "postprocess": function(d) { return null }},
    {"name": "__", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": function(d) { return null }},
    {"name": "simple", "symbols": [], "postprocess": function() { return { isComplex: false } }},
    {"name": "complex", "symbols": [], "postprocess": function() { return { isComplex: true } }}
]
  , ParserStart: "main"
}
if ( true&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();


/***/ }),

/***/ 654:
/***/ (function(module) {

(function(root, factory) {
    if ( true && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

    function Rule(name, symbols, postprocess) {
        this.id = ++Rule.highestId;
        this.name = name;
        this.symbols = symbols;        // a list of literal | regex class | nonterminal
        this.postprocess = postprocess;
        return this;
    }
    Rule.highestId = 0;

    Rule.prototype.toString = function(withCursorAt) {
        var symbolSequence = (typeof withCursorAt === "undefined")
                             ? this.symbols.map(getSymbolShortDisplay).join(' ')
                             : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                 + " ● "
                                 + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
        return this.name + " → " + symbolSequence;
    }


    // a State is a rule at a position from a given starting point in the input stream (reference)
    function State(rule, dot, reference, wantedBy) {
        this.rule = rule;
        this.dot = dot;
        this.reference = reference;
        this.data = [];
        this.wantedBy = wantedBy;
        this.isComplete = this.dot === rule.symbols.length;
    }

    State.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
    };

    State.prototype.nextState = function(child) {
        var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
        state.left = this;
        state.right = child;
        if (state.isComplete) {
            state.data = state.build();
            // Having right set here will prevent the right state and its children
            // form being garbage collected
            state.right = undefined;
        }
        return state;
    };

    State.prototype.build = function() {
        var children = [];
        var node = this;
        do {
            children.push(node.right.data);
            node = node.left;
        } while (node.left);
        children.reverse();
        return children;
    };

    State.prototype.finish = function() {
        if (this.rule.postprocess) {
            this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
        }
    };


    function Column(grammar, index) {
        this.grammar = grammar;
        this.index = index;
        this.states = [];
        this.wants = {}; // states indexed by the non-terminal they expect
        this.scannable = []; // list of states that expect a token
        this.completed = {}; // states that are nullable
    }


    Column.prototype.process = function(nextColumn) {
        var states = this.states;
        var wants = this.wants;
        var completed = this.completed;

        for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
            var state = states[w];

            if (state.isComplete) {
                state.finish();
                if (state.data !== Parser.fail) {
                    // complete
                    var wantedBy = state.wantedBy;
                    for (var i = wantedBy.length; i--; ) { // this line is hot
                        var left = wantedBy[i];
                        this.complete(left, state);
                    }

                    // special-case nullables
                    if (state.reference === this.index) {
                        // make sure future predictors of this rule get completed.
                        var exp = state.rule.name;
                        (this.completed[exp] = this.completed[exp] || []).push(state);
                    }
                }

            } else {
                // queue scannable states
                var exp = state.rule.symbols[state.dot];
                if (typeof exp !== 'string') {
                    this.scannable.push(state);
                    continue;
                }

                // predict
                if (wants[exp]) {
                    wants[exp].push(state);

                    if (completed.hasOwnProperty(exp)) {
                        var nulls = completed[exp];
                        for (var i = 0; i < nulls.length; i++) {
                            var right = nulls[i];
                            this.complete(state, right);
                        }
                    }
                } else {
                    wants[exp] = [state];
                    this.predict(exp);
                }
            }
        }
    }

    Column.prototype.predict = function(exp) {
        var rules = this.grammar.byName[exp] || [];

        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var wantedBy = this.wants[exp];
            var s = new State(r, 0, this.index, wantedBy);
            this.states.push(s);
        }
    }

    Column.prototype.complete = function(left, right) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }


    function Grammar(rules, start) {
        this.rules = rules;
        this.start = start || this.rules[0].name;
        var byName = this.byName = {};
        this.rules.forEach(function(rule) {
            if (!byName.hasOwnProperty(rule.name)) {
                byName[rule.name] = [];
            }
            byName[rule.name].push(rule);
        });
    }

    // So we can allow passing (rules, start) directly to Parser for backwards compatibility
    Grammar.fromCompiled = function(rules, start) {
        var lexer = rules.Lexer;
        if (rules.ParserStart) {
          start = rules.ParserStart;
          rules = rules.ParserRules;
        }
        var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
        var g = new Grammar(rules, start);
        g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
        return g;
    }


    function StreamLexer() {
      this.reset("");
    }

    StreamLexer.prototype.reset = function(data, state) {
        this.buffer = data;
        this.index = 0;
        this.line = state ? state.line : 1;
        this.lastLineBreak = state ? -state.col : 0;
    }

    StreamLexer.prototype.next = function() {
        if (this.index < this.buffer.length) {
            var ch = this.buffer[this.index++];
            if (ch === '\n') {
              this.line += 1;
              this.lastLineBreak = this.index;
            }
            return {value: ch};
        }
    }

    StreamLexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.index - this.lastLineBreak,
      }
    }

    StreamLexer.prototype.formatError = function(token, message) {
        // nb. this gets called after consuming the offending token,
        // so the culprit is index-1
        var buffer = this.buffer;
        if (typeof buffer === 'string') {
            var lines = buffer
                .split("\n")
                .slice(
                    Math.max(0, this.line - 5), 
                    this.line
                );

            var nextLineBreak = buffer.indexOf('\n', this.index);
            if (nextLineBreak === -1) nextLineBreak = buffer.length;
            var col = this.index - this.lastLineBreak;
            var lastLineDigits = String(this.line).length;
            message += " at line " + this.line + " col " + col + ":\n\n";
            message += lines
                .map(function(line, i) {
                    return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                }, this)
                .join("\n");
            message += "\n" + pad("", lastLineDigits + col) + "^\n";
            return message;
        } else {
            return message + " at index " + (this.index - 1);
        }

        function pad(n, length) {
            var s = String(n);
            return Array(length - s.length + 1).join(" ") + s;
        }
    }

    function Parser(rules, start, options) {
        if (rules instanceof Grammar) {
            var grammar = rules;
            var options = start;
        } else {
            var grammar = Grammar.fromCompiled(rules, start);
        }
        this.grammar = grammar;

        // Read options
        this.options = {
            keepHistory: false,
            lexer: grammar.lexer || new StreamLexer,
        };
        for (var key in (options || {})) {
            this.options[key] = options[key];
        }

        // Setup lexer
        this.lexer = this.options.lexer;
        this.lexerState = undefined;

        // Setup a table
        var column = new Column(grammar, 0);
        var table = this.table = [column];

        // I could be expecting anything.
        column.wants[grammar.start] = [];
        column.predict(grammar.start);
        // TODO what if start rule is nullable?
        column.process();
        this.current = 0; // token index
    }

    // create a reserved token for indicating a parse fail
    Parser.fail = {};

    Parser.prototype.feed = function(chunk) {
        var lexer = this.lexer;
        lexer.reset(chunk, this.lexerState);

        var token;
        while (true) {
            try {
                token = lexer.next();
                if (!token) {
                    break;
                }
            } catch (e) {
                // Create the next column so that the error reporter
                // can display the correctly predicted states.
                var nextColumn = new Column(this.grammar, this.current + 1);
                this.table.push(nextColumn);
                var err = new Error(this.reportLexerError(e));
                err.offset = this.current;
                err.token = e.token;
                throw err;
            }
            // We add new states to table[current+1]
            var column = this.table[this.current];

            // GC unused states
            if (!this.options.keepHistory) {
                delete this.table[this.current - 1];
            }

            var n = this.current + 1;
            var nextColumn = new Column(this.grammar, n);
            this.table.push(nextColumn);

            // Advance all tokens that expect the symbol
            var literal = token.text !== undefined ? token.text : token.value;
            var value = lexer.constructor === StreamLexer ? token.value : token;
            var scannable = column.scannable;
            for (var w = scannable.length; w--; ) {
                var state = scannable[w];
                var expect = state.rule.symbols[state.dot];
                // Try to consume the token
                // either regex or literal
                if (expect.test ? expect.test(value) :
                    expect.type ? expect.type === token.type
                                : expect.literal === literal) {
                    // Add it
                    var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                    nextColumn.states.push(next);
                }
            }

            // Next, for each of the rules, we either
            // (a) complete it, and try to see if the reference row expected that
            //     rule
            // (b) predict the next nonterminal it expects by adding that
            //     nonterminal's start state
            // To prevent duplication, we also keep track of rules we have already
            // added

            nextColumn.process();

            // If needed, throw an error:
            if (nextColumn.states.length === 0) {
                // No states at all! This is not good.
                var err = new Error(this.reportError(token));
                err.offset = this.current;
                err.token = token;
                throw err;
            }

            // maybe save lexer state
            if (this.options.keepHistory) {
              column.lexerState = lexer.save()
            }

            this.current++;
        }
        if (column) {
          this.lexerState = lexer.save()
        }

        // Incrementally keep track of results
        this.results = this.finish();

        // Allow chaining, for whatever it's worth
        return this;
    };

    Parser.prototype.reportLexerError = function(lexerError) {
        var tokenDisplay, lexerMessage;
        // Planning to add a token property to moo's thrown error
        // even on erroring tokens to be used in error display below
        var token = lexerError.token;
        if (token) {
            tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
            lexerMessage = this.lexer.formatError(token, "Syntax error");
        } else {
            tokenDisplay = "input (lexer error)";
            lexerMessage = lexerError.message;
        }
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportError = function(token) {
        var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
        var lexerMessage = this.lexer.formatError(token, "Syntax error");
        return this.reportErrorCommon(lexerMessage, tokenDisplay);
    };

    Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
        var lines = [];
        lines.push(lexerMessage);
        var lastColumnIndex = this.table.length - 2;
        var lastColumn = this.table[lastColumnIndex];
        var expectantStates = lastColumn.states
            .filter(function(state) {
                var nextSymbol = state.rule.symbols[state.dot];
                return nextSymbol && typeof nextSymbol !== "string";
            });

        if (expectantStates.length === 0) {
            lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
            this.displayStateStack(lastColumn.states, lines);
        } else {
            lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
            // Display a "state stack" for each expectant state
            // - which shows you how this state came to be, step by step.
            // If there is more than one derivation, we only display the first one.
            var stateStacks = expectantStates
                .map(function(state) {
                    return this.buildFirstStateStack(state, []) || [state];
                }, this);
            // Display each state that is expecting a terminal symbol next.
            stateStacks.forEach(function(stateStack) {
                var state = stateStack[0];
                var nextSymbol = state.rule.symbols[state.dot];
                var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                lines.push('A ' + symbolDisplay + ' based on:');
                this.displayStateStack(stateStack, lines);
            }, this);
        }
        lines.push("");
        return lines.join("\n");
    }
    
    Parser.prototype.displayStateStack = function(stateStack, lines) {
        var lastDisplay;
        var sameDisplayCount = 0;
        for (var j = 0; j < stateStack.length; j++) {
            var state = stateStack[j];
            var display = state.rule.toString(state.dot);
            if (display === lastDisplay) {
                sameDisplayCount++;
            } else {
                if (sameDisplayCount > 0) {
                    lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                }
                sameDisplayCount = 0;
                lines.push('    ' + display);
            }
            lastDisplay = display;
        }
    };

    Parser.prototype.getSymbolDisplay = function(symbol) {
        return getSymbolLongDisplay(symbol);
    };

    /*
    Builds a the first state stack. You can think of a state stack as the call stack
    of the recursive-descent parser which the Nearley parse algorithm simulates.
    A state stack is represented as an array of state objects. Within a
    state stack, the first item of the array will be the starting
    state, with each successive item in the array going further back into history.

    This function needs to be given a starting state and an empty array representing
    the visited states, and it returns an single state stack.

    */
    Parser.prototype.buildFirstStateStack = function(state, visited) {
        if (visited.indexOf(state) !== -1) {
            // Found cycle, return null
            // to eliminate this path from the results, because
            // we don't know how to display it meaningfully
            return null;
        }
        if (state.wantedBy.length === 0) {
            return [state];
        }
        var prevState = state.wantedBy[0];
        var childVisited = [state].concat(visited);
        var childResult = this.buildFirstStateStack(prevState, childVisited);
        if (childResult === null) {
            return null;
        }
        return [state].concat(childResult);
    };

    Parser.prototype.save = function() {
        var column = this.table[this.current];
        column.lexerState = this.lexerState;
        return column;
    };

    Parser.prototype.restore = function(column) {
        var index = column.index;
        this.current = index;
        this.table[index] = column;
        this.table.splice(index + 1);
        this.lexerState = column.lexerState;

        // Incrementally keep track of results
        this.results = this.finish();
    };

    // nb. deprecated: use save/restore instead!
    Parser.prototype.rewind = function(index) {
        if (!this.options.keepHistory) {
            throw new Error('set option `keepHistory` to enable rewinding')
        }
        // nb. recall column (table) indicies fall between token indicies.
        //        col 0   --   token 0   --   col 1
        this.restore(this.table[index]);
    };

    Parser.prototype.finish = function() {
        // Return the possible parsings
        var considerations = [];
        var start = this.grammar.start;
        var column = this.table[this.table.length - 1]
        column.states.forEach(function (t) {
            if (t.rule.name === start
                    && t.dot === t.rule.symbols.length
                    && t.reference === 0
                    && t.data !== Parser.fail) {
                considerations.push(t);
            }
        });
        return considerations.map(function(c) {return c.data; });
    };

    function getSymbolLongDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return 'character matching ' + symbol;
            } else if (symbol.type) {
                return symbol.type + ' token';
            } else if (symbol.test) {
                return 'token matching ' + String(symbol.test);
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    function getSymbolShortDisplay(symbol) {
        var type = typeof symbol;
        if (type === "string") {
            return symbol;
        } else if (type === "object") {
            if (symbol.literal) {
                return JSON.stringify(symbol.literal);
            } else if (symbol instanceof RegExp) {
                return symbol.toString();
            } else if (symbol.type) {
                return '%' + symbol.type;
            } else if (symbol.test) {
                return '<' + String(symbol.test) + '>';
            } else {
                throw new Error('Unknown symbol type: ' + symbol);
            }
        }
    }

    return {
        Parser: Parser,
        Grammar: Grammar,
        Rule: Rule,
    };

}));


/***/ }),

/***/ 515:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildRos2Type = void 0;
/**
 * Parser for ROS 2 type definition lines.
 * Reference implementation: https://github.com/ros2/rosidl/blob/master/rosidl_parser/rosidl_parser/parser.py
 */
const TYPE = String.raw `(?<type>[a-zA-Z0-9_/]+)`;
const STRING_BOUND = String.raw `(?:<=(?<stringBound>\d+))`;
const ARRAY_BOUND = String.raw `(?:(?<unboundedArray>\[\])|\[(?<arrayLength>\d+)\]|\[<=(?<arrayBound>\d+)\])`;
const NAME = String.raw `(?<name>[a-zA-Z0-9_]+)`;
const QUOTED_STRING = String.raw `'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`;
const COMMENT_TERMINATED_LITERAL = String.raw `(?:${QUOTED_STRING}|(?:\\.|[^\s'"#\\])(?:\\.|[^#\\])*)`;
const ARRAY_TERMINATED_LITERAL = String.raw `(?:${QUOTED_STRING}|(?:\\.|[^\s'"\],#\\])(?:\\.|[^\],#\\])*)`;
const CONSTANT_ASSIGNMENT = String.raw `\s*=\s*(?<constantValue>${COMMENT_TERMINATED_LITERAL}?)`;
const DEFAULT_VALUE_ARRAY = String.raw `\[(?:${ARRAY_TERMINATED_LITERAL},)*${ARRAY_TERMINATED_LITERAL}?\]`;
const DEFAULT_VALUE = String.raw `(?<defaultValue>${DEFAULT_VALUE_ARRAY}|${COMMENT_TERMINATED_LITERAL})`;
const COMMENT = String.raw `(?:#.*)`;
const DEFINITION_LINE_REGEX = new RegExp(String.raw `^${TYPE}${STRING_BOUND}?${ARRAY_BOUND}?\s+${NAME}(?:${CONSTANT_ASSIGNMENT}|\s+${DEFAULT_VALUE})?\s*${COMMENT}?$`);
const STRING_ESCAPES = String.raw `\\(?<char>['"abfnrtv\\])|\\(?<oct>[0-7]{1,3})|\\x(?<hex2>[a-fA-F0-9]{2})|\\u(?<hex4>[a-fA-F0-9]{4})|\\U(?<hex8>[a-fA-F0-9]{8})`;
const BUILTIN_TYPES = [
    "bool",
    "byte",
    "char",
    "float32",
    "float64",
    "int8",
    "uint8",
    "int16",
    "uint16",
    "int32",
    "uint32",
    "int64",
    "uint64",
    "string",
    "wstring",
    "time",
    "duration",
    "builtin_interfaces/Time",
    "builtin_interfaces/Duration",
    "builtin_interfaces/msg/Time",
    "builtin_interfaces/msg/Duration",
];
function parseBigIntLiteral(str, min, max) {
    const value = BigInt(str);
    if (value < min || value > max) {
        throw new Error(`Number ${str} out of range [${min}, ${max}]`);
    }
    return value;
}
function parseNumberLiteral(str, min, max) {
    const value = parseInt(str);
    if (Number.isNaN(value)) {
        throw new Error(`Invalid numeric literal: ${str}`);
    }
    if (value < min || value > max) {
        throw new Error(`Number ${str} out of range [${min}, ${max}]`);
    }
    return value;
}
const LITERAL_REGEX = new RegExp(ARRAY_TERMINATED_LITERAL, "y");
const COMMA_OR_END_REGEX = /\s*(,)\s*|\s*$/y;
function parseArrayLiteral(type, rawStr) {
    if (!rawStr.startsWith("[") || !rawStr.endsWith("]")) {
        throw new Error("Array must start with [ and end with ]");
    }
    const str = rawStr.substring(1, rawStr.length - 1);
    if (type === "string" || type === "wstring") {
        const results = [];
        let offset = 0;
        while (offset < str.length) {
            if (str[offset] === ",") {
                throw new Error("Expected array element before comma");
            }
            LITERAL_REGEX.lastIndex = offset;
            let match = LITERAL_REGEX.exec(str);
            if (match) {
                results.push(parseStringLiteral(match[0]));
                offset = LITERAL_REGEX.lastIndex;
            }
            COMMA_OR_END_REGEX.lastIndex = offset;
            match = COMMA_OR_END_REGEX.exec(str);
            if (!match) {
                throw new Error("Expected comma or end of array");
            }
            if (!match[1]) {
                break;
            }
            offset = COMMA_OR_END_REGEX.lastIndex;
        }
        return results;
    }
    return str.split(",").map((part) => parsePrimitiveLiteral(type, part.trim()));
}
function parseStringLiteral(maybeQuotedStr) {
    let quoteThatMustBeEscaped = "";
    let str = maybeQuotedStr;
    for (const quote of ["'", '"']) {
        if (maybeQuotedStr.startsWith(quote)) {
            if (!maybeQuotedStr.endsWith(quote)) {
                throw new Error(`Expected terminating ${quote} in string literal: ${maybeQuotedStr}`);
            }
            quoteThatMustBeEscaped = quote;
            str = maybeQuotedStr.substring(quote.length, maybeQuotedStr.length - quote.length);
            break;
        }
    }
    if (!new RegExp(String.raw `^(?:[^\\${quoteThatMustBeEscaped}]|${STRING_ESCAPES})*$`).test(str) ==
        undefined) {
        throw new Error(`Invalid string literal: ${str}`);
    }
    return str.replace(new RegExp(STRING_ESCAPES, "g"), (...args) => {
        const { char, oct, hex2, hex4, hex8 } = args[args.length - 1];
        const hex = hex2 ?? hex4 ?? hex8;
        if (char != undefined) {
            return {
                "'": "'",
                '"': '"',
                a: "\x07",
                b: "\b",
                f: "\f",
                n: "\n",
                r: "\r",
                t: "\t",
                v: "\v",
                "\\": "\\",
            }[char];
        }
        else if (oct != undefined) {
            return String.fromCodePoint(parseInt(oct, 8));
        }
        else if (hex != undefined) {
            return String.fromCodePoint(parseInt(hex, 16));
        }
        else {
            throw new Error("Expected exactly one matched group");
        }
    });
}
function parsePrimitiveLiteral(type, str) {
    switch (type) {
        case "bool":
            if (["true", "True", "1"].includes(str)) {
                return true;
            }
            else if (["false", "False", "0"].includes(str)) {
                return false;
            }
            break;
        case "float32":
        case "float64": {
            const value = parseFloat(str);
            if (!Number.isNaN(value)) {
                return value;
            }
            break;
        }
        case "int8":
            return parseNumberLiteral(str, ~0x7f, 0x7f);
        case "uint8":
            return parseNumberLiteral(str, 0, 0xff);
        case "int16":
            return parseNumberLiteral(str, ~0x7fff, 0x7fff);
        case "uint16":
            return parseNumberLiteral(str, 0, 0xffff);
        case "int32":
            return parseNumberLiteral(str, ~0x7fffffff, 0x7fffffff);
        case "uint32":
            return parseNumberLiteral(str, 0, 0xffffffff);
        case "int64":
            return parseBigIntLiteral(str, ~0x7fffffffffffffffn, 0x7fffffffffffffffn);
        case "uint64":
            return parseBigIntLiteral(str, 0n, 0xffffffffffffffffn);
        case "string":
        case "wstring":
            return parseStringLiteral(str);
    }
    throw new Error(`Invalid literal of type ${type}: ${str}`);
}
function normalizeType(type) {
    switch (type) {
        case "char":
            return "uint8";
        case "byte":
            return "int8";
        case "builtin_interfaces/Time":
        case "builtin_interfaces/msg/Time":
            return "time";
        case "builtin_interfaces/Duration":
        case "builtin_interfaces/msg/Duration":
            return "duration";
    }
    return type;
}
function buildRos2Type(lines) {
    const definitions = [];
    let complexTypeName;
    for (const { line } of lines) {
        let match;
        if (line.startsWith("#")) {
            continue;
        }
        else if ((match = /^MSG: ([^ ]+)\s*(?:#.+)?$/.exec(line))) {
            complexTypeName = match[1];
            continue;
        }
        else if ((match = DEFINITION_LINE_REGEX.exec(line))) {
            const { type: rawType, stringBound, unboundedArray, arrayLength, arrayBound, name, constantValue, defaultValue, } = match.groups;
            const type = normalizeType(rawType);
            if (stringBound != undefined && type !== "string" && type !== "wstring") {
                throw new Error(`Invalid string bound for type ${type}`);
            }
            if (constantValue != undefined) {
                if (!/^[A-Z](?:_?[A-Z0-9]+)*$/.test(name)) {
                    throw new Error(`Invalid constant name: ${name}`);
                }
            }
            else {
                if (!/^[a-z](?:_?[a-z0-9]+)*$/.test(name)) {
                    throw new Error(`Invalid field name: ${name}`);
                }
            }
            const isComplex = !BUILTIN_TYPES.includes(type);
            const isArray = unboundedArray != undefined || arrayLength != undefined || arrayBound != undefined;
            definitions.push({
                name: name,
                type,
                isComplex: constantValue != undefined ? isComplex || undefined : isComplex,
                isConstant: constantValue != undefined || undefined,
                isArray: constantValue != undefined ? isArray || undefined : isArray,
                arrayLength: arrayLength != undefined ? parseInt(arrayLength) : undefined,
                arrayUpperBound: arrayBound != undefined ? parseInt(arrayBound) : undefined,
                upperBound: stringBound != undefined ? parseInt(stringBound) : undefined,
                defaultValue: defaultValue != undefined
                    ? isArray
                        ? parseArrayLiteral(type, defaultValue.trim())
                        : parsePrimitiveLiteral(type, defaultValue.trim())
                    : undefined,
                value: constantValue != undefined
                    ? parsePrimitiveLiteral(type, constantValue.trim())
                    : undefined,
                valueText: constantValue?.trim(),
            });
        }
        else {
            throw new Error(`Could not parse line: '${line}'`);
        }
    }
    return { name: complexTypeName, definitions };
}
exports.buildRos2Type = buildRos2Type;


/***/ }),

/***/ 715:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/// <reference types="./extensions" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(322), exports);
__exportStar(__webpack_require__(867), exports);
__exportStar(__webpack_require__(210), exports);
__exportStar(__webpack_require__(862), exports);


/***/ }),

/***/ 322:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.md5 = void 0;
const md5_typescript_1 = __webpack_require__(417);
const BUILTIN_TYPES = new Set([
    "int8",
    "uint8",
    "int16",
    "uint16",
    "int32",
    "uint32",
    "int64",
    "uint64",
    "float32",
    "float64",
    "string",
    "bool",
    "char",
    "byte",
    "time",
    "duration",
]);
/**
 * Converts a ROS 1 message definition (http://wiki.ros.org/msg) into an md5 checksum using the same
 * approach as `gendeps --md5` from ROS 1.
 * @param msgDefs The ROS message definition to generate a checksum for, and all dependent
 * sub-messages
 * @returns An md5 checksum string
 */
function md5(msgDefs) {
    if (msgDefs.length === 0) {
        throw new Error(`Cannot produce md5sum for empty msgDefs`);
    }
    const subMsgDefs = new Map();
    for (const msgDef of msgDefs) {
        if (msgDef.name != undefined) {
            subMsgDefs.set(msgDef.name, msgDef);
        }
    }
    const first = msgDefs[0];
    return computeMessageMd5(first, subMsgDefs);
}
exports.md5 = md5;
function computeMessageMd5(msgDef, subMsgDefs) {
    let output = "";
    const constants = msgDef.definitions.filter(({ isConstant }) => isConstant);
    const variables = msgDef.definitions.filter(({ isConstant }) => isConstant == undefined || !isConstant);
    for (const def of constants) {
        output += `${def.type} ${def.name}=${def.valueText ?? String(def.value)}\n`;
    }
    for (const def of variables) {
        if (isBuiltin(def.type)) {
            const arrayLength = def.arrayLength != undefined ? String(def.arrayLength) : "";
            const array = def.isArray === true ? `[${arrayLength}]` : "";
            output += `${def.type}${array} ${def.name}\n`;
        }
        else {
            const subMsgDef = subMsgDefs.get(def.type);
            if (subMsgDef == undefined) {
                throw new Error(`Missing definition for submessage type "${def.type}"`);
            }
            const subMd5 = computeMessageMd5(subMsgDef, subMsgDefs);
            output += `${subMd5} ${def.name}\n`;
        }
    }
    output = output.trimEnd();
    return md5_typescript_1.Md5.init(output);
}
function isBuiltin(typeName) {
    return BUILTIN_TYPES.has(typeName);
}


/***/ }),

/***/ 867:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parse = void 0;
const nearley_1 = __webpack_require__(654);
const buildRos2Type_1 = __webpack_require__(515);
const ros1_ne_1 = __importDefault(__webpack_require__(558));
const ROS1_GRAMMAR = nearley_1.Grammar.fromCompiled(ros1_ne_1.default);
// Given a raw message definition string, parse it into an object representation.
// Example return value:
// [{
//   name: undefined,
//   definitions: [
//     {
//       arrayLength: undefined,
//       isArray: false,
//       isComplex: false,
//       name: "name",
//       type: "string",
//       defaultValue: undefined
//     }, ...
//   ],
// }, ... ]
//
// See unit tests for more examples.
function parse(messageDefinition, options = {}) {
    // read all the lines and remove empties
    const allLines = messageDefinition
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);
    let definitionLines = [];
    const types = [];
    // group lines into individual definitions
    allLines.forEach((line) => {
        // ignore comment lines
        if (line.startsWith("#")) {
            return;
        }
        // definitions are split by equal signs
        if (line.startsWith("==")) {
            types.push(options.ros2 === true
                ? buildRos2Type_1.buildRos2Type(definitionLines)
                : buildType(definitionLines, ROS1_GRAMMAR));
            definitionLines = [];
        }
        else {
            definitionLines.push({ line });
        }
    });
    types.push(options.ros2 === true
        ? buildRos2Type_1.buildRos2Type(definitionLines)
        : buildType(definitionLines, ROS1_GRAMMAR));
    // Fix up complex type names
    types.forEach(({ definitions }) => {
        definitions.forEach((definition) => {
            if (definition.isComplex === true) {
                const foundName = findTypeByName(types, definition.type).name;
                if (foundName == undefined) {
                    throw new Error(`Missing type definition for ${definition.type}`);
                }
                definition.type = foundName;
            }
        });
    });
    return types;
}
exports.parse = parse;
function buildType(lines, grammar) {
    const definitions = [];
    let complexTypeName;
    lines.forEach(({ line }) => {
        if (line.startsWith("MSG:")) {
            const [_, name] = simpleTokenization(line);
            complexTypeName = name?.trim();
            return;
        }
        const parser = new nearley_1.Parser(grammar);
        parser.feed(line);
        const results = parser.finish();
        if (results.length === 0) {
            throw new Error(`Could not parse line: '${line}'`);
        }
        else if (results.length > 1) {
            throw new Error(`Ambiguous line: '${line}'`);
        }
        const result = results[0];
        if (result != undefined) {
            result.type = normalizeType(result.type);
            definitions.push(result);
        }
    });
    return { name: complexTypeName, definitions };
}
function simpleTokenization(line) {
    return line
        .replace(/#.*/gi, "")
        .split(" ")
        .filter((word) => word);
}
function findTypeByName(types, name) {
    const matches = types.filter((type) => {
        const typeName = type.name ?? "";
        // if the search is empty, return unnamed types
        if (name.length === 0) {
            return typeName.length === 0;
        }
        // return if the search is in the type name
        // or matches exactly if a fully-qualified name match is passed to us
        const nameEnd = name.includes("/") ? name : `/${name}`;
        return typeName.endsWith(nameEnd);
    });
    if (matches[0] == undefined) {
        throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
    }
    return matches[0];
}
function normalizeType(type) {
    // Normalize deprecated aliases
    if (type === "char") {
        return "uint8";
    }
    else if (type === "byte") {
        return "int8";
    }
    return type;
}


/***/ }),

/***/ 210:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringify = void 0;
// Converts a ROS message definition (http://wiki.ros.org/msg) into a canonical
// message description format that is suitable for MD5 checksum generation
function stringify(msgDefs) {
    let output = "";
    for (let i = 0; i < msgDefs.length; i++) {
        const msgDef = msgDefs[i];
        const constants = msgDef.definitions.filter(({ isConstant }) => isConstant);
        const variables = msgDef.definitions.filter(({ isConstant }) => isConstant == undefined || !isConstant);
        if (i > 0) {
            output +=
                "\n================================================================================\n";
            output += `MSG: ${msgDef.name ?? ""}\n`;
        }
        for (const def of constants) {
            output += `${def.type} ${def.name} = ${def.valueText ?? String(def.value)}\n`;
        }
        if (variables.length > 0) {
            if (output.length > 0) {
                output += "\n";
            }
            for (const def of variables) {
                const upperBound = def.upperBound != undefined ? `<=${def.upperBound}` : "";
                const arrayLength = def.arrayLength != undefined
                    ? String(def.arrayLength)
                    : def.arrayUpperBound != undefined
                        ? `<=${def.arrayUpperBound}`
                        : "";
                const array = def.isArray === true ? `[${arrayLength}]` : "";
                const defaultValue = def.defaultValue != undefined ? ` ${stringifyDefaultValue(def.defaultValue)}` : "";
                output += `${def.type}${upperBound}${array} ${def.name}${defaultValue}\n`;
            }
        }
    }
    return output.trimEnd();
}
exports.stringify = stringify;
function stringifyDefaultValue(value) {
    if (Array.isArray(value)) {
        return `[${value
            .map((x) => (typeof x === "bigint" ? x.toString() : JSON.stringify(x)))
            .join(", ")}]`;
    }
    return typeof value === "bigint" ? value.toString() : JSON.stringify(value);
}


/***/ }),

/***/ 862:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// This file incorporates work covered by the following copyright and
// permission notice:
//
//   Copyright 2018-2021 Cruise LLC
//
//   This source code is licensed under the Apache License, Version 2.0,
//   found at http://www.apache.org/licenses/LICENSE-2.0
//   You may not use this file except in compliance with the License.
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(715);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
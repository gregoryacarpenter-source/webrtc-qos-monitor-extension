(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e3) {
      throw mod = 0, e3;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i3 = 0, l = handlers.length, ee = new Array(l); i3 < l; i3++) {
          ee[i3] = handlers[i3].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a22, a32, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i3;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a22), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a22, a32), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a22, a32, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a22, a32, a4, a5), true;
          }
          for (i3 = 1, args = new Array(len - 1); i3 < len; i3++) {
            args[i3 - 1] = arguments[i3];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i3 = 0; i3 < length; i3++) {
            if (listeners[i3].once) this.removeListener(event, listeners[i3].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i3].fn.call(listeners[i3].context);
                break;
              case 2:
                listeners[i3].fn.call(listeners[i3].context, a1);
                break;
              case 3:
                listeners[i3].fn.call(listeners[i3].context, a1, a22);
                break;
              case 4:
                listeners[i3].fn.call(listeners[i3].context, a1, a22, a32);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i3].fn.apply(listeners[i3].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i3 = 0, events = [], length = listeners.length; i3 < length; i3++) {
            if (listeners[i3].fn !== fn || once && !listeners[i3].once || context && listeners[i3].context !== context) {
              events.push(listeners[i3]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // node_modules/ua-parser-js/src/ua-parser.js
  var require_ua_parser = __commonJS({
    "node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
      (function(window2, undefined2) {
        "use strict";
        var LIBVERSION = "1.0.41", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 500;
        var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HONOR = "Honor", HUAWEI = "Huawei", LENOVO = "Lenovo", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", NVIDIA = "Nvidia", ONEPLUS = "OnePlus", OPERA = "Opera", OPPO = "OPPO", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS", SUFFIX_BROWSER = " Browser";
        var extend = function(regexes2, extensions) {
          var mergedRegexes = {};
          for (var i3 in regexes2) {
            if (extensions[i3] && extensions[i3].length % 2 === 0) {
              mergedRegexes[i3] = extensions[i3].concat(regexes2[i3]);
            } else {
              mergedRegexes[i3] = regexes2[i3];
            }
          }
          return mergedRegexes;
        }, enumerize = function(arr) {
          var enums = {};
          for (var i3 = 0; i3 < arr.length; i3++) {
            enums[arr[i3].toUpperCase()] = arr[i3];
          }
          return enums;
        }, has = function(str1, str2) {
          return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        }, lowerize = function(str) {
          return str.toLowerCase();
        }, majorize = function(version) {
          return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
        }, trim = function(str, len) {
          if (typeof str === STR_TYPE) {
            str = str.replace(/^\s\s*/, EMPTY);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
          }
        };
        var rgxMapper = function(ua, arrays) {
          var i3 = 0, j, k2, p, q, matches, match;
          while (i3 < arrays.length && !matches) {
            var regex = arrays[i3], props = arrays[i3 + 1];
            j = k2 = 0;
            while (j < regex.length && !matches) {
              if (!regex[j]) {
                break;
              }
              matches = regex[j++].exec(ua);
              if (!!matches) {
                for (p = 0; p < props.length; p++) {
                  match = matches[++k2];
                  q = props[p];
                  if (typeof q === OBJ_TYPE && q.length > 0) {
                    if (q.length === 2) {
                      if (typeof q[1] == FUNC_TYPE) {
                        this[q[0]] = q[1].call(this, match);
                      } else {
                        this[q[0]] = q[1];
                      }
                    } else if (q.length === 3) {
                      if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                      } else {
                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                      }
                    } else if (q.length === 4) {
                      this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                    }
                  } else {
                    this[q] = match ? match : undefined2;
                  }
                }
              }
            }
            i3 += 2;
          }
        }, strMapper = function(str, map) {
          for (var i3 in map) {
            if (typeof map[i3] === OBJ_TYPE && map[i3].length > 0) {
              for (var j = 0; j < map[i3].length; j++) {
                if (has(map[i3][j], str)) {
                  return i3 === UNKNOWN ? undefined2 : i3;
                }
              }
            } else if (has(map[i3], str)) {
              return i3 === UNKNOWN ? undefined2 : i3;
            }
          }
          return map.hasOwnProperty("*") ? map["*"] : str;
        };
        var oldSafariMap = {
          "1.0": "/8",
          "1.2": "/1",
          "1.3": "/3",
          "2.0": "/412",
          "2.0.2": "/416",
          "2.0.3": "/417",
          "2.0.4": "/419",
          "?": "/"
        }, windowsVersionMap = {
          "ME": "4.90",
          "NT 3.11": "NT3.51",
          "NT 4.0": "NT4.0",
          "2000": "NT 5.0",
          "XP": ["NT 5.1", "NT 5.2"],
          "Vista": "NT 6.0",
          "7": "NT 6.1",
          "8": "NT 6.2",
          "8.1": "NT 6.3",
          "10": ["NT 6.4", "NT 10.0"],
          "RT": "ARM"
        };
        var regexes = {
          browser: [
            [
              /\b(?:crmo|crios)\/([\w\.]+)/i
              // Chrome for Android/iOS
            ],
            [VERSION, [NAME, "Chrome"]],
            [
              /edg(?:e|ios|a)?\/([\w\.]+)/i
              // Microsoft Edge
            ],
            [VERSION, [NAME, "Edge"]],
            [
              // Presto based
              /(opera mini)\/([-\w\.]+)/i,
              // Opera Mini
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              // Opera Mobi/Tablet
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
              // Opera
            ],
            [NAME, VERSION],
            [
              /opios[\/ ]+([\w\.]+)/i
              // Opera mini on iphone >= 8.0
            ],
            [VERSION, [NAME, OPERA + " Mini"]],
            [
              /\bop(?:rg)?x\/([\w\.]+)/i
              // Opera GX
            ],
            [VERSION, [NAME, OPERA + " GX"]],
            [
              /\bopr\/([\w\.]+)/i
              // Opera Webkit
            ],
            [VERSION, [NAME, OPERA]],
            [
              // Mixed
              /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
              // Baidu
            ],
            [VERSION, [NAME, "Baidu"]],
            [
              /\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i
              // Maxthon
            ],
            [VERSION, [NAME, "Maxthon"]],
            [
              /(kindle)\/([\w\.]+)/i,
              // Kindle
              /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,
              // Lunascape/Maxthon/Netfront/Jasmine/Blazer/Sleipnir
              // Trident based
              /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,
              // Avant/IEMobile/SlimBrowser/SlimBoat/Slimjet
              /(?:ms|\()(ie) ([\w\.]+)/i,
              // Internet Explorer
              // Blink/Webkit/KHTML based                                         // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
              /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,
              // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ//Vivaldi/DuckDuckGo/Klar/Helio/Dragon
              /(heytap|ovi|115)browser\/([\d\.]+)/i,
              // HeyTap/Ovi/115
              /(weibo)__([\d\.]+)/i
              // Weibo
            ],
            [NAME, VERSION],
            [
              /quark(?:pc)?\/([-\w\.]+)/i
              // Quark
            ],
            [VERSION, [NAME, "Quark"]],
            [
              /\bddg\/([\w\.]+)/i
              // DuckDuckGo
            ],
            [VERSION, [NAME, "DuckDuckGo"]],
            [
              /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
              // UCBrowser
            ],
            [VERSION, [NAME, "UC" + BROWSER]],
            [
              /microm.+\bqbcore\/([\w\.]+)/i,
              // WeChat Desktop for Windows Built-in Browser
              /\bqbcore\/([\w\.]+).+microm/i,
              /micromessenger\/([\w\.]+)/i
              // WeChat
            ],
            [VERSION, [NAME, "WeChat"]],
            [
              /konqueror\/([\w\.]+)/i
              // Konqueror
            ],
            [VERSION, [NAME, "Konqueror"]],
            [
              /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
              // IE11
            ],
            [VERSION, [NAME, "IE"]],
            [
              /ya(?:search)?browser\/([\w\.]+)/i
              // Yandex
            ],
            [VERSION, [NAME, "Yandex"]],
            [
              /slbrowser\/([\w\.]+)/i
              // Smart Lenovo Browser
            ],
            [VERSION, [NAME, "Smart Lenovo " + BROWSER]],
            [
              /(avast|avg)\/([\w\.]+)/i
              // Avast/AVG Secure Browser
            ],
            [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
            [
              /\bfocus\/([\w\.]+)/i
              // Firefox Focus
            ],
            [VERSION, [NAME, FIREFOX + " Focus"]],
            [
              /\bopt\/([\w\.]+)/i
              // Opera Touch
            ],
            [VERSION, [NAME, OPERA + " Touch"]],
            [
              /coc_coc\w+\/([\w\.]+)/i
              // Coc Coc Browser
            ],
            [VERSION, [NAME, "Coc Coc"]],
            [
              /dolfin\/([\w\.]+)/i
              // Dolphin
            ],
            [VERSION, [NAME, "Dolphin"]],
            [
              /coast\/([\w\.]+)/i
              // Opera Coast
            ],
            [VERSION, [NAME, OPERA + " Coast"]],
            [
              /miuibrowser\/([\w\.]+)/i
              // MIUI Browser
            ],
            [VERSION, [NAME, "MIUI" + SUFFIX_BROWSER]],
            [
              /fxios\/([\w\.-]+)/i
              // Firefox for iOS
            ],
            [VERSION, [NAME, FIREFOX]],
            [
              /\bqihoobrowser\/?([\w\.]*)/i
              // 360
            ],
            [VERSION, [NAME, "360"]],
            [
              /\b(qq)\/([\w\.]+)/i
              // QQ
            ],
            [[NAME, /(.+)/, "$1Browser"], VERSION],
            [
              /(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i
            ],
            [[NAME, /(.+)/, "$1" + SUFFIX_BROWSER], VERSION],
            [
              // Oculus/Sailfish/HuaweiBrowser/VivoBrowser/PicoBrowser
              /samsungbrowser\/([\w\.]+)/i
              // Samsung Internet
            ],
            [VERSION, [NAME, SAMSUNG + " Internet"]],
            [
              /metasr[\/ ]?([\d\.]+)/i
              // Sogou Explorer
            ],
            [VERSION, [NAME, "Sogou Explorer"]],
            [
              /(sogou)mo\w+\/([\d\.]+)/i
              // Sogou Mobile
            ],
            [[NAME, "Sogou Mobile"], VERSION],
            [
              /(electron)\/([\w\.]+) safari/i,
              // Electron-based App
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              // Tesla
              /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i
              // QQ/2345
            ],
            [NAME, VERSION],
            [
              /(lbbrowser|rekonq)/i,
              // LieBao Browser/Rekonq
              /\[(linkedin)app\]/i
              // LinkedIn App for iOS & Android
            ],
            [NAME],
            [
              /ome\/([\w\.]+) \w* ?(iron) saf/i,
              // Iron
              /ome\/([\w\.]+).+qihu (360)[es]e/i
              // 360
            ],
            [VERSION, NAME],
            [
              // WebView
              /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
              // Facebook App for iOS & Android
            ],
            [[NAME, FACEBOOK], VERSION],
            [
              /(Klarna)\/([\w\.]+)/i,
              // Klarna Shopping Browser for iOS & Android
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
              // Kakao App
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
              // Naver InApp
              /(daum)apps[\/ ]([\w\.]+)/i,
              // Daum App
              /safari (line)\/([\w\.]+)/i,
              // Line App for iOS
              /\b(line)\/([\w\.]+)\/iab/i,
              // Line App for Android
              /(alipay)client\/([\w\.]+)/i,
              // Alipay
              /(twitter)(?:and| f.+e\/([\w\.]+))/i,
              // Twitter
              /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
              // Chromium/Instagram/Snapchat
            ],
            [NAME, VERSION],
            [
              /\bgsa\/([\w\.]+) .*safari\//i
              // Google Search Appliance on iOS
            ],
            [VERSION, [NAME, "GSA"]],
            [
              /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
              // TikTok
            ],
            [VERSION, [NAME, "TikTok"]],
            [
              /headlesschrome(?:\/([\w\.]+)| )/i
              // Chrome Headless
            ],
            [VERSION, [NAME, CHROME + " Headless"]],
            [
              / wv\).+(chrome)\/([\w\.]+)/i
              // Chrome WebView
            ],
            [[NAME, CHROME + " WebView"], VERSION],
            [
              /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
              // Android Browser
            ],
            [VERSION, [NAME, "Android " + BROWSER]],
            [
              /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
              // Chrome/OmniWeb/Arora/Tizen/Nokia
            ],
            [NAME, VERSION],
            [
              /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
              // Mobile Safari
            ],
            [VERSION, [NAME, "Mobile Safari"]],
            [
              /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
              // Safari & Safari Mobile
            ],
            [VERSION, NAME],
            [
              /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
              // Safari < 3.0
            ],
            [NAME, [VERSION, strMapper, oldSafariMap]],
            [
              /(webkit|khtml)\/([\w\.]+)/i
            ],
            [NAME, VERSION],
            [
              // Gecko based
              /(navigator|netscape\d?)\/([-\w\.]+)/i
              // Netscape
            ],
            [[NAME, "Netscape"], VERSION],
            [
              /(wolvic|librewolf)\/([\w\.]+)/i
              // Wolvic/LibreWolf
            ],
            [NAME, VERSION],
            [
              /mobile vr; rv:([\w\.]+)\).+firefox/i
              // Firefox Reality
            ],
            [VERSION, [NAME, FIREFOX + " Reality"]],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              // Flow
              /(swiftfox)/i,
              // Swiftfox
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,
              // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
              /(firefox)\/([\w\.]+)/i,
              // Other Firefox-based
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              // Mozilla
              // Other
              /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Obigo/Mosaic/Go/ICE/UP.Browser/Ladybird
              /\b(links) \(([\w\.]+)/i
              // Links
            ],
            [NAME, [VERSION, /_/g, "."]],
            [
              /(cobalt)\/([\w\.]+)/i
              // Cobalt
            ],
            [NAME, [VERSION, /master.|lts./, ""]]
          ],
          cpu: [
            [
              /\b((amd|x|x86[-_]?|wow|win)64)\b/i
              // AMD64 (x64)
            ],
            [[ARCHITECTURE, "amd64"]],
            [
              /(ia32(?=;))/i,
              // IA32 (quicktime)
              /\b((i[346]|x)86)(pc)?\b/i
              // IA32 (x86)
            ],
            [[ARCHITECTURE, "ia32"]],
            [
              /\b(aarch64|arm(v?[89]e?l?|_?64))\b/i
              // ARM64
            ],
            [[ARCHITECTURE, "arm64"]],
            [
              /\b(arm(v[67])?ht?n?[fl]p?)\b/i
              // ARMHF
            ],
            [[ARCHITECTURE, "armhf"]],
            [
              // PocketPC mistakenly identified as PowerPC
              /( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i
            ],
            [[ARCHITECTURE, "arm"]],
            [
              /((ppc|powerpc)(64)?)( mac|;|\))/i
              // PowerPC
            ],
            [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
            [
              / sun4\w[;\)]/i
              // SPARC
            ],
            [[ARCHITECTURE, "sparc"]],
            [
              /\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i
              // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ],
            [[ARCHITECTURE, lowerize]]
          ],
          device: [
            [
              //////////////////////////
              // MOBILES & TABLETS
              /////////////////////////
              // Samsung
              /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
            [
              /\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]((?!sm-[lr])[-\w]+)/i,
              /sec-(sgh\w+)/i
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
            [
              // Apple
              /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
              // iPod/iPhone
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              // iPad
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
            [
              /(macintosh);/i
            ],
            [MODEL, [VENDOR, APPLE]],
            [
              // Sharp
              /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
            [
              // Honor
              /\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i
            ],
            [MODEL, [VENDOR, HONOR], [TYPE, TABLET]],
            [
              /honor([-\w ]+)[;\)]/i
            ],
            [MODEL, [VENDOR, HONOR], [TYPE, MOBILE]],
            [
              // Huawei
              /\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
            [
              /(?:huawei)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ],
            [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
            [
              // Xiaomi
              /oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i,
              /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i
              // Mi Pad tablets
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
            [
              /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
              // Xiaomi POCO
              /\b; (\w+) build\/hm\1/i,
              // Xiaomi Hongmi 'numeric' models
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              // Xiaomi Hongmi
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              // Xiaomi Redmi
              /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
              // Xiaomi Redmi 'numeric' models
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i,
              // Xiaomi Mi
              / ([\w ]+) miui\/v?\d/i
            ],
            [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
            [
              // OPPO
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [MODEL, [VENDOR, OPPO], [TYPE, MOBILE]],
            [
              /\b(opd2(\d{3}a?))(?: bui|\))/i
            ],
            [MODEL, [VENDOR, strMapper, { "OnePlus": ["304", "403", "203"], "*": OPPO }], [TYPE, TABLET]],
            [
              // Vivo
              /vivo (\w+)(?: bui|\))/i,
              /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
            [
              // Realme
              /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
            ],
            [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
            [
              // Motorola
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
            [
              /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
            [
              // LG
              /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, TABLET]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i,
              /\blg-?([\d\w]+) bui/i
            ],
            [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
            [
              // Lenovo
              /(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i,
              /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i
            ],
            [MODEL, [VENDOR, LENOVO], [TYPE, TABLET]],
            [
              // Nokia
              /(nokia) (t[12][01])/i
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i,
              /nokia[-_ ]?(([-\w\. ]*))/i
            ],
            [[MODEL, /_/g, " "], [TYPE, MOBILE], [VENDOR, "Nokia"]],
            [
              // Google
              /(pixel (c|tablet))\b/i
              // Google Pixel C/Tablet
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
            [
              /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
              // Google Pixel
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
            [
              // Sony
              /droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
            [
              /sony tablet [ps]/i,
              /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
            [
              // OnePlus
              / (kb2005|in20[12]5|be20[12][59])\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [MODEL, [VENDOR, ONEPLUS], [TYPE, MOBILE]],
            [
              // Amazon
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,
              // Kindle Fire without Silk / Echo Show
              /(kf[a-z]+)( bui|\)).+silk\//i
              // Kindle Fire HD
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
            [
              /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
              // Fire Phone
            ],
            [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
            [
              // BlackBerry
              /(playbook);[-\w\),; ]+(rim)/i
              // BlackBerry PlayBook
            ],
            [MODEL, VENDOR, [TYPE, TABLET]],
            [
              /\b((?:bb[a-f]|st[hv])100-\d)/i,
              /\(bb10; (\w+)/i
              // BlackBerry 10
            ],
            [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
            [
              // Asus
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
            [
              / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
            [
              // HTC
              /(nexus 9)/i
              // HTC Nexus 9
            ],
            [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              // HTC
              // ZTE
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
              // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ],
            [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
            [
              // TCL
              /droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i
            ],
            [MODEL, [VENDOR, "TCL"], [TYPE, TABLET]],
            [
              // itel
              /(itel) ((\w+))/i
            ],
            [[VENDOR, lowerize], MODEL, [TYPE, strMapper, { "tablet": ["p10001l", "w7001"], "*": "mobile" }]],
            [
              // Acer
              /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
            [
              // Meizu
              /droid.+; (m[1-5] note) bui/i,
              /\bmz-([-\w]{2,})/i
            ],
            [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
            [
              // Ulefone
              /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
            [
              // Energizer
              /; (energy ?\w+)(?: bui|\))/i,
              /; energizer ([\w ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Energizer"], [TYPE, MOBILE]],
            [
              // Cat
              /; cat (b35);/i,
              /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Cat"], [TYPE, MOBILE]],
            [
              // Smartfren
              /((?:new )?andromax[\w- ]+)(?: bui|\))/i
            ],
            [MODEL, [VENDOR, "Smartfren"], [TYPE, MOBILE]],
            [
              // Nothing
              /droid.+; (a(?:015|06[35]|142p?))/i
            ],
            [MODEL, [VENDOR, "Nothing"], [TYPE, MOBILE]],
            [
              // Archos
              /; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i,
              /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i
            ],
            [MODEL, [VENDOR, "Archos"], [TYPE, TABLET]],
            [
              /archos ([\w ]+)( b|\))/i,
              /; (ac[3-6]\d\w{2,8})( b|\))/i
            ],
            [MODEL, [VENDOR, "Archos"], [TYPE, MOBILE]],
            [
              // MIXED
              /(imo) (tab \w+)/i,
              // IMO
              /(infinix) (x1101b?)/i
              // Infinix XPad
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,
              // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron/Infinix/Tecno/Micromax/Advan
              /; (hmd|imo) ([\w ]+?)(?: bui|\))/i,
              // HMD/IMO
              /(hp) ([\w ]+\w)/i,
              // HP iPAQ
              /(microsoft); (lumia[\w ]+)/i,
              // Microsoft Lumia
              /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i,
              // Lenovo
              /(oppo) ?([\w ]+) bui/i
              // OPPO
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kobo)\s(ereader|touch)/i,
              // Kobo
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              // HP TouchPad
              /(kindle)\/([\w\.]+)/i,
              // Kindle
              /(nook)[\w ]+build\/(\w+)/i,
              // Nook
              /(dell) (strea[kpr\d ]*[\dko])/i,
              // Dell Streak
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              // Le Pan Tablets
              /(trinity)[- ]*(t\d{3}) bui/i,
              // Trinity Tablets
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              // Gigaset Tablets
              /(vodafone) ([\w ]+)(?:\)| bui)/i
              // Vodafone
            ],
            [VENDOR, MODEL, [TYPE, TABLET]],
            [
              /(surface duo)/i
              // Surface Duo
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
            [
              /droid [\d\.]+; (fp\du?)(?: b|\))/i
              // Fairphone
            ],
            [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
            [
              /(u304aa)/i
              // AT&T
            ],
            [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
            [
              /\bsie-(\w*)/i
              // Siemens
            ],
            [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
            [
              /\b(rct\w+) b/i
              // RCA Tablets
            ],
            [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
            [
              /\b(venue[\d ]{2,7}) b/i
              // Dell Venue Tablets
            ],
            [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
            [
              /\b(q(?:mv|ta)\w+) b/i
              // Verizon Tablet
            ],
            [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
            [
              /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
              // Barnes & Noble Tablet
            ],
            [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
            [
              /\b(tm\d{3}\w+) b/i
            ],
            [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
            [
              /\b(k88) b/i
              // ZTE K Series Tablet
            ],
            [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
            [
              /\b(nx\d{3}j) b/i
              // ZTE Nubia
            ],
            [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
            [
              /\b(gen\d{3}) b.+49h/i
              // Swiss GEN Mobile
            ],
            [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
            [
              /\b(zur\d{3}) b/i
              // Swiss ZUR Tablet
            ],
            [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
            [
              /\b((zeki)?tb.*\b) b/i
              // Zeki Tablets
            ],
            [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
            [
              /\b([yr]\d{2}) b/i,
              /\b(dragon[- ]+touch |dt)(\w{5}) b/i
              // Dragon Touch Tablet
            ],
            [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
            [
              /\b(ns-?\w{0,9}) b/i
              // Insignia Tablets
            ],
            [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
            [
              /\b((nxa|next)-?\w{0,9}) b/i
              // NextBook Tablets
            ],
            [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
            [
              /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
              // Voice Xtreme Phones
            ],
            [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
            [
              /\b(lvtel\-)?(v1[12]) b/i
              // LvTel Phones
            ],
            [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
            [
              /\b(ph-1) /i
              // Essential PH-1
            ],
            [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
            [
              /\b(v(100md|700na|7011|917g).*\b) b/i
              // Envizen Tablets
            ],
            [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
            [
              /\b(trio[-\w\. ]+) b/i
              // MachSpeed Tablets
            ],
            [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
            [
              /\btu_(1491) b/i
              // Rotor Tablets
            ],
            [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
            [
              /((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i
              // Nvidia Tablets
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, TABLET]],
            [
              /(sprint) (\w+)/i
              // Sprint Phones
            ],
            [VENDOR, MODEL, [TYPE, MOBILE]],
            [
              /(kin\.[onetw]{3})/i
              // Microsoft Kin
            ],
            [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
            [
              /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
              // Zebra
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
            [
              /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
            [
              ///////////////////
              // SMARTTVS
              ///////////////////
              /smart-tv.+(samsung)/i
              // Samsung
            ],
            [VENDOR, [TYPE, SMARTTV]],
            [
              /hbbtv.+maple;(\d+)/i
            ],
            [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
            [
              /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
              // LG SmartTV
            ],
            [[VENDOR, LG], [TYPE, SMARTTV]],
            [
              /(apple) ?tv/i
              // Apple TV
            ],
            [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
            [
              /crkey/i
              // Google Chromecast
            ],
            [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
            [
              /droid.+aft(\w+)( bui|\))/i
              // Fire TV
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
            [
              /(shield \w+ tv)/i
              // Nvidia Shield TV
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, SMARTTV]],
            [
              /\(dtv[\);].+(aquos)/i,
              /(aquos-tv[\w ]+)\)/i
              // Sharp
            ],
            [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
            [
              /(bravia[\w ]+)( bui|\))/i
              // Sony
            ],
            [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
            [
              /(mi(tv|box)-?\w+) bui/i
              // Xiaomi
            ],
            [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
            [
              /Hbbtv.*(technisat) (.*);/i
              // TechniSAT
            ],
            [VENDOR, MODEL, [TYPE, SMARTTV]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              // Roku
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
              // HbbTV devices
            ],
            [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
            [
              // SmartTV from Unidentified Vendors
              /droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i
            ],
            [MODEL, [TYPE, SMARTTV]],
            [
              /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            ],
            [[TYPE, SMARTTV]],
            [
              ///////////////////
              // CONSOLES
              ///////////////////
              /(ouya)/i,
              // Ouya
              /(nintendo) ([wids3utch]+)/i
              // Nintendo
            ],
            [VENDOR, MODEL, [TYPE, CONSOLE]],
            [
              /droid.+; (shield)( bui|\))/i
              // Nvidia Portable
            ],
            [MODEL, [VENDOR, NVIDIA], [TYPE, CONSOLE]],
            [
              /(playstation \w+)/i
              // Playstation
            ],
            [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
            [
              /\b(xbox(?: one)?(?!; xbox))[\); ]/i
              // Microsoft Xbox
            ],
            [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
            [
              ///////////////////
              // WEARABLES
              ///////////////////
              /\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i
              // Samsung Galaxy Watch
            ],
            [MODEL, [VENDOR, SAMSUNG], [TYPE, WEARABLE]],
            [
              /((pebble))app/i,
              // Pebble
              /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i
              // Asus ZenWatch / LG Watch / Pixel Watch
            ],
            [VENDOR, MODEL, [TYPE, WEARABLE]],
            [
              /(ow(?:19|20)?we?[1-3]{1,3})/i
              // Oppo Watch
            ],
            [MODEL, [VENDOR, OPPO], [TYPE, WEARABLE]],
            [
              /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
              // Apple Watch
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
            [
              /(opwwe\d{3})/i
              // OnePlus Watch
            ],
            [MODEL, [VENDOR, ONEPLUS], [TYPE, WEARABLE]],
            [
              /(moto 360)/i
              // Motorola 360
            ],
            [MODEL, [VENDOR, MOTOROLA], [TYPE, WEARABLE]],
            [
              /(smartwatch 3)/i
              // Sony SmartWatch
            ],
            [MODEL, [VENDOR, SONY], [TYPE, WEARABLE]],
            [
              /(g watch r)/i
              // LG G Watch R
            ],
            [MODEL, [VENDOR, LG], [TYPE, WEARABLE]],
            [
              /droid.+; (wt63?0{2,3})\)/i
            ],
            [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
            [
              ///////////////////
              // XR
              ///////////////////
              /droid.+; (glass) \d/i
              // Google Glass
            ],
            [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
            [
              /(pico) (4|neo3(?: link|pro)?)/i
              // Pico
            ],
            [VENDOR, MODEL, [TYPE, WEARABLE]],
            [
              /; (quest( \d| pro)?)/i
              // Oculus Quest
            ],
            [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
            [
              ///////////////////
              // EMBEDDED
              ///////////////////
              /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
              // Tesla
            ],
            [VENDOR, [TYPE, EMBEDDED]],
            [
              /(aeobc)\b/i
              // Echo Dot
            ],
            [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
            [
              /(homepod).+mac os/i
              // Apple HomePod
            ],
            [MODEL, [VENDOR, APPLE], [TYPE, EMBEDDED]],
            [
              /windows iot/i
            ],
            [[TYPE, EMBEDDED]],
            [
              ////////////////////
              // MIXED (GENERIC)
              ///////////////////
              /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
              // Android Phones from Unidentified Vendors
            ],
            [MODEL, [TYPE, MOBILE]],
            [
              /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
              // Android Tablets from Unidentified Vendors
            ],
            [MODEL, [TYPE, TABLET]],
            [
              /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
              // Unidentifiable Tablet
            ],
            [[TYPE, TABLET]],
            [
              /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
              // Unidentifiable Mobile
            ],
            [[TYPE, MOBILE]],
            [
              /droid .+?; ([\w\. -]+)( bui|\))/i
              // Generic Android Device
            ],
            [MODEL, [VENDOR, "Generic"]]
          ],
          engine: [
            [
              /windows.+ edge\/([\w\.]+)/i
              // EdgeHTML
            ],
            [VERSION, [NAME, EDGE + "HTML"]],
            [
              /(arkweb)\/([\w\.]+)/i
              // ArkWeb
            ],
            [NAME, VERSION],
            [
              /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
              // Blink
            ],
            [VERSION, [NAME, "Blink"]],
            [
              /(presto)\/([\w\.]+)/i,
              // Presto
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,
              // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna/Servo
              /ekioh(flow)\/([\w\.]+)/i,
              // Flow
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              // KHTML/Tasman/Links
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              // iCab
              /\b(libweb)/i
              // LibWeb
            ],
            [NAME, VERSION],
            [
              /ladybird\//i
            ],
            [[NAME, "LibWeb"]],
            [
              /rv\:([\w\.]{1,9})\b.+(gecko)/i
              // Gecko
            ],
            [VERSION, NAME]
          ],
          os: [
            [
              // Windows
              /microsoft (windows) (vista|xp)/i
              // Windows (iTunes)
            ],
            [NAME, VERSION],
            [
              /(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i
              // Windows Phone
            ],
            [NAME, [VERSION, strMapper, windowsVersionMap]],
            [
              /windows nt 6\.2; (arm)/i,
              // Windows RT
              /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i,
              /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ],
            [[VERSION, strMapper, windowsVersionMap], [NAME, "Windows"]],
            [
              // iOS/macOS
              /[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i,
              // iOS
              /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
              /cfnetwork\/.+darwin/i
            ],
            [[VERSION, /_/g, "."], [NAME, "iOS"]],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+haiku)/i
              // Mac OS
            ],
            [[NAME, MAC_OS], [VERSION, /_/g, "."]],
            [
              // Mobile OSes
              /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
              // Android-x86/HarmonyOS
            ],
            [VERSION, NAME],
            [
              /(ubuntu) ([\w\.]+) like android/i
              // Ubuntu Touch
            ],
            [[NAME, /(.+)/, "$1 Touch"], VERSION],
            [
              // Android/Blackberry/WebOS/QNX/Bada/RIM/KaiOS/Maemo/MeeGo/S40/Sailfish OS/OpenHarmony/Tizen
              /(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i
            ],
            [NAME, VERSION],
            [
              /\(bb(10);/i
              // BlackBerry 10
            ],
            [VERSION, [NAME, BLACKBERRY]],
            [
              /(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i
              // Symbian
            ],
            [VERSION, [NAME, "Symbian"]],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
              // Firefox OS
            ],
            [VERSION, [NAME, FIREFOX + " OS"]],
            [
              /web0s;.+rt(tv)/i,
              /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
              // WebOS
            ],
            [VERSION, [NAME, "webOS"]],
            [
              /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
              // watchOS
            ],
            [VERSION, [NAME, "watchOS"]],
            [
              // Google Chromecast
              /crkey\/([\d\.]+)/i
              // Google Chromecast
            ],
            [VERSION, [NAME, CHROME + "cast"]],
            [
              /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
              // Chromium OS
            ],
            [[NAME, CHROMIUM_OS], VERSION],
            [
              // Smart TVs
              /panasonic;(viera)/i,
              // Panasonic Viera
              /(netrange)mmh/i,
              // Netrange
              /(nettv)\/(\d+\.[\w\.]+)/i,
              // NetTV
              // Console
              /(nintendo|playstation) ([wids345portablevuch]+)/i,
              // Nintendo/Playstation
              /(xbox); +xbox ([^\);]+)/i,
              // Microsoft Xbox (360, One, X, S, Series X, Series S)
              // Other
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              // Joli/Palm
              /(mint)[\/\(\) ]?(\w*)/i,
              // Mint
              /(mageia|vectorlinux)[; ]/i,
              // Mageia/VectorLinux
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
              /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w\.]*)/i,
              // Hurd/Linux
              /(gnu) ?([\w\.]*)/i,
              // GNU
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
              /(haiku) (\w+)/i
              // Haiku
            ],
            [NAME, VERSION],
            [
              /(sunos) ?([\w\.\d]*)/i
              // Solaris
            ],
            [[NAME, "Solaris"], VERSION],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              // Solaris
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              // AIX
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
              // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
              /(unix) ?([\w\.]*)/i
              // UNIX
            ],
            [NAME, VERSION]
          ]
        };
        var UAParser2 = function(ua, extensions) {
          if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined2;
          }
          if (!(this instanceof UAParser2)) {
            return new UAParser2(ua, extensions).getResult();
          }
          var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined2;
          var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
          var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined2;
          var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
          var _isSelfNav = _navigator && _navigator.userAgent == _ua;
          this.getBrowser = function() {
            var _browser = {};
            _browser[NAME] = undefined2;
            _browser[VERSION] = undefined2;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser[MAJOR] = majorize(_browser[VERSION]);
            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
              _browser[NAME] = "Brave";
            }
            return _browser;
          };
          this.getCPU = function() {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined2;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
          };
          this.getDevice = function() {
            var _device = {};
            _device[VENDOR] = undefined2;
            _device[MODEL] = undefined2;
            _device[TYPE] = undefined2;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
              _device[TYPE] = MOBILE;
            }
            if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
              _device[MODEL] = "iPad";
              _device[TYPE] = TABLET;
            }
            return _device;
          };
          this.getEngine = function() {
            var _engine = {};
            _engine[NAME] = undefined2;
            _engine[VERSION] = undefined2;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
          };
          this.getOS = function() {
            var _os = {};
            _os[NAME] = undefined2;
            _os[VERSION] = undefined2;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform && _uach.platform != "Unknown") {
              _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
            }
            return _os;
          };
          this.getResult = function() {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU()
            };
          };
          this.getUA = function() {
            return _ua;
          };
          this.setUA = function(ua2) {
            _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
            return this;
          };
          this.setUA(_ua);
          return this;
        };
        UAParser2.VERSION = LIBVERSION;
        UAParser2.BROWSER = enumerize([NAME, VERSION, MAJOR]);
        UAParser2.CPU = enumerize([ARCHITECTURE]);
        UAParser2.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
        UAParser2.ENGINE = UAParser2.OS = enumerize([NAME, VERSION]);
        if (typeof exports !== UNDEF_TYPE) {
          if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser2;
          }
          exports.UAParser = UAParser2;
        } else {
          if (typeof define === FUNC_TYPE && define.amd) {
            define(function() {
              return UAParser2;
            });
          } else if (typeof window2 !== UNDEF_TYPE) {
            window2.UAParser = UAParser2;
          }
        }
        var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
        if ($ && !$.ua) {
          var parser = new UAParser2();
          $.ua = parser.getResult();
          $.ua.get = function() {
            return parser.getUA();
          };
          $.ua.set = function(ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
              $.ua[prop] = result[prop];
            }
          };
        }
      })(typeof window === "object" ? window : exports);
    }
  });

  // node_modules/@observertc/client-monitor-js/dist/monitors/CertificateMonitor.js
  var CertificateMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    fingerprint;
    fingerprintAlgorithm;
    base64Certificate;
    issuerCertificateId;
    attachments;
    appData;
    constructor(t4, i3) {
      this._peerConnection = t4, this.id = i3.id, this.timestamp = i3.timestamp, Object.assign(this, i3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || Object.assign(this, t4);
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, fingerprint: this.fingerprint, fingerprintAlgorithm: this.fingerprintAlgorithm, base64Certificate: this.base64Certificate, issuerCertificateId: this.issuerCertificateId, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/CodecMonitor.js
  var CodecMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    payloadType;
    transportId;
    mimeType;
    clockRate;
    channels;
    sdpFmtpLine;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, this.mimeType = e3.mimeType, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || Object.assign(this, t4);
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getIceTransport() {
      return this._peerConnection.mappedIceTransportMonitors.get(this.transportId ?? "");
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, payloadType: this.payloadType, transportId: this.transportId, mimeType: this.mimeType, clockRate: this.clockRate, channels: this.channels, sdpFmtpLine: this.sdpFmtpLine, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/DataChannelMonitor.js
  var DataChannelMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    label;
    protocol;
    dataChannelIdentifier;
    state;
    messagesSent;
    bytesSent;
    messagesReceived;
    bytesReceived;
    deltaBytesSent;
    deltaBytesReceived;
    attachments;
    appData;
    constructor(e3, t4) {
      this._peerConnection = e3, this.id = t4.id, this.timestamp = t4.timestamp, Object.assign(this, t4);
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    get visited() {
      const e3 = this._visited;
      return this._visited = false, e3;
    }
    accept(e3) {
      this._visited = true;
      e3.timestamp - this.timestamp <= 0 || (void 0 !== this.bytesSent && void 0 !== e3.bytesSent && (this.deltaBytesSent = e3.bytesSent - this.bytesSent), void 0 !== this.bytesReceived && void 0 !== e3.bytesReceived && (this.deltaBytesReceived = e3.bytesReceived - this.bytesReceived), Object.assign(this, e3));
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, label: this.label, protocol: this.protocol, dataChannelIdentifier: this.dataChannelIdentifier, state: this.state, messagesSent: this.messagesSent, bytesSent: this.bytesSent, messagesReceived: this.messagesReceived, bytesReceived: this.bytesReceived, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/IceCandidateMonitor.js
  var IceCandidateMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    transportId;
    address;
    port;
    protocol;
    candidateType;
    priority;
    url;
    relayProtocol;
    foundation;
    relatedAddress;
    relatedPort;
    usernameFragment;
    tcpType;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || Object.assign(this, t4);
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getIceTransport() {
      return this._peerConnection.mappedIceTransportMonitors.get(this.transportId ?? "");
    }
    get isRelay() {
      return "relay" === this.candidateType || void 0 !== this.turnTransport;
    }
    get turnTransport() {
      switch (this.relayProtocol) {
        case "udp":
        case "tcp":
        case "tls":
          return this.relayProtocol;
        default:
          return;
      }
    }
    get turnServer() {
      if (this.isRelay && this.url?.startsWith("turn")) return this.url.split("?")[0];
    }
    get addressFamily() {
      const t4 = this.address;
      if (t4 && !t4.endsWith(".local")) return t4.includes(":") ? "ipv6" : /^\d{1,3}(\.\d{1,3}){3}$/.test(t4) ? "ipv4" : void 0;
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, transportId: this.transportId, address: this.address, port: this.port, protocol: this.protocol, candidateType: this.candidateType, priority: this.priority, url: this.url, relayProtocol: this.relayProtocol, foundation: this.foundation, relatedAddress: this.relatedAddress, relatedPort: this.relatedPort, usernameFragment: this.usernameFragment, tcpType: this.tcpType, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/utils/common.js
  function positiveDelta(t4, e3) {
    if (void 0 !== t4 && void 0 !== e3) return t4 < e3 ? 0 : t4 - e3;
  }

  // node_modules/@observertc/client-monitor-js/dist/monitors/IceCandidatePairMonitor.js
  var IceCandidatePairMonitor = class {
    _peerConnection;
    _visited = true;
    id;
    timestamp;
    transportId;
    localCandidateId;
    remoteCandidateId;
    state;
    nominated;
    packetsSent;
    packetsReceived;
    bytesSent;
    bytesReceived;
    lastPacketSentTimestamp;
    lastPacketReceivedTimestamp;
    totalRoundTripTime;
    currentRoundTripTime;
    availableOutgoingBitrate;
    availableIncomingBitrate;
    requestsReceived;
    requestsSent;
    responsesReceived;
    responsesSent;
    consentRequestsSent;
    packetsDiscardedOnSend;
    bytesDiscardedOnSend;
    deltaPacketsSent;
    deltaPacketsReceived;
    deltaBytesSent;
    deltaBytesReceived;
    deltaTotalRoundTripTime;
    deltaResponsesReceived;
    avgRoundTripTimeInSec;
    attachments;
    appData;
    constructor(e3, t4) {
      this._peerConnection = e3, this.id = t4.id, this.timestamp = t4.timestamp, Object.assign(this, t4);
    }
    get visited() {
      const e3 = this._visited;
      return this._visited = false, e3;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || (this.deltaBytesReceived = 0, this.deltaBytesSent = 0, this.deltaPacketsReceived = 0, this.deltaPacketsSent = 0, void 0 !== this.packetsSent && void 0 !== t4.packetsSent && this.packetsSent <= t4.packetsSent && (this.deltaPacketsSent = t4.packetsSent - this.packetsSent), void 0 !== this.packetsReceived && void 0 !== t4.packetsReceived && this.packetsReceived <= t4.packetsReceived && (this.deltaPacketsReceived = t4.packetsReceived - this.packetsReceived), void 0 !== this.bytesSent && void 0 !== t4.bytesSent && this.bytesSent <= t4.bytesSent && (this.deltaBytesSent = t4.bytesSent - this.bytesSent), void 0 !== this.bytesReceived && void 0 !== t4.bytesReceived && this.bytesReceived <= t4.bytesReceived && (this.deltaBytesReceived = t4.bytesReceived - this.bytesReceived), this.deltaTotalRoundTripTime = positiveDelta(t4.totalRoundTripTime, this.totalRoundTripTime), this.deltaResponsesReceived = positiveDelta(t4.responsesReceived, this.responsesReceived), this.avgRoundTripTimeInSec = void 0 !== this.deltaTotalRoundTripTime && void 0 !== this.deltaResponsesReceived && this.deltaResponsesReceived > 0 ? this.deltaTotalRoundTripTime / this.deltaResponsesReceived : void 0, Object.assign(this, t4));
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getIceTransport() {
      return this._peerConnection.mappedIceTransportMonitors.get(this.transportId ?? "");
    }
    getLocalCandidate() {
      return this._peerConnection.mappedIceCandidateMonitors.get(this.localCandidateId ?? "");
    }
    getRemoteCandidate() {
      return this._peerConnection.mappedIceCandidateMonitors.get(this.remoteCandidateId ?? "");
    }
    get pathKey() {
      return this.transportId ?? this.getLocalCandidate()?.transportId ?? "unknown-ice-transport";
    }
    get usingTurn() {
      return true === this.getLocalCandidate()?.isRelay;
    }
    get usingTcp() {
      return "tcp" === this.getLocalCandidate()?.protocol;
    }
    get relayProtocol() {
      return this.getLocalCandidate()?.turnTransport;
    }
    get turnUrl() {
      return this.usingTurn ? this.getLocalCandidate()?.url : void 0;
    }
    get turnServer() {
      return this.getLocalCandidate()?.turnServer;
    }
    get pathKind() {
      if (!this.usingTurn) return "direct";
      switch (this.relayProtocol) {
        case "udp":
          return "turn-udp";
        case "tcp":
          return "turn-tcp";
        case "tls":
          return "turn-tls";
        default:
          return "turn-unknown";
      }
    }
    get tuple() {
      const e3 = this.getLocalCandidate(), t4 = this.getRemoteCandidate();
      return `${e3?.address}:${e3?.port}:${t4?.address}:${t4?.port}:${e3?.protocol}`;
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, transportId: this.transportId, localCandidateId: this.localCandidateId, remoteCandidateId: this.remoteCandidateId, state: this.state, nominated: this.nominated, packetsSent: this.packetsSent, packetsReceived: this.packetsReceived, bytesSent: this.bytesSent, bytesReceived: this.bytesReceived, lastPacketSentTimestamp: this.lastPacketSentTimestamp, lastPacketReceivedTimestamp: this.lastPacketReceivedTimestamp, totalRoundTripTime: this.totalRoundTripTime, currentRoundTripTime: this.currentRoundTripTime, availableOutgoingBitrate: this.availableOutgoingBitrate, availableIncomingBitrate: this.availableIncomingBitrate, requestsReceived: this.requestsReceived, requestsSent: this.requestsSent, responsesReceived: this.responsesReceived, responsesSent: this.responsesSent, consentRequestsSent: this.consentRequestsSent, packetsDiscardedOnSend: this.packetsDiscardedOnSend, bytesDiscardedOnSend: this.bytesDiscardedOnSend, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/IceTransportMonitor.js
  var IceTransportMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    packetsSent;
    packetsReceived;
    bytesSent;
    bytesReceived;
    iceRole;
    iceLocalUsernameFragment;
    dtlsState;
    iceState;
    selectedCandidatePairId;
    localCertificateId;
    remoteCertificateId;
    tlsVersion;
    dtlsCipher;
    dtlsRole;
    srtpCipher;
    selectedCandidatePairChanges;
    ccfbMessagesSent;
    ccfbMessagesReceived;
    deltaPacketsSent;
    deltaPacketsReceived;
    deltaBytesSent;
    deltaBytesReceived;
    sendingBitrate;
    receivingBitrate;
    attachments;
    appData;
    constructor(e3, t4) {
      this._peerConnection = e3, this.id = t4.id, this.timestamp = t4.timestamp, Object.assign(this, t4);
    }
    get visited() {
      const e3 = this._visited;
      return this._visited = false, e3;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getSelectedCandidatePair() {
      return this._peerConnection.mappedIceCandidatePairMonitors.get(this.selectedCandidatePairId ?? "");
    }
    accept(e3) {
      this._visited = true;
      const t4 = e3.timestamp - this.timestamp, i3 = t4 / 1e3;
      t4 <= 0 || (void 0 !== this.packetsSent && void 0 !== e3.packetsSent && this.packetsSent <= e3.packetsSent ? this.deltaPacketsSent = e3.packetsSent - this.packetsSent : this.deltaPacketsSent = void 0, void 0 !== this.packetsReceived && void 0 !== e3.packetsReceived && this.packetsReceived <= e3.packetsReceived ? this.deltaPacketsReceived = e3.packetsReceived - this.packetsReceived : this.deltaPacketsReceived = void 0, void 0 !== this.bytesSent && void 0 !== e3.bytesSent && this.bytesSent <= e3.bytesSent ? (this.deltaBytesSent = e3.bytesSent - this.bytesSent, this.sendingBitrate = 8 * this.deltaBytesSent / i3) : (this.deltaBytesSent = void 0, this.sendingBitrate = void 0), void 0 !== this.bytesReceived && void 0 !== e3.bytesReceived && this.bytesReceived <= e3.bytesReceived ? (this.deltaBytesReceived = e3.bytesReceived - this.bytesReceived, this.receivingBitrate = 8 * this.deltaBytesReceived / i3) : (this.deltaBytesReceived = void 0, this.receivingBitrate = void 0), Object.assign(this, e3));
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, packetsSent: this.packetsSent, packetsReceived: this.packetsReceived, bytesSent: this.bytesSent, bytesReceived: this.bytesReceived, iceRole: this.iceRole, iceLocalUsernameFragment: this.iceLocalUsernameFragment, dtlsState: this.dtlsState, iceState: this.iceState, selectedCandidatePairId: this.selectedCandidatePairId, localCertificateId: this.localCertificateId, remoteCertificateId: this.remoteCertificateId, tlsVersion: this.tlsVersion, dtlsCipher: this.dtlsCipher, dtlsRole: this.dtlsRole, srtpCipher: this.srtpCipher, selectedCandidatePairChanges: this.selectedCandidatePairChanges, ccfbMessagesSent: this.ccfbMessagesSent, ccfbMessagesReceived: this.ccfbMessagesReceived, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/InboundRtpMonitor.js
  var InboundRtpMonitor = class {
    _peerConnection;
    _visited = true;
    addedAt = Date.now();
    timestamp;
    id;
    ssrc;
    kind;
    trackIdentifier;
    transportId;
    codecId;
    packetsReceived;
    packetsReceivedWithEct1;
    packetsReceivedWithCe;
    packetsReportedAsLost;
    packetsReportedAsLostButRecovered;
    packetsLost;
    jitter;
    mid;
    remoteId;
    framesDecoded;
    keyFramesDecoded;
    framesRendered;
    framesDropped;
    frameWidth;
    frameHeight;
    framesPerSecond;
    qpSum;
    totalDecodeTime;
    totalInterFrameDelay;
    totalSquaredInterFrameDelay;
    pauseCount;
    totalPausesDuration;
    freezeCount;
    totalFreezesDuration;
    lastPacketReceivedTimestamp;
    headerBytesReceived;
    packetsDiscarded;
    fecBytesReceived;
    fecPacketsReceived;
    fecPacketsDiscarded;
    bytesReceived;
    nackCount;
    firCount;
    pliCount;
    totalProcessingDelay;
    estimatedPlayoutTimestamp;
    jitterBufferDelay;
    jitterBufferTargetDelay;
    jitterBufferEmittedCount;
    jitterBufferMinimumDelay;
    totalSamplesReceived;
    concealedSamples;
    silentConcealedSamples;
    concealmentEvents;
    insertedSamplesForDeceleration;
    removedSamplesForAcceleration;
    audioLevel;
    totalAudioEnergy;
    totalSamplesDuration;
    framesReceived;
    decoderImplementation;
    playoutId;
    powerEfficientDecoder;
    framesAssembledFromMultiplePackets;
    totalAssemblyTime;
    retransmittedPacketsReceived;
    retransmittedBytesReceived;
    rtxSsrc;
    fecSsrc;
    totalCorruptionProbability;
    totalSquaredCorruptionProbability;
    corruptionMeasurements;
    bitrate;
    isFreezed;
    desync;
    avgFramesPerSec;
    fpsVolatility;
    lastNFramesPerSec = [];
    receivingAudioSamples;
    totalFractionLost;
    bitPerPixel;
    packetRate;
    ewmaFps;
    deltaPacketsLost;
    deltaPacketsReceived;
    deltaBytesReceived;
    deltaJitterBufferDelay;
    deltaCorruptionProbability;
    deltaFractionLost;
    deltaFramesDecoded;
    deltaFramesReceived;
    deltaFramesRendered;
    deltaTime;
    deltaTotalSamplesReceived;
    deltaConcealedSamples;
    deltaSilentConcealedSamples;
    deltaConcealmentEvents;
    deltaInsertedSamplesForDeceleration;
    deltaRemovedSamplesForAcceleration;
    deltaPacketsDiscarded;
    deltaJitterBufferEmittedCount;
    deltaJitterBufferTargetDelay;
    concealmentRate;
    concealmentEventRate;
    timeStretchRate;
    avgJitterBufferDelayInMs;
    jitterBufferTargetDelayInMs;
    discardRate;
    deltaFramesDropped;
    deltaKeyFramesDecoded;
    deltaTotalDecodeTime;
    deltaPliCount;
    deltaFirCount;
    deltaNackCount;
    deltaRetransmittedBytesReceived;
    deltaRetransmittedPacketsReceived;
    retransmissionRatio;
    decodeTimePerFrameInMs;
    dropRatio;
    renderRatio;
    keyFrameRate;
    pliRate;
    firRate;
    nackRate;
    attachments;
    appData;
    constructor(e3, t4) {
      this._peerConnection = e3, this.id = t4.id, this.timestamp = t4.timestamp, this.ssrc = t4.ssrc, this.kind = t4.kind, this.trackIdentifier = t4.trackIdentifier, Object.assign(this, t4);
    }
    get visited() {
      const e3 = this._visited;
      return this._visited = false, e3;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    accept(t4) {
      this._visited = true;
      const i3 = t4.timestamp - this.timestamp;
      if (i3 <= 0) return void Object.assign(this, t4);
      const s2 = i3 / 1e3;
      if (this.deltaTotalSamplesReceived = positiveDelta(t4.totalSamplesReceived, this.totalSamplesReceived), void 0 !== this.deltaTotalSamplesReceived && (this.receivingAudioSamples = this.deltaTotalSamplesReceived), void 0 !== this.bytesReceived && void 0 !== t4.bytesReceived && (this.deltaBytesReceived = positiveDelta(t4.bytesReceived, this.bytesReceived) ?? 0, this.bitrate = Math.max(0, 8 * this.deltaBytesReceived / s2)), void 0 !== this.packetsLost && void 0 !== t4.packetsLost && (this.deltaPacketsLost = positiveDelta(t4.packetsLost, this.packetsLost) ?? 0), void 0 !== this.packetsReceived && void 0 !== t4.packetsReceived && (this.deltaPacketsReceived = positiveDelta(t4.packetsReceived, this.packetsReceived) ?? 0, this.packetRate = this.deltaPacketsReceived / s2), this.deltaConcealedSamples = positiveDelta(t4.concealedSamples, this.concealedSamples), this.deltaSilentConcealedSamples = positiveDelta(t4.silentConcealedSamples, this.silentConcealedSamples), this.deltaConcealmentEvents = positiveDelta(t4.concealmentEvents, this.concealmentEvents), this.deltaInsertedSamplesForDeceleration = positiveDelta(t4.insertedSamplesForDeceleration, this.insertedSamplesForDeceleration), this.deltaRemovedSamplesForAcceleration = positiveDelta(t4.removedSamplesForAcceleration, this.removedSamplesForAcceleration), this.deltaPacketsDiscarded = positiveDelta(t4.packetsDiscarded, this.packetsDiscarded), this.deltaJitterBufferEmittedCount = positiveDelta(t4.jitterBufferEmittedCount, this.jitterBufferEmittedCount), void 0 !== this.deltaConcealedSamples && 0 < (this.deltaTotalSamplesReceived ?? 0)) {
        const e3 = Math.max(0, this.deltaConcealedSamples - (this.deltaSilentConcealedSamples ?? 0));
        this.concealmentRate = e3 / this.deltaTotalSamplesReceived;
      } else this.concealmentRate = void 0;
      if (this.concealmentEventRate = void 0 !== this.deltaConcealmentEvents ? this.deltaConcealmentEvents / s2 : void 0, 0 < (this.deltaTotalSamplesReceived ?? 0)) {
        const e3 = (this.deltaInsertedSamplesForDeceleration ?? 0) + (this.deltaRemovedSamplesForAcceleration ?? 0);
        this.timeStretchRate = e3 / this.deltaTotalSamplesReceived;
      } else this.timeStretchRate = void 0;
      if (void 0 !== this.deltaPacketsDiscarded) {
        const e3 = this.deltaPacketsDiscarded + (this.deltaPacketsReceived ?? 0);
        this.discardRate = 0 < e3 ? this.deltaPacketsDiscarded / e3 : 0;
      }
      if (void 0 !== this.totalCorruptionProbability && void 0 !== t4.totalCorruptionProbability && void 0 !== this.corruptionMeasurements && void 0 !== t4.corruptionMeasurements) {
        const e3 = t4.totalCorruptionProbability - this.totalCorruptionProbability, i4 = Math.max(1, t4.corruptionMeasurements - this.corruptionMeasurements);
        this.deltaCorruptionProbability = Math.max(0, e3 / i4);
      }
      if (this.deltaJitterBufferDelay = positiveDelta(t4.jitterBufferDelay, this.jitterBufferDelay), this.deltaFramesDecoded = positiveDelta(t4.framesDecoded, this.framesDecoded), this.deltaFramesReceived = positiveDelta(t4.framesReceived, this.framesReceived), this.deltaFramesRendered = positiveDelta(t4.framesRendered, this.framesRendered), this.deltaFramesDropped = positiveDelta(t4.framesDropped, this.framesDropped), this.deltaKeyFramesDecoded = positiveDelta(t4.keyFramesDecoded, this.keyFramesDecoded), this.deltaTotalDecodeTime = positiveDelta(t4.totalDecodeTime, this.totalDecodeTime), this.deltaPliCount = positiveDelta(t4.pliCount, this.pliCount), this.deltaFirCount = positiveDelta(t4.firCount, this.firCount), this.deltaNackCount = positiveDelta(t4.nackCount, this.nackCount), this.deltaRetransmittedBytesReceived = positiveDelta(t4.retransmittedBytesReceived, this.retransmittedBytesReceived), this.deltaRetransmittedPacketsReceived = positiveDelta(t4.retransmittedPacketsReceived, this.retransmittedPacketsReceived), this.retransmissionRatio = void 0 !== this.deltaRetransmittedBytesReceived && 0 < (this.deltaBytesReceived ?? 0) ? Math.min(1, this.deltaRetransmittedBytesReceived / this.deltaBytesReceived) : void 0, this.avgJitterBufferDelayInMs = 0 < (this.deltaJitterBufferEmittedCount ?? 0) && void 0 !== this.deltaJitterBufferDelay ? this.deltaJitterBufferDelay / this.deltaJitterBufferEmittedCount * 1e3 : void 0, this.deltaJitterBufferTargetDelay = positiveDelta(t4.jitterBufferTargetDelay, this.jitterBufferTargetDelay), this.jitterBufferTargetDelayInMs = 0 < (this.deltaJitterBufferEmittedCount ?? 0) && void 0 !== this.deltaJitterBufferTargetDelay ? this.deltaJitterBufferTargetDelay / this.deltaJitterBufferEmittedCount * 1e3 : void 0, this.decodeTimePerFrameInMs = 0 < (this.deltaFramesDecoded ?? 0) && void 0 !== this.deltaTotalDecodeTime ? this.deltaTotalDecodeTime / this.deltaFramesDecoded * 1e3 : void 0, this.dropRatio = 0 < (this.deltaFramesReceived ?? 0) && void 0 !== this.deltaFramesDropped ? this.deltaFramesDropped / this.deltaFramesReceived : void 0, this.renderRatio = 0 < (this.deltaFramesDecoded ?? 0) && void 0 !== this.deltaFramesRendered ? this.deltaFramesRendered / this.deltaFramesDecoded : void 0, this.keyFrameRate = void 0 !== this.deltaKeyFramesDecoded ? this.deltaKeyFramesDecoded / s2 : void 0, this.pliRate = void 0 !== this.deltaPliCount ? this.deltaPliCount / s2 : void 0, this.firRate = void 0 !== this.deltaFirCount ? this.deltaFirCount / s2 : void 0, this.nackRate = void 0 !== this.deltaNackCount ? this.deltaNackCount / s2 : void 0, this.deltaTime = i3, Object.assign(this, t4), this.framesPerSecond) {
        this.lastNFramesPerSec.push(this.framesPerSecond), this.lastNFramesPerSec.length > 10 && this.lastNFramesPerSec.shift();
        const e3 = this.lastNFramesPerSec.reduce(((e4, t6) => e4 + t6), 0) / this.lastNFramesPerSec.length, t5 = this.lastNFramesPerSec.reduce(((t6, i4) => t6 + Math.abs(i4 - e3)), 0) / this.lastNFramesPerSec.length;
        this.avgFramesPerSec = e3, this.fpsVolatility = t5 / e3, this.bitrate && this.frameWidth && this.frameHeight && (this.bitPerPixel = this.bitrate / (this.frameWidth * this.frameHeight * this.framesPerSecond));
      }
      void 0 !== this.packetsReceived && void 0 !== this.packetsLost && (this.totalFractionLost = 0 < this.packetsReceived && 0 < this.packetsLost ? this.packetsLost / (this.packetsLost + this.packetsReceived) : 0), void 0 !== this.deltaPacketsReceived && void 0 !== this.deltaPacketsLost && (this.deltaFractionLost = 0 < this.deltaPacketsReceived && 0 < this.deltaPacketsLost ? this.deltaPacketsLost / (this.deltaPacketsLost + this.deltaPacketsReceived) : 0), void 0 !== this.framesPerSecond && (this.ewmaFps = this.ewmaFps ? 0.9 * this.ewmaFps + 0.1 * this.framesPerSecond : this.framesPerSecond);
    }
    getRemoteOutboundRtp() {
      return this._peerConnection.mappedRemoteOutboundRtpMonitors.get(this.ssrc);
    }
    getIceTransport() {
      return this._peerConnection.mappedIceTransportMonitors.get(this.transportId ?? "");
    }
    getCodec() {
      return this._peerConnection.mappedCodecMonitors.get(this.codecId ?? "");
    }
    getMediaPlayout() {
      return this._peerConnection.mappedMediaPlayoutMonitors.get(this.playoutId ?? "");
    }
    getTrack() {
      return this._peerConnection.mappedInboundTracks.get(this.trackIdentifier);
    }
    createSample() {
      return { timestamp: this.timestamp, id: this.id, ssrc: this.ssrc, kind: this.kind, trackIdentifier: this.trackIdentifier, transportId: this.transportId, codecId: this.codecId, packetsReceived: this.packetsReceived, packetsReceivedWithEct1: this.packetsReceivedWithEct1, packetsReceivedWithCe: this.packetsReceivedWithCe, packetsReportedAsLost: this.packetsReportedAsLost, packetsReportedAsLostButRecovered: this.packetsReportedAsLostButRecovered, packetsLost: this.packetsLost, jitter: this.jitter, mid: this.mid, remoteId: this.remoteId, framesDecoded: this.framesDecoded, keyFramesDecoded: this.keyFramesDecoded, framesRendered: this.framesRendered, framesDropped: this.framesDropped, frameWidth: this.frameWidth, frameHeight: this.frameHeight, framesPerSecond: this.framesPerSecond, qpSum: this.qpSum, totalDecodeTime: this.totalDecodeTime, totalInterFrameDelay: this.totalInterFrameDelay, totalSquaredInterFrameDelay: this.totalSquaredInterFrameDelay, pauseCount: this.pauseCount, totalPausesDuration: this.totalPausesDuration, freezeCount: this.freezeCount, totalFreezesDuration: this.totalFreezesDuration, lastPacketReceivedTimestamp: this.lastPacketReceivedTimestamp, headerBytesReceived: this.headerBytesReceived, packetsDiscarded: this.packetsDiscarded, fecBytesReceived: this.fecBytesReceived, fecPacketsReceived: this.fecPacketsReceived, fecPacketsDiscarded: this.fecPacketsDiscarded, bytesReceived: this.bytesReceived, nackCount: this.nackCount, firCount: this.firCount, pliCount: this.pliCount, totalProcessingDelay: this.totalProcessingDelay, estimatedPlayoutTimestamp: this.estimatedPlayoutTimestamp, jitterBufferDelay: this.jitterBufferDelay, jitterBufferTargetDelay: this.jitterBufferTargetDelay, jitterBufferEmittedCount: this.jitterBufferEmittedCount, jitterBufferMinimumDelay: this.jitterBufferMinimumDelay, totalSamplesReceived: this.totalSamplesReceived, concealedSamples: this.concealedSamples, silentConcealedSamples: this.silentConcealedSamples, concealmentEvents: this.concealmentEvents, insertedSamplesForDeceleration: this.insertedSamplesForDeceleration, removedSamplesForAcceleration: this.removedSamplesForAcceleration, audioLevel: this.audioLevel, totalAudioEnergy: this.totalAudioEnergy, totalSamplesDuration: this.totalSamplesDuration, framesReceived: this.framesReceived, decoderImplementation: this.decoderImplementation, playoutId: this.playoutId, powerEfficientDecoder: this.powerEfficientDecoder, framesAssembledFromMultiplePackets: this.framesAssembledFromMultiplePackets, totalAssemblyTime: this.totalAssemblyTime, retransmittedPacketsReceived: this.retransmittedPacketsReceived, retransmittedBytesReceived: this.retransmittedBytesReceived, rtxSsrc: this.rtxSsrc, fecSsrc: this.fecSsrc, totalCorruptionProbability: this.totalCorruptionProbability, totalSquaredCorruptionProbability: this.totalSquaredCorruptionProbability, corruptionMeasurements: this.corruptionMeasurements, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/AudioDesyncDetector.js
  var AudioDesyncDetector = class _AudioDesyncDetector {
    trackMonitor;
    static ISSUE_TYPE = "audio-desync";
    name = "audio-desync-detector";
    disabled = false;
    issueKey;
    constructor(e3) {
      this.trackMonitor = e3, this.issueKey = `${_AudioDesyncDetector.ISSUE_TYPE}-track-${e3.track.id}`;
    }
    _startedDesyncAt;
    _prevCorrectedSamples = 0;
    get config() {
      return this.peerConnection.parent.config.audioDesyncDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const e3 = this.trackMonitor.getInboundRtp();
      if (!e3 || "audio" !== e3.kind) return;
      const t4 = (e3.insertedSamplesForDeceleration ?? 0) + (e3.removedSamplesForAcceleration ?? 0) - this._prevCorrectedSamples;
      if (t4 < 1 || (e3.receivingAudioSamples ?? 0) < 1) return;
      const o2 = t4 / (t4 + (e3.receivingAudioSamples ?? 0)), r2 = e3.desync;
      e3.desync ? o2 < this.config.fractionalCorrectionAlertOffThreshold && (e3.desync = false) : e3.desync = this.config.fractionalCorrectionAlertOnThreshold < o2, e3.desync ? r2 || this._raise({ peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, dCorrectedSamples: t4, fractionalCorrection: o2 }) : r2 && this._resolve("Audio desync resolved after ");
    }
    _raise(e3) {
      this._startedDesyncAt = Date.now();
      const t4 = this.peerConnection.parent;
      t4.emit("audio-desync-track", { clientMonitor: t4, trackMonitor: this.trackMonitor }), t4.raiseIssue(this.issueKey, { type: _AudioDesyncDetector.ISSUE_TYPE, payload: e3 });
    }
    _resolve(e3) {
      const t4 = this.peerConnection.parent, o2 = t4.activeIssues.get(this.issueKey);
      let r2;
      o2 && (r2 = { ...o2.payload, durationInMs: this._startedDesyncAt ? Date.now() - this._startedDesyncAt : void 0 }), t4.resolveIssue(this.issueKey, { comment: e3, payload: r2, resolvedAt: Date.now() }), this._startedDesyncAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/utils/logger.js
  var defaultLogger = new class {
    trace = () => {
    };
    debug = () => {
    };
    info = () => {
    };
    warn = (...e3) => console.warn(...e3);
    error = (...e3) => console.error(...e3);
  }();
  function createLogger(e3 = defaultLogger) {
    return e3;
  }

  // node_modules/@observertc/client-monitor-js/dist/detectors/Detectors.js
  var Detectors = class {
    _detectors;
    logger;
    constructor(...e3) {
      this.logger = createLogger(), this._detectors = e3;
    }
    add(t4) {
      this._detectors.push(t4);
    }
    remove(t4) {
      this._detectors = this._detectors.filter(((e3) => e3 !== t4));
    }
    clear() {
      this._detectors = [];
    }
    get size() {
      return this._detectors.length;
    }
    get listOfNames() {
      return this._detectors.map(((t4) => t4.name));
    }
    [Symbol.iterator]() {
      return this._detectors[Symbol.iterator]();
    }
    has(t4) {
      return this._detectors.some(((e3) => e3.name === t4));
    }
    getByName(t4) {
      return this._detectors.find(((e3) => e3.name === t4));
    }
    find(t4) {
      return this._detectors.find(t4);
    }
    filter(t4) {
      return this._detectors.filter(t4);
    }
    disable(t4) {
      const e3 = this.getByName(t4);
      return !!e3 && (e3.disabled = true, true);
    }
    enable(t4) {
      const e3 = this.getByName(t4);
      return !!e3 && (e3.disabled = false, true);
    }
    disableAll() {
      for (const t4 of this._detectors) t4.disabled = true;
    }
    enableAll() {
      for (const t4 of this._detectors) t4.disabled = false;
    }
    isEnabled(t4) {
      const e3 = this.getByName(t4);
      return Boolean(e3) && !e3.disabled;
    }
    update() {
      for (const t4 of this._detectors) if (!t4.disabled) try {
        t4.update();
      } catch (e3) {
        this.logger.warn("[Detectors]:", `Error updating detector ${t4?.constructor?.name}`, e3);
      }
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/FreezedVideoTrackDetector.js
  var FreezedVideoTrackDetector = class _FreezedVideoTrackDetector {
    trackMonitor;
    static ISSUE_TYPE = "freezed-video-track";
    static KEYFRAME_STORM_ISSUE_TYPE = "keyframe-storm";
    static RECOVERY_FAILED_ISSUE_TYPE = "video-recovery-failed";
    name = "freezed-video-track-detector";
    disabled = false;
    static MAX_WINDOW_ENTRIES = 128;
    issueKey;
    _stormIssueKey;
    _recoveryIssueKey;
    _lastFreezeCount = 0;
    _startedFreezeAt;
    _window = [];
    _sumPlis = 0;
    _sumFirs = 0;
    _sumKeyFrames = 0;
    _stormOn = false;
    _stormStartedAt;
    _recoveryFailedOn = false;
    _recoveryFailedStartedAt;
    _stalledSince;
    _pliCountSinceStalled = 0;
    constructor(e3) {
      this.trackMonitor = e3, this.issueKey = `${_FreezedVideoTrackDetector.ISSUE_TYPE}-track-${e3.track.id}`, this._stormIssueKey = `${_FreezedVideoTrackDetector.KEYFRAME_STORM_ISSUE_TYPE}-track-${e3.track.id}`, this._recoveryIssueKey = `${_FreezedVideoTrackDetector.RECOVERY_FAILED_ISSUE_TYPE}-track-${e3.track.id}`;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const e3 = this.trackMonitor.getInboundRtp();
      if (!e3) return;
      const t4 = this.peerConnection.parent.config, i3 = true === e3.isFreezed, r2 = e3.freezeCount ?? 0, s2 = Math.max(0, r2 - this._lastFreezeCount);
      this._lastFreezeCount = r2;
      const o2 = 0 < s2 || i3 && 0 === e3.deltaFramesRendered;
      e3.isFreezed = o2, t4.videoFreezesDetector && this._checkFreeze(i3, o2, e3.trackIdentifier);
      const n3 = t4.videoRecoveryDetector;
      n3 && (this._updateWindow(n3, e3), this._checkRecoveryFailed(n3, o2, e3.deltaPliCount ?? 0, e3.deltaKeyFramesDecoded ?? 0, e3.freezeCount));
    }
    _checkFreeze(e3, t4, i3) {
      if (!e3 && t4) {
        const e4 = this.peerConnection.parent;
        e4.emit("freezed-video-track", { clientMonitor: e4, trackMonitor: this.trackMonitor }), this._startedFreezeAt = Date.now(), e4.raiseIssue(this.issueKey, { type: _FreezedVideoTrackDetector.ISSUE_TYPE, payload: { trackId: i3 } });
      } else e3 && !t4 && (this._resolve(this.issueKey, "video freeze ended", this._startedFreezeAt), this._startedFreezeAt = void 0);
    }
    _updateWindow(e3, t4) {
      const i3 = Date.now(), r2 = t4.deltaPliCount ?? 0, s2 = t4.deltaFirCount ?? 0, o2 = t4.deltaKeyFramesDecoded ?? 0;
      this._window.push({ timestamp: i3, pliCount: r2, firCount: s2, keyFramesDecoded: o2 }), this._sumPlis += r2, this._sumFirs += s2, this._sumKeyFrames += o2;
      for (let t5 = this._window[0]; t5 && (t5.timestamp < i3 - e3.windowInMs || _FreezedVideoTrackDetector.MAX_WINDOW_ENTRIES < this._window.length); t5 = this._window[0]) this._sumPlis -= t5.pliCount, this._sumFirs -= t5.firCount, this._sumKeyFrames -= t5.keyFramesDecoded, this._window.shift();
      this._checkKeyframeStorm(e3, i3);
    }
    _checkKeyframeStorm(e3, t4) {
      const i3 = this._window[0];
      if (!i3) return;
      const r2 = Math.max(1e3, t4 - i3.timestamp) / 1e3, s2 = this._sumPlis / r2;
      if (this._stormOn) return void (s2 < e3.pliRateAlertOff && (this._stormOn = false, this._resolve(this._stormIssueKey, "keyframe storm subsided", this._stormStartedAt), this._stormStartedAt = void 0));
      if (s2 <= e3.pliRateAlertOn) return;
      if (t4 - i3.timestamp < e3.windowInMs / 2) return;
      this._stormOn = true, this._stormStartedAt = t4;
      const o2 = this.peerConnection.parent;
      o2.emit("keyframe-storm", { clientMonitor: o2, trackMonitor: this.trackMonitor, pliRate: s2 }), o2.raiseIssue(this._stormIssueKey, { type: _FreezedVideoTrackDetector.KEYFRAME_STORM_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, pliRate: s2, firRate: this._sumFirs / r2, keyFrameRate: this._sumKeyFrames / r2, windowInMs: e3.windowInMs } });
    }
    _checkRecoveryFailed(e3, t4, i3, r2, s2) {
      if (!t4 || 0 < r2) return this._stalledSince = void 0, this._pliCountSinceStalled = 0, void (this._recoveryFailedOn && (this._recoveryFailedOn = false, this._resolve(this._recoveryIssueKey, "video recovered", this._recoveryFailedStartedAt), this._recoveryFailedStartedAt = void 0));
      if (i3 < 1 && void 0 === this._stalledSince) return;
      const o2 = Date.now();
      if (this._stalledSince ??= o2, this._pliCountSinceStalled += i3, this._recoveryFailedOn) return;
      const n3 = o2 - this._stalledSince;
      if (n3 < e3.recoveryFailedThresholdInMs) return;
      if (this._pliCountSinceStalled < e3.recoveryFailedMinPliCount) return;
      this._recoveryFailedOn = true, this._recoveryFailedStartedAt = o2;
      const a4 = this.peerConnection.parent;
      a4.emit("video-recovery-failed", { clientMonitor: a4, trackMonitor: this.trackMonitor, pliCountSinceStalled: this._pliCountSinceStalled, stalledForInMs: n3 }), a4.raiseIssue(this._recoveryIssueKey, { type: _FreezedVideoTrackDetector.RECOVERY_FAILED_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, pliCountSinceStalled: this._pliCountSinceStalled, stalledForInMs: n3, freezeCount: s2 } });
    }
    _resolve(e3, t4, i3) {
      const r2 = this.peerConnection.parent, s2 = r2.activeIssues.get(e3);
      let o2;
      s2 && (o2 = { ...s2.payload, durationInMs: i3 ? Date.now() - i3 : void 0 }), r2.resolveIssue(e3, { comment: t4, payload: o2, resolvedAt: Date.now() });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/DryInboundTrackDetector.js
  var DryInboundTrackDetector = class _DryInboundTrackDetector {
    trackMonitor;
    static ISSUE_TYPE = "dry-inbound-track";
    name = "dry-inbound-track-detector";
    disabled = false;
    issueKey;
    constructor(t4) {
      this.trackMonitor = t4, this.issueKey = `${_DryInboundTrackDetector.ISSUE_TYPE}-track-${t4.track.id}`;
    }
    _evented = false;
    _startedDryAt;
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    get config() {
      return this.peerConnection.parent.config.dryInboundTrackDetector;
    }
    _activatedAt;
    update() {
      if (this.disabled) return;
      if (this.trackMonitor.remoteOutboundTrackPaused) return void (this._activatedAt = void 0);
      if (0 !== this.trackMonitor.getInboundRtp()?.deltaBytesReceived) return this._activatedAt = void 0, void (this._evented && (this._resolve("dry inbound track recovered"), this._evented = false));
      this._activatedAt || (this._activatedAt = Date.now());
      const t4 = Date.now() - this._activatedAt, e3 = this.peerConnection.parent;
      t4 < this.config.thresholdInMs || this._evented || (e3.emit("dry-inbound-track", { trackMonitor: this.trackMonitor, clientMonitor: e3 }), this._raise({ trackId: this.trackMonitor.track.id, duration: t4 }), this._evented = true);
    }
    _raise(t4) {
      this._startedDryAt = this._startedDryAt ?? Date.now(), this.peerConnection.parent.raiseIssue(this.issueKey, { type: _DryInboundTrackDetector.ISSUE_TYPE, payload: t4 });
    }
    _resolve(t4) {
      const e3 = this.peerConnection.parent, r2 = e3.activeIssues.get(this.issueKey);
      let i3;
      r2 && (i3 = { ...r2.payload, durationInMs: this._startedDryAt ? Date.now() - this._startedDryAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: i3, resolvedAt: Date.now() }), this._startedDryAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/PlayoutDiscrepancyDetector.js
  var PlayoutDiscrepancyDetector = class _PlayoutDiscrepancyDetector {
    trackMonitor;
    static ISSUE_TYPE = "inbound-video-playout-discrepancy";
    name = "playout-discrepancy-detector";
    disabled = false;
    issueKey;
    _startedDiscrepancyAt;
    constructor(e3) {
      this.trackMonitor = e3, this.issueKey = `${_PlayoutDiscrepancyDetector.ISSUE_TYPE}-track-${e3.track.id}`;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    get config() {
      return this.peerConnection.parent.config.playoutDiscrepancyDetector;
    }
    active = false;
    update() {
      if (this.disabled) return;
      const e3 = this.trackMonitor.getInboundRtp();
      if (!(e3 && e3.deltaFramesReceived && e3.deltaFramesRendered && e3.ewmaFps)) return;
      const t4 = e3.deltaFramesReceived - e3.deltaFramesRendered;
      if (this.active) return t4 < this.config.lowSkewThreshold ? (this._resolve("playout discrepancy ended"), void (this.active = false)) : void 0;
      if (t4 < this.config.highSkewThreshold) return;
      this.active = true;
      const i3 = this.peerConnection.parent;
      i3.emit(_PlayoutDiscrepancyDetector.ISSUE_TYPE, { trackMonitor: this.trackMonitor, clientMonitor: i3 }), this._raise({ trackId: this.trackMonitor.track.id, frameSkew: t4, ewmaFps: e3.ewmaFps });
    }
    _raise(e3) {
      this._startedDiscrepancyAt = Date.now(), this.peerConnection.parent.raiseIssue(this.issueKey, { type: _PlayoutDiscrepancyDetector.ISSUE_TYPE, payload: e3 });
    }
    _resolve(e3) {
      const t4 = this.peerConnection.parent, i3 = t4.activeIssues.get(this.issueKey);
      let s2;
      i3 && (s2 = { ...i3.payload, durationInMs: this._startedDiscrepancyAt ? Date.now() - this._startedDiscrepancyAt : void 0 }), t4.resolveIssue(this.issueKey, { comment: e3, payload: s2, resolvedAt: Date.now() }), this._startedDiscrepancyAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/AudioConcealmentDetector.js
  var AudioConcealmentDetector = class _AudioConcealmentDetector {
    trackMonitor;
    static ISSUE_TYPE = "audio-concealment";
    name = "audio-concealment-detector";
    disabled = false;
    static MAX_WINDOW_ENTRIES = 128;
    issueKey;
    _window = [];
    _sumAudible = 0;
    _sumTotal = 0;
    _sumEvents = 0;
    _alertOn = false;
    _startedAt;
    constructor(t4) {
      this.trackMonitor = t4, this.issueKey = `${_AudioConcealmentDetector.ISSUE_TYPE}-track-${t4.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.audioConcealmentDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const t4 = this.trackMonitor.getInboundRtp();
      if (!t4 || "audio" !== t4.kind) return;
      if (this.trackMonitor.remoteOutboundTrackPaused) return this._resetWindow(), this._alertOn ? this._clear("remote track paused") : void 0;
      const e3 = t4.deltaTotalSamplesReceived;
      if (void 0 === e3) return;
      const n3 = Math.max(0, (t4.deltaConcealedSamples ?? 0) - (t4.deltaSilentConcealedSamples ?? 0)), s2 = Date.now(), i3 = t4.deltaConcealmentEvents ?? 0;
      this._window.push({ timestamp: s2, audibleConcealedSamples: n3, totalSamplesReceived: e3, concealmentEvents: i3 }), this._sumAudible += n3, this._sumTotal += e3, this._sumEvents += i3;
      const o2 = this.config.windowInMs;
      for (let t5 = this._window[0]; t5 && (t5.timestamp < s2 - o2 || _AudioConcealmentDetector.MAX_WINDOW_ENTRIES < this._window.length); t5 = this._window[0]) this._sumAudible -= t5.audibleConcealedSamples, this._sumTotal -= t5.totalSamplesReceived, this._sumEvents -= t5.concealmentEvents, this._window.shift();
      const a4 = this._window[0];
      if (!a4) return;
      if (this._sumTotal < this.config.minSamplesInWindow) return;
      const r2 = this._sumAudible / this._sumTotal, c = Math.max(1, s2 - a4.timestamp) / 1e3, l = this._sumEvents / c;
      if (this._alertOn) return void (r2 < this.config.offThreshold && this._clear("concealment back to normal"));
      if (r2 <= this.config.onThreshold) return;
      this._alertOn = true, this._startedAt = s2;
      const d = this.peerConnection.parent;
      d.emit("audio-concealment", { clientMonitor: d, trackMonitor: this.trackMonitor, concealmentRate: r2, concealmentEventRate: l }), d.raiseIssue(this.issueKey, { type: _AudioConcealmentDetector.ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, concealmentRate: r2, concealmentEventRate: l, burstiness: this._classifyBurstiness(this._sumAudible, this._sumEvents), windowInMs: o2 } });
    }
    _resetWindow() {
      this._window.length = 0, this._sumAudible = 0, this._sumTotal = 0, this._sumEvents = 0;
    }
    _classifyBurstiness(t4, e3) {
      if (e3 < 1) return "unknown";
      return t4 / e3 < 4800 ? "bursty" : "continuous";
    }
    _clear(t4) {
      this._alertOn = false;
      const e3 = this.peerConnection.parent, n3 = e3.activeIssues.get(this.issueKey);
      let s2;
      n3 && (s2 = { ...n3.payload, durationInMs: this._startedAt ? Date.now() - this._startedAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: s2, resolvedAt: Date.now() }), this._startedAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/JitterBufferStressDetector.js
  var JitterBufferStressDetector = class _JitterBufferStressDetector {
    trackMonitor;
    static ISSUE_TYPE = "audio-jitter-buffer-stress";
    name = "jitter-buffer-stress-detector";
    disabled = false;
    issueKey;
    _consecutiveTicks = 0;
    _alertOn = false;
    _startedAt;
    constructor(t4) {
      this.trackMonitor = t4, this.issueKey = `${_JitterBufferStressDetector.ISSUE_TYPE}-track-${t4.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.jitterBufferStressDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const t4 = this.trackMonitor.getInboundRtp();
      if (!t4 || "audio" !== t4.kind) return;
      if (this.trackMonitor.remoteOutboundTrackPaused) return this._consecutiveTicks = 0, this._alertOn ? this._clear("remote track paused") : void 0;
      const e3 = t4.jitterBufferTargetDelayInMs, i3 = t4.timeStretchRate;
      if (void 0 === e3 || void 0 === i3) return;
      if (!(this.config.targetDelayThresholdInMs < e3 && this.config.timeStretchThreshold < i3)) return this._consecutiveTicks = 0, void (this._alertOn && this._clear("jitter buffer recovered"));
      if (this._consecutiveTicks += 1, this._alertOn) return;
      if (this._consecutiveTicks < this.config.minConsecutiveTicks) return;
      this._alertOn = true, this._startedAt = Date.now();
      const r2 = this.peerConnection.parent;
      r2.emit("audio-jitter-buffer-stress", { clientMonitor: r2, trackMonitor: this.trackMonitor, targetDelayInMs: e3, timeStretchRate: i3 }), r2.raiseIssue(this.issueKey, { type: _JitterBufferStressDetector.ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, targetDelayInMs: e3, actualDelayInMs: t4.avgJitterBufferDelayInMs, timeStretchRate: i3, consecutiveTicks: this._consecutiveTicks } });
    }
    _clear(t4) {
      this._alertOn = false;
      const e3 = this.peerConnection.parent, i3 = e3.activeIssues.get(this.issueKey);
      let r2;
      i3 && (r2 = { ...i3.payload, durationInMs: this._startedAt ? Date.now() - this._startedAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: r2, resolvedAt: Date.now() }), this._startedAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/DecoderPerformanceDetector.js
  var DecoderPerformanceDetector = class _DecoderPerformanceDetector {
    trackMonitor;
    static ISSUE_TYPE = "video-decoder-overloaded";
    name = "decoder-performance-detector";
    disabled = false;
    issueKey;
    _consecutiveTicks = 0;
    _alertOn = false;
    _startedAt;
    constructor(e3) {
      this.trackMonitor = e3, this.issueKey = `${_DecoderPerformanceDetector.ISSUE_TYPE}-track-${e3.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.decoderPerformanceDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const e3 = this.trackMonitor.getInboundRtp();
      if (!e3 || "video" !== e3.kind) return;
      const t4 = e3.deltaFramesReceived ?? 0;
      if (t4 < this.config.minFramesReceived) return this._consecutiveTicks = 0, this._alertOn ? this._clear("not enough frames to evaluate") : void 0;
      const i3 = e3.deltaFractionLost ?? 0;
      if (this.config.quietLossThreshold < i3) return this._consecutiveTicks = 0, this._alertOn ? this._clear("loss dominates; not a decoder problem") : void 0;
      const o2 = e3.framesPerSecond ?? e3.avgFramesPerSec, r2 = o2 && 0 < o2 ? 1e3 / o2 : void 0, n3 = e3.decodeTimePerFrameInMs, s2 = void 0 !== r2 && void 0 !== n3 && r2 * this.config.decodeTimeBudgetRatio < n3, c = void 0 !== e3.dropRatio && this.config.dropRatioThreshold < e3.dropRatio;
      if (!s2 && !c) return this._consecutiveTicks = 0, void (this._alertOn && this._clear("decoder keeping up again"));
      if (this._consecutiveTicks += 1, this._alertOn) return;
      if (this._consecutiveTicks < this.config.minConsecutiveTicks) return;
      this._alertOn = true, this._startedAt = Date.now();
      const d = this.peerConnection.parent;
      d.emit("video-decoder-overloaded", { clientMonitor: d, trackMonitor: this.trackMonitor, decodeTimePerFrameInMs: n3, frameBudgetInMs: r2 }), d.raiseIssue(this.issueKey, { type: _DecoderPerformanceDetector.ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, decodeTimePerFrameInMs: n3, frameBudgetInMs: r2, dropRatio: e3.dropRatio, renderRatio: e3.renderRatio, framesReceived: t4, decoderImplementation: e3.decoderImplementation, powerEfficientDecoder: e3.powerEfficientDecoder, consecutiveTicks: this._consecutiveTicks } });
    }
    _clear(e3) {
      this._alertOn = false;
      const t4 = this.peerConnection.parent, i3 = t4.activeIssues.get(this.issueKey);
      let o2;
      i3 && (o2 = { ...i3.payload, durationInMs: this._startedAt ? Date.now() - this._startedAt : void 0 }), t4.resolveIssue(this.issueKey, { comment: e3, payload: o2, resolvedAt: Date.now() }), this._startedAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/StuckDecoderDetector.js
  var StuckDecoderDetector = class _StuckDecoderDetector {
    trackMonitor;
    static ISSUE_TYPE = "stuck-decoder";
    name = "stuck-decoder-detector";
    disabled = false;
    issueKey;
    _stuckSince;
    _stuckTicks = 0;
    _deadBytes = 0;
    _plisSinceStuck = 0;
    _sawAssembledFrames = false;
    _alertOn = false;
    _startedAt;
    constructor(t4) {
      this.trackMonitor = t4, this.issueKey = `${_StuckDecoderDetector.ISSUE_TYPE}-track-${t4.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.stuckDecoderDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const t4 = this.trackMonitor.getInboundRtp();
      if (!t4 || "video" !== t4.kind) return;
      if (this.trackMonitor.remoteOutboundTrackPaused) return this._reset("remote track paused");
      const e3 = t4.deltaBytesReceived ?? 0, s2 = t4.deltaFramesDecoded;
      if (void 0 === s2 || 0 < s2) return this._reset("frames decoding");
      if ((t4.bitrate ?? 0) < this.config.minBitrate) return this._reset("rtp not flowing");
      const i3 = Date.now();
      if (this._stuckSince ??= i3, this._stuckTicks += 1, this._deadBytes += e3, this._plisSinceStuck += t4.deltaPliCount ?? 0, 0 < (t4.deltaFramesReceived ?? 0) && (this._sawAssembledFrames = true), this._alertOn) return;
      const r2 = i3 - this._stuckSince, n3 = 1e3 * (this.peerConnection.avgRttInSec ?? 0);
      if (r2 < Math.max(this.config.thresholdInMs, this.config.rttMultiplier * n3)) return;
      if (this._stuckTicks < this.config.minStuckTicks) return;
      if (this._plisSinceStuck < this.config.minPliCount) return;
      this._alertOn = true, this._startedAt = i3;
      const c = void 0 === t4.deltaFramesReceived ? "unknown" : this._sawAssembledFrames ? "decode" : "assembly", o2 = this.peerConnection.parent;
      o2.emit("stuck-decoder", { clientMonitor: o2, trackMonitor: this.trackMonitor, variant: c, stuckForInMs: r2, deadBytesReceived: this._deadBytes, pliCountSinceStuck: this._plisSinceStuck }), o2.raiseIssue(this.issueKey, { type: _StuckDecoderDetector.ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, ssrc: t4.ssrc, variant: c, stuckForInMs: r2, deadBytesReceived: this._deadBytes, pliCountSinceStuck: this._plisSinceStuck, frameWidth: t4.frameWidth, frameHeight: t4.frameHeight, decoderImplementation: t4.decoderImplementation } });
    }
    _reset(t4) {
      if (this._stuckSince = void 0, this._stuckTicks = 0, this._deadBytes = 0, this._plisSinceStuck = 0, this._sawAssembledFrames = false, !this._alertOn) return;
      this._alertOn = false;
      const e3 = this.peerConnection.parent, s2 = e3.activeIssues.get(this.issueKey);
      let i3;
      s2 && (i3 = { ...s2.payload, durationInMs: this._startedAt ? Date.now() - this._startedAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: i3, resolvedAt: Date.now() }), this._startedAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/schema/ClientEventTypes.js
  var ClientEventTypes;
  !(function(E) {
    E.CLIENT_JOINED = "CLIENT_JOINED", E.CLIENT_LEFT = "CLIENT_LEFT", E.PEER_CONNECTION_OPENED = "PEER_CONNECTION_OPENED", E.PEER_CONNECTION_CLOSED = "PEER_CONNECTION_CLOSED", E.MEDIA_TRACK_ADDED = "MEDIA_TRACK_ADDED", E.MEDIA_TRACK_REMOVED = "MEDIA_TRACK_REMOVED", E.MEDIA_TRACK_RESUMED = "MEDIA_TRACK_RESUMED", E.MEDIA_TRACK_MUTED = "MEDIA_TRACK_MUTED", E.MEDIA_TRACK_UNMUTED = "MEDIA_TRACK_UNMUTED", E.ICE_GATHERING_STATE_CHANGED = "ICE_GATHERING_STATE_CHANGED", E.PEER_CONNECTION_STATE_CHANGED = "PEER_CONNECTION_STATE_CHANGED", E.ICE_CONNECTION_STATE_CHANGED = "ICE_CONNECTION_STATE_CHANGED", E.DATA_CHANNEL_OPEN = "DATA_CHANNEL_OPEN", E.DATA_CHANNEL_CLOSED = "DATA_CHANNEL_CLOSED", E.DATA_CHANNEL_ERROR = "DATA_CHANNEL_ERROR", E.NEGOTIATION_NEEDED = "NEGOTIATION_NEEDED", E.SIGNALING_STATE_CHANGE = "SIGNALING_STATE_CHANGE", E.ICE_CANDIDATE = "ICE_CANDIDATE", E.ICE_CANDIDATE_ERROR = "ICE_CANDIDATE_ERROR", E.PEER_CONNECTION_ICE_PATH_CHANGED = "PEER_CONNECTION_ICE_PATH_CHANGED", E.ICE_RESTART = "ICE_RESTART", E.ICE_RESTART_RECOMMENDED = "ICE_RESTART_RECOMMENDED", E.LONG_PC_CONNECTION_ESTABLISHMENT = "LONG_PC_CONNECTION_ESTABLISHMENT", E.EXCESSIVE_SYNTHESIZED_AUDIO = "EXCESSIVE_SYNTHESIZED_AUDIO", E.CODEC_CHANGED = "CODEC_CHANGED", E.VIDEO_RESOLUTION_CHANGED = "VIDEO_RESOLUTION_CHANGED", E.SIMULCAST_LAYER_CHANGED = "SIMULCAST_LAYER_CHANGED", E.CAPTURE_TRACK_ENDED = "CAPTURE_TRACK_ENDED", E.CAPTURE_TRACK_MUTED = "CAPTURE_TRACK_MUTED", E.STATS_COLLECTION_GAP = "STATS_COLLECTION_GAP", E.PRODUCER_ADDED = "PRODUCER_ADDED", E.PRODUCER_REMOVED = "PRODUCER_REMOVED", E.PRODUCER_PAUSED = "PRODUCER_PAUSED", E.PRODUCER_RESUMED = "PRODUCER_RESUMED", E.CONSUMER_ADDED = "CONSUMER_ADDED", E.CONSUMER_REMOVED = "CONSUMER_REMOVED", E.CONSUMER_PAUSED = "CONSUMER_PAUSED", E.CONSUMER_RESUMED = "CONSUMER_RESUMED", E.DATA_PRODUCER_CREATED = "DATA_PRODUCER_CREATED", E.DATA_PRODUCER_CLOSED = "DATA_PRODUCER_CLOSED", E.DATA_CONSUMER_CREATED = "DATA_CONSUMER_CREATED", E.DATA_CONSUMER_CLOSED = "DATA_CONSUMER_CLOSED";
  })(ClientEventTypes || (ClientEventTypes = {}));

  // node_modules/@observertc/client-monitor-js/dist/detectors/VideoResolutionChangeDetector.js
  var VideoResolutionChangeDetector = class {
    trackMonitor;
    name = "video-resolution-change-detector";
    disabled = false;
    _width;
    _height;
    constructor(t4) {
      this.trackMonitor = t4;
    }
    get config() {
      return this.peerConnection.parent.config.videoResolutionChangeDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      if ("video" !== this.trackMonitor.kind) return;
      const i3 = "inbound" === this.trackMonitor.direction ? this.trackMonitor.getInboundRtp() : this.trackMonitor.getHighestLayer();
      if (!i3) return;
      const e3 = i3.frameWidth, o2 = i3.frameHeight;
      if (void 0 === e3 || void 0 === o2) return;
      if (e3 < 1 || o2 < 1) return;
      const n3 = this._width, r2 = this._height;
      if (this._width = e3, this._height = o2, void 0 === n3 || void 0 === r2) return;
      if (n3 === e3 && r2 === o2) return;
      const h3 = n3 * r2, a4 = e3 * o2, c = a4 > h3 ? "upgrade" : a4 < h3 ? "downgrade" : "reshape", d = "outbound" === this.trackMonitor.direction ? i3.qualityLimitationReason : void 0, s2 = this.peerConnection.parent;
      s2.emit("video-resolution-changed", { clientMonitor: s2, trackMonitor: this.trackMonitor, direction: c, from: { width: n3, height: r2 }, to: { width: e3, height: o2 }, qualityLimitationReason: d }), false !== this.config.createEvent && s2.addEvent({ type: ClientEventTypes.VIDEO_RESOLUTION_CHANGED, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, direction: this.trackMonitor.direction, change: c, fromWidth: n3, fromHeight: r2, width: e3, height: o2, framesPerSecond: i3.framesPerSecond, qualityLimitationReason: d } });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/CodecChangeDetector.js
  var CodecChangeDetector = class {
    trackMonitor;
    name = "codec-change-detector";
    disabled = false;
    _mimeType;
    _fmtp;
    constructor(e3) {
      this.trackMonitor = e3;
    }
    get config() {
      return this.peerConnection.parent.config.codecChangeDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      const t4 = "inbound" === this.trackMonitor.direction ? this.trackMonitor.getInboundRtp() : this.trackMonitor.getHighestLayer(), i3 = t4?.getCodec();
      if (!i3?.mimeType) return;
      const n3 = this._mimeType, o2 = this._fmtp;
      if (this._mimeType = i3.mimeType, this._fmtp = i3.sdpFmtpLine, void 0 === n3) return;
      if (n3 === i3.mimeType && o2 === i3.sdpFmtpLine) return;
      const r2 = this.peerConnection.parent;
      r2.emit("codec-changed", { clientMonitor: r2, trackMonitor: this.trackMonitor, from: { mimeType: n3, sdpFmtpLine: o2 }, to: { mimeType: i3.mimeType, sdpFmtpLine: i3.sdpFmtpLine } }), false !== this.config.createEvent && r2.addEvent({ type: ClientEventTypes.CODEC_CHANGED, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, direction: this.trackMonitor.direction, kind: this.trackMonitor.kind, fromMimeType: n3, fromSdpFmtpLine: o2, mimeType: i3.mimeType, sdpFmtpLine: i3.sdpFmtpLine, payloadType: i3.payloadType, clockRate: i3.clockRate, channels: i3.channels } });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/InboundTrackMonitor.js
  var InboundTrackMonitor = class {
    track;
    _inboundRtp;
    direction = "inbound";
    detectors;
    dtxMode = false;
    remoteOutboundTrackPaused = false;
    calculatedScore = { weight: 0, value: void 0 };
    get score() {
      return this.calculatedScore.value;
    }
    get scoreReasons() {
      return this.calculatedScore.reasons;
    }
    attachments;
    appData;
    constructor(h3, l, m) {
      this.track = h3, this._inboundRtp = l, this.attachments = m;
      const p = this.getPeerConnection().parent.config;
      this.detectors = new Detectors(), null !== p.dryInboundTrackDetector && this.detectors.add(new DryInboundTrackDetector(this)), null !== p.codecChangeDetector && this.detectors.add(new CodecChangeDetector(this)), "audio" === this.kind ? (null !== p.audioDesyncDetector && this.detectors.add(new AudioDesyncDetector(this)), null !== p.audioConcealmentDetector && this.detectors.add(new AudioConcealmentDetector(this)), null !== p.jitterBufferStressDetector && this.detectors.add(new JitterBufferStressDetector(this)), this.calculatedScore.weight = 1) : "video" === this.kind && (null === p.videoFreezesDetector && null === p.videoRecoveryDetector || this.detectors.add(new FreezedVideoTrackDetector(this)), null !== p.playoutDiscrepancyDetector && this.detectors.add(new PlayoutDiscrepancyDetector(this)), null !== p.decoderPerformanceDetector && this.detectors.add(new DecoderPerformanceDetector(this)), null !== p.stuckDecoderDetector && this.detectors.add(new StuckDecoderDetector(this)), null !== p.videoResolutionChangeDetector && this.detectors.add(new VideoResolutionChangeDetector(this)), this.calculatedScore.weight = 2), "probator" === this.track.id && this.detectors.clear();
    }
    getInboundRtp() {
      return this._inboundRtp;
    }
    getPeerConnection() {
      return this._inboundRtp.getPeerConnection();
    }
    get kind() {
      return this._inboundRtp.kind;
    }
    get bitrate() {
      return this._inboundRtp.bitrate;
    }
    get jitter() {
      return this._inboundRtp.jitter;
    }
    get fractionLost() {
      return this._inboundRtp.deltaFractionLost;
    }
    update() {
      this.detectors.update();
    }
    createSample() {
      let t4;
      return "audio" === this.kind ? t4 = this.getPeerConnection()?.parent.scoreCalculator?.encodeInboundAudioScoreReasons?.(this.calculatedScore.reasons) : "video" === this.kind && (t4 = this.getPeerConnection()?.parent.scoreCalculator?.encodeInboundVideoScoreReasons?.(this.calculatedScore.reasons)), { id: this.track.id, kind: this.track.kind, timestamp: Date.now(), attachments: this.attachments, score: this.score, scoreReasons: t4 };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/SynthesizedSamplesDetector.js
  var SynthesizedSamplesDetector = class {
    mediaPlayout;
    name = "synthesized-samples-detector";
    disabled = false;
    constructor(e3) {
      this.mediaPlayout = e3;
    }
    get peerConnection() {
      return this.mediaPlayout.getPeerConnection();
    }
    get config() {
      return this.peerConnection.parent.config.syntheticSamplesDetector;
    }
    update() {
      if (this.disabled) return;
      if (this.mediaPlayout.deltaSynthesizedSamplesDuration <= this.config.minSynthesizedSamplesDuration) return;
      const t4 = this.peerConnection.parent;
      t4.emit("synthesized-audio", { mediaPlayoutMonitor: this.mediaPlayout, clientMonitor: t4 }), this.config.createEvent && t4.addEvent({ type: ClientEventTypes.EXCESSIVE_SYNTHESIZED_AUDIO, payload: { deltaSynthesizedSamplesDuration: this.mediaPlayout.deltaSynthesizedSamplesDuration } });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/MediaPlayoutMonitor.js
  var MediaPlayoutMonitor = class {
    _peerConnection;
    _visited = true;
    detectors = new Detectors();
    timestamp;
    id;
    kind;
    synthesizedSamplesDuration;
    synthesizedSamplesEvents;
    totalSamplesDuration;
    totalPlayoutDelay;
    totalSamplesCount;
    deltaSynthesizedSamplesDuration = 0;
    deltaSamplesDuration = 0;
    deltaSynthesizedSamplesEvents;
    deltaTotalPlayoutDelay;
    deltaSamplesCount;
    playoutDelayPerSampleInMs;
    synthesizedSamplesRatio;
    attachments;
    appData;
    constructor(t4, s2) {
      this._peerConnection = t4, this.id = s2.id, this.timestamp = s2.timestamp, this.kind = s2.kind, Object.assign(this, s2), null !== this._peerConnection.parent.config.syntheticSamplesDetector && this.detectors.add(new SynthesizedSamplesDetector(this));
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || (this.deltaSynthesizedSamplesDuration = positiveDelta(t4.synthesizedSamplesDuration, this.synthesizedSamplesDuration) ?? 0, this.deltaSamplesDuration = positiveDelta(t4.totalSamplesDuration, this.totalSamplesDuration) ?? 0, this.deltaSynthesizedSamplesEvents = positiveDelta(t4.synthesizedSamplesEvents, this.synthesizedSamplesEvents), this.deltaTotalPlayoutDelay = positiveDelta(t4.totalPlayoutDelay, this.totalPlayoutDelay), this.deltaSamplesCount = positiveDelta(t4.totalSamplesCount, this.totalSamplesCount), void 0 !== this.deltaTotalPlayoutDelay && void 0 !== this.deltaSamplesCount && this.deltaSamplesCount > 0 ? this.playoutDelayPerSampleInMs = 1e3 * this.deltaTotalPlayoutDelay / this.deltaSamplesCount : this.playoutDelayPerSampleInMs = void 0, this.synthesizedSamplesRatio = this.deltaSamplesDuration > 0 ? Math.min(1, this.deltaSynthesizedSamplesDuration / this.deltaSamplesDuration) : 0, Object.assign(this, t4), this.detectors.update());
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, kind: this.kind, synthesizedSamplesDuration: this.synthesizedSamplesDuration, synthesizedSamplesEvents: this.synthesizedSamplesEvents, totalSamplesDuration: this.totalSamplesDuration, totalPlayoutDelay: this.totalPlayoutDelay, totalSamplesCount: this.totalSamplesCount, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/MediaSourceMonitor.js
  var MediaSourceMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    kind;
    audioLevel;
    trackIdentifier;
    totalAudioEnergy;
    totalSamplesDuration;
    echoReturnLoss;
    echoReturnLossEnhancement;
    width;
    height;
    frames;
    framesPerSecond;
    deltaFrames;
    deltaTotalAudioEnergy;
    deltaSamplesDuration;
    sourceFps;
    rmsAudioLevel;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, this.kind = e3.kind, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getTrack() {
      return this._peerConnection.mappedOutboundTracks.get(this.trackIdentifier ?? "");
    }
    getOutboundRtps() {
      return this._peerConnection.outboundRtps.filter(((t4) => t4.mediaSourceId === this.id));
    }
    accept(e3) {
      this._visited = true;
      const i3 = e3.timestamp - this.timestamp;
      if (i3 <= 0) return;
      const s2 = i3 / 1e3;
      this.deltaFrames = positiveDelta(e3.frames, this.frames), this.deltaTotalAudioEnergy = positiveDelta(e3.totalAudioEnergy, this.totalAudioEnergy), this.deltaSamplesDuration = positiveDelta(e3.totalSamplesDuration, this.totalSamplesDuration), this.sourceFps = void 0 !== this.deltaFrames ? this.deltaFrames / s2 : void 0, this.rmsAudioLevel = void 0 !== this.deltaTotalAudioEnergy && void 0 !== this.deltaSamplesDuration && this.deltaSamplesDuration > 0 ? Math.sqrt(this.deltaTotalAudioEnergy / this.deltaSamplesDuration) : void 0, Object.assign(this, e3);
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, kind: this.kind, audioLevel: this.audioLevel, trackIdentifier: this.trackIdentifier, totalAudioEnergy: this.totalAudioEnergy, totalSamplesDuration: this.totalSamplesDuration, echoReturnLoss: this.echoReturnLoss, echoReturnLossEnhancement: this.echoReturnLossEnhancement, width: this.width, height: this.height, frames: this.frames, framesPerSecond: this.framesPerSecond, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/OutboundRtpMonitor.js
  var OutboundRtpMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    ssrc;
    kind;
    qualityLimitationDurations;
    transportId;
    codecId;
    packetsSent;
    bytesSent;
    mid;
    mediaSourceId;
    remoteId;
    rid;
    encodingIndex;
    headerBytesSent;
    retransmittedPacketsSent;
    retransmittedBytesSent;
    rtxSsrc;
    targetBitrate;
    totalEncodedBytesTarget;
    frameWidth;
    frameHeight;
    framesPerSecond;
    framesSent;
    hugeFramesSent;
    framesEncoded;
    keyFramesEncoded;
    qpSum;
    psnrSum;
    psnrMeasurements;
    totalEncodeTime;
    totalPacketSendDelay;
    qualityLimitationReason;
    qualityLimitationResolutionChanges;
    nackCount;
    firCount;
    pliCount;
    encoderImplementation;
    powerEfficientEncoder;
    active;
    scalabilityMode;
    packetsSentWithEct1;
    bitrate;
    payloadBitrate;
    packetRate;
    bitPerPixel;
    deltaPacketsSent;
    deltaBytesSent;
    deltaHeaderBytesSent;
    deltaRetransmittedPacketsSent;
    deltaRetransmittedBytesSent;
    deltaFramesSent;
    deltaFramesEncoded;
    deltaKeyFramesEncoded;
    deltaHugeFramesSent;
    deltaTotalEncodeTime;
    deltaTotalPacketSendDelay;
    deltaQpSum;
    deltaNackCount;
    deltaFirCount;
    deltaPliCount;
    encodeTimePerFrameInMs;
    retransmissionRatio;
    retransmittedPacketRatio;
    avgQpPerFrame;
    avgPacketSendDelayInMs;
    keyFrameRate;
    nackRate;
    pliRate;
    firRate;
    qualityLimitationDurationShares;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, this.ssrc = e3.ssrc, this.kind = e3.kind, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    get trackIdentifier() {
      return this.getMediaSource()?.trackIdentifier;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getRemoteInboundRtp() {
      return this._peerConnection.mappedRemoteInboundRtpMonitors.get(this.ssrc);
    }
    getCodec() {
      return this._peerConnection.mappedCodecMonitors.get(this.codecId ?? "");
    }
    getMediaSource() {
      return this._peerConnection.mappedMediaSourceMonitors.get(this.mediaSourceId ?? "");
    }
    getTrack() {
      return this.getMediaSource()?.getTrack() ?? this._peerConnection.mappedOutboundTracks.get(this.trackIdentifier ?? "");
    }
    accept(e3) {
      this._visited = true;
      const i3 = e3.timestamp - this.timestamp;
      if (i3 <= 0) return;
      const a4 = i3 / 1e3;
      if (this.deltaPacketsSent = positiveDelta(e3.packetsSent, this.packetsSent), void 0 !== this.deltaPacketsSent && (this.packetRate = this.deltaPacketsSent / a4), this.deltaBytesSent = positiveDelta(e3.bytesSent, this.bytesSent), this.deltaHeaderBytesSent = positiveDelta(e3.headerBytesSent, this.headerBytesSent), this.deltaRetransmittedBytesSent = positiveDelta(e3.retransmittedBytesSent, this.retransmittedBytesSent), this.deltaRetransmittedPacketsSent = positiveDelta(e3.retransmittedPacketsSent, this.retransmittedPacketsSent), void 0 !== this.deltaBytesSent) {
        if (this.bitrate = Math.max(0, 8 * this.deltaBytesSent / a4), void 0 !== this.deltaHeaderBytesSent) {
          const t4 = this.deltaBytesSent - this.deltaHeaderBytesSent - (this.deltaRetransmittedBytesSent ?? 0);
          this.payloadBitrate = Math.max(0, 8 * t4 / a4);
        }
        this.retransmissionRatio = this.deltaBytesSent > 0 && void 0 !== this.deltaRetransmittedBytesSent ? Math.min(1, this.deltaRetransmittedBytesSent / this.deltaBytesSent) : 0;
      }
      void 0 !== this.deltaPacketsSent && void 0 !== this.deltaRetransmittedPacketsSent && (this.retransmittedPacketRatio = this.deltaPacketsSent > 0 ? Math.min(1, this.deltaRetransmittedPacketsSent / this.deltaPacketsSent) : 0), this.deltaFramesSent = positiveDelta(e3.framesSent, this.framesSent), this.deltaFramesEncoded = positiveDelta(e3.framesEncoded, this.framesEncoded), this.deltaKeyFramesEncoded = positiveDelta(e3.keyFramesEncoded, this.keyFramesEncoded), this.deltaHugeFramesSent = positiveDelta(e3.hugeFramesSent, this.hugeFramesSent), this.deltaTotalEncodeTime = positiveDelta(e3.totalEncodeTime, this.totalEncodeTime), this.deltaTotalPacketSendDelay = positiveDelta(e3.totalPacketSendDelay, this.totalPacketSendDelay), this.deltaQpSum = positiveDelta(e3.qpSum, this.qpSum), this.deltaNackCount = positiveDelta(e3.nackCount, this.nackCount), this.deltaFirCount = positiveDelta(e3.firCount, this.firCount), this.deltaPliCount = positiveDelta(e3.pliCount, this.pliCount), void 0 !== this.deltaFramesEncoded && this.deltaFramesEncoded > 0 && (void 0 !== this.deltaTotalEncodeTime && (this.encodeTimePerFrameInMs = 1e3 * this.deltaTotalEncodeTime / this.deltaFramesEncoded), void 0 !== this.deltaQpSum && (this.avgQpPerFrame = this.deltaQpSum / this.deltaFramesEncoded)), void 0 !== this.deltaTotalPacketSendDelay && void 0 !== this.deltaPacketsSent && this.deltaPacketsSent > 0 && (this.avgPacketSendDelayInMs = 1e3 * this.deltaTotalPacketSendDelay / this.deltaPacketsSent), void 0 !== this.deltaKeyFramesEncoded && (this.keyFrameRate = this.deltaKeyFramesEncoded / a4), void 0 !== this.deltaNackCount && (this.nackRate = this.deltaNackCount / a4), void 0 !== this.deltaPliCount && (this.pliRate = this.deltaPliCount / a4), void 0 !== this.deltaFirCount && (this.firRate = this.deltaFirCount / a4), this.qualityLimitationDurationShares = this._calculateQualityLimitationShares(this.qualityLimitationDurations, e3.qualityLimitationDurations), Object.assign(this, e3), this.frameWidth && this.frameHeight && this.framesPerSecond && this.bitrate && (this.bitPerPixel = this.bitrate / (this.frameHeight * this.frameWidth * this.framesPerSecond));
    }
    _calculateQualityLimitationShares(t4, e3) {
      if (!e3) return;
      if (!t4) return;
      const i3 = (t5, e4) => Math.max(0, (t5 ?? 0) - (e4 ?? 0)), a4 = i3(e3.none, t4.none), s2 = i3(e3.cpu, t4.cpu), n3 = i3(e3.bandwidth, t4.bandwidth), d = i3(e3.other, t4.other), r2 = a4 + s2 + n3 + d;
      return r2 <= 0 ? void 0 : { none: a4 / r2, cpu: s2 / r2, bandwidth: n3 / r2, other: d / r2 };
    }
    createSample() {
      return { timestamp: this.timestamp, id: this.id, ssrc: this.ssrc, kind: this.kind, qualityLimitationDurations: this.qualityLimitationDurations, transportId: this.transportId, codecId: this.codecId, packetsSent: this.packetsSent, bytesSent: this.bytesSent, mid: this.mid, mediaSourceId: this.mediaSourceId, remoteId: this.remoteId, rid: this.rid, encodingIndex: this.encodingIndex, headerBytesSent: this.headerBytesSent, retransmittedPacketsSent: this.retransmittedPacketsSent, retransmittedBytesSent: this.retransmittedBytesSent, rtxSsrc: this.rtxSsrc, targetBitrate: this.targetBitrate, totalEncodedBytesTarget: this.totalEncodedBytesTarget, frameWidth: this.frameWidth, frameHeight: this.frameHeight, framesPerSecond: this.framesPerSecond, framesSent: this.framesSent, hugeFramesSent: this.hugeFramesSent, framesEncoded: this.framesEncoded, keyFramesEncoded: this.keyFramesEncoded, qpSum: this.qpSum, psnrSum: this.psnrSum, psnrMeasurements: this.psnrMeasurements, totalEncodeTime: this.totalEncodeTime, totalPacketSendDelay: this.totalPacketSendDelay, qualityLimitationReason: this.qualityLimitationReason, qualityLimitationResolutionChanges: this.qualityLimitationResolutionChanges, nackCount: this.nackCount, firCount: this.firCount, pliCount: this.pliCount, encoderImplementation: this.encoderImplementation, powerEfficientEncoder: this.powerEfficientEncoder, active: this.active, scalabilityMode: this.scalabilityMode, packetsSentWithEct1: this.packetsSentWithEct1, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/DryOutboundTrackDetector.js
  var DryOutboundTrackDetector = class _DryOutboundTrackDetector {
    trackMonitor;
    static ISSUE_TYPE = "dry-outbound-track";
    name = "dry-outbound-track-detector";
    disabled = false;
    issueKey;
    constructor(t4) {
      this.trackMonitor = t4, this.issueKey = `${_DryOutboundTrackDetector.ISSUE_TYPE}-track-${t4.track.id}`;
    }
    _evented = false;
    _startedDryAt;
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    get config() {
      return this.peerConnection.parent.config.dryOutboundTrackDetector;
    }
    _activatedAt;
    update() {
      if (this.disabled) return;
      if (this.trackMonitor.track.muted || "live" !== this.trackMonitor.track.readyState) return void (this._activatedAt = void 0);
      if (0 !== this.trackMonitor.getOutboundRtps()?.[0]?.deltaBytesSent) return this._activatedAt = void 0, void (this._evented && (this._resolve("dry outbound track recovered"), this._evented = false));
      this._activatedAt || (this._activatedAt = Date.now());
      const t4 = Date.now() - this._activatedAt;
      if (t4 < this.config.thresholdInMs) return;
      if (this._evented) return;
      this._evented = true;
      const e3 = this.peerConnection.parent;
      e3.emit("dry-outbound-track", { trackMonitor: this.trackMonitor, clientMonitor: e3 }), this._raise({ trackId: this.trackMonitor.track.id, duration: t4 });
    }
    _raise(t4) {
      this._startedDryAt = this._startedDryAt ?? Date.now(), this.peerConnection.parent.raiseIssue(this.issueKey, { type: _DryOutboundTrackDetector.ISSUE_TYPE, payload: t4 });
    }
    _resolve(t4) {
      const e3 = this.peerConnection.parent, r2 = e3.activeIssues.get(this.issueKey);
      let i3;
      r2 && (i3 = { ...r2.payload, durationInMs: this._startedDryAt ? Date.now() - this._startedDryAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: i3, resolvedAt: Date.now() }), this._startedDryAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/CaptureFailureDetector.js
  var CaptureFailureDetector = class _CaptureFailureDetector {
    trackMonitor;
    static ENDED_ISSUE_TYPE = "capture-track-ended";
    static SILENT_ISSUE_TYPE = "silent-audio-source";
    name = "capture-failure-detector";
    disabled = false;
    _endedIssueKey;
    _silentIssueKey;
    _endedReported = false;
    _lastMuted;
    _silentSince;
    _silentOn = false;
    _silentStartedAt;
    constructor(e3) {
      this.trackMonitor = e3, this._endedIssueKey = `${_CaptureFailureDetector.ENDED_ISSUE_TYPE}-track-${e3.track.id}`, this._silentIssueKey = `${_CaptureFailureDetector.SILENT_ISSUE_TYPE}-track-${e3.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.captureFailureDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      this.disabled || (this._checkEnded(), this._checkMuted(), this._checkSilence());
    }
    _checkEnded() {
      const t4 = this.trackMonitor.track;
      if ("ended" !== t4.readyState) return;
      if (this._endedReported) return;
      this._endedReported = true;
      const i3 = this.peerConnection.parent;
      i3.emit("capture-track-ended", { clientMonitor: i3, trackMonitor: this.trackMonitor }), i3.raiseIssue(this._endedIssueKey, { type: _CaptureFailureDetector.ENDED_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: t4.id, kind: t4.kind, deviceLabel: t4.label } }), false !== this.config.createEvent && i3.addEvent({ type: ClientEventTypes.CAPTURE_TRACK_ENDED, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: t4.id, kind: t4.kind, deviceLabel: t4.label } });
    }
    _checkMuted() {
      const t4 = this.trackMonitor.track, i3 = true === t4.muted;
      if (this._lastMuted === i3) return;
      const n3 = void 0 !== this._lastMuted;
      if (this._lastMuted = i3, !n3 || !i3) return;
      const r2 = this.peerConnection.parent;
      r2.emit("capture-track-muted", { clientMonitor: r2, trackMonitor: this.trackMonitor }), false !== this.config.createEvent && r2.addEvent({ type: ClientEventTypes.CAPTURE_TRACK_MUTED, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: t4.id, kind: t4.kind, deviceLabel: t4.label } });
    }
    _checkSilence() {
      if ("audio" !== this.trackMonitor.kind) return;
      const e3 = this.trackMonitor.track, t4 = this.trackMonitor.getMediaSource();
      if ("live" !== e3.readyState || e3.muted || !e3.enabled) return this._clearSilence("track not capturing");
      const i3 = t4?.rmsAudioLevel;
      if (void 0 === i3) return;
      if (this.config.silenceRmsThreshold < i3) return this._clearSilence("audio detected");
      const n3 = Date.now();
      this._silentSince ??= n3;
      const r2 = n3 - this._silentSince;
      if (this._silentOn) return;
      if (r2 < this.config.silenceThresholdInMs) return;
      this._silentOn = true, this._silentStartedAt = n3;
      const s2 = this.peerConnection.parent;
      s2.emit("silent-audio-source", { clientMonitor: s2, trackMonitor: this.trackMonitor, silentForInMs: r2 }), s2.raiseIssue(this._silentIssueKey, { type: _CaptureFailureDetector.SILENT_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: e3.id, rmsAudioLevel: i3, silentForInMs: r2, deviceLabel: e3.label } });
    }
    _clearSilence(e3) {
      if (this._silentSince = void 0, !this._silentOn) return;
      this._silentOn = false;
      const t4 = this.peerConnection.parent, i3 = t4.activeIssues.get(this._silentIssueKey);
      let n3;
      i3 && (n3 = { ...i3.payload, durationInMs: this._silentStartedAt ? Date.now() - this._silentStartedAt : void 0 }), t4.resolveIssue(this._silentIssueKey, { comment: e3, payload: n3, resolvedAt: Date.now() }), this._silentStartedAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/SourceEncoderBottleneckDetector.js
  var SourceEncoderBottleneckDetector = class _SourceEncoderBottleneckDetector {
    trackMonitor;
    static CAPTURE_ISSUE_TYPE = "capture-bottleneck";
    static ENCODER_ISSUE_TYPE = "encoder-bottleneck";
    name = "source-encoder-bottleneck-detector";
    disabled = false;
    _captureIssueKey;
    _encoderIssueKey;
    _captureTicks = 0;
    _captureOn = false;
    _captureStartedAt;
    _encoderTicks = 0;
    _encoderOn = false;
    _encoderStartedAt;
    constructor(e3) {
      this.trackMonitor = e3, this._captureIssueKey = `${_SourceEncoderBottleneckDetector.CAPTURE_ISSUE_TYPE}-track-${e3.track.id}`, this._encoderIssueKey = `${_SourceEncoderBottleneckDetector.ENCODER_ISSUE_TYPE}-track-${e3.track.id}`;
    }
    get config() {
      return this.peerConnection.parent.config.sourceEncoderBottleneckDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      if ("video" !== this.trackMonitor.kind) return;
      const e3 = this.trackMonitor.getMediaSource(), t4 = this.trackMonitor.getHighestLayer();
      if (!e3 || !t4) return;
      if ("live" !== this.trackMonitor.track.readyState) return;
      if (this.trackMonitor.track.muted || !this.trackMonitor.track.enabled) return;
      if (false === t4.active) return;
      const r2 = e3.sourceFps ?? e3.framesPerSecond, o2 = this._expectedFps();
      this._checkCapture(r2, o2, e3.width, e3.height), this._checkEncoder(r2, t4);
    }
    _expectedFps() {
      try {
        return this.trackMonitor.track.getSettings?.().frameRate ?? void 0;
      } catch {
        return;
      }
    }
    _checkCapture(e3, t4, r2, o2) {
      if (void 0 === e3) return;
      if (!(e3 < (void 0 !== t4 ? t4 * this.config.captureFpsRatioThreshold : this.config.minSourceFps))) return this._captureTicks = 0, void (this._captureOn && (this._captureOn = false, this._resolve(this._captureIssueKey, "capture recovered", this._captureStartedAt), this._captureStartedAt = void 0));
      if (this._captureTicks += 1, this._captureOn) return;
      if (this._captureTicks < this.config.minConsecutiveTicks) return;
      this._captureOn = true, this._captureStartedAt = Date.now();
      const i3 = this.peerConnection.parent;
      i3.emit("capture-bottleneck", { clientMonitor: i3, trackMonitor: this.trackMonitor, sourceFps: e3, expectedFps: t4 }), i3.raiseIssue(this._captureIssueKey, { type: _SourceEncoderBottleneckDetector.CAPTURE_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, sourceFps: e3, expectedFps: t4, sourceWidth: r2, sourceHeight: o2, consecutiveTicks: this._captureTicks } });
    }
    _checkEncoder(e3, t4) {
      if (!t4) return;
      const r2 = t4.framesPerSecond, o2 = t4.qualityLimitationDurationShares, i3 = o2?.cpu;
      if (!(void 0 !== e3 && this.config.minSourceFps <= e3)) return this._encoderTicks = 0, void (this._encoderOn && (this._encoderOn = false, this._resolve(this._encoderIssueKey, "source no longer healthy; not an encoder problem", this._encoderStartedAt), this._encoderStartedAt = void 0));
      const c = void 0 !== r2 && r2 < e3 * this.config.encodeFpsRatioThreshold, n3 = void 0 !== t4.encodeTimePerFrameInMs && void 0 !== e3 && 0 < e3 && 1e3 / e3 * this.config.encodeTimeBudgetRatio < t4.encodeTimePerFrameInMs, s2 = void 0 !== i3 && this.config.cpuLimitationShareThreshold < i3;
      if (!c && !n3 && !s2) return this._encoderTicks = 0, void (this._encoderOn && (this._encoderOn = false, this._resolve(this._encoderIssueKey, "encoder keeping up again", this._encoderStartedAt), this._encoderStartedAt = void 0));
      if (this._encoderTicks += 1, this._encoderOn) return;
      if (this._encoderTicks < this.config.minConsecutiveTicks) return;
      this._encoderOn = true, this._encoderStartedAt = Date.now();
      const a4 = this.peerConnection.parent;
      a4.emit("encoder-bottleneck", { clientMonitor: a4, trackMonitor: this.trackMonitor, sourceFps: e3, encodedFps: r2 }), a4.raiseIssue(this._encoderIssueKey, { type: _SourceEncoderBottleneckDetector.ENCODER_ISSUE_TYPE, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, sourceFps: e3, encodedFps: r2, encodeTimePerFrameInMs: t4.encodeTimePerFrameInMs, qualityLimitationReason: t4.qualityLimitationReason, cpuLimitationShare: i3, encoderImplementation: t4.encoderImplementation, powerEfficientEncoder: t4.powerEfficientEncoder, consecutiveTicks: this._encoderTicks } });
    }
    _resolve(e3, t4, r2) {
      const o2 = this.peerConnection.parent, i3 = o2.activeIssues.get(e3);
      let c;
      i3 && (c = { ...i3.payload, durationInMs: r2 ? Date.now() - r2 : void 0 }), o2.resolveIssue(e3, { comment: t4, payload: c, resolvedAt: Date.now() });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/SimulcastLayerDetector.js
  var SimulcastLayerDetector = class {
    trackMonitor;
    name = "simulcast-layer-detector";
    disabled = false;
    _previousActiveKeys;
    constructor(e3) {
      this.trackMonitor = e3;
    }
    get config() {
      return this.peerConnection.parent.config.simulcastLayerDetector;
    }
    get peerConnection() {
      return this.trackMonitor.getPeerConnection();
    }
    update() {
      if (this.disabled) return;
      if ("video" !== this.trackMonitor.kind) return;
      const t4 = this.trackMonitor.getOutboundRtps();
      if (t4.length < 2) return;
      const i3 = [];
      for (const e3 of t4) false !== e3.active && 0 < (e3.deltaBytesSent ?? 0) && i3.push(e3.rid ?? `${e3.ssrc}`);
      const r2 = i3.sort().join(",");
      if (void 0 === this._previousActiveKeys) return void (this._previousActiveKeys = r2);
      if (this._previousActiveKeys === r2) return;
      const s2 = t4.map(((e3) => ({ rid: e3.rid ?? `${e3.ssrc}`, ssrc: e3.ssrc, encodingIndex: e3.encodingIndex, active: false !== e3.active && 0 < (e3.deltaBytesSent ?? 0), bitrate: e3.bitrate, frameWidth: e3.frameWidth, frameHeight: e3.frameHeight, framesPerSecond: e3.framesPerSecond, scalabilityMode: e3.scalabilityMode }))), n3 = this._previousActiveKeys;
      this._previousActiveKeys = r2;
      const o2 = this.peerConnection.parent;
      o2.emit("simulcast-layer-changed", { clientMonitor: o2, trackMonitor: this.trackMonitor, activeLayerIds: r2.length ? r2.split(",") : [], previousActiveLayerIds: n3.length ? n3.split(",") : [], layers: s2 }), false !== this.config.createEvent && o2.addEvent({ type: ClientEventTypes.SIMULCAST_LAYER_CHANGED, payload: { peerConnectionId: this.peerConnection.peerConnectionId, trackId: this.trackMonitor.track.id, activeLayerIds: r2.length ? r2.split(",") : [], previousActiveLayerIds: n3.length ? n3.split(",") : [], layers: s2 } });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/OutboundTrackMonitor.js
  var OutboundTrackMonitor = class {
    track;
    _mediaSource;
    direction = "outbound";
    detectors;
    mappedOutboundRtps = /* @__PURE__ */ new Map();
    calculatedScore = { weight: 0, value: void 0 };
    get score() {
      return this.calculatedScore.value;
    }
    get scoreReasons() {
      return this.calculatedScore.reasons;
    }
    attachments;
    appData;
    constructor(a4, n3, d) {
      this.track = a4, this._mediaSource = n3, this.attachments = d, this.detectors = new Detectors();
      const u = this.getPeerConnection().parent.config;
      null !== u.dryOutboundTrackDetector && this.detectors.add(new DryOutboundTrackDetector(this)), null !== u.captureFailureDetector && this.detectors.add(new CaptureFailureDetector(this)), null !== u.codecChangeDetector && this.detectors.add(new CodecChangeDetector(this)), "audio" === this.kind ? this.calculatedScore.weight = 1 : "video" === this.kind && (null !== u.sourceEncoderBottleneckDetector && this.detectors.add(new SourceEncoderBottleneckDetector(this)), null !== u.simulcastLayerDetector && this.detectors.add(new SimulcastLayerDetector(this)), null !== u.videoResolutionChangeDetector && this.detectors.add(new VideoResolutionChangeDetector(this)), this.calculatedScore.weight = 2);
    }
    getPeerConnection() {
      return this._mediaSource.getPeerConnection();
    }
    getMediaSource() {
      return this._mediaSource;
    }
    get kind() {
      return this.track.kind;
    }
    bitrate;
    jitter;
    fractionLost;
    sendingPacketRate;
    remoteReceivedPacketRate;
    update() {
      this.bitrate = 0, this.jitter = 0, this.fractionLost = 0, this.sendingPacketRate = 0, this.remoteReceivedPacketRate = 0;
      for (const t4 of this.mappedOutboundRtps.values()) this.bitrate += t4.bitrate ?? 0, this.jitter += t4.getRemoteInboundRtp()?.jitter ?? 0, this.fractionLost += t4.getRemoteInboundRtp()?.deltaFractionLost ?? 0, this.sendingPacketRate += t4.packetRate ?? 0, this.remoteReceivedPacketRate += t4.getRemoteInboundRtp()?.packetRate ?? 0;
      this.detectors.update();
    }
    getOutboundRtps() {
      return Array.from(this.mappedOutboundRtps.values());
    }
    getHighestLayer() {
      let t4, e3, o2 = 0, r2 = 0;
      for (const i3 of this.mappedOutboundRtps.values()) o2 += 1, t4 ??= i3, i3.bitrate && i3.bitrate > r2 && (e3 = i3, r2 = i3.bitrate);
      if (0 !== o2) return 1 === o2 ? t4 : e3;
    }
    createSample() {
      let t4;
      return "audio" === this.kind ? t4 = this.getPeerConnection()?.parent.scoreCalculator?.encodeOutboundAudioScoreReasons?.(this.calculatedScore.reasons) : "video" === this.kind && (t4 = this.getPeerConnection()?.parent.scoreCalculator?.encodeOutboundVideoScoreReasons?.(this.calculatedScore.reasons)), { id: this.track.id, kind: this.kind, timestamp: Date.now(), attachments: this.attachments, score: this.score, scoreReasons: t4 };
    }
  };

  // node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);
  var eventemitter3_default = import_index.default;

  // node_modules/@observertc/client-monitor-js/dist/schema/W3cStatsIdentifiers.js
  var StatsType;
  !(function(e3) {
    e3.codec = "codec", e3.inboundRtp = "inbound-rtp", e3.outboundRtp = "outbound-rtp", e3.remoteInboundRtp = "remote-inbound-rtp", e3.remoteOutboundRtp = "remote-outbound-rtp", e3.mediaSource = "media-source", e3.mediaPlayout = "media-playout", e3.peerConnection = "peer-connection", e3.dataChannel = "data-channel", e3.transport = "transport", e3.candidatePair = "candidate-pair", e3.localCandidate = "local-candidate", e3.remoteCandidate = "remote-candidate", e3.certificate = "certificate", e3.stream = "stream", e3.track = "track", e3.transceiver = "transceiver", e3.csrc = "csrc", e3.sender = "sender", e3.receiver = "receiver", e3.sctpTransport = "sctp-transport", e3.iceServer = "ice-server";
  })(StatsType || (StatsType = {}));

  // node_modules/@observertc/client-monitor-js/dist/monitors/RemoteOutboundRtpMonitor.js
  var RemoteOutboundRtpMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    ssrc;
    kind;
    transportId;
    codecId;
    packetsSent;
    bytesSent;
    localId;
    remoteTimestamp;
    reportsSent;
    roundTripTime;
    totalRoundTripTime;
    roundTripTimeMeasurements;
    bitrate;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, this.ssrc = e3.ssrc, this.kind = e3.kind, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getInboundRtp() {
      return this._peerConnection.mappedInboundRtpMonitors.get(this.ssrc);
    }
    getCodec() {
      return this._peerConnection.mappedCodecMonitors.get(this.codecId ?? "");
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || Object.assign(this, t4);
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, ssrc: this.ssrc, kind: this.kind, transportId: this.transportId, codecId: this.codecId, packetsSent: this.packetsSent, bytesSent: this.bytesSent, localId: this.localId, remoteTimestamp: this.remoteTimestamp, reportsSent: this.reportsSent, roundTripTime: this.roundTripTime, totalRoundTripTime: this.totalRoundTripTime, roundTripTimeMeasurements: this.roundTripTimeMeasurements, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/RemoteInboundRtpMonitor.js
  var RemoteInboundRtpMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    ssrc;
    kind;
    transportId;
    codecId;
    packetsReceived;
    packetsReceivedWithEct1;
    packetsReceivedWithCe;
    packetsReportedAsLost;
    packetsReportedAsLostButRecovered;
    packetsLost;
    jitter;
    localId;
    roundTripTime;
    totalRoundTripTime;
    fractionLost;
    roundTripTimeMeasurements;
    packetsWithBleachedEct1Marking;
    packetRate;
    deltaPacketsLost;
    deltaPacketsReceived;
    deltaFractionLost;
    avgRoundTripTimeInSec;
    deltaTotalRoundTripTime;
    deltaRoundTripTimeMeasurements;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, this.ssrc = e3.ssrc, this.kind = e3.kind, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    getOutboundRtp() {
      return this._peerConnection.mappedOutboundRtpMonitors.get(this.ssrc);
    }
    getCodec() {
      return this._peerConnection.mappedCodecMonitors.get(this.codecId ?? "");
    }
    accept(e3) {
      this._visited = true;
      const i3 = e3.timestamp - this.timestamp;
      if (i3 <= 0) return;
      const s2 = i3 / 1e3;
      if (this.deltaPacketsReceived = positiveDelta(e3.packetsReceived, this.packetsReceived), void 0 !== this.deltaPacketsReceived && (this.packetRate = this.deltaPacketsReceived / s2), this.deltaPacketsLost = positiveDelta(e3.packetsLost, this.packetsLost), this.deltaTotalRoundTripTime = positiveDelta(e3.totalRoundTripTime, this.totalRoundTripTime), this.deltaRoundTripTimeMeasurements = positiveDelta(e3.roundTripTimeMeasurements, this.roundTripTimeMeasurements), this.avgRoundTripTimeInSec = void 0 !== this.deltaTotalRoundTripTime && void 0 !== this.deltaRoundTripTimeMeasurements && this.deltaRoundTripTimeMeasurements > 0 ? this.deltaTotalRoundTripTime / this.deltaRoundTripTimeMeasurements : void 0, void 0 !== this.deltaPacketsReceived && void 0 !== this.deltaPacketsLost) {
        const t4 = this.deltaPacketsReceived + this.deltaPacketsLost;
        this.deltaFractionLost = t4 > 0 ? this.deltaPacketsLost / t4 : 0;
      }
      Object.assign(this, e3);
    }
    createSample() {
      return { timestamp: this.timestamp, id: this.id, ssrc: this.ssrc, kind: this.kind, transportId: this.transportId, codecId: this.codecId, packetsReceived: this.packetsReceived, packetsReceivedWithEct1: this.packetsReceivedWithEct1, packetsReceivedWithCe: this.packetsReceivedWithCe, packetsReportedAsLost: this.packetsReportedAsLost, packetsReportedAsLostButRecovered: this.packetsReportedAsLostButRecovered, packetsLost: this.packetsLost, jitter: this.jitter, localId: this.localId, roundTripTime: this.roundTripTime, totalRoundTripTime: this.totalRoundTripTime, fractionLost: this.fractionLost, roundTripTimeMeasurements: this.roundTripTimeMeasurements, packetsWithBleachedEct1Marking: this.packetsWithBleachedEct1Marking, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/PeerConnectionTransportMonitor.js
  var PeerConnectionTransportMonitor = class {
    _peerConnection;
    _visited = true;
    timestamp;
    id;
    dataChannelsOpened;
    dataChannelsClosed;
    attachments;
    appData;
    constructor(t4, e3) {
      this._peerConnection = t4, this.id = e3.id, this.timestamp = e3.timestamp, Object.assign(this, e3);
    }
    get visited() {
      const t4 = this._visited;
      return this._visited = false, t4;
    }
    accept(t4) {
      this._visited = true;
      t4.timestamp - this.timestamp <= 0 || Object.assign(this, t4);
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    createSample() {
      return { id: this.id, timestamp: this.timestamp, dataChannelsOpened: this.dataChannelsOpened, dataChannelsClosed: this.dataChannelsClosed, attachments: this.attachments };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/LongPcConnectionEstablishment.js
  var LongPcConnectionEstablishmentDetector = class {
    peerConnection;
    name = "long-pc-connection-establishment-detector";
    disabled = false;
    get config() {
      return this.peerConnection.parent.config.longPcConnectionEstablishmentDetector;
    }
    _evented = false;
    constructor(e3) {
      this.peerConnection = e3;
    }
    update() {
      if (this.disabled) return;
      if ("connecting" !== this.peerConnection.connectionState) return void (this._evented = false);
      if (this._evented) return;
      if (void 0 === this.peerConnection.connectingStartedAt) return;
      const n3 = Date.now() - this.peerConnection.connectingStartedAt;
      if (n3 < this.config.thresholdInMs) return;
      this._evented = true;
      const t4 = this.peerConnection.parent;
      t4.emit("too-long-pc-connection-establishment", { peerConnectionMonitor: this.peerConnection, clientMonitor: t4 }), this.config.createEvent && t4.addEvent({ type: ClientEventTypes.LONG_PC_CONNECTION_ESTABLISHMENT, payload: { peerConnectionId: this.peerConnection.peerConnectionId, duration: n3 } });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/CongestionDetector.js
  var CongestionDetector = class _CongestionDetector {
    peerConnection;
    static ISSUE_TYPE = "congestion";
    name = "congestion-detector";
    disabled = false;
    _maxAvailableIncomingBitrate = 0;
    _maxReceivingBitrate = 0;
    _maxAvailableOutgoingBitrate = 0;
    _maxSendingBitrate = 0;
    issueKey;
    _startedCongestionAt;
    constructor(t4) {
      this.peerConnection = t4, this.issueKey = `${_CongestionDetector.ISSUE_TYPE}-pc-${t4.peerConnectionId}`;
    }
    get config() {
      return this.peerConnection.parent.config.congestionDetector;
    }
    update() {
      if (this.disabled) return;
      let t4 = false;
      for (const e4 of this.peerConnection.outboundRtps) t4 ||= "bandwidth" === e4.qualityLimitationReason;
      let e3 = 0;
      void 0 !== this.peerConnection.avgRttInSec && void 0 !== this.peerConnection.ewmaRttInSec && (e3 = Math.abs(this.peerConnection.avgRttInSec - this.peerConnection.ewmaRttInSec));
      let i3 = false;
      switch (this.config.sensitivity) {
        case "high":
          i3 = t4;
          break;
        case "medium": {
          if (!this.peerConnection.ewmaRttInSec) break;
          const n4 = Math.min(0.15, Math.max(0.05, 0.33 * this.peerConnection.ewmaRttInSec));
          i3 = t4 && e3 > n4;
          break;
        }
        case "low":
          if (!this.peerConnection.ewmaRttInSec || !this.peerConnection.outboundFractionLost) break;
          i3 = t4 && this.peerConnection.outboundFractionLost > 0.05;
      }
      const n3 = this.peerConnection.totalAvailableIncomingBitrate, a4 = this.peerConnection.totalAvailableOutgoingBitrate;
      if (!i3) return this.peerConnection.congested && (this.peerConnection.congested = false, this._resolve("congestion ended")), this._maxAvailableIncomingBitrate = Math.max(this._maxAvailableIncomingBitrate, n3), this._maxAvailableOutgoingBitrate = Math.max(this._maxAvailableOutgoingBitrate, a4), this._maxReceivingBitrate = Math.max(this._maxReceivingBitrate, this.peerConnection.receivingBitrate), void (this._maxSendingBitrate = Math.max(this._maxSendingBitrate, this.peerConnection.sendingBitrate));
      this.peerConnection.congested || (this.peerConnection.congested = true, this.peerConnection.parent.emit("congestion", { clientMonitor: this.peerConnection.parent, peerConnectionMonitor: this.peerConnection, availableIncomingBitrate: n3, availableOutgoingBitrate: a4, maxAvailableIncomingBitrate: this._maxAvailableIncomingBitrate, maxAvailableOutgoingBitrate: this._maxAvailableOutgoingBitrate, maxReceivingBitrate: this._maxReceivingBitrate, maxSendingBitrate: this._maxSendingBitrate }), this._raise({ peerConnectionId: this.peerConnection.peerConnectionId, availableIncomingBitrate: n3, availableOutgoingBitrate: a4, maxAvailableIncomingBitrate: this._maxAvailableIncomingBitrate, maxAvailableOutgoingBitrate: this._maxAvailableOutgoingBitrate, maxReceivingBitrate: this._maxReceivingBitrate, maxSendingBitrate: this._maxSendingBitrate }), this._maxAvailableIncomingBitrate = 0, this._maxAvailableOutgoingBitrate = 0, this._maxReceivingBitrate = 0, this._maxSendingBitrate = 0);
    }
    _raise(t4) {
      this._startedCongestionAt = Date.now(), this.peerConnection.parent.raiseIssue(this.issueKey, { type: _CongestionDetector.ISSUE_TYPE, payload: t4 });
    }
    _resolve(t4) {
      const e3 = this.peerConnection.parent, i3 = e3.activeIssues.get(this.issueKey);
      let n3;
      i3 && (n3 = { ...i3.payload, durationInMs: this._startedCongestionAt ? Date.now() - this._startedCongestionAt : void 0 }), e3.resolveIssue(this.issueKey, { comment: t4, payload: n3, resolvedAt: Date.now() }), this._startedCongestionAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/IceTupleChangeDetector.js
  var IceTupleChangeDetector = class {
    pcMonitor;
    name = "ice-tuple-change-detector";
    constructor(t4) {
      this.pcMonitor = t4;
    }
    tuples = /* @__PURE__ */ new Set();
    update() {
      if (this.pcMonitor.closed) return;
      const t4 = 0 === this.tuples.size;
      let e3 = false;
      const o2 = /* @__PURE__ */ new Set();
      for (const t5 of this.pcMonitor.selectedIceCandidatePairs) {
        const s2 = t5.tuple;
        o2.add(s2), this.tuples.has(s2) || (e3 = true, this.tuples.add(s2));
      }
      for (const t5 of this.tuples) o2.has(t5) || (e3 = true, this.tuples.delete(t5));
      !t4 && e3 && this.pcMonitor.parent.emit("ice-tuple-changed", { clientMonitor: this.pcMonitor.parent, peerConnectionMonitor: this.pcMonitor });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/IceConnectivityDetector.js
  var t = "ice-disconnected";
  var n = "ice-connection-failed";
  var i = "ice-transport-stalled";
  var s = "unstable-ice-path";
  var IceConnectivityDetector = class {
    peerConnection;
    static DISCONNECTED_ISSUE_TYPE = t;
    static FAILED_ISSUE_TYPE = n;
    static STALLED_ISSUE_TYPE = i;
    static UNSTABLE_PATH_ISSUE_TYPE = s;
    name = "ice-connectivity-detector";
    disabled = false;
    _states = /* @__PURE__ */ new Map();
    _unstablePaths = /* @__PURE__ */ new Map();
    _establishmentRecommendedAt;
    _establishmentRecommendations = 0;
    constructor(e3) {
      this.peerConnection = e3;
    }
    get config() {
      return this.peerConnection.parent.config.iceConnectivityDetector;
    }
    update() {
      if (this.disabled) return;
      if (this.peerConnection.closed) return;
      const e3 = /* @__PURE__ */ new Set();
      let t4 = false;
      for (const n3 of this.peerConnection.iceTransports) {
        e3.add(n3.id);
        const i3 = this._getState(n3);
        this._checkIceState(n3, i3), this._checkInboundStall(n3, i3), this._checkIceRestart(n3, i3), t4 = this._checkRestartRecommendation(n3, i3) || t4;
      }
      this._checkPathStability(), this._checkEstablishmentRecommendation(t4);
      for (const t5 of [...this._states.keys()]) e3.has(t5) || (this._resolveAll(t5, "ice transport is gone"), this._states.delete(t5));
    }
    _checkPathStability() {
      const { pathSwitchWindowInMs: e3, pathSwitchThreshold: t4 } = this.config, n3 = Date.now(), i3 = /* @__PURE__ */ new Set();
      for (const o2 of this.peerConnection.selectedIcePaths) {
        i3.add(o2.key);
        const d = o2.getSwitchCountSince(n3 - e3), a4 = this._unstablePaths.get(o2.key);
        d < t4 ? void 0 !== a4 && (this._resolveIssue(s, o2.key, a4, "ice path became stable"), this._unstablePaths.delete(o2.key)) : void 0 === a4 && (this._unstablePaths.set(o2.key, n3), this.peerConnection.parent.raiseIssue(this._issueKey(s, o2.key), { type: s, payload: { peerConnectionId: this.peerConnection.peerConnectionId, pathKey: o2.key, transportId: o2.transportId, switches: d, windowInMs: e3, kind: o2.kind } }));
      }
      for (const [e4, t5] of [...this._unstablePaths.entries()]) i3.has(e4) || (this._resolveIssue(s, e4, t5, "ice path is gone"), this._unstablePaths.delete(e4));
    }
    _getState(e3) {
      let t4 = this._states.get(e3.id);
      return t4 || (t4 = { iceGeneration: 0, usernameFragment: this._usernameFragmentOf(e3), restartPending: false, sawInboundTraffic: false, restartRecommendations: 0 }, this._states.set(e3.id, t4)), t4;
    }
    _checkIceRestart(e3, s2) {
      const o2 = this._usernameFragmentOf(e3);
      void 0 !== o2 && (void 0 !== s2.usernameFragment ? s2.usernameFragment !== o2 && (s2.usernameFragment = o2, s2.iceGeneration += 1, s2.restartPending = true, void 0 !== s2.disconnectRaisedAt && this._resolveIssue(t, e3.id, s2.disconnectRaisedAt, "ice restarted"), void 0 !== s2.failedRaisedAt && this._resolveIssue(n, e3.id, s2.failedRaisedAt, "ice restarted"), void 0 !== s2.stallRaisedAt && this._resolveIssue(i, e3.id, s2.stallRaisedAt, "ice restarted"), s2.disconnectedSince = void 0, s2.disconnectRaisedAt = void 0, s2.failedRaisedAt = void 0, s2.stallRaisedAt = void 0, s2.inboundStalledSince = void 0, s2.sawInboundTraffic = false, this._notifyRestart(e3, s2, "detected")) : s2.usernameFragment = o2);
    }
    _usernameFragmentOf(e3) {
      return e3.iceLocalUsernameFragment ?? e3.getSelectedCandidatePair()?.getLocalCandidate()?.usernameFragment;
    }
    _checkIceState(e3, s2) {
      const o2 = e3.iceState;
      switch (o2) {
        case "failed":
          if (s2.disconnectedSince = void 0, void 0 !== s2.failedRaisedAt) return;
          return s2.failedRaisedAt = Date.now(), s2.restartPending && (s2.restartPending = false, this._notifyRestart(e3, s2, "failed")), this.peerConnection.parent.raiseIssue(this._issueKey(n, e3.id), { type: n, payload: { peerConnectionId: this.peerConnection.peerConnectionId, transportId: e3.id, dtlsState: e3.dtlsState, selectedCandidatePairId: e3.selectedCandidatePairId, iceGeneration: s2.iceGeneration } }), this._resolveIssue(i, e3.id, s2.stallRaisedAt, "ice connection failed"), s2.stallRaisedAt = void 0, void (s2.inboundStalledSince = void 0);
        case "disconnected": {
          void 0 === s2.disconnectedSince && (s2.disconnectedSince = Date.now());
          const n3 = Date.now() - s2.disconnectedSince;
          if (n3 < this.config.disconnectedThresholdInMs) return;
          if (void 0 !== s2.disconnectRaisedAt) return;
          return s2.disconnectRaisedAt = Date.now(), void this.peerConnection.parent.raiseIssue(this._issueKey(t, e3.id), { type: t, payload: { peerConnectionId: this.peerConnection.peerConnectionId, transportId: e3.id, iceState: o2, dtlsState: e3.dtlsState, selectedCandidatePairId: e3.selectedCandidatePairId, disconnectedForMs: n3, iceGeneration: s2.iceGeneration } });
        }
        case "connected":
        case "completed":
          return s2.disconnectedSince = void 0, void 0 !== s2.disconnectRaisedAt && (this._resolveIssue(t, e3.id, s2.disconnectRaisedAt, "ice connection recovered"), s2.disconnectRaisedAt = void 0), void 0 !== s2.failedRaisedAt && (this._resolveIssue(n, e3.id, s2.failedRaisedAt, "ice connection recovered"), s2.failedRaisedAt = void 0), s2.restartRecommendedAt = void 0, void (s2.restartPending && (s2.restartPending = false, this._notifyRestart(e3, s2, "recovered")));
        default:
          return void (s2.disconnectedSince = void 0);
      }
    }
    _checkInboundStall(e3, t4) {
      const n3 = e3.iceState, s2 = e3.getSelectedCandidatePair();
      if ("connected" !== n3 && "completed" !== n3 || !s2 || "succeeded" !== s2.state) return void (t4.inboundStalledSince = void 0);
      const o2 = s2.deltaBytesReceived, d = s2.deltaBytesSent;
      if (void 0 === o2 || void 0 === d) return;
      if (0 < o2) return t4.sawInboundTraffic = true, t4.inboundStalledSince = void 0, void (void 0 !== t4.stallRaisedAt && (this._resolveIssue(i, e3.id, t4.stallRaisedAt, "inbound traffic resumed"), t4.stallRaisedAt = void 0));
      if (!t4.sawInboundTraffic || d <= 0) return void (t4.inboundStalledSince = void 0);
      void 0 === t4.inboundStalledSince && (t4.inboundStalledSince = Date.now());
      const a4 = Date.now() - t4.inboundStalledSince;
      a4 < this.config.transportStallThresholdInMs || void 0 === t4.stallRaisedAt && (t4.stallRaisedAt = Date.now(), this.peerConnection.parent.raiseIssue(this._issueKey(i, e3.id), { type: i, payload: { peerConnectionId: this.peerConnection.peerConnectionId, transportId: e3.id, iceState: n3, candidatePairState: s2.state, selectedCandidatePairId: e3.selectedCandidatePairId, direction: "inbound", stalledForMs: a4, outboundBytesDelta: d, inboundBytesDelta: o2, currentRoundTripTime: s2.currentRoundTripTime, lastPacketReceivedTimestamp: s2.lastPacketReceivedTimestamp, iceGeneration: t4.iceGeneration } }));
    }
    _checkRestartRecommendation(e3, t4) {
      const n3 = Date.now(), { iceRestartRecommendationThresholdInMs: i3, iceRestartRecommendationCooldownInMs: s2 } = this.config;
      if (t4.restartPending) return false;
      let o2, d = 0;
      return "failed" === e3.iceState ? (o2 = "ice-failed", d = void 0 === t4.failedRaisedAt ? 0 : n3 - t4.failedRaisedAt) : void 0 !== t4.disconnectedSince && i3 <= n3 - t4.disconnectedSince ? (o2 = "ice-disconnected", d = n3 - t4.disconnectedSince) : void 0 !== t4.inboundStalledSince && i3 <= n3 - t4.inboundStalledSince && (o2 = "transport-stalled", d = n3 - t4.inboundStalledSince), void 0 === o2 ? (t4.restartRecommendedAt = void 0, false) : !(void 0 !== t4.restartRecommendedAt && n3 - t4.restartRecommendedAt < s2) && (t4.restartRecommendedAt = n3, t4.restartRecommendations += 1, this._recommendRestart({ peerConnectionId: this.peerConnection.peerConnectionId, transportId: e3.id, reason: o2, conditionDurationInMs: d, iceGeneration: t4.iceGeneration, recommendationCount: t4.restartRecommendations, iceState: e3.iceState, dtlsState: e3.dtlsState, selectedCandidatePairId: e3.selectedCandidatePairId }), true);
    }
    _checkEstablishmentRecommendation(e3) {
      const { connectionState: t4, connectingStartedAt: n3 } = this.peerConnection, i3 = Date.now();
      if ("connecting" !== t4 || void 0 === n3) return void (this._establishmentRecommendedAt = void 0);
      const s2 = i3 - n3;
      if (s2 < this.config.iceRestartRecommendationThresholdInMs) return;
      if (e3) return;
      for (const e4 of this._states.values()) if (e4.restartPending) return;
      if (void 0 !== this._establishmentRecommendedAt && i3 - this._establishmentRecommendedAt < this.config.iceRestartRecommendationCooldownInMs) return;
      this._establishmentRecommendedAt = i3, this._establishmentRecommendations += 1;
      const [o2] = this.peerConnection.iceTransports;
      this._recommendRestart({ peerConnectionId: this.peerConnection.peerConnectionId, reason: "never-established", conditionDurationInMs: s2, iceGeneration: this._states.get(o2?.id ?? "")?.iceGeneration ?? 0, recommendationCount: this._establishmentRecommendations, iceState: o2?.iceState, dtlsState: o2?.dtlsState });
    }
    _recommendRestart(t4) {
      const n3 = this.peerConnection.parent;
      n3.emit("ice-restart-recommended", { clientMonitor: n3, peerConnectionMonitor: this.peerConnection, ...t4 }), this.config.createEvent && n3.addEvent({ type: ClientEventTypes.ICE_RESTART_RECOMMENDED, payload: { ...t4 } });
    }
    _notifyRestart(t4, n3, i3) {
      const s2 = this.peerConnection.parent;
      s2.emit("ice-restart", { clientMonitor: s2, peerConnectionMonitor: this.peerConnection, transportId: t4.id, iceGeneration: n3.iceGeneration, outcome: i3 }), this.config.createEvent && s2.addEvent({ type: ClientEventTypes.ICE_RESTART, payload: { peerConnectionId: this.peerConnection.peerConnectionId, transportId: t4.id, iceGeneration: n3.iceGeneration, outcome: i3, iceState: t4.iceState, evidence: "ice-username-fragment-changed", timestamp: Date.now() } });
    }
    _resolveAll(e3, s2) {
      const o2 = this._states.get(e3);
      void 0 !== o2?.disconnectRaisedAt && this._resolveIssue(t, e3, o2.disconnectRaisedAt, s2), void 0 !== o2?.failedRaisedAt && this._resolveIssue(n, e3, o2.failedRaisedAt, s2), void 0 !== o2?.stallRaisedAt && this._resolveIssue(i, e3, o2.stallRaisedAt, s2);
    }
    _resolveIssue(e3, t4, n3, i3) {
      const s2 = this.peerConnection.parent, o2 = this._issueKey(e3, t4), d = s2.activeIssues.get(o2);
      d && s2.resolveIssue(o2, { comment: i3, payload: { ...d.payload, durationInMs: void 0 !== n3 ? Date.now() - n3 : void 0 }, resolvedAt: Date.now() });
    }
    _issueKey(e3, t4) {
      return `${e3}-pc-${this.peerConnection.peerConnectionId}-transport-${t4}`;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/adapters/StatsAdapters.js
  var a = "StatsAdapter";
  var StatsAdapters = class {
    logger;
    adapters = /* @__PURE__ */ new Map();
    constructor(a4 = createLogger()) {
      this.logger = a4;
    }
    add(t4) {
      if (this.adapters.has(t4.name)) return this.logger.warn(`[${a}]:`, "Adapter with name already exists", t4.name);
      this.adapters.set(t4.name, t4);
    }
    remove(t4) {
      return "string" == typeof t4 ? this.adapters.delete(t4) : this.adapters.delete(t4.name);
    }
    adapt(t4) {
      let r2 = t4;
      for (const t5 of this.adapters.values()) try {
        r2 = t5.adapt(r2);
      } catch (t6) {
        this.logger.warn(`[${a}]:`, "Error adapting stats", t6);
      }
      return r2;
    }
    postAdapt(t4) {
      let r2 = t4;
      for (const t5 of this.adapters.values()) if (t5.postAdapt) try {
        r2 = t5.postAdapt(r2);
      } catch (t6) {
        this.logger.warn(`[${a}]:`, "Error post adapting stats", t6);
      }
      return r2;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/SelectedIcePath.js
  var SelectedIcePath = class extends eventemitter3_default {
    key;
    _pair;
    _peerConnection;
    createdAt = Date.now();
    updatedAt = Date.now();
    closed = false;
    durations = { direct: 0, "turn-udp": 0, "turn-tcp": 0, "turn-tls": 0, "turn-unknown": 0 };
    pathSwitches = 0;
    directToRelaySwitches = 0;
    relayToDirectSwitches = 0;
    relayProtocolSwitches = 0;
    turnServerSwitches = 0;
    firstRelaySelectedAt;
    lastSwitchedAt;
    totalBytesSent = 0;
    totalBytesReceived = 0;
    totalPacketsSent = 0;
    totalPacketsReceived = 0;
    relayBytesSent = 0;
    relayBytesReceived = 0;
    relayPacketsSent = 0;
    relayPacketsReceived = 0;
    _kind;
    _turnServer;
    _tuple;
    _kindSince = Date.now();
    _switchTimestamps = [];
    appData;
    constructor(t4, e3, r2) {
      super(), this.key = t4, this._pair = e3, this._peerConnection = r2, this._kind = e3.pathKind, this._turnServer = e3.turnServer, this._tuple = e3.tuple, this.usingTurn && (this.firstRelaySelectedAt = this.createdAt);
    }
    getPeerConnection() {
      return this._peerConnection;
    }
    get pair() {
      return this._pair;
    }
    get localCandidate() {
      return this._pair.getLocalCandidate();
    }
    get remoteCandidate() {
      return this._pair.getRemoteCandidate();
    }
    get iceTransport() {
      return this._pair.getIceTransport();
    }
    get pairId() {
      return this._pair.id;
    }
    get transportId() {
      return this._pair.transportId;
    }
    get kind() {
      return this._pair.pathKind;
    }
    get usingTurn() {
      return this._pair.usingTurn;
    }
    get usingTcp() {
      return this._pair.usingTcp;
    }
    get relayProtocol() {
      return this._pair.relayProtocol;
    }
    get turnUrl() {
      return this._pair.turnUrl;
    }
    get turnServer() {
      return this._pair.turnServer;
    }
    get tuple() {
      return this._pair.tuple;
    }
    get protocol() {
      return this.localCandidate?.protocol;
    }
    get localCandidateType() {
      return this.localCandidate?.candidateType;
    }
    get remoteCandidateType() {
      return this.remoteCandidate?.candidateType;
    }
    get localAddress() {
      return this.localCandidate?.address;
    }
    get localPort() {
      return this.localCandidate?.port;
    }
    get localAddressFamily() {
      return this.localCandidate?.addressFamily;
    }
    get remoteAddress() {
      return this.remoteCandidate?.address;
    }
    get remotePort() {
      return this.remoteCandidate?.port;
    }
    get remoteAddressFamily() {
      return this.remoteCandidate?.addressFamily;
    }
    get currentRoundTripTime() {
      return this._pair.currentRoundTripTime;
    }
    get state() {
      return this._pair.state;
    }
    get durationInMs() {
      return this.updatedAt - this.createdAt;
    }
    get relayDurationInMs() {
      return this.durations["turn-udp"] + this.durations["turn-tcp"] + this.durations["turn-tls"] + this.durations["turn-unknown"];
    }
    get timeToFirstRelayInMs() {
      return void 0 === this.firstRelaySelectedAt ? void 0 : this.firstRelaySelectedAt - this.createdAt;
    }
    get relayBytesRatio() {
      const t4 = this.totalBytesSent + this.totalBytesReceived;
      if (!(t4 <= 0)) return (this.relayBytesSent + this.relayBytesReceived) / t4;
    }
    getSwitchCountSince(t4) {
      let e3 = 0;
      for (let r2 = this._switchTimestamps.length - 1; 0 <= r2; --r2) {
        const i3 = this._switchTimestamps[r2];
        if (void 0 === i3 || i3 < t4) break;
        ++e3;
      }
      return e3;
    }
    update(t4) {
      if (this.closed) return;
      const e3 = Date.now(), r2 = this._kind, i3 = this._turnServer, s2 = this._tuple, n3 = this._describe();
      this.durations[r2] += Math.max(0, e3 - this._kindSince), this._kindSince = e3, this._pair = t4, this.updatedAt = e3, this._accumulateTraffic(t4);
      const a4 = t4.pathKind, d = t4.turnServer, o2 = t4.tuple;
      if (this.usingTurn && void 0 === this.firstRelaySelectedAt && (this.firstRelaySelectedAt = e3), a4 === r2 && d === i3 && o2 === s2) return;
      const c = (function(t5, e4) {
        const r3 = "direct" !== t5.kind, i4 = "direct" !== e4.kind;
        if (!r3 && i4) return "direct-to-relay";
        if (r3 && !i4) return "relay-to-direct";
        if (r3 && i4) {
          if (t5.turnServer !== e4.turnServer) return "turn-server-changed";
          if (t5.kind !== e4.kind) return "relay-protocol-changed";
        }
        return "path-changed";
      })({ kind: r2, turnServer: i3 }, { kind: a4, turnServer: d });
      switch (this._kind = a4, this._turnServer = d, this._tuple = o2, ++this.pathSwitches, this.lastSwitchedAt = e3, this._switchTimestamps.push(e3), 64 < this._switchTimestamps.length && this._switchTimestamps.shift(), c) {
        case "direct-to-relay":
          ++this.directToRelaySwitches;
          break;
        case "relay-to-direct":
          ++this.relayToDirectSwitches;
          break;
        case "relay-protocol-changed":
          ++this.relayProtocolSwitches;
          break;
        case "turn-server-changed":
          ++this.turnServerSwitches;
      }
      this._notify(c, n3);
    }
    notifyInitialSelection() {
      this._notify("initial-selection", void 0);
    }
    close() {
      this.closed || (this.closed = true, this.durations[this._kind] += Math.max(0, Date.now() - this._kindSince), this.emit("close"), this.removeAllListeners());
    }
    _accumulateTraffic(t4) {
      const e3 = t4.deltaBytesSent ?? 0, r2 = t4.deltaBytesReceived ?? 0, i3 = t4.deltaPacketsSent ?? 0, s2 = t4.deltaPacketsReceived ?? 0;
      this.totalBytesSent += e3, this.totalBytesReceived += r2, this.totalPacketsSent += i3, this.totalPacketsReceived += s2, t4.usingTurn && (this.relayBytesSent += e3, this.relayBytesReceived += r2, this.relayPacketsSent += i3, this.relayPacketsReceived += s2);
    }
    _notify(t4, r2) {
      const i3 = this._describe(), s2 = this._peerConnection.parent;
      this.emit("changed", { transition: t4, from: r2, to: i3 }), s2.emit("ice-path-changed", { clientMonitor: s2, peerConnectionMonitor: this._peerConnection, selectedIcePath: this, transition: t4, from: r2, to: i3 }), s2.addEvent({ type: ClientEventTypes.PEER_CONNECTION_ICE_PATH_CHANGED, payload: { peerConnectionId: this._peerConnection.peerConnectionId, transition: t4, from: r2, to: i3 } });
    }
    _describe() {
      const t4 = this.localCandidate, e3 = this.remoteCandidate;
      return { kind: this.kind, pairId: this.pairId, transportId: this.transportId, localCandidateId: this._pair.localCandidateId, remoteCandidateId: this._pair.remoteCandidateId, localCandidateType: t4?.candidateType, remoteCandidateType: e3?.candidateType, protocol: t4?.protocol, relayProtocol: this.relayProtocol, turnUrl: this.turnUrl, turnServer: this.turnServer, localAddress: t4?.address, localPort: t4?.port, remoteAddress: e3?.address, remotePort: e3?.port };
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/monitors/PeerConnectionMonitor.js
  var k = "PeerConnectionMonitor";
  var PeerConnectionMonitor = class extends eventemitter3_default {
    peerConnectionId;
    statsCollector;
    parent;
    logger;
    attachments;
    statsAdapters;
    detectors;
    mappedCodecMonitors = /* @__PURE__ */ new Map();
    mappedInboundRtpMonitors = /* @__PURE__ */ new Map();
    mappedRemoteOutboundRtpMonitors = /* @__PURE__ */ new Map();
    mappedOutboundRtpMonitors = /* @__PURE__ */ new Map();
    mappedDataChannelMonitors = /* @__PURE__ */ new Map();
    mappedRemoteInboundRtpMonitors = /* @__PURE__ */ new Map();
    mappedMediaSourceMonitors = /* @__PURE__ */ new Map();
    mappedMediaPlayoutMonitors = /* @__PURE__ */ new Map();
    mappedPeerConnectionTransportMonitors = /* @__PURE__ */ new Map();
    mappedIceTransportMonitors = /* @__PURE__ */ new Map();
    mappedIceCandidateMonitors = /* @__PURE__ */ new Map();
    mappedIceCandidatePairMonitors = /* @__PURE__ */ new Map();
    mappedCertificateMonitors = /* @__PURE__ */ new Map();
    mappedSelectedIcePaths = /* @__PURE__ */ new Map();
    _pendingMediaStreamTracks = /* @__PURE__ */ new Map();
    mappedInboundTracks = /* @__PURE__ */ new Map();
    mappedOutboundTracks = /* @__PURE__ */ new Map();
    closed = false;
    sendingAudioBitrate = 0;
    sendingVideoBitrate = 0;
    receivingAudioBitrate = 0;
    receivingVideoBitrate = 0;
    outboundFractionLost = 0;
    inboundFractionalLost = 0;
    totalInboundPacketsLost = 0;
    totalInboundPacketsReceived = 0;
    totalOutboundPacketsSent = 0;
    totalOutboundPacketsReceived = 0;
    totalOutboundPacketsLost = 0;
    totalDataChannelBytesSent = 0;
    totalDataChannelBytesReceived = 0;
    totalSentAudioBytes = 0;
    totalSentVideoBytes = 0;
    totalReceivedAudioBytes = 0;
    totalReceivedVideoBytes = 0;
    totalAvailableIncomingBitrate = 0;
    totalAvailableOutgoingBitrate = 0;
    deltaInboundPacketsLost = 0;
    deltaInboundPacketsReceived = 0;
    deltaOutboundPacketsSent = 0;
    deltaOutboundPacketsReceived = 0;
    deltaOutboundPacketsLost = 0;
    deltaAudioBytesSent = 0;
    deltaVideoBytesSent = 0;
    deltaAudioBytesReceived = 0;
    deltaVideoBytesReceived = 0;
    deltaDataChannelBytesReceived = 0;
    deltaDataChannelBytesSent = 0;
    highestSeenSendingBitrate;
    highestSeenReceivingBitrate;
    highestSeenAvailableOutgoingBitrate;
    highestSeenAvailableIncomingBitrate;
    congested = false;
    iceRttInSec;
    ewmaIceRttInSec;
    rtcpRttInSec;
    ewmaRtcpRttInSec;
    connectingStartedAt;
    connectedAt;
    _connectionState;
    iceState;
    usingTURN;
    usingTCP;
    calculatedStabilityScore = { weight: 1, value: void 0 };
    appData;
    constructor(t4, i3, n3, a4, o2) {
      super(), this.peerConnectionId = t4, this.statsCollector = i3, this.parent = n3, this.logger = a4, this.attachments = o2, this.statsAdapters = new StatsAdapters(a4), this.detectors = new Detectors(), null !== n3.config.longPcConnectionEstablishmentDetector && this.detectors.add(new LongPcConnectionEstablishmentDetector(this)), null !== n3.config.congestionDetector && this.detectors.add(new CongestionDetector(this)), this.detectors.add(new IceTupleChangeDetector(this)), null !== n3.config.iceConnectivityDetector && this.detectors.add(new IceConnectivityDetector(this));
    }
    get avgRttInSec() {
      return this.rtcpRttInSec ?? this.iceRttInSec;
    }
    get ewmaRttInSec() {
      return void 0 !== this.rtcpRttInSec ? this.ewmaRtcpRttInSec : this.ewmaIceRttInSec;
    }
    get score() {
      return this.calculatedStabilityScore.value;
    }
    get scoreReasons() {
      return this.calculatedStabilityScore.reasons;
    }
    get receivingBitrate() {
      return (this.receivingAudioBitrate ?? 0) + (this.receivingVideoBitrate ?? 0);
    }
    get sendingBitrate() {
      return (this.sendingAudioBitrate ?? 0) + (this.sendingVideoBitrate ?? 0);
    }
    get tracks() {
      return [...this.mappedInboundTracks.values(), ...this.mappedOutboundTracks.values()];
    }
    on(t4, e3) {
      return super.on(t4, e3), this;
    }
    once(t4, e3) {
      return super.once(t4, e3), this;
    }
    off(t4, e3) {
      return super.off(t4, e3), this;
    }
    emit(t4, ...e3) {
      return super.emit(t4, ...e3);
    }
    async collect() {
      let t4 = await this.statsCollector.getStats();
      return t4 = this.statsAdapters.adapt(t4), this.emit("stats", t4), this._acceptAdaptedStats(t4), t4;
    }
    accept(t4) {
      this._acceptAdaptedStats(this.statsAdapters.adapt(t4));
    }
    _acceptAdaptedStats(t4) {
      const e3 = [], n3 = [];
      this.deltaVideoBytesSent = 0, this.deltaAudioBytesSent = 0, this.deltaVideoBytesReceived = 0, this.deltaAudioBytesReceived = 0, this.deltaDataChannelBytesReceived = 0, this.deltaDataChannelBytesSent = 0, this.deltaOutboundPacketsLost = 0, this.deltaOutboundPacketsReceived = 0, this.deltaOutboundPacketsSent = 0, this.deltaInboundPacketsLost = 0, this.deltaInboundPacketsReceived = 0, this.sendingAudioBitrate = 0, this.sendingVideoBitrate = 0, this.receivingAudioBitrate = 0, this.receivingVideoBitrate = 0, this.outboundFractionLost = 0, this.inboundFractionalLost = 0, this.totalAvailableIncomingBitrate = 0, this.totalAvailableOutgoingBitrate = 0;
      for (let a5 = 0, o2 = t4; a5 < 2 && 0 < o2.length; ++a5) {
        for (const t5 of o2) switch (t5.type) {
          case StatsType.codec:
            this._updateCodec(t5);
            break;
          case StatsType.inboundRtp: {
            const e4 = this._updateInboundRtp(t5);
            switch (e4?.kind) {
              case "audio":
                this.receivingAudioBitrate += e4?.bitrate ?? 0, this.deltaAudioBytesReceived += e4?.deltaBytesReceived ?? 0;
                break;
              case "video":
                this.receivingVideoBitrate += e4?.bitrate ?? 0, this.deltaVideoBytesReceived += e4?.deltaBytesReceived ?? 0;
            }
            this.inboundFractionalLost += e4?.deltaFractionLost ?? 0, this.deltaInboundPacketsLost += e4?.deltaPacketsLost ?? 0, this.deltaInboundPacketsReceived += e4?.deltaPacketsReceived ?? 0;
            break;
          }
          case StatsType.remoteOutboundRtp: {
            const i3 = this._updateRemoteOutboundRtp(t5);
            void 0 !== i3?.roundTripTime && e3.push(i3.roundTripTime);
            break;
          }
          case StatsType.outboundRtp: {
            const e4 = this._updateOutboundRtp(t5);
            switch (e4?.kind) {
              case "audio":
                this.sendingAudioBitrate += e4?.bitrate ?? 0, this.deltaAudioBytesSent += e4?.deltaBytesSent ?? 0;
                break;
              case "video":
                this.sendingVideoBitrate += e4?.bitrate ?? 0, this.deltaVideoBytesSent += e4?.deltaBytesSent ?? 0;
            }
            this.deltaOutboundPacketsSent += e4?.deltaPacketsSent ?? 0;
            break;
          }
          case StatsType.remoteInboundRtp: {
            const i3 = this._updateRemoteInboundRtp(t5);
            void 0 !== i3?.roundTripTime && e3.push(i3.roundTripTime), this.outboundFractionLost += i3?.deltaFractionLost ?? 0, this.deltaOutboundPacketsLost += i3?.deltaPacketsLost ?? 0, this.deltaOutboundPacketsReceived += i3?.deltaPacketsReceived ?? 0;
            break;
          }
          case StatsType.dataChannel: {
            const e4 = this._updateDataChannel(t5);
            this.deltaDataChannelBytesSent += e4?.deltaBytesSent ?? 0, this.deltaDataChannelBytesReceived += e4?.deltaBytesReceived ?? 0;
            break;
          }
          case StatsType.mediaSource:
            this._updateMediaSource(t5);
            break;
          case StatsType.mediaPlayout:
            this._updateMediaPlayout(t5);
            break;
          case StatsType.transport: {
            const e4 = this._updateIceTransport(t5), i3 = e4?.getSelectedCandidatePair();
            this.totalAvailableIncomingBitrate += i3?.availableIncomingBitrate ?? 0, this.totalAvailableOutgoingBitrate += i3?.availableOutgoingBitrate ?? 0;
            const a6 = i3?.avgRoundTripTimeInSec ?? i3?.currentRoundTripTime;
            void 0 !== a6 && n3.push(a6);
            break;
          }
          case StatsType.peerConnection:
            this._updatePeerConnectionTransport(t5);
            break;
          case StatsType.localCandidate:
          case StatsType.remoteCandidate:
            this._updateIceCandidate(t5);
            break;
          case StatsType.candidatePair:
            this._updateIceCandidatePair(t5);
            break;
          case StatsType.certificate:
            this._updateCertificate(t5);
            break;
          default:
            this.logger.debug(`[${k}]:`, "Unknown stats type", t5);
        }
        o2 = this.statsAdapters.postAdapt(o2);
      }
      this._checkVisited(), 0 < e3.length && (this.rtcpRttInSec = e3.reduce(((t5, e4) => t5 + e4), 0) / e3.length, this.ewmaRtcpRttInSec = void 0 !== this.ewmaRtcpRttInSec ? 0.1 * this.rtcpRttInSec + 0.9 * this.ewmaRtcpRttInSec : this.rtcpRttInSec), 0 < n3.length && (this.iceRttInSec = n3.reduce(((t5, e4) => t5 + e4), 0) / n3.length, this.ewmaIceRttInSec = void 0 !== this.ewmaIceRttInSec ? 0.1 * this.iceRttInSec + 0.9 * this.ewmaIceRttInSec : this.iceRttInSec), this.highestSeenAvailableIncomingBitrate = Math.max(this.highestSeenAvailableIncomingBitrate ?? 0, this.totalAvailableIncomingBitrate), this.highestSeenAvailableOutgoingBitrate = Math.max(this.highestSeenAvailableOutgoingBitrate ?? 0, this.totalAvailableOutgoingBitrate), this.highestSeenSendingBitrate = Math.max(this.highestSeenSendingBitrate ?? 0, this.sendingAudioBitrate + this.sendingVideoBitrate), this.highestSeenReceivingBitrate = Math.max(this.highestSeenReceivingBitrate ?? 0, this.receivingAudioBitrate + this.receivingVideoBitrate);
      const a4 = this.selectedIceCandidatePairs;
      this._updateSelectedIcePaths(a4), this.usingTCP = a4.some(((t5) => t5.usingTcp)), this.usingTURN = a4.some(((t5) => t5.usingTurn)), this.iceState = a4?.[0]?.getIceTransport()?.iceState, this.totalDataChannelBytesReceived += this.deltaDataChannelBytesReceived, this.totalDataChannelBytesSent += this.deltaDataChannelBytesSent, this.totalSentAudioBytes += this.deltaAudioBytesSent, this.totalSentVideoBytes += this.deltaVideoBytesSent, this.totalReceivedAudioBytes += this.deltaAudioBytesReceived, this.totalReceivedVideoBytes += this.deltaVideoBytesReceived, this.totalOutboundPacketsSent += this.deltaOutboundPacketsSent, this.totalOutboundPacketsReceived += this.deltaOutboundPacketsReceived, this.totalOutboundPacketsLost += this.deltaOutboundPacketsLost, this.totalInboundPacketsLost += this.deltaInboundPacketsLost, this.totalInboundPacketsReceived += this.deltaInboundPacketsReceived, this.detectors.update(), this.emit("update");
    }
    createSample() {
      return { peerConnectionId: this.peerConnectionId, attachments: this.attachments, codecs: this.codecs.map(((t4) => t4.createSample())), inboundRtps: this.inboundRtps.map(((t4) => t4.createSample())), remoteOutboundRtps: this.remoteOutboundRtps.map(((t4) => t4.createSample())), outboundRtps: this.outboundRtps.map(((t4) => t4.createSample())), remoteInboundRtps: this.remoteInboundRtps.map(((t4) => t4.createSample())), mediaSources: this.mediaSources.map(((t4) => t4.createSample())), mediaPlayouts: this.mediaPlayouts.map(((t4) => t4.createSample())), peerConnectionTransports: this.peerConnectionTransports.map(((t4) => t4.createSample())), dataChannels: this.dataChannels.map(((t4) => t4.createSample())), iceTransports: this.iceTransports.map(((t4) => t4.createSample())), iceCandidates: this.iceCandidates.map(((t4) => t4.createSample())), iceCandidatePairs: this.iceCandidatePairs.map(((t4) => t4.createSample())), certificates: this.certificates.map(((t4) => t4.createSample())), inboundTracks: [...this.mappedInboundTracks.values()].map(((t4) => t4.createSample())), outboundTracks: [...this.mappedOutboundTracks.values()].map(((t4) => t4.createSample())), score: this.score, scoreReasons: this.parent.scoreCalculator.encodePeerConnectionScoreReasons?.(this.calculatedStabilityScore.reasons) };
    }
    addMediaStreamTrack(t4, e3) {
      if ("ended" === t4.readyState) return;
      t4.addEventListener("ended", (() => {
        this._pendingMediaStreamTracks.delete(t4.id), this.mappedInboundTracks.delete(t4.id), this.mappedOutboundTracks.delete(t4.id);
      }));
      const i3 = this.mediaSources.find(((e4) => e4.trackIdentifier === t4.id));
      if (i3) return this._createOutboundTrackMonitor(t4, i3, e3);
      const n3 = this.inboundRtps.find(((e4) => e4.trackIdentifier === t4.id));
      if (n3) return this._createInboundTrackMonitor(t4, n3, e3);
      this._pendingMediaStreamTracks.set(t4.id, { track: t4, attachments: e3 });
    }
    get codecs() {
      return [...this.mappedCodecMonitors.values()];
    }
    get inboundRtps() {
      return [...this.mappedInboundRtpMonitors.values()];
    }
    get remoteOutboundRtps() {
      return [...this.mappedRemoteOutboundRtpMonitors.values()];
    }
    get outboundRtps() {
      return [...this.mappedOutboundRtpMonitors.values()];
    }
    get remoteInboundRtps() {
      return [...this.mappedRemoteInboundRtpMonitors.values()];
    }
    get mediaSources() {
      return [...this.mappedMediaSourceMonitors.values()];
    }
    get mediaPlayouts() {
      return [...this.mappedMediaPlayoutMonitors.values()];
    }
    get dataChannels() {
      return [...this.mappedDataChannelMonitors.values()];
    }
    get peerConnectionTransports() {
      return [...this.mappedPeerConnectionTransportMonitors.values()];
    }
    get iceTransports() {
      return [...this.mappedIceTransportMonitors.values()];
    }
    get iceCandidates() {
      return [...this.mappedIceCandidateMonitors.values()];
    }
    get iceCandidatePairs() {
      return [...this.mappedIceCandidatePairMonitors.values()];
    }
    get certificates() {
      return [...this.mappedCertificateMonitors.values()];
    }
    get selectedIcePaths() {
      return [...this.mappedSelectedIcePaths.values()];
    }
    get selectedIcePath() {
      for (const t4 of this.mappedSelectedIcePaths.values()) return t4;
    }
    get selectedIceCandidatePairs() {
      return this.iceTransports.map(((t4) => t4.getSelectedCandidatePair())).filter(((t4) => void 0 !== t4));
    }
    set connectionState(t4) {
      this._connectionState !== t4 && (this._connectionState = t4, "connecting" === t4 ? this.connectingStartedAt = Date.now() : "connected" === t4 ? this.connectedAt = Date.now() : (this.connectingStartedAt = void 0, this.connectedAt = void 0));
    }
    get connectionState() {
      return this._connectionState;
    }
    _updateSelectedIcePaths(t4) {
      const e3 = /* @__PURE__ */ new Set();
      for (const i3 of t4) {
        const t5 = i3.pathKey;
        e3.add(t5);
        const n3 = this.mappedSelectedIcePaths.get(t5);
        if (n3) {
          n3.update(i3);
          continue;
        }
        const a4 = new SelectedIcePath(t5, i3, this);
        this.mappedSelectedIcePaths.set(t5, a4), this.parent.emit("new-selected-ice-path", { clientMonitor: this.parent, peerConnectionMonitor: this, selectedIcePath: a4 }), a4.notifyInitialSelection();
      }
      for (const [t5, i3] of [...this.mappedSelectedIcePaths.entries()]) e3.has(t5) || (this.mappedSelectedIcePaths.delete(t5), i3.close());
    }
    _checkVisited() {
      for (const [t4, e3] of this.mappedCodecMonitors) e3.visited || this.mappedCodecMonitors.delete(t4);
      for (const [t4, e3] of this.mappedInboundRtpMonitors) e3.visited || (this.mappedInboundRtpMonitors.delete(t4), this.mappedInboundTracks.delete(e3.trackIdentifier ?? ""));
      for (const [t4, e3] of this.mappedRemoteOutboundRtpMonitors) e3.visited || this.mappedRemoteOutboundRtpMonitors.delete(t4);
      for (const [t4, e3] of this.mappedOutboundRtpMonitors) e3.visited || (this.mappedOutboundRtpMonitors.delete(t4), e3.getTrack()?.mappedOutboundRtps.delete(e3.ssrc));
      for (const [t4, e3] of this.mappedRemoteInboundRtpMonitors) e3.visited || this.mappedRemoteInboundRtpMonitors.delete(t4);
      for (const [t4, e3] of this.mappedMediaSourceMonitors) e3.visited || (this.mappedMediaSourceMonitors.delete(t4), this.mappedOutboundTracks.delete(e3.trackIdentifier ?? ""));
      for (const [t4, e3] of this.mappedMediaPlayoutMonitors) e3.visited || this.mappedMediaPlayoutMonitors.delete(t4);
      for (const [t4, e3] of this.mappedPeerConnectionTransportMonitors) e3.visited || this.mappedPeerConnectionTransportMonitors.delete(t4);
      for (const [t4, e3] of this.mappedIceTransportMonitors) e3.visited || this.mappedIceTransportMonitors.delete(t4);
      for (const [t4, e3] of this.mappedIceCandidateMonitors) e3.visited || this.mappedIceCandidateMonitors.delete(t4);
      for (const [t4, e3] of this.mappedIceCandidatePairMonitors) e3.visited || this.mappedIceCandidatePairMonitors.delete(t4);
      for (const [t4, e3] of this.mappedCertificateMonitors) e3.visited || this.mappedCertificateMonitors.delete(t4);
      for (const [t4, e3] of this.mappedDataChannelMonitors) e3.visited || this.mappedDataChannelMonitors.delete(t4);
    }
    close() {
      this.closed || (this.closed = true, this.mappedSelectedIcePaths.forEach(((t4) => t4.close())), this.mappedSelectedIcePaths.clear(), this._checkVisited(), this._checkVisited(), this.emit("close"));
    }
    _updateCodec(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.payloadType || void 0 === t4.mimeType) return this.logger.warn(`[${k}]:`, "Invalid codec stats", t4);
      const e3 = t4;
      let i3 = this.mappedCodecMonitors.get(e3.id);
      i3 || (i3 = new CodecMonitor(this, e3), this.mappedCodecMonitors.set(e3.id, i3), this.parent.emit("new-codec-monitor", { clientMonitor: this.parent, codecMonitor: i3 })), i3.accept(e3);
    }
    _updateInboundRtp(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.ssrc || void 0 === t4.kind || void 0 === t4.trackIdentifier) return this.logger.warn(`[${k}]:`, "Invalid inboundRtp stats", t4);
      const e3 = t4;
      let i3 = this.mappedInboundRtpMonitors.get(e3.ssrc);
      if (!i3 && (i3 = new InboundRtpMonitor(this, e3), this.mappedInboundRtpMonitors.set(e3.ssrc, i3), this.parent.emit("new-inbound-rtp-monitor", { clientMonitor: this.parent, inboundRtpMonitor: i3 }), e3.trackIdentifier)) {
        const t5 = this._pendingMediaStreamTracks.get(e3.trackIdentifier);
        t5 && this._createInboundTrackMonitor(t5.track, i3, t5.attachments);
      }
      return i3.accept(e3), i3;
    }
    _updateDataChannel(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.label) return this.logger.warn(`[${k}]:`, "Invalid dataChannel stats", t4);
      const e3 = t4;
      let i3 = this.mappedDataChannelMonitors.get(e3.id);
      return i3 || (i3 = new DataChannelMonitor(this, e3), this.mappedDataChannelMonitors.set(e3.id, i3), this.parent.emit("new-data-channel-monitor", { clientMonitor: this.parent, dataChannelMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateRemoteOutboundRtp(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.ssrc || void 0 === t4.kind) return this.logger.warn(`[${k}]:`, "Invalid remoteOutboundRtp stats", t4);
      const e3 = t4;
      let i3 = this.mappedRemoteOutboundRtpMonitors.get(e3.ssrc);
      return i3 || (i3 = new RemoteOutboundRtpMonitor(this, e3), this.mappedRemoteOutboundRtpMonitors.set(e3.ssrc, i3), this.parent.emit("new-remote-outbound-rtp-monitor", { clientMonitor: this.parent, remoteOutboundRtpMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateOutboundRtp(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.ssrc || void 0 === t4.kind) return this.logger.warn(`[${k}]:`, "Invalid outboundRtp stats", t4);
      const e3 = t4;
      let i3 = this.mappedOutboundRtpMonitors.get(e3.ssrc);
      if (!i3) {
        i3 = new OutboundRtpMonitor(this, e3), this.mappedOutboundRtpMonitors.set(e3.ssrc, i3), this.parent.emit("new-outbound-rtp-monitor", { clientMonitor: this.parent, outboundRtpMonitor: i3 });
        const t5 = i3.getTrack();
        t5 && !t5.mappedOutboundRtps.has(e3.ssrc) && t5.mappedOutboundRtps.set(e3.ssrc, i3);
      }
      return i3.accept(e3), i3;
    }
    _updateRemoteInboundRtp(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.ssrc || void 0 === t4.kind) return this.logger.warn(`[${k}]:`, "Invalid remoteInboundRtp stats", t4);
      const e3 = t4;
      let i3 = this.mappedRemoteInboundRtpMonitors.get(e3.ssrc);
      return i3 || (i3 = new RemoteInboundRtpMonitor(this, e3), this.mappedRemoteInboundRtpMonitors.set(e3.ssrc, i3), this.parent.emit("new-remote-inbound-rtp-monitor", { clientMonitor: this.parent, remoteInboundRtpMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateMediaSource(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.trackIdentifier || void 0 === t4.kind) return this.logger.warn(`[${k}]:`, "Invalid mediaSource stats", t4);
      const e3 = t4;
      let i3 = this.mappedMediaSourceMonitors.get(e3.id);
      if (!i3 && (i3 = new MediaSourceMonitor(this, e3), this.mappedMediaSourceMonitors.set(e3.id, i3), this.parent.emit("new-media-source-monitor", { clientMonitor: this.parent, mediaSourceMonitor: i3 }), e3.trackIdentifier)) {
        const t5 = this._pendingMediaStreamTracks.get(e3.trackIdentifier);
        t5 && this._createOutboundTrackMonitor(t5.track, i3, t5.attachments);
      }
      return i3.accept(e3), i3;
    }
    _updateMediaPlayout(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.kind) return this.logger.warn(`[${k}]:`, "Invalid mediaPlayout stats", t4);
      const e3 = t4;
      let i3 = this.mappedMediaPlayoutMonitors.get(e3.id);
      return i3 || (i3 = new MediaPlayoutMonitor(this, e3), this.mappedMediaPlayoutMonitors.set(e3.id, i3), this.parent.emit("new-media-playout-monitor", { clientMonitor: this.parent, mediaPlayoutMonitor: i3 })), i3.accept(e3), i3;
    }
    _updatePeerConnectionTransport(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.dataChannelsOpened || void 0 === t4.dataChannelsClosed) return this.logger.warn(`[${k}]:`, "Invalid peerConnectionTransport stats", t4);
      const e3 = t4;
      let i3 = this.mappedPeerConnectionTransportMonitors.get(e3.id);
      return i3 || (i3 = new PeerConnectionTransportMonitor(this, e3), this.mappedPeerConnectionTransportMonitors.set(e3.id, i3), this.parent.emit("new-peer-connection-transport-monitor", { clientMonitor: this.parent, peerConnectionTransportMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateIceTransport(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp) return this.logger.warn(`[${k}]:`, "Invalid iceTransport stats", t4);
      const e3 = t4;
      let i3 = this.mappedIceTransportMonitors.get(e3.id);
      return i3 || (i3 = new IceTransportMonitor(this, e3), this.mappedIceTransportMonitors.set(e3.id, i3), this.parent.emit("new-ice-transport-monitor", { clientMonitor: this.parent, iceTransportMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateIceCandidate(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.protocol) return this.logger.warn(`[${k}]:`, "Invalid iceCandidate stats", t4);
      const e3 = t4;
      let i3 = this.mappedIceCandidateMonitors.get(e3.id);
      return i3 || (i3 = new IceCandidateMonitor(this, e3), this.mappedIceCandidateMonitors.set(e3.id, i3), this.parent.emit("new-ice-candidate-monitor", { clientMonitor: this.parent, iceCandidateMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateIceCandidatePair(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.state) return this.logger.warn(`[${k}]:`, "Invalid iceCandidatePair stats", t4);
      const e3 = t4;
      let i3 = this.mappedIceCandidatePairMonitors.get(e3.id);
      return i3 || (i3 = new IceCandidatePairMonitor(this, e3), this.mappedIceCandidatePairMonitors.set(e3.id, i3), this.parent.emit("new-ice-candidate-pair-monitor", { clientMonitor: this.parent, iceCandidatePairMonitor: i3 })), i3.accept(e3), i3;
    }
    _updateCertificate(t4) {
      if (this.closed) return;
      if (void 0 === t4.id || void 0 === t4.timestamp || void 0 === t4.fingerprint || void 0 === t4.fingerprintAlgorithm) return this.logger.warn(`[${k}]:`, "Invalid certificate stats", t4);
      const e3 = t4;
      let i3 = this.mappedCertificateMonitors.get(e3.id);
      return i3 || (i3 = new CertificateMonitor(this, e3), this.mappedCertificateMonitors.set(e3.id, i3), this.parent.emit("new-certificate-monitor", { clientMonitor: this.parent, certificateMonitor: i3 })), i3.accept(e3), i3;
    }
    _createOutboundTrackMonitor(t4, e3, i3) {
      if (this.mappedOutboundTracks.has(t4.id)) return;
      const n3 = new OutboundTrackMonitor(t4, e3, i3);
      this._pendingMediaStreamTracks.delete(t4.id), this.mappedOutboundTracks.set(t4.id, n3);
      for (const e4 of this.mappedOutboundRtpMonitors.values()) e4.trackIdentifier === t4.id && n3.mappedOutboundRtps.set(e4.ssrc, e4);
      this.parent.emit("new-outbound-track-monitor", { clientMonitor: this.parent, outboundTrackMonitor: n3 });
    }
    _createInboundTrackMonitor(t4, e3, i3) {
      if (this.mappedInboundTracks.has(t4.id)) return;
      const n3 = new InboundTrackMonitor(t4, e3, i3);
      this._pendingMediaStreamTracks.delete(t4.id), this.mappedInboundTracks.set(t4.id, n3), this.parent.emit("new-inbound-track-monitor", { clientMonitor: this.parent, inboundTrackMonitor: n3 });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/schema/ClientSample.js
  var schemaVersion = "3.3.0";

  // node_modules/@observertc/client-monitor-js/dist/sources/fetchUserAgentData.js
  var a2 = __toESM(require_ua_parser(), 1);
  var t2 = "FetchNavigatorData";
  function fetchUserAgentData(e3) {
    try {
      let r2;
      if (void 0 !== navigator) r2 = navigator;
      else {
        if (void 0 === window || void 0 === window.navigator) return e3.error(`[${t2}]:`, "Cannot integrate navigator.mediaDevices, because navigator is not available");
        r2 = window.navigator;
      }
      return new a2.UAParser(r2.userAgent).getResult();
    } catch (a4) {
      e3.warn(`[${t2}]:`, "Cannot collect Navigator data", a4);
    }
  }

  // node_modules/@observertc/client-monitor-js/dist/schema/ClientMetaTypes.js
  var ClientMetaTypes;
  !(function(E) {
    E.MEDIA_CONSTRAINT = "MEDIA_CONSTRAINT", E.MEDIA_DEVICE = "MEDIA_DEVICE", E.MEDIA_DEVICES_SUPPORTED_CONSTRAINTS = "MEDIA_DEVICES_SUPPORTED_CONSTRAINTS", E.USER_MEDIA_ERROR = "USER_MEDIA_ERROR", E.LOCAL_SDP = "LOCAL_SDP", E.OPERATION_SYSTEM = "OPERATION_SYSTEM", E.ENGINE = "ENGINE", E.PLATFORM = "PLATFORM", E.BROWSER = "BROWSER";
  })(ClientMetaTypes || (ClientMetaTypes = {}));

  // node_modules/@observertc/client-monitor-js/dist/sources/watchMediaDevice.js
  var a3 = "utils";
  function watchMediaDevices(t4, n3) {
    let i3;
    if (void 0 !== navigator) i3 = navigator;
    else {
      if (void 0 === window || void 0 === window.navigator) return n3.error(`[${a3}]:`, "Cannot integrate navigator.mediaDevices, because navigator is not available");
      i3 = window.navigator;
    }
    const r2 = i3.mediaDevices;
    if (!r2) return n3.error(`[${a3}]:`, "Cannot integrate navigator.mediaDevices, because navigator.mediaDevices is not available");
    if (void 0 === r2.getUserMedia || "function" != typeof r2.getUserMedia) return n3.error(`[${a3}]:`, "Cannot integrate navigator.mediaDevices.getUserMedia, because getUserMedia is not a function");
    const o2 = r2, s2 = o2.getUserMedia.bind(o2);
    o2.getUserMedia = async (a4) => {
      try {
        return await s2(a4);
      } catch (a5) {
        throw t4.addIssue({ type: ClientMetaTypes.USER_MEDIA_ERROR, payload: { error: `${a5}` } }), a5;
      }
    };
    try {
      const a4 = o2.getSupportedConstraints();
      t4.addMetaData({ type: ClientMetaTypes.MEDIA_DEVICES_SUPPORTED_CONSTRAINTS, payload: { ...a4 } });
    } catch (e3) {
      n3.warn(`[${a3}]:`, "Cannot get supported constraints", e3);
    }
    const d = /* @__PURE__ */ new Set(), c = async () => {
      try {
        const a4 = await o2.enumerateDevices();
        for (const n4 of a4) {
          const a5 = `${n4.groupId}-${n4.deviceId}-${n4.kind}-${n4.label}`;
          d.has(a5) || (t4.addMetaData({ type: ClientMetaTypes.MEDIA_DEVICE, payload: n4.toJSON() }), d.add(a5));
        }
      } catch (e3) {
        n3.error(`[${a3}]:`, "Cannot enumerate media devices", e3);
      }
    };
    t4.once("close", (() => {
      o2.getUserMedia = s2, o2.removeEventListener("devicechange", c);
    })), o2.addEventListener("devicechange", c), c().catch(((e3) => {
      n3.warn(`[${a3}]:`, "Cannot enumerate media devices", e3);
    }));
  }

  // node_modules/@observertc/client-monitor-js/dist/collectors/utils.js
  function convertRTCStatsReport(t4, r2) {
    const o2 = [];
    try {
      t4.forEach(((t5) => {
        t5.id && t5.timestamp && t5.type && o2.push(t5);
      }));
    } catch (t5) {
      r2.error("[StatsCollector]:", "Error getting stats report", t5);
    }
    return o2;
  }

  // node_modules/@observertc/client-monitor-js/dist/collectors/RtcPeerConnectionStatsCollector.js
  var e = "RtcPeerConnectionStatsCollector";
  var RtcPeerConnectionStatsCollector = class {
    peerConnection;
    clientMonitor;
    logger;
    lastStats = [];
    get browser() {
      return this.clientMonitor.browser;
    }
    constructor(t4, e3, r2 = e3.logger) {
      this.peerConnection = t4, this.clientMonitor = e3, this.logger = r2;
    }
    async getStats() {
      try {
        this.lastStats = convertRTCStatsReport(await this.peerConnection.getStats(), this.logger);
        try {
          await this._extend();
        } catch (t4) {
          this.logger.error(`[${e}]:`, "Error extending stats", t4);
        }
        return this.lastStats;
      } catch (t4) {
        return this.logger.error(`[${e}]:`, "Error getting stats report", t4), [];
      }
    }
    async _extend() {
      if (this.lastStats && this.browser) switch (this.browser.name) {
        case "chrome":
        case "edge":
        case "opera":
        case "safari":
        case "unknown":
          break;
        case "firefox":
          this._firefoxTrackStats();
      }
    }
    _firefoxTrackStats() {
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/collectors/MediasoupTransportStatsCollector.js
  var r = "MediasoupTransportStatsCollector";
  var MediasoupTransportStatsCollector = class {
    transport;
    clientMonitor;
    logger;
    lastStats = [];
    _stats = [];
    producers = /* @__PURE__ */ new Map();
    get browser() {
      return this.clientMonitor.browser;
    }
    constructor(t4, s2, r2 = s2.logger) {
      this.transport = t4, this.clientMonitor = s2, this.logger = r2, this._newProducers = this._newProducers.bind(this), this.transport.observer.once("close", (() => {
        this.transport.observer.off("newproducer", this._newProducers);
      })), this.transport.observer.on("newproducer", this._newProducers);
    }
    async getStats() {
      try {
        this.lastStats = convertRTCStatsReport(await this.transport.getStats(), this.logger), this._stats = [];
        for (const t4 of this.lastStats) {
          if ("inbound-rtp" === t4.type) {
            if ("probator" === t4.trackIdentifier) continue;
          }
          this._stats.push(t4);
        }
        try {
          await this._extend();
        } catch (t4) {
          this.logger.error(`[${r}]:`, "Error extending stats", t4);
        }
        return this._stats;
      } catch (t4) {
        return this.logger.error(`[${r}]:`, "Error getting stats report", t4), [];
      }
    }
    _newProducers(t4) {
      t4.observer.once("close", (() => {
        this.producers.delete(t4.id);
      })), this.producers.set(t4.id, t4);
    }
    async _extend() {
      if (this.lastStats && this.browser) switch (this.browser.name) {
        case "chrome":
        case "edge":
        case "opera":
        case "safari":
        case "unknown":
          break;
        case "firefox":
          await this._firefoxTrackStats();
      }
    }
    async _firefoxTrackStats() {
      await Promise.allSettled([...this.producers.values()].map((async (t4) => {
        const r2 = await t4.getStats(), e3 = [];
        let o2, a4;
        r2.forEach(((t5) => {
          t5.type === StatsType.outboundRtp ? e3.push(t5) : t5.type === StatsType.mediaSource ? o2 = t5 : t5.type === StatsType.codec && (a4 = t5);
        }));
        for (const t5 of e3) {
          const s2 = this._stats.find(((s3) => s3.id === t5.id));
          s2 && (s2.codecId = a4?.id, s2.mediaSourceId = o2?.id);
        }
      })));
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/adapters/adapterTools.js
  function foldField(t4, e3, o2) {
    void 0 !== t4[e3] && (void 0 === t4[o2] && (t4[o2] = t4[e3]), delete t4[e3]);
  }
  function foldMediaTypeIntoKind(t4) {
    foldField(t4, "mediaType", "kind");
  }
  var e2 = [StatsType.inboundRtp, StatsType.outboundRtp, StatsType.remoteInboundRtp, StatsType.remoteOutboundRtp];
  function isRtpStreamStats(t4) {
    return e2.includes(t4.type);
  }
  var o = ["trackIdentifier", "framesReceived", "framesDropped", "frameWidth", "frameHeight", "freezeCount", "totalFreezesDuration", "pauseCount", "totalPausesDuration", "audioLevel", "totalAudioEnergy", "totalSamplesDuration", "jitterBufferDelay", "jitterBufferEmittedCount"];
  function foldLegacyTrackStats(e3) {
    let n3;
    for (const o2 of e3) o2.type === StatsType.track && (n3 ??= /* @__PURE__ */ new Map()).set(o2.id, o2);
    if (!n3) return e3.some(((e4) => e4.type === StatsType.stream)) ? e3.filter(((e4) => e4.type !== StatsType.stream)) : e3;
    for (const i3 of e3) {
      const e4 = i3;
      if (void 0 === e4.trackId) continue;
      if (i3.type !== StatsType.inboundRtp && i3.type !== StatsType.outboundRtp) continue;
      const d = n3.get(e4.trackId);
      if (d) {
        if (i3.type === StatsType.inboundRtp) for (const t4 of o) void 0 === e4[t4] && void 0 !== d[t4] && (e4[t4] = d[t4]);
        void 0 === e4.trackIdentifier && void 0 !== d.trackIdentifier && (e4.trackIdentifier = d.trackIdentifier);
      }
      delete e4.trackId;
    }
    return e3.filter(((e4) => e4.type !== StatsType.track && e4.type !== StatsType.stream));
  }
  function inferOutboundMediaSourceId(e3) {
    let o2;
    for (const n3 of e3) {
      if (n3.type !== StatsType.outboundRtp) continue;
      const i3 = n3;
      if (void 0 !== i3.mediaSourceId) continue;
      let d;
      if (o2 ??= e3.filter(((e4) => e4.type === StatsType.mediaSource)), void 0 !== i3.trackIdentifier && (d = o2.find(((t4) => t4.trackIdentifier === i3.trackIdentifier))), !d) {
        const t4 = o2.filter(((t5) => t5.kind === i3.kind));
        1 === t4.length && (d = t4[0]);
      }
      d && (i3.mediaSourceId = d.id);
    }
  }
  var n2 = [StatsType.inboundRtp, StatsType.outboundRtp, StatsType.remoteInboundRtp, StatsType.remoteOutboundRtp, StatsType.codec, StatsType.candidatePair, StatsType.localCandidate, StatsType.remoteCandidate];
  function inferTransportId(e3) {
    let o2;
    for (const n3 of e3) if (n3.type === StatsType.transport) {
      if (void 0 !== o2) return;
      o2 = n3.id;
    }
    if (void 0 !== o2) for (const t4 of e3) {
      const e4 = t4;
      void 0 === e4.transportId && (n2.includes(t4.type) && (e4.transportId = o2));
    }
  }
  var i2 = [{ from: StatsType.outboundRtp, to: StatsType.remoteInboundRtp, field: "remoteId" }, { from: StatsType.remoteInboundRtp, to: StatsType.outboundRtp, field: "localId" }, { from: StatsType.inboundRtp, to: StatsType.remoteOutboundRtp, field: "remoteId" }, { from: StatsType.remoteOutboundRtp, to: StatsType.inboundRtp, field: "localId" }];
  function inferRtpCrossReferences(t4) {
    const e3 = /* @__PURE__ */ new Map();
    for (const o2 of t4) {
      if (!isRtpStreamStats(o2)) continue;
      const t5 = o2.ssrc;
      if (void 0 === t5) continue;
      const n3 = `${o2.type}:${t5}`, i3 = e3.get(n3);
      i3 ? i3.push(o2) : e3.set(n3, [o2]);
    }
    for (const o2 of t4) {
      const t5 = o2;
      if (void 0 !== t5.ssrc) for (const { from: n3, to: d, field: r2 } of i2) {
        if (o2.type !== n3 || void 0 !== t5[r2]) continue;
        const i3 = e3.get(`${d}:${t5.ssrc}`), p = 1 === i3?.length ? i3[0] : void 0;
        p && (t5[r2] = p.id);
      }
    }
  }
  function inferCodecId(e3) {
    let o2;
    for (const n3 of e3) {
      if (!isRtpStreamStats(n3)) continue;
      const i3 = n3;
      if (void 0 !== i3.codecId || void 0 === i3.kind) continue;
      o2 ??= e3.filter(((e4) => e4.type === StatsType.codec));
      let d = o2.filter(((t4) => "string" == typeof t4.mimeType && t4.mimeType.toLowerCase().startsWith(`${i3.kind}/`)));
      if (void 0 !== i3.transportId) {
        const t4 = d.filter(((t5) => void 0 === t5.transportId || t5.transportId === i3.transportId));
        t4.length > 0 && (d = t4);
      }
      if (d.some(((t4) => void 0 !== t4.codecType))) {
        const e4 = n3.type === StatsType.outboundRtp || n3.type === StatsType.remoteInboundRtp ? "encode" : "decode", o3 = d.filter(((t4) => void 0 === t4.codecType || t4.codecType === e4));
        o3.length > 0 && (d = o3);
      }
      1 === d.length && (i3.codecId = d[0].id);
    }
  }

  // node_modules/@observertc/client-monitor-js/dist/adapters/ChromeStatsAdapter.js
  var ChromeStatsAdapter = class {
    name = "chromeStatsAdapter";
    adapt(i3) {
      const c = foldLegacyTrackStats(i3);
      for (const a4 of c) {
        if (!a4 || "string" != typeof a4.type) continue;
        const r2 = a4;
        isRtpStreamStats(a4) ? foldMediaTypeIntoKind(r2) : a4.type !== StatsType.localCandidate && a4.type !== StatsType.remoteCandidate || foldField(r2, "ip", "address");
      }
      return inferOutboundMediaSourceId(c), inferTransportId(c), inferRtpCrossReferences(c), inferCodecId(c), c;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/adapters/FirefoxStatsAdapter.js
  var FirefoxStatsAdapter = class {
    name = "firefoxStatsAdapter";
    _transportStats = { type: "transport", timestamp: 0, id: "", packetsSent: 0, packetsReceived: 0, bytesSent: 0, bytesReceived: 0, selectedCandidatePairId: void 0, selectedCandidatePairChanges: -1 };
    _selectedCandidatePair;
    _accumulatedAt;
    adapt(c) {
      for (const s2 of c) {
        if (!s2 || "string" != typeof s2.type) continue;
        const i3 = s2;
        isRtpStreamStats(s2) ? (foldMediaTypeIntoKind(i3), s2.type === StatsType.inboundRtp && foldField(i3, "discardedPackets", "packetsDiscarded")) : s2.type === StatsType.candidatePair && "cancelled" === i3.state && (i3.state = "failed");
      }
      return this._addReconstructedTransport(c), inferOutboundMediaSourceId(c), inferTransportId(c), inferRtpCrossReferences(c), inferCodecId(c), c;
    }
    _addReconstructedTransport(e3) {
      let a4;
      for (const s2 of e3) {
        if (s2.type === StatsType.transport) return;
        if (s2.type !== StatsType.candidatePair) continue;
        const e4 = s2;
        e4.selected && (a4 = e4);
      }
      if (!a4) return;
      if (!(this._accumulatedAt === a4.timestamp && this._selectedCandidatePair?.id === a4.id)) {
        if (this._selectedCandidatePair?.id !== a4.id) this._transportStats.selectedCandidatePairChanges = (this._transportStats.selectedCandidatePairChanges ?? 0) + 1, this._transportStats.selectedCandidatePairId = a4.id, this._transportStats.id = a4.transportId ?? "transport_0";
        else {
          const t4 = (a4.packetsReceived ?? 0) - (this._selectedCandidatePair.packetsReceived ?? 0), e4 = (a4.packetsSent ?? 0) - (this._selectedCandidatePair.packetsSent ?? 0), s2 = (a4.bytesReceived ?? 0) - (this._selectedCandidatePair.bytesReceived ?? 0), i3 = (a4.bytesSent ?? 0) - (this._selectedCandidatePair.bytesSent ?? 0);
          0 < s2 && (this._transportStats.bytesReceived = (this._transportStats.bytesReceived ?? 0) + s2), 0 < i3 && (this._transportStats.bytesSent = (this._transportStats.bytesSent ?? 0) + i3), 0 < t4 && (this._transportStats.packetsReceived = (this._transportStats.packetsReceived ?? 0) + t4), 0 < e4 && (this._transportStats.packetsSent = (this._transportStats.packetsSent ?? 0) + e4);
        }
        this._selectedCandidatePair = a4, this._accumulatedAt = a4.timestamp;
      }
      this._transportStats.timestamp = a4.timestamp, e3.push(this._transportStats);
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/adapters/SafariStatsAdapter.js
  var SafariStatsAdapter = class {
    name = "safariStatsAdapter";
    adapt(d) {
      const p = foldLegacyTrackStats(d);
      for (const e3 of p) {
        if (!e3 || "string" != typeof e3.type) continue;
        const r2 = e3;
        if (isRtpStreamStats(e3)) foldMediaTypeIntoKind(r2);
        else switch (e3.type) {
          case StatsType.dataChannel:
            foldField(r2, "datachannelid", "dataChannelIdentifier");
            break;
          case StatsType.candidatePair:
            "inprogress" === r2.state ? r2.state = "in-progress" : "cancelled" === r2.state && (r2.state = "failed");
        }
      }
      return inferOutboundMediaSourceId(p), inferTransportId(p), inferRtpCrossReferences(p), inferCodecId(p), p;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/sources/RtcPeerConnectionBinding.js
  var RtcPeerConnectionBinding = class {
    peerConnection;
    monitor;
    constructor(n3, t4) {
      this.peerConnection = n3, this.monitor = t4, this.bind = this.bind.bind(this), this.unbind = this.unbind.bind(this), this._onConnectionStateChange = this._onConnectionStateChange.bind(this), this._onIceConnectionStateChange = this._onIceConnectionStateChange.bind(this), this._onIceCandidate = this._onIceCandidate.bind(this), this._onIceGatheringStateChange = this._onIceGatheringStateChange.bind(this), this._onNegotiationNeeded = this._onNegotiationNeeded.bind(this), this._onSignalingStateChange = this._onSignalingStateChange.bind(this), this._onTrack = this._onTrack.bind(this), this._onIceCandidateError = this._onIceCandidateError.bind(this), this._onDataChannel = this._onDataChannel.bind(this), this._fireEvent(ClientEventTypes.PEER_CONNECTION_OPENED, { peerConnectionId: this.monitor.peerConnectionId, iceConnectionState: this.peerConnection.iceConnectionState, iceGatheringState: this.peerConnection.iceGatheringState, signalingState: this.peerConnection.signalingState });
    }
    unbind() {
      this.monitor.close(), this.peerConnection.removeEventListener("connectionstatechange", this._onConnectionStateChange), this.peerConnection.removeEventListener("icecandidate", this._onIceCandidate), this.peerConnection.removeEventListener("iceconnectionstatechange", this._onIceConnectionStateChange), this.peerConnection.removeEventListener("icegatheringstatechange", this._onIceGatheringStateChange), this.peerConnection.removeEventListener("negotiationneeded", this._onNegotiationNeeded), this.peerConnection.removeEventListener("signalingstatechange", this._onSignalingStateChange), this.peerConnection.removeEventListener("icecandidateerror", this._onIceCandidateError), this.peerConnection.removeEventListener("track", this._onTrack), this.peerConnection.removeEventListener("datachannel", this._onDataChannel);
    }
    bind() {
      this.monitor.once("close", this.unbind), this.peerConnection.addEventListener("connectionstatechange", this._onConnectionStateChange), this.peerConnection.addEventListener("icecandidate", this._onIceCandidate), this.peerConnection.addEventListener("iceconnectionstatechange", this._onIceConnectionStateChange), this.peerConnection.addEventListener("icegatheringstatechange", this._onIceGatheringStateChange), this.peerConnection.addEventListener("negotiationneeded", this._onNegotiationNeeded), this.peerConnection.addEventListener("signalingstatechange", this._onSignalingStateChange), this.peerConnection.addEventListener("icecandidateerror", this._onIceCandidateError), this.peerConnection.addEventListener("track", this._onTrack), this.peerConnection.addEventListener("datachannel", this._onDataChannel);
    }
    _onDataChannel(e3) {
      return bindRtcDataChannelEvents({ monitor: this.monitor, dataChannel: e3.channel, fireEvent: this._fireEvent.bind(this) });
    }
    _onIceCandidateError(n3) {
      const t4 = n3;
      return this._fireEvent(ClientEventTypes.ICE_CANDIDATE_ERROR, { peerConnectionId: this.monitor.peerConnectionId, errorCode: t4?.errorCode, errorText: t4?.errorText, address: t4?.address, port: t4?.port, url: t4?.url });
    }
    _onIceConnectionStateChange() {
      return this._fireEvent(ClientEventTypes.ICE_CONNECTION_STATE_CHANGED, { peerConnectionId: this.monitor.peerConnectionId, iceConnectionState: this.peerConnection.iceConnectionState });
    }
    _onConnectionStateChange() {
      this.monitor.connectionState = this.peerConnection.connectionState, this._fireEvent(ClientEventTypes.PEER_CONNECTION_STATE_CHANGED, { peerConnectionId: this.monitor.peerConnectionId, connectionState: this.peerConnection.connectionState }), "closed" === this.peerConnection.connectionState && (this._fireEvent(ClientEventTypes.PEER_CONNECTION_CLOSED, { peerConnectionId: this.monitor.peerConnectionId, iceConnectionState: this.peerConnection.iceConnectionState, iceGatheringState: this.peerConnection.iceGatheringState, signalingState: this.peerConnection.signalingState }), this.unbind());
    }
    _onIceCandidate(n3) {
      return this._fireEvent(ClientEventTypes.ICE_CANDIDATE, { peerConnectionId: this.monitor.peerConnectionId, ...n3.candidate });
    }
    _onIceGatheringStateChange() {
      return this._fireEvent(ClientEventTypes.ICE_GATHERING_STATE_CHANGED, { peerConnectionId: this.monitor.peerConnectionId, iceGatheringState: this.peerConnection.iceGatheringState });
    }
    _onNegotiationNeeded() {
      return this._fireEvent(ClientEventTypes.NEGOTIATION_NEEDED, { peerConnectionId: this.monitor.peerConnectionId });
    }
    _onSignalingStateChange() {
      return this._fireEvent(ClientEventTypes.SIGNALING_STATE_CHANGE, { peerConnectionId: this.monitor.peerConnectionId, signalingState: this.peerConnection.signalingState });
    }
    _onTrack(e3) {
      const n3 = e3.track;
      n3 && bindMediaStreamTrackEvents({ pcMonitor: this.monitor, track: n3, fireEvent: this._fireEvent.bind(this) });
    }
    _fireEvent(e3, n3) {
      return this.monitor.parent.addEvent({ type: e3, payload: this.monitor.parent.clientEventPayloadProvider.createPayload(e3, n3) });
    }
  };
  function bindMediaStreamTrackEvents(n3) {
    const { pcMonitor: t4, track: i3, fireEvent: o2, attachments: a4 } = n3;
    i3 && (i3.onended = () => o2(ClientEventTypes.MEDIA_TRACK_REMOVED, { peerConnectionId: t4.peerConnectionId, trackId: i3.id, kind: i3.kind, label: i3.label, muted: i3.muted, enabled: i3.enabled, readyState: i3.readyState, contentHint: i3.contentHint, ...a4 ?? {} }), i3.onmute = () => o2(ClientEventTypes.MEDIA_TRACK_MUTED, { peerConnectionId: t4.peerConnectionId, trackId: i3.id, kind: i3.kind, label: i3.label, muted: i3.muted, enabled: i3.enabled, readyState: i3.readyState, contentHint: i3.contentHint, ...a4 ?? {} }), i3.onunmute = () => o2(ClientEventTypes.MEDIA_TRACK_UNMUTED, { peerConnectionId: t4.peerConnectionId, trackId: i3.id, kind: i3.kind, label: i3.label, muted: i3.muted, enabled: i3.enabled, readyState: i3.readyState, contentHint: i3.contentHint, ...a4 ?? {} }), o2(ClientEventTypes.MEDIA_TRACK_ADDED, { peerConnectionId: t4.peerConnectionId, trackId: i3.id, kind: i3.kind, label: i3.label, muted: i3.muted, enabled: i3.enabled, readyState: i3.readyState, contentHint: i3.contentHint, constraints: i3.getConstraints(), capabilities: i3.getCapabilities(), settings: i3.getSettings(), ...a4 ?? {} }), t4.addMediaStreamTrack(i3, a4));
  }
  function bindRtcDataChannelEvents(n3) {
    const { monitor: t4, dataChannel: i3, fireEvent: o2 } = n3;
    i3.onclose = () => o2(ClientEventTypes.DATA_CHANNEL_CLOSED, { peerConnectionId: t4.peerConnectionId, dataChannelId: i3.id, label: i3.label, readyState: i3.readyState }), i3.onerror = (n4) => {
      const a4 = n4;
      o2(ClientEventTypes.DATA_CHANNEL_ERROR, { peerConnectionId: t4.peerConnectionId, dataChannelId: i3.id, label: i3.label, readyState: i3.readyState, error: a4?.error?.message });
    }, i3.onopen = () => o2(ClientEventTypes.DATA_CHANNEL_OPEN, { peerConnectionId: t4.peerConnectionId, dataChannelId: i3.id, label: i3.label, readyState: i3.readyState });
  }

  // node_modules/@observertc/client-monitor-js/dist/sources/MediasoupTransportBinding.js
  var MediasoupTransportBinding = class {
    transport;
    monitor;
    constructor(t4, r2) {
      this.transport = t4, this.monitor = r2, this._consumerAdded = this._consumerAdded.bind(this), this._producerAdded = this._producerAdded.bind(this), this._dataProducerAdded = this._dataProducerAdded.bind(this), this._dataConsumerAdded = this._dataConsumerAdded.bind(this), this._connectionStateChanged = this._connectionStateChanged.bind(this), this._iceGatheringStateChanged = this._iceGatheringStateChanged.bind(this), this.bind = this.bind.bind(this), this.unbind = this.unbind.bind(this), this.transport.observer.once("close", (() => {
        this._fireEvent(ClientEventTypes.PEER_CONNECTION_CLOSED, { iceGatheringState: this.transport.iceGatheringState, peerConnectionId: this.monitor.peerConnectionId });
      })), this._fireEvent(ClientEventTypes.PEER_CONNECTION_OPENED, { iceGatheringState: this.transport.iceGatheringState, peerConnectionId: this.monitor.peerConnectionId });
    }
    unbind() {
      this.transport.observer.off("close", this.unbind), this.transport.observer.off("newconsumer", this._consumerAdded), this.transport.observer.off("newdataproducer", this._dataProducerAdded), this.transport.observer.off("newproducer", this._producerAdded), this.transport.observer.off("newdataconsumer", this._dataConsumerAdded), this.transport.off("connectionstatechange", this._connectionStateChanged), this.transport.off("icegatheringstatechange", this._iceGatheringStateChanged), this.monitor.close();
    }
    bind() {
      this.transport.observer.once("close", this.unbind), this.transport.observer.on("newconsumer", this._consumerAdded), this.transport.observer.on("newdataproducer", this._dataProducerAdded), this.transport.observer.on("newproducer", this._producerAdded), this.transport.observer.on("newdataconsumer", this._dataConsumerAdded), this.transport.on("connectionstatechange", this._connectionStateChanged), this.transport.on("icegatheringstatechange", this._iceGatheringStateChanged);
    }
    _consumerPaused(t4) {
      return this._fireEvent(ClientEventTypes.CONSUMER_PAUSED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.producerId, consumerId: t4.id, trackId: t4.track.id });
    }
    _consumerResumed(t4) {
      return this._fireEvent(ClientEventTypes.CONSUMER_RESUMED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.producerId, consumerId: t4.id, trackId: t4.track.id });
    }
    _producerPaused(t4) {
      return this._fireEvent(ClientEventTypes.PRODUCER_PAUSED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.id, trackId: t4.track?.id });
    }
    _producerResumed(t4) {
      return this._fireEvent(ClientEventTypes.PRODUCER_RESUMED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.id, trackId: t4.track?.id });
    }
    _producerAdded(t4) {
      const r2 = () => this._producerPaused(t4), n3 = () => this._producerResumed(t4), o2 = this._createProducerTrackWatcher(t4), i3 = () => o2.onStats();
      t4.observer.once("close", (() => {
        t4.observer.off("pause", r2), t4.observer.off("resume", n3), this.monitor.off("stats", i3), this._fireEvent(ClientEventTypes.PRODUCER_REMOVED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.id, trackId: t4.track?.id });
      })), t4.observer.on("pause", r2), t4.observer.on("resume", n3), this.monitor.on("stats", i3), this.monitor.once("close", (() => this.monitor.off("stats", i3))), this._fireEvent(ClientEventTypes.PRODUCER_ADDED, { peerConnectionId: this.monitor.peerConnectionId, producerId: t4.id, trackId: t4.track?.id }), o2.onStats();
    }
    _createProducerTrackWatcher(e3) {
      const r2 = this.monitor, n3 = this._fireEvent.bind(this);
      return new class {
        registeredTrackId;
        onStats() {
          if (e3.track && this.registeredTrackId !== e3.track.id) return this.registeredTrackId = e3.track.id, bindMediaStreamTrackEvents({ fireEvent: n3, pcMonitor: r2, track: e3.track, attachments: { producerId: e3.id } });
        }
      }();
    }
    _consumerAdded(r2) {
      const n3 = () => this._consumerPaused(r2), o2 = () => this._consumerResumed(r2);
      return r2.observer.once("close", (() => {
        r2.observer.off("pause", n3), r2.observer.off("resume", o2), this._fireEvent(ClientEventTypes.CONSUMER_REMOVED, { peerConnectionId: this.monitor.peerConnectionId, producerId: r2.producerId, consumerId: r2.id, trackId: r2.track.id });
      })), r2.observer.on("pause", n3), r2.observer.on("resume", o2), this._fireEvent(ClientEventTypes.CONSUMER_ADDED, { peerConnectionId: this.monitor.peerConnectionId, producerId: r2.producerId, consumerId: r2.id, trackId: r2.track.id }), bindMediaStreamTrackEvents({ fireEvent: this._fireEvent.bind(this), pcMonitor: this.monitor, track: r2.track, attachments: { producerId: r2.producerId, consumerId: r2.id } });
    }
    _dataConsumerAdded(t4) {
      return t4.observer.once("close", (() => {
        this._fireEvent(ClientEventTypes.DATA_CONSUMER_CLOSED, { peerConnectionId: this.monitor.peerConnectionId, dataProducerId: t4.dataProducerId, dataConsumerId: t4.id });
      })), this._fireEvent(ClientEventTypes.DATA_CONSUMER_CREATED, { peerConnectionId: this.monitor.peerConnectionId, dataProducerId: t4.dataProducerId, dataConsumerId: t4.id });
    }
    _dataProducerAdded(t4) {
      return t4.observer.once("close", (() => {
        this._fireEvent(ClientEventTypes.DATA_PRODUCER_CLOSED, { peerConnectionId: this.monitor.peerConnectionId, dataProducerId: t4.id });
      })), this._fireEvent(ClientEventTypes.DATA_PRODUCER_CREATED, { peerConnectionId: this.monitor.peerConnectionId, dataProducerId: t4.id });
    }
    _connectionStateChanged(...t4) {
      return this.monitor.connectionState = t4[0], this._fireEvent(ClientEventTypes.PEER_CONNECTION_STATE_CHANGED, { peerConnectionId: this.monitor.peerConnectionId, connectionState: t4[0] });
    }
    _iceGatheringStateChanged(...t4) {
      return this._fireEvent(ClientEventTypes.ICE_GATHERING_STATE_CHANGED, { peerConnectionId: this.monitor.peerConnectionId, iceGatheringState: t4[0] });
    }
    _fireEvent(e3, t4) {
      return this.monitor.parent.addEvent({ type: e3, payload: this.monitor.parent.clientEventPayloadProvider.createPayload(e3, t4) });
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/sources/MediasoupDeviceBinding.js
  var MediasoupDeviceBinding = class {
    device;
    sources;
    constructor(s2, i3) {
      this.device = s2, this.sources = i3, this._transportAdded = this._transportAdded.bind(this), this.bind = this.bind.bind(this), this.unbind = this.unbind.bind(this);
    }
    bind() {
      this.device.observer.on("newtransport", this._transportAdded);
    }
    unbind() {
      this.device.observer.off("newtransport", this._transportAdded);
    }
    _transportAdded(s2) {
      this.sources.addMediasoupTransport(s2);
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/sources/Sources.js
  var h = "Sources";
  var Sources = class {
    monitor;
    logger;
    mediaDevicesAreWatched = false;
    userAgentMetaDataSent = false;
    userAgentStatsAdapterAdded = false;
    mediasoupStatsAdapterAdded = false;
    _peerConnectionBindings = /* @__PURE__ */ new Map();
    _mediasoupTransportBindings = /* @__PURE__ */ new Map();
    _mediasoupDeviceBindings = [];
    constructor(e3, i3) {
      this.monitor = e3, this.logger = i3;
    }
    addRTCPeerConnection(e3) {
      if ([...this._peerConnectionBindings.values()].find(((i3) => i3.peerConnection === e3.peerConnection))) return this.logger.warn(`[${h}]:`, "RTCPeerConnection already exists in sources, not adding again");
      const { peerConnectionId: t4 = crypto.randomUUID(), peerConnection: o2 } = e3, r2 = new PeerConnectionMonitor(t4, new RtcPeerConnectionStatsCollector(o2, this.monitor), this.monitor, this.logger), s2 = new RtcPeerConnectionBinding(o2, r2);
      s2.bind(), r2.once("close", (() => {
        this._peerConnectionBindings.delete(t4);
      })), this._peerConnectionBindings.set(t4, s2), this._addPeerConnectionMonitor(r2);
    }
    removeRTCPeerConnection(e3) {
      const i3 = [...this._peerConnectionBindings.values()].find(((i4) => i4.peerConnection === e3));
      i3 ? i3.unbind() : this.logger.warn(`[${h}]:`, "RTCPeerConnection not found in sources, cannot remove");
    }
    addMediasoupDevice(e3) {
      if (this._mediasoupDeviceBindings.find(((i4) => i4.device === e3))) return this.logger.warn(`[${h}]:`, "Mediasoup device already exists in sources, not adding again"), this;
      const i3 = new MediasoupDeviceBinding(e3, this);
      return this._mediasoupDeviceBindings.push(i3), i3.bind(), this;
    }
    removeMediasoupDevice(e3) {
      const i3 = this._mediasoupDeviceBindings.find(((i4) => i4.device === e3));
      return i3 ? (i3.unbind(), this._mediasoupDeviceBindings = this._mediasoupDeviceBindings.filter(((e4) => e4 !== i3)), this) : (this.logger.warn(`[${h}]:`, "Mediasoup device not found in sources, cannot remove"), this);
    }
    addMediasoupTransport(e3) {
      if (this._mediasoupTransportBindings.has(e3.id)) return this.logger.warn(`[${h}]:`, `Mediasoup transport (${e3.id}) already exists in sources, not adding again`), this;
      const t4 = { direction: e3.direction }, n3 = new PeerConnectionMonitor(e3.id, new MediasoupTransportStatsCollector(e3, this.monitor), this.monitor, this.logger, t4), r2 = new MediasoupTransportBinding(e3, n3);
      return n3.once("close", (() => {
        this._mediasoupTransportBindings.delete(e3.id);
      })), this._mediasoupTransportBindings.set(e3.id, r2), r2.bind(), this._addPeerConnectionMonitor(n3), this;
    }
    removeMediasoupTransport(e3) {
      const i3 = this._mediasoupTransportBindings.get(e3.id);
      return i3 ? (i3.unbind(), this._mediasoupTransportBindings.delete(e3.id), this) : (this.logger.warn(`[${h}]:`, `Mediasoup transport (${e3.id}) not found in sources, cannot remove`), this);
    }
    fetchUserAgentData() {
      const i3 = fetchUserAgentData(this.logger);
      if (i3) {
        if (this.userAgentMetaDataSent || (this.monitor.addMetaData({ type: "USER_AGENT_DATA", payload: { ...i3 } }), this.userAgentMetaDataSent = true), !this.userAgentStatsAdapterAdded && (this.userAgentStatsAdapterAdded = true, !this.monitor.browser && i3.browser)) {
          const e3 = i3.browser.name.toLowerCase();
          ["chrome", "firefox", "safari", "edge"].includes(e3) ? this.monitor.browser = { name: e3, version: i3.browser?.version } : this.monitor.browser = { name: "unknown", version: "unknown" };
        }
        return i3;
      }
    }
    watchNavigatorMediaDevices() {
      if (!this.mediaDevicesAreWatched) try {
        watchMediaDevices(this.monitor, this.logger), this.mediaDevicesAreWatched = true;
      } catch (e3) {
        this.logger.error(`[${h}]:`, "Failed to watch media devices", e3);
      }
    }
    _addPeerConnectionMonitor(e3) {
      this.monitor.addPeerConnectionMonitor(e3), this.addStatsAdapters(e3);
    }
    addStatsAdapters(e3) {
      if (this.monitor.browser) switch (this.monitor.browser.name) {
        case "chrome":
        case "edge":
        case "opera":
          e3.statsAdapters.add(new ChromeStatsAdapter());
          break;
        case "safari":
          e3.statsAdapters.add(new SafariStatsAdapter());
          break;
        case "firefox":
          e3.statsAdapters.add(new FirefoxStatsAdapter());
      }
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/CpuPerformanceDetector.js
  var CpuPerformanceDetector = class _CpuPerformanceDetector {
    clientMonitor;
    static ISSUE_TYPE = "cpulimitation";
    name = "cpu-performance-detector";
    disabled = false;
    issueKey = _CpuPerformanceDetector.ISSUE_TYPE;
    _startedAlertAt;
    constructor(t4) {
      this.clientMonitor = t4;
    }
    get config() {
      return this.clientMonitor.config.cpuPerformanceDetector;
    }
    update() {
      if (this.disabled) return;
      const t4 = this.clientMonitor.cpuPerformanceAlertOn;
      let e3 = false;
      const { alertOn: i3, alertOff: o2, minReceivedFrames: n3 } = this.config.incomingDecodedFramesRatioThresholds ?? {};
      if (this.config.durationOfCollectingStatsThreshold) {
        const { lowWatermark: i4, highWatermark: o3 } = this.config.durationOfCollectingStatsThreshold;
        t4 ? e3 = i4 < this.clientMonitor.durationOfCollectingStatsInMs : o3 < this.clientMonitor.durationOfCollectingStatsInMs && (e3 = true);
      }
      for (const t5 of this.clientMonitor.outboundRtps) {
        if (e3) break;
        e3 = "cpu" === t5.qualityLimitationReason || this._checkEncoderPressure(t5);
      }
      if (!e3 && void 0 !== i3 && void 0 !== o2) {
        const r2 = n3 ?? 0;
        for (const n4 of this.clientMonitor.inboundRtps) {
          if (e3) break;
          if ("video" !== n4.kind) continue;
          const s2 = n4.deltaFramesReceived ?? 0, c = n4.deltaFramesDecoded ?? 0;
          if (s2 < r2) continue;
          const a4 = Math.min(c / s2, 1);
          t4 ? e3 = a4 < o2 : a4 <= i3 && (e3 = true);
        }
      }
      if (e3) {
        if (t4) return;
        this.clientMonitor.cpuPerformanceAlertOn = true, this.clientMonitor.emit("cpulimitation", { clientMonitor: this.clientMonitor }), this._raise();
      } else {
        if (!t4) return;
        this.clientMonitor.cpuPerformanceAlertOn = false, this._resolve("cpu limitation ended");
      }
    }
    _checkEncoderPressure(t4) {
      if ("video" !== t4.kind) return false;
      const e3 = this.config.encoderCpuLimitationShareThreshold, i3 = this.config.encodeTimeBudgetRatio;
      if (void 0 !== e3) {
        const i4 = t4.qualityLimitationDurationShares?.cpu;
        if (void 0 !== i4 && e3 < i4) return true;
      }
      if (void 0 !== i3) {
        const e4 = t4.framesPerSecond, o2 = t4.encodeTimePerFrameInMs;
        if (!e4 || e4 < 1 || void 0 === o2) return false;
        if (1e3 / e4 * i3 < o2) return true;
      }
      return false;
    }
    _raise() {
      this._startedAlertAt = Date.now(), this.clientMonitor.raiseIssue(this.issueKey, { type: _CpuPerformanceDetector.ISSUE_TYPE, payload: {} });
    }
    _resolve(t4) {
      const e3 = this.clientMonitor.activeIssues.get(this.issueKey);
      let i3;
      e3 && (i3 = { ...e3.payload, durationInMs: this._startedAlertAt ? Date.now() - this._startedAlertAt : void 0 }), this.clientMonitor.resolveIssue(this.issueKey, { comment: t4, payload: i3, resolvedAt: Date.now() }), this._startedAlertAt = void 0;
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/detectors/StatsGapDetector.js
  var StatsGapDetector = class {
    clientMonitor;
    name = "stats-gap-detector";
    disabled = false;
    _previousCollectionStartedAt;
    constructor(t4) {
      this.clientMonitor = t4;
    }
    get config() {
      return this.clientMonitor.config.statsGapDetector;
    }
    update() {
      if (this.disabled) return;
      const i3 = this.clientMonitor.lastCollectingStatsAt;
      if (!i3) return;
      const e3 = this._previousCollectionStartedAt;
      if (this._previousCollectionStartedAt = i3, void 0 === e3) return;
      const o2 = i3 - e3, n3 = this.clientMonitor.config.collectingPeriodInMs;
      if (!n3 || n3 < 1) return;
      n3 * this.config.gapRatioThreshold < o2 && this.config.minGapInMs < o2 && (this.clientMonitor.emit("stats-collection-gap", { clientMonitor: this.clientMonitor, expectedPeriodInMs: n3, actualPeriodInMs: o2, gapInMs: o2 - n3 }), false !== this.config.createEvent && this.clientMonitor.addEvent({ type: ClientEventTypes.STATS_COLLECTION_GAP, payload: { expectedPeriodInMs: n3, actualPeriodInMs: o2, gapInMs: o2 - n3, durationOfCollectingStatsInMs: this.clientMonitor.durationOfCollectingStatsInMs } }));
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/scores/DefaultScoreCalculator.js
  var DefaultScoreCalculator = class _DefaultScoreCalculator {
    clientMonitor;
    static MAX_SCORE = 5;
    static MIN_SCORE = 0;
    static lastNScoresMaxLength = 10;
    static lastNScoresMinLength = 5;
    static TARGET_AUDIO_BITRATE = 32e3;
    static MIN_AUDIO_BITRATE = 6e3;
    static NORMALIZATION_FACTOR = Math.log10(this.TARGET_AUDIO_BITRATE / this.MIN_AUDIO_BITRATE);
    currentReasons = {};
    totalReasons = {};
    constructor(t4) {
      this.clientMonitor = t4;
    }
    update() {
      for (const t4 of this.clientMonitor.mappedPeerConnections.values()) this._calculatePeerConnectionStabilityScore(t4);
      for (const t4 of this.clientMonitor.tracks) this._calculateTrackScore(t4);
      this._calculateClientMonitorScore();
    }
    encodeScoreReasons(t4) {
      return JSON.stringify(t4 ?? "{}");
    }
    _calculateClientMonitorScore() {
      const e3 = this.clientMonitor;
      let a4 = 0, c = 0;
      this.currentReasons = {};
      for (const o3 of e3.peerConnections) {
        if (void 0 === o3.calculatedStabilityScore.value) continue;
        let e4 = 0, r2 = 0, l = true;
        for (const a5 of o3.tracks) {
          const c2 = a5.calculatedScore;
          void 0 !== c2.value && (e4 += c2.value * c2.weight, r2 += c2.weight, l = false, t3(this.currentReasons, c2.reasons ?? {}));
        }
        a4 += (l ? _DefaultScoreCalculator.MAX_SCORE : e4 / Math.max(r2, 1)) * (Math.max(_DefaultScoreCalculator.MIN_SCORE, o3.calculatedStabilityScore.value) / _DefaultScoreCalculator.MAX_SCORE) * o3.calculatedStabilityScore.weight, c += o3.calculatedStabilityScore.weight, t3(this.currentReasons, o3.scoreReasons ?? {});
      }
      const o2 = a4 / Math.max(c, 1);
      e3.setScore(o2, this.currentReasons), t3(this.totalReasons, this.currentReasons);
    }
    _calculatePeerConnectionStabilityScore(t4) {
      const e3 = t4.calculatedStabilityScore, a4 = 1e3 * (t4.avgRttInSec ?? 0), c = t4.inboundRtps.reduce(((t5, e4) => t5 + (e4.deltaFractionLost ?? 0)), 0) + t4.remoteInboundRtps.reduce(((t5, e4) => t5 + (e4.fractionLost ?? 0)), 0);
      let o2 = 5, r2 = e3.appData;
      const l = {};
      r2 || (r2 = { lastNScores: [] }, e3.appData = r2), e3.reasons = l, 300 < a4 ? l["very-high-rtt"] = 2 : 150 < a4 && (l["high-rtt"] = 1), 0.01 < c && (l["high-packetloss"] = c < 0.05 ? 1 : c < 0.2 ? 2 : 5), o2 = Math.max(_DefaultScoreCalculator.MIN_SCORE, _DefaultScoreCalculator.MAX_SCORE - this._getTotalSubtraction(l)), r2.lastNScores.push(o2);
      const i3 = this._calculateFinalScore(r2.lastNScores);
      e3.value = void 0 !== i3 ? this._getRoundedScore(i3) : void 0;
    }
    _calculateTrackScore(t4) {
      switch (t4.direction) {
        case "inbound":
          switch (t4.kind) {
            case "audio":
              this._calculateInboundAudioTrackScore(t4);
              break;
            case "video":
              this._calculateInboundVideoTrackScore(t4);
          }
          break;
        case "outbound":
          switch (t4.kind) {
            case "audio":
              this._calculateOutboundAudioTrackScore(t4);
              break;
            case "video":
              this._calculateOutboundVideoTrackScore(t4);
          }
      }
    }
    _calculateInboundVideoTrackScore(t4) {
      if (!t4.track.enabled || t4.track.muted) return t4.calculatedScore.appData && (t4.calculatedScore.appData = void 0), void (t4.calculatedScore.value = void 0);
      const e3 = t4.getInboundRtp();
      if (!e3) return void (t4.calculatedScore.value = void 0);
      let a4 = t4.calculatedScore.appData;
      const c = {};
      if (a4 || (a4 = { lastNScores: [] }, t4.calculatedScore.appData = a4), t4.calculatedScore.reasons = c, e3.framesPerSecond && e3.ewmaFps && e3.lastNFramesPerSec.length >= 2) {
        const t5 = e3.lastNFramesPerSec.length, a5 = e3.lastNFramesPerSec.reduce(((t6, e4) => t6 + e4), 0) / t5, o3 = e3.lastNFramesPerSec.reduce(((t6, e4) => t6 + Math.pow(e4 - a5, 2)), 0) / t5, r3 = Math.sqrt(o3) / e3.ewmaFps;
        0.1 < r3 && r3 < 0.2 ? c["volatile-fps"] = 1 : 0.2 <= r3 && (c["volatile-fps"] = 2);
      }
      if (e3.framesDropped && e3.framesRendered) {
        const t5 = e3.framesDropped / (e3.framesDropped + e3.framesRendered);
        0.1 < t5 && t5 < 0.2 ? c["dropped-video-frames"] = 1 : 0.2 < t5 && (c["dropped-video-frames"] = 2);
      }
      e3.deltaCorruptionProbability && (c["video-frame-corruptions"] = 2 * e3.deltaCorruptionProbability);
      const o2 = Math.max(_DefaultScoreCalculator.MIN_SCORE, _DefaultScoreCalculator.MAX_SCORE - this._getTotalSubtraction(c));
      a4.lastNScores.push(o2);
      const r2 = this._calculateFinalScore(a4.lastNScores);
      t4.calculatedScore.value = void 0 !== r2 ? this._getRoundedScore(r2) : void 0;
    }
    _calculateOutboundVideoTrackScore(t4) {
      if (!t4.track.enabled || t4.track.muted) return t4.calculatedScore.appData && (t4.calculatedScore.appData = void 0), void (t4.calculatedScore.value = void 0);
      const e3 = t4.getHighestLayer();
      if (!e3) return void (t4.calculatedScore.value = void 0);
      const a4 = t4.calculatedScore;
      let c = a4.appData;
      const o2 = {};
      if (c || (c = { lastNScores: [], diffBitrateSquares: [] }, a4.appData = c), a4.reasons = o2, "cpu" === e3.qualityLimitationReason && (o2["cpu-limitation"] = 2), "screen" !== t4.track.contentHint) {
        if (e3.targetBitrate) {
          const a5 = [...t4.mappedOutboundRtps.values()].reduce(((t5, e4) => t5 + (e4.payloadBitrate ?? 0)), 0);
          if (a5) {
            const t5 = e3.targetBitrate - a5, c2 = t5 / e3.targetBitrate, r3 = Math.max(2e4, 0.05 * e3.targetBitrate);
            0 < t5 && r3 < t5 && (0.05 <= c2 && c2 < 0.15 ? o2["high-deviation-from-target-bitrate"] = 1 : 0.15 <= c2 && (o2["high-deviation-from-target-bitrate"] = 2));
          }
        }
        if (e3.bitrate) {
          if (c.ewmaBitrate ? c.ewmaBitrate = 0.9 * c.ewmaBitrate + 0.1 * e3.bitrate : c.ewmaBitrate = e3.bitrate, c.lastBitrate) {
            const t5 = Math.abs(c.lastBitrate - e3.bitrate);
            for (c.diffBitrateSquares.push(t5 * t5); c.diffBitrateSquares.length > 10; ) c.diffBitrateSquares.shift();
          }
          if (c.diffBitrateSquares.length > 3) {
            const t5 = c.diffBitrateSquares.reduce(((t6, e5) => t6 + e5), 0) / c.diffBitrateSquares.length, e4 = Math.sqrt(t5) / c.ewmaBitrate;
            0.1 < e4 && e4 < 0.2 ? o2["high-volatile-bitrate"] = 1 : 0.2 < e4 && (o2["high-volatile-bitrate"] = 2);
          }
          c.lastBitrate = e3.bitrate;
        }
      }
      const r2 = Math.max(_DefaultScoreCalculator.MIN_SCORE, _DefaultScoreCalculator.MAX_SCORE - this._getTotalSubtraction(o2));
      c.lastNScores.push(r2), a4.value = this._calculateFinalScore(c.lastNScores);
    }
    _calculateInboundAudioTrackScore(t4) {
      if (!t4.track.enabled || t4.track.muted) return t4.calculatedScore.appData && (t4.calculatedScore.appData = void 0), void (t4.calculatedScore.value = void 0);
      const e3 = t4.bitrate, a4 = t4.getInboundRtp().deltaPacketsLost ?? 0;
      if (!e3) return void (t4.calculatedScore.value = void 0);
      const c = Math.log10(Math.max(e3, _DefaultScoreCalculator.MIN_AUDIO_BITRATE) / _DefaultScoreCalculator.MIN_AUDIO_BITRATE) / _DefaultScoreCalculator.NORMALIZATION_FACTOR, o2 = Math.exp(-a4 / 2), r2 = Math.max(_DefaultScoreCalculator.MIN_SCORE, Math.min(_DefaultScoreCalculator.MAX_SCORE, 5 * c * o2));
      t4.calculatedScore.value = this._getRoundedScore(r2);
    }
    _calculateOutboundAudioTrackScore(t4) {
      if (!t4.track.enabled || t4.track.muted) return t4.calculatedScore.appData && (t4.calculatedScore.appData = void 0), void (t4.calculatedScore.value = void 0);
      const e3 = t4.getOutboundRtps()?.[0];
      if (!e3 || void 0 === e3.bitrate) return void (t4.calculatedScore.value = void 0);
      const a4 = e3.getMediaSource()?.audioLevel;
      if (void 0 !== a4 && a4 < 0.01) return void (t4.calculatedScore.value = void 0);
      const c = Math.log10(Math.max(e3.bitrate, _DefaultScoreCalculator.MIN_AUDIO_BITRATE) / _DefaultScoreCalculator.MIN_AUDIO_BITRATE) / _DefaultScoreCalculator.NORMALIZATION_FACTOR, o2 = Math.exp(-(e3.getRemoteInboundRtp()?.deltaPacketsLost ?? 0) / 2), r2 = Math.max(_DefaultScoreCalculator.MIN_SCORE, Math.min(_DefaultScoreCalculator.MAX_SCORE, 5 * c * o2));
      t4.calculatedScore.value = this._getRoundedScore(r2);
    }
    _calculateFinalScore(t4) {
      let e3 = 0, a4 = 0, c = 0;
      if (_DefaultScoreCalculator.lastNScoresMaxLength < t4.length) t4.shift();
      else if (t4.length < _DefaultScoreCalculator.lastNScoresMinLength) return;
      for (const o2 of t4) a4 += 1, e3 += a4, c += a4 * o2;
      return c / e3;
    }
    _getRoundedScore(t4) {
      return Math.round(100 * t4) / 100;
    }
    _getTotalSubtraction(t4) {
      let e3 = 0;
      for (const a4 of Object.keys(t4)) {
        const c = t4[a4];
        "number" == typeof c && (e3 += c);
      }
      return e3;
    }
  };
  function t3(t4, e3) {
    for (const [a4, c] of Object.entries(e3)) {
      if ("number" != typeof c) continue;
      const e4 = a4;
      t4[e4] = (t4[e4] ?? 0) + c;
    }
    return t4;
  }

  // node_modules/@observertc/client-monitor-js/dist/sources/inferSourceType.js
  function inferSourceType(n3) {
    return (function(n4) {
      if (!n4) return false;
      const e3 = n4;
      return Boolean(e3.direction);
    })(n3) ? "mediasoup-transport" : (function(n4) {
      if (!n4) return false;
      const e3 = n4;
      return Boolean(e3.handlerName);
    })(n3) ? "mediasoup-device" : (function(n4) {
      if (!n4) return false;
      const e3 = n4;
      return Boolean(e3.setLocalDescription);
    })(n3) ? "RTCPeerConnection" : void 0;
  }

  // node_modules/@observertc/client-monitor-js/dist/sources/ClientEventPayloadProvider.js
  var ClientEventPayloadProvider = class {
    createClientJoinedEventPayload = (e3) => e3;
    createClientLeftEventPayload = (e3) => e3;
    createPeerConnectionOpenedEventPayload = (e3) => e3;
    createPeerConnectionClosedEventPayload = (e3) => e3;
    createMediaTrackMutedEventPayload = (e3) => e3;
    createMediaTrackUnmutedEventPayload = (e3) => e3;
    createMediaTrackAddedEventPayload = (e3) => e3;
    createMediaTrackRemovedEventPayload = (e3) => e3;
    createIceGatheringStateChangedEventPayload = (e3) => e3;
    createPeerConnectionStateChangedEventPayload = (e3) => e3;
    createIceConnectionStateChangedEventPayload = (e3) => e3;
    createDataChannelOpenEventPayload = (e3) => e3;
    createDataChannelClosedEventPayload = (e3) => e3;
    createDataChannelErrorEventPayload = (e3) => e3;
    createNegotiationNeededEventPayload = (e3) => e3;
    createIceCandidateEventPayload = (e3) => e3;
    createSignalingStateChangedEventPayload = (e3) => e3;
    createIceCandidateErrorEventPayload = (e3) => e3;
    createCodecChangedEventPayload = (e3) => e3;
    createVideoResolutionChangedEventPayload = (e3) => e3;
    createSimulcastLayerChangedEventPayload = (e3) => e3;
    createCaptureTrackEndedEventPayload = (e3) => e3;
    createCaptureTrackMutedEventPayload = (e3) => e3;
    createStatsCollectionGapEventPayload = (e3) => e3;
    createProducerAddedEventPayload = (e3) => e3;
    createProducerRemovedEventPayload = (e3) => e3;
    createProducerPausedEventPayload = (e3) => e3;
    createProducerResumedEventPayload = (e3) => e3;
    createConsumerAddedEventPayload = (e3) => e3;
    createConsumerRemovedEventPayload = (e3) => e3;
    createConsumerPausedEventPayload = (e3) => e3;
    createConsumerResumedEventPayload = (e3) => e3;
    createDataProducerCreatedEventPayload = (e3) => e3;
    createDataProducerClosedEventPayload = (e3) => e3;
    createDataConsumerCreatedEventPayload = (e3) => e3;
    createDataConsumerClosedEventPayload = (e3) => e3;
    createPayload(a4, t4) {
      switch (a4) {
        case ClientEventTypes.CLIENT_JOINED:
          return this.createClientJoinedEventPayload(t4);
        case ClientEventTypes.CLIENT_LEFT:
          return this.createClientLeftEventPayload(t4);
        case ClientEventTypes.PEER_CONNECTION_OPENED:
          return this.createPeerConnectionOpenedEventPayload(t4);
        case ClientEventTypes.PEER_CONNECTION_CLOSED:
          return this.createPeerConnectionClosedEventPayload(t4);
        case ClientEventTypes.MEDIA_TRACK_ADDED:
          return this.createMediaTrackAddedEventPayload(t4);
        case ClientEventTypes.MEDIA_TRACK_REMOVED:
          return this.createMediaTrackRemovedEventPayload(t4);
        case ClientEventTypes.MEDIA_TRACK_MUTED:
          return this.createMediaTrackMutedEventPayload(t4);
        case ClientEventTypes.MEDIA_TRACK_UNMUTED:
          return this.createMediaTrackUnmutedEventPayload(t4);
        case ClientEventTypes.ICE_GATHERING_STATE_CHANGED:
          return this.createIceGatheringStateChangedEventPayload(t4);
        case ClientEventTypes.PEER_CONNECTION_STATE_CHANGED:
          return this.createPeerConnectionStateChangedEventPayload(t4);
        case ClientEventTypes.ICE_CONNECTION_STATE_CHANGED:
          return this.createIceConnectionStateChangedEventPayload(t4);
        case ClientEventTypes.DATA_CHANNEL_OPEN:
          return this.createDataChannelOpenEventPayload(t4);
        case ClientEventTypes.DATA_CHANNEL_CLOSED:
          return this.createDataChannelClosedEventPayload(t4);
        case ClientEventTypes.DATA_CHANNEL_ERROR:
          return this.createDataChannelErrorEventPayload(t4);
        case ClientEventTypes.NEGOTIATION_NEEDED:
          return this.createNegotiationNeededEventPayload(t4);
        case ClientEventTypes.SIGNALING_STATE_CHANGE:
          return this.createSignalingStateChangedEventPayload(t4);
        case ClientEventTypes.ICE_CANDIDATE:
          return this.createIceCandidateEventPayload(t4);
        case ClientEventTypes.ICE_CANDIDATE_ERROR:
          return this.createIceCandidateErrorEventPayload(t4);
        case ClientEventTypes.CODEC_CHANGED:
          return this.createCodecChangedEventPayload(t4);
        case ClientEventTypes.VIDEO_RESOLUTION_CHANGED:
          return this.createVideoResolutionChangedEventPayload(t4);
        case ClientEventTypes.SIMULCAST_LAYER_CHANGED:
          return this.createSimulcastLayerChangedEventPayload(t4);
        case ClientEventTypes.CAPTURE_TRACK_ENDED:
          return this.createCaptureTrackEndedEventPayload(t4);
        case ClientEventTypes.CAPTURE_TRACK_MUTED:
          return this.createCaptureTrackMutedEventPayload(t4);
        case ClientEventTypes.STATS_COLLECTION_GAP:
          return this.createStatsCollectionGapEventPayload(t4);
        case ClientEventTypes.PRODUCER_ADDED:
          return this.createProducerAddedEventPayload(t4);
        case ClientEventTypes.PRODUCER_REMOVED:
          return this.createProducerRemovedEventPayload(t4);
        case ClientEventTypes.PRODUCER_PAUSED:
          return this.createProducerPausedEventPayload(t4);
        case ClientEventTypes.PRODUCER_RESUMED:
          return this.createProducerResumedEventPayload(t4);
        case ClientEventTypes.CONSUMER_ADDED:
          return this.createConsumerAddedEventPayload(t4);
        case ClientEventTypes.CONSUMER_REMOVED:
          return this.createConsumerRemovedEventPayload(t4);
        case ClientEventTypes.CONSUMER_PAUSED:
          return this.createConsumerPausedEventPayload(t4);
        case ClientEventTypes.CONSUMER_RESUMED:
          return this.createConsumerResumedEventPayload(t4);
        case ClientEventTypes.DATA_PRODUCER_CREATED:
          return this.createDataProducerCreatedEventPayload(t4);
        case ClientEventTypes.DATA_PRODUCER_CLOSED:
          return this.createDataProducerClosedEventPayload(t4);
        case ClientEventTypes.DATA_CONSUMER_CREATED:
          return this.createDataConsumerCreatedEventPayload(t4);
        case ClientEventTypes.DATA_CONSUMER_CLOSED:
          return this.createDataConsumerClosedEventPayload(t4);
        default:
          return {};
      }
    }
  };

  // node_modules/@observertc/client-monitor-js/dist/ClientMonitor.js
  var h2 = "ClientMonitor";
  var ClientMonitor = class extends eventemitter3_default {
    static samplingSchemaVersion = schemaVersion;
    mappedPeerConnections = /* @__PURE__ */ new Map();
    detectors;
    clientEventPayloadProvider = new ClientEventPayloadProvider();
    extensionStatsProviders = /* @__PURE__ */ new Set();
    activeIssues = /* @__PURE__ */ new Map();
    scoreCalculator;
    logger;
    closed = false;
    lastSampledAt = 0;
    lastCollectingStatsAt = 0;
    cpuPerformanceAlertOn = false;
    sendingAudioBitrate = -1;
    sendingVideoBitrate = -1;
    receivingAudioBitrate = -1;
    receivingVideoBitrate = -1;
    totalAvailableIncomingBitrate = -1;
    totalAvailableOutgoingBitrate = -1;
    avgRttInSec = -1;
    score = 5;
    scoreReasons;
    _browser;
    _sources;
    _timer;
    _samplingTick = 0;
    _collectingCounter = 0;
    _clientEvents = [];
    _clientMetaItems = [];
    _clientIssues = [];
    _extensionStats = [];
    durationOfCollectingStatsInMs = 0;
    config;
    attachments;
    constructor(e3) {
      super();
      const i3 = e3 ?? {};
      this.logger = i3.logger ?? createLogger();
      const s2 = (e4, t4) => void 0 === e4 ? t4 : e4;
      this.config = { ...i3, collectingPeriodInMs: i3.collectingPeriodInMs ?? 2e3, samplingPeriodInMs: i3.samplingPeriodInMs ?? 8e3, integrateNavigatorMediaDevices: i3.integrateNavigatorMediaDevices ?? true, addClientJointEventOnCreated: i3.addClientJointEventOnCreated ?? true, addClientLeftEventOnClose: i3.addClientLeftEventOnClose ?? true, videoFreezesDetector: s2(i3.videoFreezesDetector, {}), dryInboundTrackDetector: s2(i3.dryInboundTrackDetector, { thresholdInMs: 5e3 }), dryOutboundTrackDetector: s2(i3.dryOutboundTrackDetector, { thresholdInMs: 5e3 }), audioDesyncDetector: s2(i3.audioDesyncDetector, { fractionalCorrectionAlertOffThreshold: 0.05, fractionalCorrectionAlertOnThreshold: 0.1 }), syntheticSamplesDetector: s2(i3.syntheticSamplesDetector, { minSynthesizedSamplesDuration: 0 }), congestionDetector: s2(i3.congestionDetector, { sensitivity: "medium" }), cpuPerformanceDetector: s2(i3.cpuPerformanceDetector, { incomingDecodedFramesRatioThresholds: { alertOn: 0.7, alertOff: 0.85, minReceivedFrames: 10 }, durationOfCollectingStatsThreshold: { lowWatermark: 5e3, highWatermark: 1e4 }, encoderCpuLimitationShareThreshold: 0.3, encodeTimeBudgetRatio: 0.8 }), audioConcealmentDetector: s2(i3.audioConcealmentDetector, { onThreshold: 0.03, offThreshold: 0.01, windowInMs: 15e3, minSamplesInWindow: 24e3 }), jitterBufferStressDetector: s2(i3.jitterBufferStressDetector, { targetDelayThresholdInMs: 200, timeStretchThreshold: 0.02, minConsecutiveTicks: 2 }), decoderPerformanceDetector: s2(i3.decoderPerformanceDetector, { decodeTimeBudgetRatio: 0.8, dropRatioThreshold: 0.1, minFramesReceived: 10, quietLossThreshold: 0.02, minConsecutiveTicks: 2 }), videoRecoveryDetector: s2(i3.videoRecoveryDetector, { windowInMs: 3e4, pliRateAlertOn: 0.5, pliRateAlertOff: 0.15, recoveryFailedThresholdInMs: 5e3, recoveryFailedMinPliCount: 2 }), sourceEncoderBottleneckDetector: s2(i3.sourceEncoderBottleneckDetector, { captureFpsRatioThreshold: 0.5, minSourceFps: 5, encodeFpsRatioThreshold: 0.7, encodeTimeBudgetRatio: 0.8, cpuLimitationShareThreshold: 0.3, minConsecutiveTicks: 2 }), simulcastLayerDetector: s2(i3.simulcastLayerDetector, { createEvent: true }), captureFailureDetector: s2(i3.captureFailureDetector, { silenceThresholdInMs: 3e4, silenceRmsThreshold: 1e-3, createEvent: true }), codecChangeDetector: s2(i3.codecChangeDetector, { createEvent: true }), videoResolutionChangeDetector: s2(i3.videoResolutionChangeDetector, { createEvent: true }), stuckDecoderDetector: s2(i3.stuckDecoderDetector, { thresholdInMs: 4e3, rttMultiplier: 15, minStuckTicks: 2, minBitrate: 1e4, minPliCount: 2 }), statsGapDetector: s2(i3.statsGapDetector, { gapRatioThreshold: 2, minGapInMs: 5e3, createEvent: true }), playoutDiscrepancyDetector: s2(i3.playoutDiscrepancyDetector, { lowSkewThreshold: 2, highSkewThreshold: 5 }), longPcConnectionEstablishmentDetector: s2(i3.longPcConnectionEstablishmentDetector, { thresholdInMs: 5e3, createEvent: true }), iceConnectivityDetector: s2(i3.iceConnectivityDetector, { disconnectedThresholdInMs: 5e3, transportStallThresholdInMs: 5e3, createEvent: true, pathSwitchWindowInMs: 3e4, pathSwitchThreshold: 3, iceRestartRecommendationThresholdInMs: 1e4, iceRestartRecommendationCooldownInMs: 15e3 }), bufferingEventsForSamples: i3.bufferingEventsForSamples ?? false, sendResolvedIssuesToServer: i3.sendResolvedIssuesToServer ?? true, appData: i3.appData ?? {} }, this._sources = new Sources(this, this.logger), this.scoreCalculator = new DefaultScoreCalculator(this), this.setCollectingPeriod(this.config.collectingPeriodInMs), this.config.samplingPeriodInMs && this.setSamplingPeriod(this.config.samplingPeriodInMs), true === this.config.addClientJointEventOnCreated && this.addClientJoinEvent(), this.config.integrateNavigatorMediaDevices && this._sources.watchNavigatorMediaDevices();
      try {
        this._sources.fetchUserAgentData();
      } catch (e4) {
        this.logger.error(`[${h2}]:`, "Failed to fetch user agent data", e4);
      }
      this.detectors = new Detectors(), null !== this.config.cpuPerformanceDetector && this.detectors.add(new CpuPerformanceDetector(this)), null !== this.config.statsGapDetector && this.detectors.add(new StatsGapDetector(this));
    }
    get clientId() {
      return this.config.clientId;
    }
    set clientId(e3) {
      this.config.clientId = e3;
    }
    get callId() {
      return this.config.callId;
    }
    set callId(e3) {
      this.config.callId = e3;
    }
    get appData() {
      return this.config.appData;
    }
    set appData(e3) {
      this.config.appData = e3;
    }
    set browser(e3) {
      if (!this.closed && e3) {
        this._browser && this.logger.warn(`[${h2}]:`, "Browser info is already set on ClientMonitor, overwriting it"), this._browser = e3;
        for (const e4 of this.peerConnections) this._sources.addStatsAdapters(e4);
      }
    }
    set onsamplecreated(e3) {
      this.once("close", (() => this.off("sample-created", e3))), this.on("sample-created", e3);
    }
    set onstatscollected(e3) {
      this.once("close", (() => this.off("stats-collected", e3))), this.on("stats-collected", e3);
    }
    set onclientevent(e3) {
      this.once("close", (() => this.off("client-event", e3))), this.on("client-event", e3);
    }
    set onissue(e3) {
      this.once("close", (() => this.off("issue", e3))), this.on("issue", e3);
    }
    get browser() {
      return this._browser;
    }
    close() {
      if (!this.closed) {
        clearInterval(this._timer), this._timer = void 0;
        for (const e3 of [...this.activeIssues.keys()]) this.resolveIssue(e3, { comment: "monitor closed before issue could be resolved" });
        this.config.addClientLeftEventOnClose && this.addClientLeftEvent({}), 0 < this._samplingTick && this.createSample(), this.closed = true, this.emit("close");
      }
    }
    on(e3, t4) {
      return super.on(e3, t4), this;
    }
    once(e3, t4) {
      return super.once(e3, t4), this;
    }
    off(e3, t4) {
      return super.off(e3, t4), this;
    }
    emit(e3, ...t4) {
      return super.emit(e3, ...t4);
    }
    async collect() {
      if (this.closed) return this.logger.warn(`[${h2}]:`, "ClientMonitor is closed, cannot collect stats"), [];
      this.lastCollectingStatsAt = Date.now();
      const e3 = [];
      if (await Promise.all([...this.peerConnections.map((async (t4) => {
        try {
          const i3 = await t4.collect();
          e3.push([t4.peerConnectionId, i3]);
        } catch (e4) {
          this.logger.error(`[${h2}]:`, `Failed to get stats from peer connection ${t4.peerConnectionId}`, e4);
        }
      })), ...[...this.extensionStatsProviders.values()].map((async (e4) => {
        try {
          const t4 = await e4();
          this.addExtensionStats(t4);
        } catch (e5) {
          this.logger.error(`[${h2}]:`, "Failed to get extension stats", e5);
        }
      }))]), this.sendingAudioBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.sendingAudioBitrate ?? 0)), 0), this.sendingVideoBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.sendingVideoBitrate ?? 0)), 0), this.receivingAudioBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.receivingAudioBitrate ?? 0)), 0), this.receivingVideoBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.receivingVideoBitrate ?? 0)), 0), this.totalAvailableIncomingBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.totalAvailableIncomingBitrate ?? 0)), 0), this.totalAvailableOutgoingBitrate = this.peerConnections.reduce(((e4, t4) => e4 + (t4.totalAvailableOutgoingBitrate ?? 0)), 0), this.avgRttInSec = 0 < this.peerConnections.length ? this.peerConnections.reduce(((e4, t4) => e4 + (t4.avgRttInSec ?? 0)), 0) / this.peerConnections.length : -1, this.durationOfCollectingStatsInMs = Date.now() - this.lastCollectingStatsAt, this.tracks.forEach(((e4) => e4.update())), this.detectors.update(), this.scoreCalculator.update(), this.emit("stats-collected", { clientMonitor: this, startedAt: this.lastCollectingStatsAt, collectedStats: e3, durationOfCollectingStatsInMs: this.durationOfCollectingStatsInMs }), 0 < this._samplingTick) {
        ++this._collectingCounter % this._samplingTick === 0 && this.createSample();
      }
      return e3;
    }
    getPeerConnectionMonitor(e3) {
      return this.mappedPeerConnections.get(e3);
    }
    setScore(e3, t4) {
      this.closed || (this.score = e3, this.scoreReasons = t4, this.emit("score", { clientMonitor: this, clientScore: e3, currentReasons: t4 ?? {} }));
    }
    createSample() {
      if (this.closed) return;
      const e3 = { clientId: this.clientId, timestamp: Date.now(), callId: this.callId, attachments: this.attachments, peerConnections: this.peerConnections.map(((e4) => e4.createSample())), clientEvents: this._clientEvents, clientMetaItems: this._clientMetaItems, clientIssues: this._clientIssues, extensionStats: this._extensionStats, score: this.score };
      this._clientEvents = [], this._clientMetaItems = [], this._clientIssues = [], this._extensionStats = [];
      const t4 = Date.now();
      return e3 ? (this.emit("sample-created", { clientMonitor: this, sample: e3 }), this.lastSampledAt = t4, e3) : void 0;
    }
    addPeerConnectionMonitor(e3) {
      if (!this.closed) {
        if (this.mappedPeerConnections.has(e3.peerConnectionId)) return this.logger.warn(`[${h2}]:`, `PeerConnectionMonitor with id ${e3.peerConnectionId} already exists`);
        e3.once("close", (() => {
          this.mappedPeerConnections.delete(e3.peerConnectionId);
        })), this.mappedPeerConnections.set(e3.peerConnectionId, e3), this.emit("new-peerconnnection-monitor", { peerConnectionMonitor: e3, clientMonitor: this });
      }
    }
    addClientJoinEvent(e3) {
      this.closed || this.addEvent({ type: ClientEventTypes.CLIENT_JOINED, payload: { ...e3?.payload }, timestamp: e3?.timestamp ?? Date.now() });
    }
    addClientLeftEvent(e3) {
      this.closed || this.addEvent({ type: ClientEventTypes.CLIENT_LEFT, payload: { ...e3?.payload }, timestamp: e3?.timestamp ?? Date.now() });
    }
    addEvent(e3) {
      if (this.closed) return;
      if (!this._samplingTick && !this.config.bufferingEventsForSamples) return;
      const t4 = e3.timestamp ?? Date.now(), i3 = e3.payload ? JSON.stringify(e3.payload) : void 0;
      this._clientEvents.push({ ...e3, payload: i3, timestamp: t4 }), this.emit("client-event", { ...e3, payload: e3.payload, timestamp: t4 });
    }
    addIssue(e3) {
      if (this.closed) return;
      const t4 = e3.timestamp ?? Date.now(), i3 = { type: e3.type, payload: e3.payload, timestamp: t4 };
      return this._bufferIssueForSample(i3.type, i3.payload, t4), this.emit("issue", i3), i3;
    }
    raiseIssue(e3, t4) {
      if (this.closed) return;
      const i3 = t4.timestamp ?? Date.now(), s2 = this.activeIssues.get(e3);
      if (s2) return s2.type = t4.type, s2.payload = t4.payload, s2.updatedAt = i3, this.emit("issue-updated", s2), s2;
      const o2 = { type: t4.type, key: e3, payload: t4.payload, raisedAt: i3, updatedAt: i3 };
      return this.activeIssues.set(o2.key, o2), this._bufferIssueForSample(o2.type, o2.payload, i3, this.config.sendResolvedIssuesToServer ? o2.key : void 0), this.emit("issue", o2), o2;
    }
    resolveIssue(e3, t4) {
      if (this.closed) return;
      const i3 = this.activeIssues.get(e3);
      if (!i3) return;
      this.activeIssues.delete(e3), t4.payload && (i3.payload = t4.payload);
      const s2 = { ...i3, resolvedAt: t4.resolvedAt ?? Date.now(), comment: t4.comment };
      if (this.emit("issue-resolved", s2), this.config.sendResolvedIssuesToServer) {
        const e4 = "object" == typeof t4.payload && null !== t4.payload ? t4.payload : {};
        this._bufferIssueForSample(`${i3.type}-resolved`, { raisedAt: i3.raisedAt, comment: t4.comment, ...e4 }, s2.resolvedAt, i3.key);
      }
      return s2;
    }
    getActiveIssuesByType(e3) {
      const t4 = [];
      for (const i3 of this.activeIssues.values()) void 0 !== e3 && i3.type !== e3 || t4.push(i3);
      return t4;
    }
    isIssueActive(e3) {
      return this.activeIssues.has(e3);
    }
    _bufferIssueForSample(e3, t4, i3, s2) {
      (this._samplingTick || this.config.bufferingEventsForSamples) && this._clientIssues.push({ type: e3, key: s2, payload: void 0 === t4 ? void 0 : JSON.stringify(t4), timestamp: i3 });
    }
    addMetaData(e3) {
      if (this.closed) return;
      if (!this._samplingTick && !this.config.bufferingEventsForSamples) return;
      const t4 = e3.timestamp ?? Date.now();
      this._clientMetaItems.push({ type: e3.type, payload: e3.payload ? JSON.stringify(e3.payload) : void 0, timestamp: t4 }), this.emit("meta", { ...e3, payload: e3.payload, timestamp: t4 });
    }
    addExtensionStats(e3) {
      if (this.closed) return;
      if (!this._samplingTick && !this.config.bufferingEventsForSamples) return;
      const t4 = e3.payload ? JSON.stringify(e3.payload) : void 0;
      this._extensionStats.push({ type: e3.type, payload: t4 }), this.emit("extension-stats", { ...e3, payload: e3.payload });
    }
    addSource(e3, t4) {
      if (this.closed) return this.logger.warn(`[${h2}]:`, "Cannot add source to closed ClientMonitor");
      if (!t4 && !(t4 = inferSourceType(e3))) return this.logger.warn(`[${h2}]:`, "Cannot add source to ClientMonitor, because it is not a valid source", e3);
      switch (t4) {
        case "RTCPeerConnection":
          this._sources.addRTCPeerConnection({ peerConnection: e3 });
          break;
        case "mediasoup-device":
          this._sources.addMediasoupDevice(e3);
          break;
        case "mediasoup-transport":
          this._sources.addMediasoupTransport(e3);
          break;
        default:
          return this.logger.warn(`[${h2}]:`, "Cannot add source to ClientMonitor, because it is not a valid source", e3);
      }
    }
    removeSource(e3, t4) {
      if (this.closed) return this.logger.warn(`[${h2}]:`, "Cannot remove source from closed ClientMonitor");
      if (!t4 && !(t4 = inferSourceType(e3))) return this.logger.warn(`[${h2}]:`, "Cannot remove source from ClientMonitor, because it is not a valid source", e3);
      switch (t4) {
        case "RTCPeerConnection":
          this._sources.removeRTCPeerConnection(e3);
          break;
        case "mediasoup-device":
          this._sources.removeMediasoupDevice(e3);
          break;
        case "mediasoup-transport":
          this._sources.removeMediasoupTransport(e3);
          break;
        default:
          return this.logger.warn(`[${h2}]:`, "Cannot remove source from ClientMonitor, because it is not a valid source", e3);
      }
    }
    fetchUserAgentData() {
      return this._sources.fetchUserAgentData();
    }
    watchNavigatorMediaDevices() {
      this._sources.watchNavigatorMediaDevices();
    }
    get peerConnections() {
      return [...this.mappedPeerConnections.values()];
    }
    get codecs() {
      return [...this.peerConnections.flatMap(((e3) => e3.codecs))];
    }
    get inboundRtps() {
      return [...this.peerConnections.flatMap(((e3) => e3.inboundRtps))];
    }
    get outboundRtps() {
      return [...this.peerConnections.flatMap(((e3) => e3.outboundRtps))];
    }
    get remoteInboundRtps() {
      return [...this.peerConnections.flatMap(((e3) => e3.remoteInboundRtps))];
    }
    get remoteOutboundRtps() {
      return [...this.peerConnections.flatMap(((e3) => e3.remoteOutboundRtps))];
    }
    get mediaSources() {
      return [...this.peerConnections.flatMap(((e3) => e3.mediaSources))];
    }
    get mediaPlayouts() {
      return [...this.peerConnections.flatMap(((e3) => e3.mediaPlayouts))];
    }
    get dataChannels() {
      return [...this.peerConnections.flatMap(((e3) => e3.dataChannels))];
    }
    get iceCandidatePairs() {
      return [...this.peerConnections.flatMap(((e3) => e3.iceCandidatePairs))];
    }
    get iceCandidates() {
      return [...this.peerConnections.flatMap(((e3) => e3.iceCandidates))];
    }
    get iceTransports() {
      return [...this.peerConnections.flatMap(((e3) => e3.iceTransports))];
    }
    get certificates() {
      return [...this.peerConnections.flatMap(((e3) => e3.certificates))];
    }
    get tracks() {
      return [...this.peerConnections.flatMap(((e3) => e3.tracks))];
    }
    getTrackMonitor(e3) {
      return this.getInboundTrackMonitor(e3) ?? this.getOutboundTrackMonitor(e3);
    }
    getInboundTrackMonitor(e3) {
      return this.peerConnections.find(((t4) => t4.mappedInboundTracks.has(e3)))?.mappedInboundTracks.get(e3);
    }
    getOutboundTrackMonitor(e3) {
      return this.peerConnections.find(((t4) => t4.mappedOutboundTracks.has(e3)))?.mappedOutboundTracks.get(e3);
    }
    setCollectingPeriod(e3) {
      this._timer && clearInterval(this._timer), this._timer = void 0, this.config.collectingPeriodInMs = e3;
      try {
        if (!this.config.collectingPeriodInMs) return;
        this._timer = setInterval((() => {
          this.collect().catch(((e4) => this.logger.error(`[${h2}]:`, e4)));
        }), this.config.collectingPeriodInMs);
      } finally {
        this._setSamplingTick();
      }
    }
    setSamplingPeriod(e3) {
      this.config.samplingPeriodInMs = e3, this._setSamplingTick();
    }
    _setSamplingTick() {
      void 0 !== this.config.collectingPeriodInMs && void 0 !== this.config.samplingPeriodInMs ? this.config.collectingPeriodInMs < 1 || this.config.samplingPeriodInMs < 1 ? this._samplingTick = 0 : (this.config.samplingPeriodInMs % this.config.collectingPeriodInMs !== 0 && this.logger.warn(`[${h2}]:`, `The samplingPeriodInMs (${this.config.samplingPeriodInMs}) should be a multiple of collectingPeriodInMs (${this.config.collectingPeriodInMs}), otherwise the sampling will not be accurate`), this._samplingTick = Math.max(1, Math.floor(this.config.samplingPeriodInMs / this.config.collectingPeriodInMs))) : this._samplingTick = 0;
    }
  };

  // src/inject-source.js
  var CHANNEL = "__webrtc_qos_monitor__";
  var NativeRTCPeerConnection = window.RTCPeerConnection;
  var monitor = null;
  var enabled = false;
  var clientId = null;
  var callId = null;
  var hooked = false;
  var trackedConnections = /* @__PURE__ */ new Set();
  function post(type, payload) {
    window.postMessage({ channel: CHANNEL, direction: "to-content", type, payload }, window.location.origin);
  }
  function ensureMonitor() {
    if (monitor) return monitor;
    monitor = new ClientMonitor({
      clientId,
      callId,
      collectingPeriodInMs: window.__webrtcQosConfig && window.__webrtcQosConfig.collectingPeriodInMs || 2e3,
      samplingPeriodInMs: window.__webrtcQosConfig && window.__webrtcQosConfig.samplingPeriodInMs || 4e3
    });
    monitor.on("sample-created", ({ sample }) => {
      post("sample", { sample, href: location.href, hostname: location.hostname, ts: Date.now() });
    });
    monitor.on("issue", (issue) => {
      post("issue", { issue, href: location.href, hostname: location.hostname, ts: Date.now() });
    });
    monitor.on("score", ({ clientScore, currentReasons }) => {
      post("score", { clientScore, currentReasons, ts: Date.now() });
    });
    return monitor;
  }
  function trackConnection(pc) {
    if (!enabled || trackedConnections.has(pc)) return;
    trackedConnections.add(pc);
    const m = ensureMonitor();
    try {
      m.addSource(pc);
    } catch (err) {
      post("error", { message: "addSource failed: " + String(err && err.message), ts: Date.now() });
    }
    const cleanup = () => {
      trackedConnections.delete(pc);
      try {
        m.removeSource(pc);
      } catch (_e) {
      }
    };
    pc.addEventListener("connectionstatechange", () => {
      if (pc.connectionState === "closed" || pc.connectionState === "failed") cleanup();
    });
  }
  function installHook() {
    if (hooked) return;
    hooked = true;
    function WrappedRTCPeerConnection(...args) {
      const pc = new NativeRTCPeerConnection(...args);
      try {
        trackConnection(pc);
      } catch (err) {
        post("error", { message: "hook failed: " + String(err && err.message), ts: Date.now() });
      }
      return pc;
    }
    WrappedRTCPeerConnection.prototype = NativeRTCPeerConnection.prototype;
    Object.setPrototypeOf(WrappedRTCPeerConnection, NativeRTCPeerConnection);
    try {
      window.RTCPeerConnection = WrappedRTCPeerConnection;
    } catch (err) {
      post("error", { message: "could not override RTCPeerConnection: " + String(err && err.message), ts: Date.now() });
    }
  }
  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    const data = event.data;
    if (!data || data.channel !== CHANNEL || data.direction !== "to-page") return;
    if (data.type === "init" || data.type === "update-config") {
      enabled = !!data.payload.enabled;
      clientId = data.payload.clientId || clientId;
      callId = data.payload.callId || callId;
      window.__webrtcQosConfig = data.payload.clientMonitor || window.__webrtcQosConfig;
      if (enabled) installHook();
      if (!enabled && monitor) {
        monitor.close();
        monitor = null;
        trackedConnections.clear();
      }
    }
  });
  post("ready", { href: location.href, hostname: location.hostname });
  window.addEventListener("pagehide", () => {
    if (monitor) {
      try {
        monitor.close();
      } catch (_e) {
      }
    }
  });
})();

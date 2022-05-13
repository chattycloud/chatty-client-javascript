/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@socket.io/base64-arraybuffer/dist/base64-arraybuffer.es5.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@socket.io/base64-arraybuffer/dist/base64-arraybuffer.es5.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
/*
 * base64-arraybuffer 1.0.1 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
var encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
var decode = function (base64) {
    var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


//# sourceMappingURL=base64-arraybuffer.es5.js.map


/***/ }),

/***/ "./node_modules/@socket.io/component-emitter/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/**
 * Expose `Emitter`.
 */

exports.Emitter = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/backo2/index.js":
/*!**************************************!*\
  !*** ./node_modules/backo2/index.js ***!
  \**************************************/
/***/ ((module) => {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};



/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/has-cors/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-cors/index.js ***!
  \****************************************/
/***/ ((module) => {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/parseqs/index.js":
/*!***************************************!*\
  !*** ./node_modules/parseqs/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};


/***/ }),

/***/ "./node_modules/parseuri/index.js":
/*!****************************************!*\
  !*** ./node_modules/parseuri/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);

    return uri;
};

function pathNames(obj, path) {
    var regx = /\/{2,9}/g,
        names = path.replace(regx, "/").split("/");

    if (path.substr(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.substr(path.length - 1, 1) == '/') {
        names.splice(names.length - 1, 1);
    }

    return names;
}

function queryKey(uri, query) {
    var data = {};

    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });

    return data;
}


/***/ }),

/***/ "./src/Chat.ts":
/*!*********************!*\
  !*** ./src/Chat.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chat = void 0;
var socket_io_client_1 = __importDefault(__webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/cjs/index.js"));
var _1 = __importStar(__webpack_require__(/*! . */ "./src/index.ts"));
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var dev =  true ? 'dev' : 0;
var Chat = /** @class */ (function () {
    function Chat() {
        this.socket = null;
        this.chatlist = null;
        this.id = null;
        this.connectHandler = null;
        this.sendMessageHandler = null;
        this.fetchMessagesHandler = null;
        this.newMessageHandler = null;
        this.updateMessagesHandler = null;
        this.refreshChatHandler = null;
    }
    Chat.prototype.onConnectHandler = function (handler) {
        this.connectHandler = handler;
    };
    Chat.prototype.onSendMessageHandler = function (handler) {
        this.sendMessageHandler = handler;
    };
    Chat.prototype.onFetchMessagesHandler = function (handler) {
        this.fetchMessagesHandler = handler;
    };
    Chat.prototype.onNewMessageHandler = function (handler) {
        this.newMessageHandler = handler;
    };
    Chat.prototype.onUpdateMessagesHandler = function (handler) {
        this.updateMessagesHandler = handler;
    };
    Chat.prototype.onRefreshChatHandler = function (handler) {
        this.refreshChatHandler = handler;
    };
    Chat.prototype.connect = function (options, chatlist) {
        if (!_1.default.app || !_1.default.member || !_1.default.member.id) {
            throw new _1.ChattyException('E2001');
        }
        if (!options.at && !options.with) {
            throw new _1.ChattyException('E4007');
        }
        if (options.with) {
            if (typeof options.with === 'string') {
                options.with = [options.with];
            }
            options.with = options.with.filter(function (MemberId) { return MemberId && MemberId !== 'undefined' && MemberId !== 'null'; });
            options.with.push(_1.default.member.id);
            // Remove duplicated elements
            options.with = options.with.filter(function (value, index, self) { return self.indexOf(value) === index; });
            if (options.with.length < 2) {
                throw new _1.ChattyException('E4008');
            }
            if (options.distinctKey === undefined) {
                options.distinctKey = _1.default.generateDistinctKey(options.with);
            }
        }
        var url =  false ? 0 : "wss://".concat(dev, "socket.chatty-cloud.com");
        // option checker
        Object.keys(options).forEach(function (key) { return !options[key] && delete options[key]; });
        this.socket = (0, socket_io_client_1.default)("".concat(url, "/chat.").concat(_1.default.app.name), {
            transports: ["polling", "websocket"],
            query: {
                MemberId: _1.default.member.id,
                options: JSON.stringify(options)
            },
            auth: {
                token: _1.default.apiKey
            },
            forceNew: true,
            // withCredentials: true, // cors "*" 일때는 이값을 설정하면안된다.
        });
        if (chatlist) {
            this.chatlist = chatlist;
        }
        this.addListener();
    };
    Chat.prototype.disconnect = function () {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.disconnect();
        this.removeListener();
        this.socket = null;
        console.debug('::: Chatty DISCONNECT_DONE Chat');
    };
    Chat.prototype.fetchMessages = function (refresh) {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.emit(Types_1.ChattyEvent.FETCH_MESSAGES, { refresh: refresh });
    };
    Chat.prototype.sendMessage = function (data) {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.emit(Types_1.ChattyEvent.SEND_MESSAGE, __assign(__assign({}, data), { retry: 5 }));
    };
    Chat.prototype.refreshChat = function (ChatId) {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        // chat 화면의 정보 및 참여멤버정보등이 바뀔때 호출이되어야 함
        this.socket.emit(Types_1.ChattyEvent.REFRESH_CHAT, ChatId);
    };
    Chat.prototype.markAsRead = function () {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.emit(Types_1.ChattyEvent.MARK_AS_READ);
    };
    Chat.prototype.addListener = function () {
        var _this = this;
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.on(Types_1.ChattyEvent.CONNECT_DONE, function (chat) {
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4006', 'connectHandler');
            }
            console.debug("::: Chatty CONNECT_DONE", chat);
            _this.id = chat.id; // 연결된 ChatId를 Chat instance에 저장
            _this.connectHandler(chat, null);
        });
        this.socket.on(Types_1.ChattyEvent.CONNECT_FAIL, function (err) {
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4006', 'connectHandler');
            }
            console.warn('::: Chatty CONNECT_FAIL', { message: 'Please check your connect payload. especially if you use "with" param, check peer member id exist or not' });
            _this.connectHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.CONNECT_ERROR, function (err) {
            // server connect_error event
            // 1. check server running
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4006', 'connectHandler');
            }
            console.warn('::: Chatty CONNECT_ERROR', err);
            _this.connectHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.FETCH_MESSAGES_DONE, function (data) {
            if (!_this.fetchMessagesHandler) {
                throw new _1.ChattyException('E4006', 'fetchMessagesHandler');
            }
            console.debug('::: Chatty FETCH_MESSAGES_DONE', data);
            _this.fetchMessagesHandler(data, null);
            _this.markAsRead();
        });
        this.socket.on(Types_1.ChattyEvent.FETCH_MESSAGES_FAIL, function (err) {
            if (!_this.fetchMessagesHandler) {
                throw new _1.ChattyException('E4006', 'fetchMessagesHandler');
            }
            console.warn('::: Chatty FETCH_MESSAGES_FAIL', err);
            _this.fetchMessagesHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.SEND_MESSAGE_DONE, function (message) {
            var _a;
            if (!_this.sendMessageHandler) {
                throw new _1.ChattyException('E4006', 'sendMessageHandler');
            }
            console.debug('::: Chatty SEND_MESSAGE_DONE', message);
            _this.sendMessageHandler(message, null);
            // 내가 메시지를 보낸게 성공하면 항상 나의 ChatList를 업데이트해야한다.
            if ((_a = _this.chatlist) === null || _a === void 0 ? void 0 : _a.socket) {
                _this.chatlist.refreshChatList(message.ChatId);
            }
        });
        this.socket.on(Types_1.ChattyEvent.SEND_MESSAGE_FAIL, function (err) {
            if (!_this.sendMessageHandler) {
                throw new _1.ChattyException('E4006', 'sendMessageHandler');
            }
            console.warn('::: Chatty SEND_MESSAGE_FAIL', err);
            _this.sendMessageHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.SEND_MESSAGE_RETRY, function (data) {
            if (!_this.socket) {
                throw new _1.ChattyException('E4004');
            }
            console.debug('::: Chatty SEND_MESSAGE_RETRY', data);
            _this.socket.emit(Types_1.ChattyEvent.SEND_MESSAGE, data);
        });
        this.socket.on(Types_1.ChattyEvent.NEW_MESSAGE, function (message) {
            if (!_this.newMessageHandler) {
                throw new _1.ChattyException('E4006', 'newMessageHandler');
            }
            console.debug('::: Chatty NEW_MESSAGE', message);
            _this.newMessageHandler(message, null);
            _this.markAsRead();
        });
        this.socket.on(Types_1.ChattyEvent.MARK_AS_READ_DONE, function (data) {
            var _a;
            console.debug('::: Chatty MARK_AS_READ_DONE');
            // ChatList로부터 왔다면 ChatList를 업데이트해야한다.
            if ((_a = _this.chatlist) === null || _a === void 0 ? void 0 : _a.socket) {
                _this.chatlist.refreshChatList(data.ChatId);
            }
        });
        this.socket.on(Types_1.ChattyEvent.MARK_AS_READ_FAIL, function (err) {
            console.warn('::: Chatty MARK_AS_READ_FAIL', err);
        });
        this.socket.on(Types_1.ChattyEvent.MARK_AS_READ_BYPASS, function () {
            // MARK_AS_READ_DONE의 응답으로  data가 MARK_AS_READ_BYPASS 인경우가 있다. 
            // member 가 SUPER인경우에 해당되며 MARK_AS_READ 요청에대해 서버가 bypass로 동작한다
            console.debug('::: Chatty MARK_AS_READ_BYPASS');
        });
        /**
         * UPDATE_MESSAGES 가 발생하는 경우
         * server로 부터 받으며 MARK_AS_READ_DONE 일경우 발생한다
         * MARK_AS_READ 가 발생하는 경우는
         * 1. 내가 Send Message한후 즉 NEW_MESSAGE가 발생한후
         * 2. 상대가 Chat에 진입한경우 즉 FETCH_MESSAGES가 발생한후
         */
        this.socket.on(Types_1.ChattyEvent.UPDATE_MESSAGES, function (messages) {
            if (!_this.updateMessagesHandler) {
                throw new _1.ChattyException('E4006', 'updateMessagesHandler');
            }
            console.debug('::: Chatty UPDATE_MESSAGES');
            _this.updateMessagesHandler(messages, null);
        });
        this.socket.on(Types_1.ChattyEvent.REFRESH_CHAT_DONE, function (chat) {
            if (!_this.refreshChatHandler) {
                throw new _1.ChattyException('E4006', 'refreshChatHandler');
            }
            console.debug("::: Chatty REFRESH_CHAT_DONE", chat);
            _this.refreshChatHandler(chat, null);
        });
        this.socket.on(Types_1.ChattyEvent.REFRESH_CHAT_FAIL, function (err) {
            if (!_this.refreshChatHandler) {
                throw new _1.ChattyException('E4006', 'refreshChatHandler');
            }
            console.warn("::: Chatty REFRESH_CHAT_FAIL", err);
            _this.refreshChatHandler(null, err);
        });
    };
    Chat.prototype.removeListener = function () {
        if (!this.socket) {
            throw new _1.ChattyException('E4004');
        }
        this.socket.off(Types_1.ChattyEvent.CONNECT_DONE);
        this.socket.off(Types_1.ChattyEvent.CONNECT_FAIL);
        this.socket.off(Types_1.ChattyEvent.FETCH_MESSAGES_DONE);
        this.socket.off(Types_1.ChattyEvent.FETCH_MESSAGES_FAIL);
        this.socket.off(Types_1.ChattyEvent.SEND_MESSAGE_DONE);
        this.socket.off(Types_1.ChattyEvent.SEND_MESSAGE_FAIL);
        this.socket.off(Types_1.ChattyEvent.SEND_MESSAGE_RETRY);
        this.socket.off(Types_1.ChattyEvent.NEW_MESSAGE);
        this.socket.off(Types_1.ChattyEvent.MARK_AS_READ_DONE);
        this.socket.off(Types_1.ChattyEvent.MARK_AS_READ_FAIL);
        this.socket.off(Types_1.ChattyEvent.MARK_AS_READ_BYPASS);
        this.socket.off(Types_1.ChattyEvent.REFRESH_CHAT_DONE);
        this.socket.off(Types_1.ChattyEvent.REFRESH_CHAT_FAIL);
    };
    return Chat;
}());
exports.Chat = Chat;


/***/ }),

/***/ "./src/ChatList.ts":
/*!*************************!*\
  !*** ./src/ChatList.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatList = void 0;
var socket_io_client_1 = __importDefault(__webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/cjs/index.js"));
var _1 = __importStar(__webpack_require__(/*! . */ "./src/index.ts"));
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var dev =  true ? 'dev' : 0;
var ChatList = /** @class */ (function () {
    function ChatList() {
        this.socket = null;
        this.connectHandler = null;
        this.fetchChatListHandler = null;
        this.refreshChatListHandler = null;
    }
    ChatList.prototype.onConnectHandler = function (handler) {
        this.connectHandler = handler;
    };
    ChatList.prototype.onFetchChatListHandler = function (handler) {
        this.fetchChatListHandler = handler;
    };
    ChatList.prototype.onRefreshChatListHandler = function (handler) {
        this.refreshChatListHandler = handler;
    };
    ChatList.prototype.connect = function () {
        if (!_1.default.app || !_1.default.member) {
            throw new _1.ChattyException('E2001');
        }
        var url =  false ? 0 : "wss://".concat(dev, "socket.chatty-cloud.com");
        this.socket = (0, socket_io_client_1.default)("".concat(url, "/chatlist.").concat(_1.default.app.name), {
            transports: ["polling", "websocket"],
            query: { MemberId: _1.default.member.id },
            auth: {
                token: _1.default.apiKey
            }
        });
        this.addListener();
    };
    ChatList.prototype.disconnect = function () {
        if (!this.socket) {
            throw new _1.ChattyException('E4003');
        }
        this.socket.disconnect();
        this.removeListener();
        this.socket = null;
        console.debug('::: Chatty DISCONNECT_DONE ChatList');
    };
    ChatList.prototype.fetchChatList = function (options) {
        if (!this.socket) {
            throw new _1.ChattyException('E4003');
        }
        this.socket.emit(Types_1.ChattyEvent.FETCH_CHATLIST, options);
    };
    ChatList.prototype.refreshChatList = function (ChatId) {
        if (!this.socket) {
            throw new _1.ChattyException('E4003');
        }
        this.socket.emit(Types_1.ChattyEvent.REFRESH_CHATLIST, ChatId);
    };
    ChatList.prototype.addListener = function () {
        var _this = this;
        if (!this.socket) {
            throw new _1.ChattyException('E4003');
        }
        this.socket.on(Types_1.ChattyEvent.CONNECT_DONE, function (data) {
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4005', 'connectHandler');
            }
            console.debug('::: Chatty CONNECT_DONE ChatList');
            _this.connectHandler(data, null);
        });
        this.socket.on(Types_1.ChattyEvent.CONNECT_FAIL, function (err) {
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4005', 'connectHandler');
            }
            console.debug('::: Chatty CONNECT_FAIL', err);
            _this.connectHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.CONNECT_ERROR, function (err) {
            // server connect_error event
            // 1. check server running
            if (!_this.connectHandler) {
                throw new _1.ChattyException('E4005', 'connectHandler');
            }
            console.debug('::: Chatty CONNECT_ERROR', err);
            _this.connectHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.FETCH_CHATLIST_DONE, function (chats) {
            if (!_this.fetchChatListHandler) {
                throw new _1.ChattyException('E4005', 'fetchChatListHandler');
            }
            console.debug('::: Chatty FETCH_CHATLIST_DONE', chats);
            _this.fetchChatListHandler(chats, null);
        });
        this.socket.on(Types_1.ChattyEvent.FETCH_CHATLIST_FAIL, function (err) {
            if (!_this.fetchChatListHandler) {
                throw new _1.ChattyException('E4005', 'fetchChatListHandler');
            }
            console.debug('::: Chatty FETCH_CHATLIST_FAIL', err);
            _this.fetchChatListHandler(null, err);
        });
        this.socket.on(Types_1.ChattyEvent.REFRESH_CHATLIST_DONE, function (chat) {
            if (!_this.refreshChatListHandler) {
                throw new _1.ChattyException('E4005', 'refreshChatListHandler');
            }
            console.debug("::: Chatty REFRESH_CHATLIST_DONE", chat);
            _this.refreshChatListHandler(chat, null);
        });
        this.socket.on(Types_1.ChattyEvent.REFRESH_CHATLIST_FAIL, function (err) {
            if (!_this.refreshChatListHandler) {
                throw new _1.ChattyException('E4005', 'refreshChatListHandler');
            }
            console.debug("::: Chatty REFRESH_CHATLIST_FAIL", err);
            _this.refreshChatListHandler(null, err);
        });
    };
    ChatList.prototype.removeListener = function () {
        if (!this.socket) {
            throw new _1.ChattyException('E4003');
        }
        this.socket.off(Types_1.ChattyEvent.CONNECT_DONE);
        this.socket.off(Types_1.ChattyEvent.CONNECT_FAIL);
        this.socket.off(Types_1.ChattyEvent.FETCH_CHATLIST_DONE);
        this.socket.off(Types_1.ChattyEvent.FETCH_CHATLIST_FAIL);
        this.socket.off(Types_1.ChattyEvent.REFRESH_CHATLIST_DONE);
        this.socket.off(Types_1.ChattyEvent.REFRESH_CHATLIST_FAIL);
    };
    return ChatList;
}());
exports.ChatList = ChatList;


/***/ }),

/***/ "./src/Types.ts":
/*!**********************!*\
  !*** ./src/Types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChattyEvent = exports.SupportedVideoFormat = exports.SupportedImageFormat = exports.DefaultSystemMessages = exports.MemberPermissionType = void 0;
var MemberPermissionType;
(function (MemberPermissionType) {
    MemberPermissionType[MemberPermissionType["NONE"] = 0] = "NONE";
    MemberPermissionType[MemberPermissionType["READ"] = 1] = "READ";
    MemberPermissionType[MemberPermissionType["WRITE"] = 2] = "WRITE";
    MemberPermissionType[MemberPermissionType["ADMIN"] = 5] = "ADMIN";
    MemberPermissionType[MemberPermissionType["SUPER"] = 10] = "SUPER";
})(MemberPermissionType = exports.MemberPermissionType || (exports.MemberPermissionType = {}));
;
/**
 * Default System Message
 * system message의 type이 true 라면 system message를 created 하고 chat Member에 silent push 를 보낸다
 * invite 와 exclude의 경우에는 대상자에게는 push 를 보낸다.
 * join 와 leave 는 대상자를 제외한 chat member 모두에게 silent push를 보낸다
 */
exports.DefaultSystemMessages = {
    invite: '{MEMBER-NAME} was invited to chat',
    exclude: '{MEMBER-NAME}  was excluded from chat',
    join: '{MEMBER-NAME}  joined chat',
    leave: '{MEMBER-NAME}  left chat'
};
exports.SupportedImageFormat = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
exports.SupportedVideoFormat = ['video/mp4', 'video/webm'];
/**
 *
  ___             _      _____
  | __|_ _____ _ _| |_ __|_   _|  _ _ __  ___ ___
  | _|\ V / -_) ' \  _|___|| || || | '_ \/ -_|_-<
  |___|\_/\___|_||_\__|    |_| \_, | .__/\___/__/
                              |__/|_|

  */
var ChattyEvent;
(function (ChattyEvent) {
    ChattyEvent["CONNECT"] = "connection";
    ChattyEvent["CONNECT_DONE"] = "connect_done";
    ChattyEvent["CONNECT_FAIL"] = "connect_fail";
    ChattyEvent["CONNECT_ERROR"] = "connect_error";
    ChattyEvent["DISCONNECT"] = "disconnect";
    ChattyEvent["DISCONNECT_DONE"] = "disconnect_done";
    ChattyEvent["DISCONNECT_FAIL"] = "disconnect_fail";
    ChattyEvent["REFRESH_CHAT"] = "refresh_chat";
    ChattyEvent["REFRESH_CHAT_DONE"] = "refresh_chat_done";
    ChattyEvent["REFRESH_CHAT_FAIL"] = "refresh_chat_fail";
    ChattyEvent["NEW_MESSAGE"] = "new_message";
    ChattyEvent["FETCH_MESSAGES"] = "fetch_messages";
    ChattyEvent["FETCH_MESSAGES_DONE"] = "fetch_messages_done";
    ChattyEvent["FETCH_MESSAGES_FAIL"] = "fetch_messages_fail";
    ChattyEvent["UPDATE_MESSAGES"] = "update_message";
    ChattyEvent["FETCH_CHATLIST"] = "fetch_chatlist";
    ChattyEvent["FETCH_CHATLIST_DONE"] = "fetch_chatlist_done";
    ChattyEvent["FETCH_CHATLIST_FAIL"] = "fetch_chatlist_fail";
    ChattyEvent["REFRESH_CHATLIST"] = "refresh_chatlist";
    ChattyEvent["REFRESH_CHATLIST_DONE"] = "refresh_chatlist_done";
    ChattyEvent["REFRESH_CHATLIST_FAIL"] = "refresh_chatlist_fail";
    ChattyEvent["SEND_MESSAGE"] = "send_message";
    ChattyEvent["SEND_MESSAGE_DONE"] = "send_message_done";
    ChattyEvent["SEND_MESSAGE_FAIL"] = "send_message_fail";
    ChattyEvent["SEND_MESSAGE_RETRY"] = "send_message_retry";
    ChattyEvent["MARK_AS_READ"] = "mark_as_read";
    ChattyEvent["MARK_AS_READ_DONE"] = "mark_as_read_done";
    ChattyEvent["MARK_AS_READ_FAIL"] = "mark_as_read_fail";
    ChattyEvent["MARK_AS_READ_BYPASS"] = "mark_as_read_bypass";
    ChattyEvent["SYSTEM_MESSAGE"] = "systme_message";
})(ChattyEvent = exports.ChattyEvent || (exports.ChattyEvent = {}));
;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChattyTypes = exports.ChattyException = exports.ERR = void 0;
var Types_1 = __webpack_require__(/*! ./Types */ "./src/Types.ts");
var Chat_1 = __webpack_require__(/*! ./Chat */ "./src/Chat.ts");
var ChatList_1 = __webpack_require__(/*! ./ChatList */ "./src/ChatList.ts");
var package_json_1 = __webpack_require__(/*! ../package.json */ "./package.json");
console.debug('::: Chatty MODE', "development");
var dev =  true ? 'dev' : 0;
var Chatty = /** @class */ (function () {
    /**
     * @constructor
     * @param chatty instance of chatlist in case of coming from chatlist
     * @description When creating chat instance to update changing of chat room to chat list automatically, put chat list instance as a parameter of Chat constructor
     */
    function Chatty(chatty) {
        if (chatty) {
            this.chatlist = chatty.chatlist;
        }
        else {
            this.chatlist = new ChatList_1.ChatList();
        }
        this.chat = new Chat_1.Chat();
    }
    Chatty.init = function (initials) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.apiUrl =  false ? 0 : "https://".concat(dev, "api.chatty-cloud.com");
                        this.apiKey = initials.apiKey;
                        deviceInfo = {
                            platform: navigator.platform,
                            language: navigator.language,
                            product: navigator.product,
                            userAgent: navigator.userAgent,
                            sdkVersion: package_json_1.version
                        };
                        this.member = __assign(__assign({}, initials.member), { device: deviceInfo });
                        return [4 /*yield*/, this.updateMember(this.member)];
                    case 1:
                        _a.sent();
                        if (!this.member) {
                            console.warn('::: Chatty INIT Fail');
                        }
                        else {
                            console.info('::: Chatty INIT Success');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Chatty.exit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.member) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateMember({ deviceToken: '' })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.apiKey = undefined;
                        this.app = undefined;
                        this.member = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     
          __          __  ___      __
    _____/ /_  ____ _/ /_/ (_)____/ /_
   / ___/ __ \/ __ `/ __/ / / ___/ __/
  / /__/ / / / /_/ / /_/ / (__  ) /_
  \___/_/ /_/\__,_/\__/_/_/____/\__/
                                      
  
     */
    Chatty.prototype.connectChatList = function () {
        if (!this.chatlist) {
            console.warn('::: Chatty ChatList instance is not exist');
            return;
        }
        this.chatlist.connect();
    };
    Chatty.prototype.disconnectChatList = function () {
        if (!this.chatlist) {
            console.warn('::: Chatty ChatList instance is not exist');
            return;
        }
        this.chatlist.disconnect();
        this.chatlist = null;
    };
    Chatty.prototype.fetchChatList = function (options) {
        if (!this.chatlist) {
            console.warn('::: Chatty ChatList instance is not exist');
            return;
        }
        if (!options) {
            console.warn('::: Chatty fetchChatList error: Please check params options whether it is null or not');
            return;
        }
        this.chatlist.fetchChatList(options);
    };
    Chatty.prototype.refreshChatList = function (ChatId) {
        if (!this.chatlist) {
            console.warn('::: Chatty refreshChatList error: ChatList instance is not exist');
            return;
        }
        if (!ChatId) {
            console.warn('::: Chatty refreshChatList error: Please check params ChatId whether it is null or not');
            return;
        }
        this.chatlist.refreshChatList(ChatId);
    };
    /**
   
          __          __  ___      __        __                    ____
    _____/ /_  ____ _/ /_/ (_)____/ /_      / /_  ____ _____  ____/ / /__  _____
   / ___/ __ \/ __ `/ __/ / / ___/ __/_____/ __ \/ __ `/ __ \/ __  / / _ \/ ___/
  / /__/ / / / /_/ / /_/ / (__  ) /_/_____/ / / / /_/ / / / / /_/ / /  __/ /
  \___/_/ /_/\__,_/\__/_/_/____/\__/     /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/
                                                                              
  
    */
    Chatty.prototype.onChatListConnect = function (handler) {
        if (!this.chatlist) {
            throw new ChattyException('E4001');
        }
        this.chatlist.onConnectHandler(handler);
    };
    Chatty.prototype.onChatListFetch = function (handler) {
        if (!this.chatlist) {
            throw new ChattyException('E4001');
        }
        this.chatlist.onFetchChatListHandler(handler);
    };
    Chatty.prototype.onChatListRefresh = function (handler) {
        if (!this.chatlist) {
            throw new ChattyException('E4001');
        }
        this.chatlist.onRefreshChatListHandler(handler);
    };
    /**
     
          __          __
    _____/ /_  ____ _/ /_
   / ___/ __ \/ __ `/ __/
  / /__/ / / / /_/ / /_
  \___/_/ /_/\__,_/\__/
                         
  
     */
    Chatty.prototype.connectChat = function (options) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.connect(options, this.chatlist);
    };
    Chatty.prototype.disconnectChat = function () {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.disconnect();
        this.chat = null;
    };
    Chatty.prototype.fetchMessages = function (refresh) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.fetchMessages(refresh);
    };
    Chatty.prototype.sendTextMessage = function (text) {
        if (!text) {
            console.debug('::: Chatty sendTextMessage function param error: text is empty');
            return;
        }
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        if (!Chatty.member) {
            throw new ChattyException('E2001');
        }
        // 실제 저장이 되지 않은상태에서 chat 에서 보여져야 하기에 message id 가 여기서 부여되어야 함
        var message = {
            id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }),
            createdAt: new Date(),
            text: text,
            type: 'TEXT',
            by: 'USER',
            SenderId: Chatty.member.id,
            // Sender: {
            //   id: Chatty.member.id
            // }
        };
        this.chat.sendMessage(message);
        // return temporary message object before inserting to database
        return message;
    };
    Chatty.prototype.sendFileMessage = function (files) {
        var _this = this;
        if (!files) {
            console.debug('::: Chatty sendFileMessage function param error: files are undefined');
            return;
        }
        if (files.length > 4) {
            console.debug('::: Chatty sendFileMessage function param error: files length can not exceed 4');
            return;
        }
        if (!this.chat || !this.chat.id) {
            throw new ChattyException('E4002');
        }
        if (!Chatty.member) {
            throw new ChattyException('E2001');
        }
        // 실제 저장이 되지 않은상태에서 chat 에서 보여져야 하기에 message id 가 여기서 부여되어야 함
        var message = {
            id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); }),
            createdAt: new Date(),
            files: files,
            text: 'File Message',
            type: 'FILE',
            by: 'USER'
        };
        Chatty.uploadFiles(files)
            .then(function (files) {
            if (!_this.chat) {
                throw new ChattyException('E2002');
            }
            console.info('::: Chatty uploadFiles success', files);
            _this.chat.sendMessage(__assign(__assign({}, message), { files: files }));
        })
            .catch(function (err) {
            console.debug('::: Chatty uploadFiles error', err);
        });
        // return temporary message object with SenderId before inserting to database
        return __assign(__assign({}, message), { SenderId: Chatty.member.id });
    };
    Chatty.prototype.refreshChat = function (ChatId) {
        if (!ChatId) {
            throw new ChattyException('E1001');
        }
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.refreshChat(ChatId);
    };
    /**
     
          __          __        __                    ____
    _____/ /_  ____ _/ /_      / /_  ____ _____  ____/ / /__  _____
   / ___/ __ \/ __ `/ __/_____/ __ \/ __ `/ __ \/ __  / / _ \/ ___/
  / /__/ / / / /_/ / /_/_____/ / / / /_/ / / / / /_/ / /  __/ /
  \___/_/ /_/\__,_/\__/     /_/ /_/\__,_/_/ /_/\__,_/_/\___/_/
                                                                   
  
     */
    Chatty.prototype.onChatConnect = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onConnectHandler(handler);
    };
    Chatty.prototype.onMessageSend = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onSendMessageHandler(handler);
    };
    Chatty.prototype.onMessagesFetch = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onFetchMessagesHandler(handler);
    };
    Chatty.prototype.onMessagesUpdate = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onUpdateMessagesHandler(handler);
    };
    Chatty.prototype.onMessageReceive = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onNewMessageHandler(handler);
    };
    Chatty.prototype.onChatRefresh = function (handler) {
        if (!this.chat) {
            throw new ChattyException('E4002');
        }
        this.chat.onRefreshChatHandler(handler);
    };
    /**
     
           __        __  _            ____                 __  _
     _____/ /_____ _/ /_(_)____      / __/_  ______  _____/ /_(_)___  ____  _____
    / ___/ __/ __ `/ __/ / ___/_____/ /_/ / / / __ \/ ___/ __/ / __ \/ __ \/ ___/
   (__  ) /_/ /_/ / /_/ / /__/_____/ __/ /_/ / / / / /__/ /_/ / /_/ / / / (__  )
  /____/\__/\__,_/\__/_/\___/     /_/  \__,_/_/ /_/\___/\__/_/\____/_/ /_/____/
                                                                                 
  
    */
    Chatty.generateDistinctKey = function (data) {
        if (!data || (Array.isArray(data) && data.length < 1)) {
            throw new ChattyException('E1001');
        }
        var distinct = data;
        console.debug('::: generateDistinctKey', distinct);
        if (Array.isArray(distinct)) {
            distinct.sort();
            distinct = distinct.toString();
        }
        var MD5 = function (d) { var result = M(V(Y(X(d), 8 * d.length))); return result.toLowerCase(); };
        function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)
            _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f; }
        function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)
            _[m] = 0; for (m = 0; m < 8 * d.length; m += 8)
            _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _; }
        function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)
            _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _; }
        function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m, t = f, g = r, e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e);
        } return Array(m, f, r, i); }
        function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m); }
        function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n); }
        function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n); }
        function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n); }
        function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n); }
        function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m; }
        function bit_rol(d, _) { return d << _ | d >>> 32 - _; }
        return MD5(JSON.stringify(distinct));
    };
    Chatty.createChat = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!payload) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chat"), {
                                            method: 'POST',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(payload)
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_1 = _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.updateChat = function (chat) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response, data, json, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!chat) {
                            throw new ChattyException('E1001');
                        }
                        if (!chat.id) {
                            throw new ChattyException('E2005');
                        }
                        if (!Chatty.apiKey) {
                            throw new ChattyException('E2000');
                        }
                        if (!Chatty.apiUrl) {
                            throw new ChattyException('E2001');
                        }
                        return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chat/").concat(chat.id), {
                                method: 'PUT',
                                headers: {
                                    token: Chatty.apiKey,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        resolve(data);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        json = _a.sent();
                        throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        reject(err_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @description
     * non-socket(API call) 방식으로 message를 생성하는 함수
     * 두번째 인자를 통해 system message 와 user message로 구분한다
     * api server에서는 message가 발생하면 chat Members 에게 data push를 보낸다.
     * client 의 Chat socket에서는 이 push가 오면 fetchMessages를 호출해서 Chat을 업데이트해야한다.
     * @param message
     * @param system
     * @returns
     */
    Chatty.createMessage = function (message, system) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!message) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!message.ChatId) {
                                        throw new ChattyException('E2005');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    message.by = system ? 'SYSTEM' : 'USER';
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/message"), {
                                            method: 'POST',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(message)
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_3 = _a.sent();
                                    reject(err_3);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.getMissedCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/missed/").concat(Chatty.member.id), {
                                            method: 'GET',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_4 = _a.sent();
                                    reject(err_4);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.getMembersByGroup = function (group) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response, data, json, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!group) {
                            throw new ChattyException('E1001');
                        }
                        if (!Chatty.apiKey) {
                            throw new ChattyException('E2000');
                        }
                        if (!Chatty.apiUrl) {
                            throw new ChattyException('E2001');
                        }
                        return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/members?group=").concat(group), {
                                method: 'GET',
                                headers: {
                                    token: Chatty.apiKey,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        resolve(data);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        json = _a.sent();
                        throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_5 = _a.sent();
                        reject(err_5);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     *
     * @param member
     */
    Chatty.updateMember = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, member_1, json, err_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!member) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!member.id || !member.name) {
                                        throw new ChattyException('E1007');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    if (member.id && member.id !== Chatty.member.id) {
                                        throw new ChattyException('E2004');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/member/").concat(Chatty.member.id), {
                                            method: 'PUT',
                                            body: JSON.stringify(member),
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    member_1 = _a.sent();
                                    if (member_1) {
                                        Chatty.app = member_1.App;
                                        delete member_1['App'];
                                        Chatty.member = member_1;
                                    }
                                    resolve(member_1);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_6 = _a.sent();
                                    reject(err_6);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * @deprecated
     */
    Chatty.changeMemberPermission = function (MemberId, permission) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!MemberId || !permission) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    if (Chatty.member.permission < Types_1.MemberPermissionType.ADMIN) {
                                        throw new ChattyException('E2003');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/member/").concat(MemberId), {
                                            method: 'PUT',
                                            body: JSON.stringify({ permission: permission }),
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_7 = _a.sent();
                                    reject(err_7);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.deleteMember = function (MemberId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!MemberId) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    if (Chatty.member.permission < Types_1.MemberPermissionType.ADMIN) {
                                        throw new ChattyException('E2003');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/member/").concat(MemberId), {
                                            method: 'DELETE',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            }
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_8 = _a.sent();
                                    reject(err_8);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.fileCheckValidation = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (!Chatty.app) {
                                    throw new ChattyException('E2001');
                                }
                                if (!file.type) {
                                    throw new ChattyException('E1002');
                                }
                                if (file.type.split('/')[0] === 'image' && !Chatty.app.enableImageUpload) {
                                    throw new ChattyException('E1003');
                                }
                                if (file.type.split('/')[0] === 'video' && !Chatty.app.enableVideoUpload) {
                                    throw new ChattyException('E1004');
                                }
                                if (file.type.split('/')[0] === 'image' && !Types_1.SupportedImageFormat.includes(file.type)) {
                                    throw new ChattyException('E1005');
                                }
                                if (file.type.split('/')[0] === 'video' && !Types_1.SupportedVideoFormat.includes(file.type)) {
                                    throw new ChattyException('E1005');
                                }
                                return [2 /*return*/];
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param file
     * @returns
     */
    Chatty.uploadFiles = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var CF_DELIVERY_1, result, err_9;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    if (!files || !files.length) {
                                        throw new ChattyException('E1001');
                                    }
                                    Chatty.fileCheckValidation(files);
                                    CF_DELIVERY_1 = 'https://imagedelivery.net/Se1RT11x0rciKkirEISyIg';
                                    return [4 /*yield*/, Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                                            var response, json, form, uploadResult, json_1;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (!Chatty.apiKey) {
                                                            throw new ChattyException('E2000');
                                                        }
                                                        return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/uploadurl"), {
                                                                method: 'GET',
                                                                headers: {
                                                                    token: Chatty.apiKey,
                                                                    'Content-Type': 'application/json'
                                                                }
                                                            })];
                                                    case 1:
                                                        response = _b.sent();
                                                        if (!response.ok) return [3 /*break*/, 7];
                                                        return [4 /*yield*/, response.json()];
                                                    case 2:
                                                        json = _b.sent();
                                                        form = new FormData();
                                                        form.append('file', file);
                                                        // const resp = await fetch(file.uri);
                                                        // const blob = await resp.blob();
                                                        console.debug('nuno', json);
                                                        return [4 /*yield*/, fetch(json.uploadURL, {
                                                                method: 'POST',
                                                                body: form
                                                            })];
                                                    case 3:
                                                        uploadResult = _b.sent();
                                                        if (!uploadResult.ok) return [3 /*break*/, 5];
                                                        return [4 /*yield*/, uploadResult.json()];
                                                    case 4:
                                                        json_1 = _b.sent();
                                                        return [2 /*return*/, { uri: "".concat(CF_DELIVERY_1, "/").concat(json_1.result.id, "/").concat((_a = Chatty.app) === null || _a === void 0 ? void 0 : _a.thumbnailSize) }];
                                                    case 5: throw new ChattyException('E3002', 'Uploading image file failed');
                                                    case 6: return [3 /*break*/, 8];
                                                    case 7: throw new ChattyException('E3002', 'Get SignedUrl for image uploading failed');
                                                    case 8: return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    result = _a.sent();
                                    resolve(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_9 = _a.sent();
                                    reject(err_9);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.joinChat = function (ChatId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!ChatId) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chatmember/join"), {
                                            method: 'POST',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                ChatId: ChatId,
                                                MemberId: Chatty.member.id
                                            })
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_10 = _a.sent();
                                    reject(err_10);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.leaveChat = function (ChatId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!ChatId) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl || !Chatty.member) {
                                        throw new ChattyException('E2001');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chatmember/leave"), {
                                            method: 'DELETE',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                ChatId: ChatId,
                                                MemberId: Chatty.member.id
                                            })
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_11 = _a.sent();
                                    reject(err_11);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.inviteMembers = function (ChatId, MemberIds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_12;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!ChatId || !MemberIds) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl) {
                                        throw new ChattyException('E2001');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chatmember/invite"), {
                                            method: 'POST',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                ChatId: ChatId,
                                                MemberIds: MemberIds
                                            })
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_12 = _a.sent();
                                    reject(err_12);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Chatty.excludeMembers = function (ChatId, MemberIds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, json, err_13;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 7]);
                                    if (!ChatId || !MemberIds) {
                                        throw new ChattyException('E1001');
                                    }
                                    if (!Chatty.apiKey) {
                                        throw new ChattyException('E2000');
                                    }
                                    if (!Chatty.apiUrl) {
                                        throw new ChattyException('E2001');
                                    }
                                    return [4 /*yield*/, fetch("".concat(Chatty.apiUrl, "/chatmember/exclude"), {
                                            method: 'DELETE',
                                            headers: {
                                                token: Chatty.apiKey,
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                ChatId: ChatId,
                                                MemberIds: MemberIds
                                            })
                                        })];
                                case 1:
                                    response = _a.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _a.sent();
                                    resolve(data);
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, response.json()];
                                case 4:
                                    json = _a.sent();
                                    throw new ChattyException('E3001', JSON.stringify({ status: response.status, statusText: response.statusText, json: json }));
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    err_13 = _a.sent();
                                    reject(err_13);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return Chatty;
}());
exports.ERR = {
    E1001: 'Chatty error - Check function parameters are proper',
    E1002: 'Chatty error - Check type of files parameters. it should contain uri, type, name',
    E1003: 'Chatty error - Image upload not supported. configure your app setting in chatty-cloud dashboard',
    E1004: 'Chatty error - Video upload not supported. configure your app setting in chatty-cloud dashboard',
    E1005: 'Chatty error - Upload file format not supported',
    E1006: 'Chatty error - Maximum count of uploading files is 4. more than 4 is not allowed',
    E1007: "Chatty error - Check payload of member in init function. id and name should be passed",
    E2000: 'Chatty error - App Key is not valid. Please check apiKey param of Chatty.init function in your source code',
    E2001: 'Chatty error - Check Chatty class was initialized',
    E2002: 'Chatty error - Chat instance does not exist',
    E2003: 'Chatty error - Member permission not allwed',
    E2004: 'Chatty error - Member id does not match',
    E2005: 'Chatty error - Chat id does not exist in payload',
    E3001: 'Chatty API error - ',
    E3002: 'Chatty API error - ',
    E4001: 'ChatList Socket error - Check chatlist instance was created or not',
    E4002: 'Chat Socket error - Check chat instance was created or not',
    E4003: 'ChatList Socket error - Check chatlist socket connection',
    E4004: 'Chat Socket error - Check chat socket connection',
    E4005: 'ChatList Socket error - Check chatlist handler is not initialized. handler: ',
    E4006: 'Chat Socket error - Check chat handler is not initialized. handler: ',
    E4007: "Chat Socket error - ChatConnectOptions should have one of 'at' or 'with'",
    E4008: "Chat Socket error - When connect chat with 'with' options, peer member id is needed",
};
var ChattyException = /** @class */ (function (_super) {
    __extends(ChattyException, _super);
    function ChattyException(errorCode, customMessage) {
        var _this = this;
        var message;
        switch (errorCode) {
            case 'E1001':
                message = "Chatty error - Check function parameters are proper";
                break;
            case 'E1002':
                message = "Chatty error - Check type of files parameters exist or not";
                break;
            case 'E1003':
                message = "Chatty error - Image upload not supported. configure your app setting in chatty-cloud dashboard";
                break;
            case 'E1004':
                message = "Chatty error - Video upload not supported. configure your app setting in chatty-cloud dashboard";
                break;
            case 'E1005':
                message = "Chatty error - Upload file format not supported";
                break;
            case 'E1006':
                message = "Chatty error - Maximum count of uploading files is 4. more than 4 is not allowed";
                break;
            case 'E1007':
                message = "Chatty error - Check payload of member in init function. id and name should be passed";
                break;
            case 'E2000':
                message = "Chatty error - App Key is not valid. Please check apiKey param of Chatty.init function in your source code";
                break;
            case 'E2001':
                message = "Chatty error - Check Chatty class was initialized";
                break;
            case 'E2002':
                message = "Chatty error - Chat instance does not exist";
                break;
            case 'E2003':
                message = "Chatty error - Member permission not allwed";
                break;
            case 'E2004':
                message = "Chatty error - Member id does not match";
                break;
            case 'E2005':
                message = "Chatty error - Chat id does not exist in payload";
                break;
            case 'E3001':
                message = "Chatty API error - ".concat(customMessage);
                break;
            case 'E3002':
                message = "Chatty API error - ".concat(customMessage);
                break;
            case 'E4001':
                message = "ChatList Socket error - Check chatlist instance was created or not";
                break;
            case 'E4002':
                message = "Chat Socket error - Check chat instance was created or not";
                break;
            case 'E4003':
                message = "ChatList Socket error - Check chatlist socket connection";
                break;
            case 'E4004':
                message = "Chat Socket error - Check chat socket connection";
                break;
            case 'E4005':
                message = "ChatList Socket error - Check chatlist handler is not initialized. handler: ".concat(customMessage);
                break;
            case 'E4006':
                message = "Chat Socket error - Check chat handler is not initialized. handler: ".concat(customMessage);
                break;
            case 'E4007':
                message = "Chat Socket error - ChatConnectOptions should have one of 'at' or 'with'";
                break;
            case 'E4008':
                message = "Chat Socket error - When connect with 'with' options, minimum two MemberId are need";
                break;
            default:
                message = "Chatty Unknown error ".concat(customMessage);
                break;
        }
        _this = _super.call(this, message) || this;
        // Object.setPrototypeOf(this, new.target.prototype);
        _this.errorCode = errorCode;
        console.debug("::: Chatty Exception ".concat(errorCode), message);
        reportError({
            errorCode: errorCode,
            errorMessage: message,
            platform: navigator.platform,
            language: navigator.language,
            product: navigator.product,
            userAgent: navigator.userAgent,
            sdkVersion: package_json_1.version
        });
        return _this;
    }
    return ChattyException;
}(Error));
exports.ChattyException = ChattyException;
function reportError(err) {
    fetch("".concat(Chatty.apiUrl, "/misc/sendmail"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: Chatty.apiKey || '',
        },
        body: JSON.stringify({
            type: 'SDK ERROR',
            message: JSON.stringify(err)
        })
    });
}
exports.ChattyTypes = __importStar(__webpack_require__(/*! ./Types */ "./src/Types.ts"));
exports["default"] = Chatty;


/***/ }),

/***/ "./node_modules/yeast/index.js":
/*!*************************************!*\
  !*** ./node_modules/yeast/index.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/globalThis.browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.installTimerFunctions = exports.transports = exports.Transport = exports.protocol = exports.Socket = void 0;
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/engine.io-client/build/cjs/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_js_1.Socket; } }));
exports.protocol = socket_js_1.Socket.protocol;
var transport_js_1 = __webpack_require__(/*! ./transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
Object.defineProperty(exports, "Transport", ({ enumerable: true, get: function () { return transport_js_1.Transport; } }));
var index_js_1 = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/cjs/transports/index.js");
Object.defineProperty(exports, "transports", ({ enumerable: true, get: function () { return index_js_1.transports; } }));
var util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
Object.defineProperty(exports, "installTimerFunctions", ({ enumerable: true, get: function () { return util_js_1.installTimerFunctions; } }));


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/socket.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const index_js_1 = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/cjs/transports/index.js");
const util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const parseuri_1 = __importDefault(__webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:socket"); // debug()
class Socket extends component_emitter_1.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri or options
     * @param {Object} opts - options
     * @api public
     */
    constructor(uri, opts = {}) {
        super();
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0, parseuri_1.default)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = (0, parseuri_1.default)(opts.host).host;
        }
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || ["polling", "websocket"];
        this.readyState = "";
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
        }, opts);
        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
        if (typeof this.opts.query === "string") {
            this.opts.query = parseqs_1.default.decode(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                addEventListener("beforeunload", () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                }, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close");
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} transport name
     * @return {Transport}
     * @api private
     */
    createTransport(name) {
        debug('creating transport "%s"', name);
        const query = clone(this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser_1.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        });
        debug("options: %j", opts);
        return new index_js_1.transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @api private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            debug("error while creating transport: %s", e);
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @api private
     */
    setTransport(transport) {
        debug("setting transport %s", transport.name);
        if (this.transport) {
            debug("clearing existing transport %s", this.transport.name);
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", () => {
            this.onClose("transport close");
        });
    }
    /**
     * Probes a transport.
     *
     * @param {String} transport name
     * @api private
     */
    probe(name) {
        debug('probing transport "%s"', name);
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            debug('probe transport "%s" opened', name);
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", msg => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    debug('probe transport "%s" pong', name);
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    debug('pausing current transport "%s"', this.transport.name);
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        debug("changing transport and sending upgrade packet");
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    debug('probe transport "%s" failed', name);
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = err => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        transport.open();
    }
    /**
     * Called when connection is deemed open.
     *
     * @api private
     */
    onOpen() {
        debug("socket open");
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState &&
            this.opts.upgrade &&
            this.transport.pause) {
            debug("starting upgrade probes");
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @api private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
            debug('packet received with socket readyState "%s"', this.readyState);
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @api private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @api private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @api private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @api private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            debug("flushing %d packets in socket", this.writeBuffer.length);
            this.transport.send(this.writeBuffer);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = this.writeBuffer.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Sends a message.
     *
     * @param {String} message.
     * @param {Function} callback function.
     * @param {Object} options.
     * @return {Socket} for chaining.
     * @api public
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} callback function.
     * @api private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     *
     * @api public
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            debug("socket closing - telling transport to close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @api private
     */
    onError(err) {
        debug("socket error %j", err);
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @api private
     */
    onClose(reason, desc) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            debug('socket close with reason: "%s"', reason);
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, desc);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} server upgrades
     * @api private
     *
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
exports.Socket = Socket;
Socket.protocol = engine_io_parser_1.protocol;
function clone(obj) {
    const o = {};
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = obj[i];
        }
    }
    return o;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transport.js":
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transport.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transport = void 0;
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const util_js_1 = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = (0, debug_1.default)("engine.io-client:transport"); // debug()
class Transport extends component_emitter_1.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} options.
     * @api private
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.readyState = "";
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} str
     * @return {Transport} for chaining
     * @api protected
     */
    onError(msg, desc) {
        const err = new Error(msg);
        // @ts-ignore
        err.type = "TransportError";
        // @ts-ignore
        err.description = desc;
        super.emit("error", err);
        return this;
    }
    /**
     * Opens the transport.
     *
     * @api public
     */
    open() {
        if ("closed" === this.readyState || "" === this.readyState) {
            this.readyState = "opening";
            this.doOpen();
        }
        return this;
    }
    /**
     * Closes the transport.
     *
     * @api public
     */
    close() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     * @api public
     */
    send(packets) {
        if ("open" === this.readyState) {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
            debug("transport is not open, discarding packets");
        }
    }
    /**
     * Called upon open
     *
     * @api protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emit("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @api protected
     */
    onData(data) {
        const packet = (0, engine_io_parser_1.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @api protected
     */
    onPacket(packet) {
        super.emit("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @api protected
     */
    onClose() {
        this.readyState = "closed";
        super.emit("close");
    }
}
exports.Transport = Transport;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transports = void 0;
const polling_xhr_js_1 = __webpack_require__(/*! ./polling-xhr.js */ "./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js");
const websocket_js_1 = __webpack_require__(/*! ./websocket.js */ "./node_modules/engine.io-client/build/cjs/transports/websocket.js");
exports.transports = {
    websocket: websocket_js_1.WS,
    polling: polling_xhr_js_1.XHR
};


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js":
/*!***************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/polling-xhr.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/* global attachEvent */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Request = exports.XHR = void 0;
const xmlhttprequest_js_1 = __importDefault(__webpack_require__(/*! ./xmlhttprequest.js */ "./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
const util_js_1 = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const polling_js_1 = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/cjs/transports/polling.js");
const debug = (0, debug_1.default)("engine.io-client:polling-xhr"); // debug()
/**
 * Empty function
 */
function empty() { }
const hasXHR2 = (function () {
    const xhr = new xmlhttprequest_js_1.default({
        xdomain: false
    });
    return null != xhr.responseType;
})();
class XHR extends polling_js_1.Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @api public
     */
    constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
            this.xs = opts.secure !== isSSL;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @api private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @api private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data
        });
        req.on("success", fn);
        req.on("error", err => {
            this.onError("xhr post error", err);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @api private
     */
    doPoll() {
        debug("xhr poll");
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", err => {
            this.onError("xhr poll error", err);
        });
        this.pollXhr = req;
    }
}
exports.XHR = XHR;
class Request extends component_emitter_1.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @api public
     */
    constructor(uri, opts) {
        super();
        (0, util_js_1.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.async = false !== opts.async;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @api private
     */
    create() {
        const opts = (0, util_js_1.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        opts.xscheme = !!this.opts.xs;
        const xhr = (this.xhr = new xmlhttprequest_js_1.default(opts));
        try {
            debug("xhr open %s: %s", this.method, this.uri);
            xhr.open(this.method, this.uri, this.async);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            debug("xhr data %s", this.data);
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon successful response.
     *
     * @api private
     */
    onSuccess() {
        this.emit("success");
        this.cleanup();
    }
    /**
     * Called if we have data.
     *
     * @api private
     */
    onData(data) {
        this.emit("data", data);
        this.onSuccess();
    }
    /**
     * Called upon error.
     *
     * @api private
     */
    onError(err) {
        this.emit("error", err);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @api private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @api private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.onData(data);
        }
    }
    /**
     * Aborts the request.
     *
     * @api public
     */
    abort() {
        this.cleanup();
    }
}
exports.Request = Request;
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in globalThis_js_1.default ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/polling.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/polling.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Polling = void 0;
const transport_js_1 = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const yeast_1 = __importDefault(__webpack_require__(/*! yeast */ "./node_modules/yeast/index.js"));
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:polling"); // debug()
class Polling extends transport_js_1.Transport {
    constructor() {
        super(...arguments);
        this.polling = false;
    }
    /**
     * Transport name.
     */
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @api private
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} callback upon buffers are flushed and transport is paused
     * @api private
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            debug("paused");
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                debug("we are currently polling - waiting to pause");
                total++;
                this.once("pollComplete", function () {
                    debug("pre-pause polling complete");
                    --total || pause();
                });
            }
            if (!this.writable) {
                debug("we are currently writing - waiting to pause");
                total++;
                this.once("drain", function () {
                    debug("pre-pause writing complete");
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @api public
     */
    poll() {
        debug("polling");
        this.polling = true;
        this.doPoll();
        this.emit("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @api private
     */
    onData(data) {
        debug("polling got data %s", data);
        const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose();
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0, engine_io_parser_1.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emit("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
                debug('ignoring poll - transport state "%s"', this.readyState);
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @api private
     */
    doClose() {
        const close = () => {
            debug("writing close packet");
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            debug("transport open - closing");
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug("transport not open - deferring close");
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} data packets
     * @param {Function} drain callback
     * @api private
     */
    write(packets) {
        this.writable = false;
        (0, engine_io_parser_1.encodePayload)(packets, data => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emit("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "https" : "http";
        let port = "";
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_1.default)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        // avoid port if default for schema
        if (this.opts.port &&
            (("https" === schema && Number(this.opts.port) !== 443) ||
                ("http" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        const encodedQuery = parseqs_1.default.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
}
exports.Polling = Polling;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultBinaryType = exports.usingBrowserWebSocket = exports.WebSocket = exports.nextTick = void 0;
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
exports.nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return cb => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
exports.WebSocket = globalThis_js_1.default.WebSocket || globalThis_js_1.default.MozWebSocket;
exports.usingBrowserWebSocket = true;
exports.defaultBinaryType = "arraybuffer";


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/websocket.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/websocket.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WS = void 0;
const transport_js_1 = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/cjs/transport.js");
const parseqs_1 = __importDefault(__webpack_require__(/*! parseqs */ "./node_modules/parseqs/index.js"));
const yeast_1 = __importDefault(__webpack_require__(/*! yeast */ "./node_modules/yeast/index.js"));
const util_js_1 = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/cjs/util.js");
const websocket_constructor_js_1 = __webpack_require__(/*! ./websocket-constructor.js */ "./node_modules/engine.io-client/build/cjs/transports/websocket-constructor.browser.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const engine_io_parser_1 = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/cjs/index.js");
const debug = (0, debug_1.default)("engine.io-client:websocket"); // debug()
// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends transport_js_1.Transport {
    /**
     * WebSocket transport constructor.
     *
     * @api {Object} connection options
     * @api public
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Transport name.
     *
     * @api public
     */
    get name() {
        return "websocket";
    }
    /**
     * Opens socket.
     *
     * @api private
     */
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0, util_js_1.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                websocket_constructor_js_1.usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new websocket_constructor_js_1.WebSocket(uri, protocols)
                        : new websocket_constructor_js_1.WebSocket(uri)
                    : new websocket_constructor_js_1.WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emit("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || websocket_constructor_js_1.defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @api private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onmessage = ev => this.onData(ev.data);
        this.ws.onerror = e => this.onError("websocket error", e);
    }
    /**
     * Writes data to socket.
     *
     * @param {Array} array of packets.
     * @api private
     */
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0, engine_io_parser_1.encodePacket)(packet, this.supportsBinary, data => {
                // always create a new object (GH-437)
                const opts = {};
                if (!websocket_constructor_js_1.usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (websocket_constructor_js_1.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                    debug("websocket closed before onclose event");
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0, websocket_constructor_js_1.nextTick)(() => {
                        this.writable = true;
                        this.emit("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    /**
     * Closes socket.
     *
     * @api private
     */
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @api private
     */
    uri() {
        let query = this.query || {};
        const schema = this.opts.secure ? "wss" : "ws";
        let port = "";
        // avoid port if default for schema
        if (this.opts.port &&
            (("wss" === schema && Number(this.opts.port) !== 443) ||
                ("ws" === schema && Number(this.opts.port) !== 80))) {
            port = ":" + this.opts.port;
        }
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0, yeast_1.default)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        const encodedQuery = parseqs_1.default.encode(query);
        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
        return (schema +
            "://" +
            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
            port +
            this.opts.path +
            (encodedQuery.length ? "?" + encodedQuery : ""));
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @api public
     */
    check() {
        return (!!websocket_constructor_js_1.WebSocket &&
            !("__initialize" in websocket_constructor_js_1.WebSocket && this.name === WS.prototype.name));
    }
}
exports.WS = WS;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/transports/xmlhttprequest.browser.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// browser shim for xmlhttprequest module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const has_cors_1 = __importDefault(__webpack_require__(/*! has-cors */ "./node_modules/has-cors/index.js"));
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
function default_1(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors_1.default)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new globalThis_js_1.default[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}
exports["default"] = default_1;


/***/ }),

/***/ "./node_modules/engine.io-client/build/cjs/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/cjs/util.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.installTimerFunctions = exports.pick = void 0;
const globalThis_js_1 = __importDefault(__webpack_require__(/*! ./globalThis.js */ "./node_modules/engine.io-client/build/cjs/globalThis.browser.js"));
function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
exports.pick = pick;
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = setTimeout;
const NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis_js_1.default);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis_js_1.default);
    }
    else {
        obj.setTimeoutFn = setTimeout.bind(globalThis_js_1.default);
        obj.clearTimeoutFn = clearTimeout.bind(globalThis_js_1.default);
    }
}
exports.installTimerFunctions = installTimerFunctions;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/commons.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_PACKET = exports.PACKET_TYPES_REVERSE = exports.PACKET_TYPES = void 0;
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
exports.PACKET_TYPES = PACKET_TYPES;
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
exports.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };
exports.ERROR_PACKET = ERROR_PACKET;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commons_js_1 = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/cjs/commons.js");
const base64_arraybuffer_1 = __webpack_require__(/*! @socket.io/base64-arraybuffer */ "./node_modules/@socket.io/base64-arraybuffer/dist/base64-arraybuffer.es5.js");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = commons_js_1.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return commons_js_1.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: commons_js_1.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: commons_js_1.PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0, base64_arraybuffer_1.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
        case "arraybuffer":
        default:
            return data; // assuming the data is already an ArrayBuffer
    }
};
exports["default"] = decodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const commons_js_1 = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/cjs/commons.js");
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(commons_js_1.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + content);
    };
    return fileReader.readAsDataURL(data);
};
exports["default"] = encodePacket;


/***/ }),

/***/ "./node_modules/engine.io-parser/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodePayload = exports.decodePacket = exports.encodePayload = exports.encodePacket = exports.protocol = void 0;
const encodePacket_js_1 = __webpack_require__(/*! ./encodePacket.js */ "./node_modules/engine.io-parser/build/cjs/encodePacket.browser.js");
exports.encodePacket = encodePacket_js_1.default;
const decodePacket_js_1 = __webpack_require__(/*! ./decodePacket.js */ "./node_modules/engine.io-parser/build/cjs/decodePacket.browser.js");
exports.decodePacket = decodePacket_js_1.default;
const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0, encodePacket_js_1.default)(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
exports.encodePayload = encodePayload;
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0, decodePacket_js_1.default)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
exports.decodePayload = decodePayload;
exports.protocol = 4;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/index.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = exports.connect = exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
const url_js_1 = __webpack_require__(/*! ./url.js */ "./node_modules/socket.io-client/build/cjs/url.js");
const manager_js_1 = __webpack_require__(/*! ./manager.js */ "./node_modules/socket.io-client/build/cjs/manager.js");
Object.defineProperty(exports, "Manager", ({ enumerable: true, get: function () { return manager_js_1.Manager; } }));
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/cjs/socket.js");
Object.defineProperty(exports, "Socket", ({ enumerable: true, get: function () { return socket_js_1.Socket; } }));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client"); // debug()
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url_js_1.url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new manager_js_1.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_js_1.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
exports.io = lookup;
exports.connect = lookup;
exports["default"] = lookup;
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: manager_js_1.Manager,
    Socket: socket_js_1.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */
var socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js");
Object.defineProperty(exports, "protocol", ({ enumerable: true, get: function () { return socket_io_parser_1.protocol; } }));

module.exports = lookup;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/manager.js":
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/manager.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Manager = void 0;
const engine_io_client_1 = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/cjs/index.js");
const socket_js_1 = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/cjs/socket.js");
const parser = __importStar(__webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js"));
const on_js_1 = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/cjs/on.js");
const backo2_1 = __importDefault(__webpack_require__(/*! backo2 */ "./node_modules/backo2/index.js"));
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:manager"); // debug()
class Manager extends component_emitter_1.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        engine_io_client_1.installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new backo2_1.default({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug("opening %s", this.uri);
        this.engine = new engine_io_client_1.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on_js_1.on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        // emit `error`
        const errorSub = on_js_1.on(socket, "error", (err) => {
            debug("error");
            self.cleanup();
            self._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                self.maybeReconnectOnOpen();
            }
        });
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
                openSubDestroy(); // prevents a race condition with the 'open' event
            }
            // set timer
            const timer = this.setTimeoutFn(() => {
                debug("connect attempt timed out after %d", timeout);
                openSubDestroy();
                socket.close();
                // @ts-ignore
                socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on_js_1.on(socket, "ping", this.onping.bind(this)), on_js_1.on(socket, "data", this.ondata.bind(this)), on_js_1.on(socket, "error", this.onerror.bind(this)), on_js_1.on(socket, "close", this.onclose.bind(this)), on_js_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        this.decoder.add(data);
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        this.emitReserved("packet", packet);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new socket_js_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason) {
        debug("closed due to %s", reason);
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                debug("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        debug("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(function subDestroy() {
                clearTimeout(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}
exports.Manager = Manager;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.on = void 0;
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}
exports.on = on;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/socket.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Socket = void 0;
const socket_io_parser_1 = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/cjs/index.js");
const on_js_1 = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/cjs/on.js");
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:socket"); // debug()
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
class Socket extends component_emitter_1.Emitter {
    /**
     * `Socket` constructor.
     *
     * @public
     */
    constructor(io, nsp, opts) {
        super();
        this.connected = false;
        this.disconnected = true;
        this.receiveBuffer = [];
        this.sendBuffer = [];
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on_js_1.on(io, "open", this.onopen.bind(this)),
            on_js_1.on(io, "packet", this.onpacket.bind(this)),
            on_js_1.on(io, "error", this.onerror.bind(this)),
            on_js_1.on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @public
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for connect()
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * @return self
     * @public
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @return self
     * @public
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
        }
        args.unshift(ev);
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            debug("emitting packet with ack id %d", id);
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
        }
        else if (this.connected) {
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    debug("removing packet with ack id %d from the buffer", id);
                    this.sendBuffer.splice(i, 1);
                }
            }
            debug("event with ack id %d has timed out after %d ms", id, timeout);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
        }
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @private
     */
    onclose(reason) {
        debug("close (%s)", reason);
        this.connected = false;
        this.disconnected = true;
        delete this.id;
        this.emitReserved("disconnect", reason);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    const id = packet.data.sid;
                    this.onconnect(id);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug("emitting event %j", args);
        if (null != packet.id) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug("sending ack %j", args);
            self.packet({
                type: socket_io_parser_1.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
            debug("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id) {
        debug("socket connected with id %s", id);
        this.id = id;
        this.connected = true;
        this.disconnected = false;
        this.emitBuffered();
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => this.packet(packet));
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually.
     *
     * @return self
     * @public
     */
    disconnect() {
        if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for disconnect()
     *
     * @return self
     * @public
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     * @public
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @returns self
     * @public
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * ```
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     * ```
     *
     * @returns self
     * @public
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny() {
        return this._anyListeners || [];
    }
}
exports.Socket = Socket;


/***/ }),

/***/ "./node_modules/socket.io-client/build/cjs/url.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/cjs/url.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.url = void 0;
const parseuri_1 = __importDefault(__webpack_require__(/*! parseuri */ "./node_modules/parseuri/index.js"));
const debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")); // debug()
const debug = debug_1.default("socket.io-client:url"); // debug()
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug("parse %s", uri);
        obj = parseuri_1.default(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}
exports.url = url;


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/binary.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/binary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconstructPacket = exports.deconstructPacket = void 0;
const is_binary_js_1 = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/cjs/is-binary.js");
/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
exports.deconstructPacket = deconstructPacket;
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (is_binary_js_1.isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
}
exports.reconstructPacket = reconstructPacket;
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
const component_emitter_1 = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.js");
const binary_js_1 = __webpack_require__(/*! ./binary.js */ "./node_modules/socket.io-parser/build/cjs/binary.js");
const is_binary_js_1 = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/cjs/is-binary.js");
const debug_1 = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js"); // debug()
const debug = debug_1.default("socket.io-parser"); // debug()
/**
 * Protocol version.
 *
 * @public
 */
exports.protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_js_1.hasBinary(obj)) {
                obj.type =
                    obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK;
                return this.encodeAsBinary(obj);
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data);
        }
        debug("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = binary_js_1.deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
exports.Encoder = Encoder;
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends component_emitter_1.Emitter {
    constructor() {
        super();
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT ||
                packet.type === PacketType.BINARY_ACK) {
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (is_binary_js_1.isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug("decoded %s as %j", str, p);
        return p;
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return typeof payload === "object";
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
        }
    }
}
exports.Decoder = Decoder;
function tryParse(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return false;
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = binary_js_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/cjs/is-binary.js":
/*!**************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/cjs/is-binary.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasBinary = exports.isBinary = void 0;
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
exports.isBinary = isBinary;
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}
exports.hasBinary = hasBinary;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"chatty-client","version":"1.0.4","description":"","main":"lib/src/index.js","types":"lib/src/index.d.ts","scripts":{"chatty-types":"rm -rf ./src/chatty-types && cp -r ~/chatty/server/chatty-types ./src/","--------- dev build guide -------":"git push > npm version patch > yarn build.dev > npm publish","--------- pro build guide -------":"git push > npm version minor > yarn build.pro > npm publish","build.local":"rm -rf .git/index.lock && rm -rf ./lib && webpack --config webpack.config.ts --env MODE=none","build.dev":"rm -rf .git/index.lock && rm -rf ./lib && webpack --config webpack.config.ts --env MODE=development && cp lib/src/* ../chatty-client-javascript/","build.pro":"rm -rf .git/index.lock && rm -rf ./lib && webpack --config webpack.config.ts --env MODE=production && cp lib/src/* ../chatty-client-javascript/","build":"webpack --config webpack.config.ts --env MODE=production && cp lib/src/* ../chatty-client-javascript/"},"repository":"https://github.com/chatty-cloud/chatty-cloud-sdk.git","bugs":{"url":"https://github.com/chatty-cloud/chatty-cloud-sdk/issues","email":"administrator@chatty-cloud.com"},"homepage":"https://www.chatty-cloud.com","keywords":[],"files":["lib"],"author":"chatty-cloud<administrator@chatty-cloud.com>","license":"ISC","dependencies":{"socket.io-client":"^4.1.3"},"devDependencies":{"@types/node":"^16.6.0","@types/webpack":"^5.28.0","path":"^0.12.7","ts-loader":"^9.2.5","ts-node":"^10.2.0","typescript":"^4.3.5","webpack":"^5.50.0","webpack-cli":"^4.7.2"}}');

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map
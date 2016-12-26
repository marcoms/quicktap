/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/*
@preserve

quicktap library, MIT licensed
*/



const touchEnabled = 'ontouchstart' in window;

/*
@preserve

This snippet is derived from the Modernizr library
(https://github.com/Modernizr/Modernizr), licensed as MIT.

(snippet begins)
*/

const supportsPassive = false;
try {
	const opts = Object.defineProperty({}, 'passive', {
		get: function() { supportsPassive = true; }
	});

	window.addEventListener('test', null, opts);
} catch (e) {}

// (snippet ends)

const quicktap = {
	class: 'active',

	apply: function apply(el) {
		if (el === undefined) {
			throw Error('element parameter is required');
		}

		if (supportsPassive) {
			el.addEventListener('mousedown', activate, {passive: true});
			el.addEventListener('mouseup', deactivate, {passive: true});
			el.addEventListener('mouseleave', deactivate, {passive: true});

			if (isTouch) {
				el.addEventListener('touchstart', activate, {passive: true});
				el.addEventListener('touchcancel', deactivate, {passive: true});
				el.addEventListener('touchend', deactivate,  {passive: true});
			}
		} else {
			el.addEventListener('mousedown', activate, false);
			el.addEventListener('mouseup', deactivate, false);
			el.addEventListener('mouseleave', deactivate, false);

			if (isTouch) {
				el.addEventListener('touchstart', activate, false);
				el.addEventListener('touchcancel', deactivate, false);
				el.addEventListener('touchend', deactivate, false);
			}
		}
	},
};

function activate(evt) {
	evt.currentTarget.classList.add(quicktap.class);
}

function deactivate(evt) {
	evt.currentTarget.classList.remove(quicktap.class);
}

module.exports = quicktap;


/***/ }
/******/ ]);
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.quicktap=t():e.quicktap=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e){e.currentTarget.classList.add(s.class)}function o(e){e.currentTarget.classList.remove(s.class)}/*
@preserve

quicktap library, MIT licensed
*/
if(Object.defineProperty(t,"__esModule",{value:!0}),"undefined"==typeof window)throw new Error("quicktap can only be used in the browser");const i="ontouchstart"in window,u=!1;try{const c=Object.defineProperty({},"passive",{get:function(){u=!0}});window.addEventListener("test",null,c)}catch(e){}const s={class:"active",apply:function(e){if(void 0===e)throw Error("element parameter is required");e.addEventListener("mousedown",r,!1),e.addEventListener("mouseup",o,!1),e.addEventListener("mouseleave",o,!1),i&&(e.addEventListener("touchstart",r,!1),e.addEventListener("touchcancel",o,!1),e.addEventListener("touchend",o,!1))}};t.default=s}])});
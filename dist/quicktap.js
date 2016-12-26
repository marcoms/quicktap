(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.quicktap=f()}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){/*
@preserve

quicktap library, MIT licensed
*/
"use strict";const touchEnabled="ontouchstart"in window;/*
@preserve

This snippet is derived from the Modernizr library
(https://github.com/Modernizr/Modernizr), licensed as MIT.

(snippet begins)
*/
const supportsPassive=false;try{const opts=Object.defineProperty({},"passive",{get:function(){supportsPassive=true}});window.addEventListener("test",null,opts)}catch(e){}const quicktap={class:"active",apply:function apply(el){if(el===undefined){throw Error("element parameter is required")}if(supportsPassive){el.addEventListener("mousedown",activate,{passive:true});el.addEventListener("mouseup",deactivate,{passive:true});el.addEventListener("mouseleave",deactivate,{passive:true});if(isTouch){el.addEventListener("touchstart",activate,{passive:true});el.addEventListener("touchcancel",deactivate,{passive:true});el.addEventListener("touchend",deactivate,{passive:true})}}else{el.addEventListener("mousedown",activate,false);el.addEventListener("mouseup",deactivate,false);el.addEventListener("mouseleave",deactivate,false);if(isTouch){el.addEventListener("touchstart",activate,false);el.addEventListener("touchcancel",deactivate,false);el.addEventListener("touchend",deactivate,false)}}}};function activate(evt){evt.currentTarget.classList.add(quicktap.class)}function deactivate(evt){evt.currentTarget.classList.remove(quicktap.class)}module.exports=quicktap},{}]},{},[1])(1)});

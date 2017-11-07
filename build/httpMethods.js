"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = function get(placeholders, options) {
    if (placeholders === void 0) { placeholders = {}; }
    if (options === void 0) { options = {}; }
    return {
        placeholders: placeholders,
        options: options,
    };
};
// body
// placeholders, body
// placeholders, body, options
exports.post = function post() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var placeholders = args.length >= 2 ? args[0] : {};
    var body = args.length >= 2 ? args[1] : args[0];
    var options = args.length == 3 ? args[2] : {};
    return {
        placeholders: placeholders,
        options: __assign({ method: 'POST', mode: 'cors', body: body && JSON.stringify(body) }, options)
    };
};
// body
// placeholders, body
// placeholders, body, options
exports.patch = function patch() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var placeholders = args.length >= 2 ? args[0] : {};
    var body = args.length >= 2 ? args[1] : args[0];
    var options = args.length == 3 ? args[2] : {};
    return {
        placeholders: placeholders,
        options: __assign({ method: 'PATCH', mode: 'cors', body: body && JSON.stringify(body) }, options)
    };
};
// body
// placeholders, body
// placeholders, body, options
exports.put = function patch() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var placeholders = args.length >= 2 ? args[0] : {};
    var body = args.length >= 2 ? args[1] : args[0];
    var options = args.length == 3 ? args[2] : {};
    return {
        placeholders: placeholders,
        options: __assign({ method: 'PUT', mode: 'cors', body: body && JSON.stringify(body) }, options)
    };
};
// placeholders
// placeholders, options
exports.destroy = function destroy(placeholders, options) {
    if (placeholders === void 0) { placeholders = {}; }
    if (options === void 0) { options = {}; }
    return {
        placeholders: placeholders,
        options: __assign({ method: 'DELETE', mode: 'cors' }, options),
    };
};

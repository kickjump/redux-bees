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
function buildMiddleware() {
    return function (api) { return function (next) { return function (promise) {
        if (!promise) {
            return;
        }
        if (!promise.then) {
            return next(promise);
        }
        if (promise.noop) {
            return;
        }
        var meta = {
            api: true,
            name: promise.actionName,
            params: promise.params,
        };
        next({
            type: "api/" + promise.actionName + "/request",
            meta: __assign({}, meta, { type: 'request' }),
        });
        return promise
            .then(function (result) {
            next({
                type: "api/" + promise.actionName + "/response",
                payload: result,
                meta: __assign({}, meta, { type: 'response' }),
            });
            return Promise.resolve(result);
        })
            .catch(function (result) {
            next({
                type: "api/" + promise.actionName + "/error",
                payload: result,
                meta: __assign({}, meta, { type: 'error' }),
            });
            return Promise.reject(result);
        });
    }; }; };
}
exports.default = buildMiddleware;

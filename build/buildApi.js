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
var request_1 = require("./request");
var applyUrlWithPlaceholders_1 = require("./applyUrlWithPlaceholders");
var pendingPromises = {};
var defaultConfigure = function (config) { return config; };
var defaultAfterResolve = function (result) { return Promise.resolve(result); };
var defaultAfterReject = function (result) { return Promise.reject(result); };
function buildApi(endpoints, config) {
    if (config === void 0) { config = {}; }
    var _a = config.baseUrl, baseUrl = _a === void 0 ? '' : _a, _b = config.configureOptions, configureOptions = _b === void 0 ? defaultConfigure : _b, _c = config.configureHeaders, configureHeaders = _c === void 0 ? defaultConfigure : _c, _d = config.afterResolve, afterResolve = _d === void 0 ? defaultAfterResolve : _d, _e = config.afterReject, afterReject = _e === void 0 ? defaultAfterReject : _e;
    return Object.keys(endpoints).reduce(function (acc, key) {
        var _a = endpoints[key], path = _a.path, required = _a.required, normalizeArguments = _a.method;
        var requiredPlaceholders = required || [];
        var placeholderRegexp = /:([^\/$]+)/g;
        var match;
        while (match = placeholderRegexp.exec(path)) {
            requiredPlaceholders.push(match[1]);
        }
        acc[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var normalizedArguments = normalizeArguments.apply(void 0, args);
            var placeholders = normalizedArguments.placeholders || {};
            var options = normalizedArguments.options || {};
            var augmentedOptions = __assign({}, options, { headers: configureHeaders(__assign({ 'Content-Type': 'application/vnd.api+json', Accept: 'application/vnd.api+json' }, options.headers)) });
            var missingPlaceholders = requiredPlaceholders
                .filter(function (key) { return !placeholders.hasOwnProperty(key); });
            if (missingPlaceholders.length > 0) {
                var message = "The \"" + key + "\" API call cannot be performed. The following params were not specified: " + missingPlaceholders.join(', ');
                console.error(message);
                var neverendingPromise = new Promise(function () { return 1; });
                neverendingPromise.noop = true;
                return neverendingPromise;
            }
            var promiseId = JSON.stringify([key, args]);
            if (pendingPromises[promiseId]) {
                return pendingPromises[promiseId];
            }
            var req = request_1.default(baseUrl, applyUrlWithPlaceholders_1.default(path, placeholders), configureOptions(augmentedOptions));
            pendingPromises[promiseId] = req;
            var promise = req
                .then(afterResolve)
                .then(function (result) {
                delete pendingPromises[promiseId];
                return result;
            })
                .catch(function (error) {
                delete pendingPromises[promiseId];
                return Promise.reject(error);
            })
                .catch(afterReject);
            promise.actionName = key;
            promise.params = args;
            return promise;
        };
        acc[key].actionName = key;
        return acc;
    }, {});
}
exports.default = buildApi;
;

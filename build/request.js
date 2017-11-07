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
/**
 * Runs the redux-bees api request.
 * The baseUrl can also be a function which is assessed at runtime.
 *
 * @param {BaseUrl} baseUrl
 * @param {string} path
 * @param {Options} options
 * @returns {Promise<Response>}
 */
function request(baseUrl, path, options) {
    var url = (typeof baseUrl === 'function' ? baseUrl() : baseUrl) + path;
    return fetch(url, options)
        .then(function (res) {
        var headers = {};
        res.headers.forEach(function (value, name) { return headers[name] = value; });
        var response = {
            status: res.status,
            headers: headers,
        };
        if (res.status !== 204) {
            return res.json().then(function (body) { return (__assign({}, response, { body: body })); });
        }
        return Promise.resolve(response);
    })
        .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    });
}
exports.default = request;
;

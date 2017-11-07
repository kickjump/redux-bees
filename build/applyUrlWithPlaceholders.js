"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryString = require("query-string");
function applyUrlWithPlaceholders(url, placeholders) {
    var query = {};
    var completeUrl = Object.keys(placeholders).reduce(function (acc, key) {
        var token = ":" + key;
        if (acc.indexOf(token) !== -1) {
            return acc.replace(token, encodeURIComponent(placeholders[key]));
        }
        if (placeholders[key]) {
            query[key] = placeholders[key];
        }
        return acc;
    }, url);
    if (Object.keys(query).length > 0) {
        return completeUrl + "?" + queryString.stringify(query);
    }
    return completeUrl;
}
exports.default = applyUrlWithPlaceholders;

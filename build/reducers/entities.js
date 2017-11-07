"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_immutable_1 = require("object-path-immutable");
var initialState = {};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    if (!action.meta || !action.meta.api) {
        return state;
    }
    var metaType = action.meta.type;
    if (metaType === 'response' && action.payload && action.payload.body) {
        var newState = state;
        var _a = action.payload.body, data = _a.data, included = _a.included;
        var items = void 0;
        if (Array.isArray(data)) {
            items = data;
        }
        else if (data) {
            items = [data];
        }
        else {
            items = [];
        }
        if (Array.isArray(included)) {
            items = items.concat(included);
        }
        newState = items.reduce(function (acc, item) { return (object_path_immutable_1.default.set(acc, [item.type, item.id], item)); }, newState);
        return newState;
    }
    return state;
}
exports.default = reducer;

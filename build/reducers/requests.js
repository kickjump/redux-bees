"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_immutable_1 = require("object-path-immutable");
var invalidate = function (state, actionName, key) { return (object_path_immutable_1.default.set(state, [actionName, key, 'invalid'], true)); };
var initialState = {};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === 'requests/invalidate') {
        var _a = action.payload, actionName_1 = _a.actionName, params_1 = _a.params;
        if (!state[actionName_1]) {
            return state;
        }
        if (params_1 && typeof params_1 === 'function') {
            return Object.keys(state[actionName_1]).reduce(function (acc, key) {
                if (params_1.apply(void 0, JSON.parse(key))) {
                    return invalidate(acc, actionName_1, key);
                }
                else {
                    return acc;
                }
            }, state);
        }
        else if (params_1 && state[actionName_1][JSON.stringify(params_1)]) {
            return invalidate(state, actionName_1, JSON.stringify(params_1));
        }
        else if (!params_1) {
            return Object.keys(state[actionName_1]).reduce(function (acc, key) {
                return invalidate(acc, actionName_1, key);
            }, state);
        }
        return state;
    }
    if (!action.meta || !action.meta.api) {
        return state;
    }
    var _b = action.meta, metaType = _b.type, name = _b.name, params = _b.params;
    if (metaType === 'request') {
        var newState = state;
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'isLoading'], true);
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'error'], null);
        newState = object_path_immutable_1.default.del(newState, [name, JSON.stringify(params), 'invalid']);
        return newState;
    }
    else if (metaType === 'response' && action.payload) {
        var newState = state;
        if (action.payload.body) {
            var _c = action.payload.body, data = _c.data, meta = _c.meta;
            var normalizedData = void 0;
            if (Array.isArray(data)) {
                normalizedData = data.map(function (record) { return ({ id: record.id, type: record.type }); });
            }
            else if (data && data.id) {
                normalizedData = { id: data.id, type: data.type };
            }
            else {
                normalizedData = null;
            }
            newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'response'], normalizedData);
            if (meta) {
                newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'meta'], meta);
            }
        }
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'headers'], action.payload.headers);
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'status'], action.payload.status);
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'isLoading'], false);
        return newState;
    }
    else if (metaType === 'error') {
        var newState = state;
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'isLoading'], false);
        newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'response'], null);
        if (action.payload instanceof Error) {
            newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'error'], action.payload.message);
            newState = object_path_immutable_1.default.del(newState, [name, JSON.stringify(params), 'headers']);
            newState = object_path_immutable_1.default.del(newState, [name, JSON.stringify(params), 'status']);
        }
        else {
            newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'error'], action.payload.body);
            newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'headers'], action.payload.headers);
            newState = object_path_immutable_1.default.set(newState, [name, JSON.stringify(params), 'status'], action.payload.status);
        }
        return newState;
    }
    return state;
}
exports.default = reducer;

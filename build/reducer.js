"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var entities_1 = require("./reducers/entities");
var requests_1 = require("./reducers/requests");
function reducer(state, action) {
    if (state === void 0) { state = {}; }
    return {
        requests: requests_1.default(state.requests, action),
        entities: entities_1.default(state.entities, action),
    };
}
exports.default = reducer;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invalidateRequests(apiCall, params) {
    if (params === void 0) { params = null; }
    return {
        type: 'requests/invalidate',
        payload: {
            actionName: apiCall.actionName,
            params: params,
        }
    };
}
exports.invalidateRequests = invalidateRequests;

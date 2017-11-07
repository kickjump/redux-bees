import { BuiltAPIMethod, BeesAction } from './types';

export function invalidateRequests(apiCall: BuiltAPIMethod, params = null): BeesAction {
  return {
    type: 'requests/invalidate',
    payload: {
      actionName: apiCall.actionName,
      params,
    }
  };
}

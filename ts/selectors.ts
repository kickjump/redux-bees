import { BuiltAPIMethod, RestParams } from './types';
import { BeesState, EntityState, JSONAPIDataRelationship, JSONAPIEntity } from "./reducer";

function getRawRequest<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const { actionName } = apiCall;

  if (!state.bees.requests) {
    return null;
  }

  if (!state.bees.requests[<string>actionName]) {
    return null;
  }

  return state.bees.requests[<string>actionName][JSON.stringify(args)];
}

export function getEntity<S>(state: S & { bees: BeesState }, handle: JSONAPIDataRelationship) {
  if (!handle) {
    return null;
  }

  if (!state.bees.entities) {
    return null;
  }

  if (!state.bees.entities[handle.type]) {
    return null;
  }

  return state.bees.entities[handle.type][handle.id];
}

export function getRelationship<S>(state: S & { bees: BeesState }, entity: JSONAPIEntity, relationshipName: string) {
  if (!entity) {
    return null;
  }

  const { data } = entity.relationships[relationshipName];

  if (Array.isArray(data)) {
    return data.map((handle: JSONAPIDataRelationship) => getEntity<S>(state, handle));
  }

  return getEntity(state, <JSONAPIDataRelationship>data);
}

export function getRequestResult<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);

  if (!request || !request.response) {
    return null;
  }

  if (Array.isArray(request.response)) {
    return request.response.map((handle: JSONAPIDataRelationship) => getEntity(state, handle));
  }

  return getEntity(state, request.response);
}

export function getRequestHeaders<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);
  return request && request.headers;
}

export function getRequestMeta<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);
  return request && request.meta;
}

export function isRequestLoading<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);
  return request && request.isLoading ? true : false;
}

export function hasRequestStarted<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);

  if (!request) {
    return false;
  }

  if (request.invalid) {
    return false;
  }

  return true;
}

export function getRequestError<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const request = getRawRequest(state, apiCall, args);

  if (!request) {
    return false;
  }

  return request.error;
}

export function getRequestInfo<S>(state: S & { bees: BeesState }, apiCall: BuiltAPIMethod, args: RestParams[]) {
  const error = getRequestError(state, apiCall, args);

  return {
    hasStarted: hasRequestStarted(state, apiCall, args),
    isLoading: isRequestLoading(state, apiCall, args),
    hasFailed: !!error,
    result: getRequestResult(state, apiCall, args),
    headers: getRequestHeaders(state, apiCall, args),
    meta: getRequestMeta(state, apiCall, args),
    error,
  };
}

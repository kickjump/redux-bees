declare module 'redux-bees' {
  import { MiddlewareAPI, Dispatch, Action } from 'redux';
  import * as React from 'react';

  export function buildApi<T extends Endpoints<T>>(
    endpoints: T,
    config?: BeesConfig
  ): {[P in keyof T]: BuiltAPIMethod };

  function getEntity(state: any, handle: any): any;
  function getRelationship(state: any, entity: any, relationshipName: any): any;
  function getRequestResult(state: any, apiCall: any, args: any): any;
  function getRequestHeaders(state: any, apiCall: any, args: any): any;
  function getRequestMeta(state: any, apiCall: any, args: any): any;
  function isRequestLoading(state: any, apiCall: any, args: any): boolean;
  function hasRequestStarted(
    state: any,
    apiCall: any,
    args: any
  ): boolean;
  function getRequestError(state: any, apiCall: any, args: any): any;
  function getRequestInfo(
    state: any,
    apiCall: any,
    args: any
  ): {
      hasStarted: boolean;
      isLoading: boolean;
      hasFailed: boolean;
      result: any;
      headers: any;
      meta: any;
      error: any;
    };
  export interface BeesPayloads {
    actionName?: string;
    params?: null | {
      [key: string]: string;
    };
  }
  export interface BeesAction extends Action {
    payload: BeesPayloads;
  }
  function invalidateRequests(
    apiCall: BuiltAPIMethod,
    params?: null
  ): BeesAction;

  export function applyUrlWithPlaceholders(
    url: string,
    placeholders: Placeholders
  ): string;
  /**
	 * Runs the redux-bees api request.
	 * The baseUrl can also be a function which is assessed at runtime.
	 *
	 * @param {BaseUrl} baseUrl
	 * @param {string} path
	 * @param {Options} options
	 * @returns {Promise<Response>}
	 */
  export function request(
    baseUrl: BaseUrl,
    path: string,
    options: Options
  ): Promise<Response>;
  export interface BeesState {
    requests?: {
      [key: string]: any;
    };
    entities?: {
      [key: string]: any;
    };
  }

  function reducer(
    state: BeesState | undefined,
    action: BeesAction
  ): {
      requests: any;
      entities: {};
    };
  export interface MethodReturn {
    placeholders: Placeholders;
    options: Options;
  }
  export type RestParams = Body | Placeholders | Options;
  export interface Method {
    (): MethodReturn;
    (body: Body): MethodReturn;
    (placeholders: Placeholders, options: Options): MethodReturn;
    (placeholders: Placeholders, body: Body): MethodReturn;
    (placeholders: Placeholders, body: Body, options: Options): MethodReturn;
  }
  export interface Placeholders {
    [key: string]: string;
  }
  export interface Headers {
    [key: string]: string;
  }
  export interface Body {
    [key: string]: any;
  }
  export interface Response {
    status: any;
    headers: Headers;
    body?: Body;
  }
  export interface Options extends RequestInit {
    mode?: RequestMode;
  }
  export interface PendingPromises {
    [key: string]: BeesPromise;
  }
  /**
	 * An endpoint of your API
	 */
  export interface Endpoint {
    /**
     * Method can be get, post, patch, destroy
     */
    method: Method;
    path: string;
    required?: string[];
  }
  export type Endpoints<T> = {[P in keyof T]: Endpoint };
  export interface BaseUrlMethod {
    (): string;
  }
  export type BaseUrl = string | BaseUrlMethod;
  export interface ConfigureHeaders {
    (header: Headers): Headers;
  }
  export interface ConfigureOptions {
    (options: Options): Options;
  }
  export interface BeesConfig {
    baseUrl?: BaseUrl;
    configureHeaders?: ConfigureHeaders;
    configureOptions?: ConfigureOptions;
    afterResolve?(response: Response): Promise<Response>;
    afterReject?(response: Response): Promise<Response | void>;
  }
  function get(placeholders?: {}, options?: {}): MethodReturn;
  const post: Method;
  const patch: Method;
  const put: Method;
  function destroy(placeholders?: {}, options?: {}): MethodReturn;
  export interface BuiltAPIMethod {
    (): BeesPromise;
    (body: Body): BeesPromise;
    (placeholders: Placeholders, options: Options): BeesPromise;
    (placeholders: Placeholders, body: Body): BeesPromise;
    (placeholders: Placeholders, body: Body, options: Options): BeesPromise;
    actionName?: string;
  }
  export interface BeesPromise extends Promise<Response | void> {
    actionName?: string;
    params?: any[];
    noop?: boolean;
  }
  export function buildMiddleware<S>(): (
    api: MiddlewareAPI<S>
  ) => (
      next: Dispatch<S>
    ) => (promise: any) => BeesPromise | Action | undefined;
  export function query(
    propName: string,
    apiCall: BuiltAPIMethod,
    dispatcher?: (call: any) => any
  ): (InnerComponent: any) => any;

  export {
    get,
    post,
    patch,
    put,
    destroy,
    getEntity,
    getRelationship,
    getRequestResult,
    isRequestLoading,
    hasRequestStarted,
    getRequestError,
    getRequestHeaders,
    getRequestMeta,
    getRequestInfo,
    invalidateRequests
  };
}

declare module 'redux-bees/types' {
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
	export interface Endpoints {
	    [key: string]: Endpoint;
	}
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
	export interface Config {
	    baseUrl?: BaseUrl;
	    configureHeaders?: ConfigureHeaders;
	    configureOptions?: ConfigureOptions;
	    afterResolve?(response: Response): Promise<Response>;
	    afterReject?(response: Response): Promise<Response | void>;
	}
	export interface BuiltAPI {
	    [key: string]: BuiltAPIMethod;
	}
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
	export interface BeesAction {
	    type: string;
	    payload?: any;
	    meta?: {
	        api?: boolean;
	        type?: string;
	        name?: string;
	        params?: any;
	    };
	}
	export interface Dispatcher<P> {
	    (perform: (propsObject: P) => void): void;
	    (perform: (propsObject: P) => void): void;
	}

}
declare module 'redux-bees/actions' {
	import { BuiltAPIMethod, BeesAction } from 'redux-bees/types';
	export function invalidateRequests(apiCall: BuiltAPIMethod, params?: null): BeesAction;

}
declare module 'redux-bees/applyUrlWithPlaceholders' {
	import { Placeholders } from 'redux-bees/types';
	export default function applyUrlWithPlaceholders(url: string, placeholders: Placeholders): string;

}
declare module 'redux-bees/request' {
	import { Options, BaseUrl, Response } from 'redux-bees/types';
	/**
	 * Runs the redux-bees api request.
	 * The baseUrl can also be a function which is assessed at runtime.
	 *
	 * @param {BaseUrl} baseUrl
	 * @param {string} path
	 * @param {Options} options
	 * @returns {Promise<Response>}
	 */
	export default function request(baseUrl: BaseUrl, path: string, options: Options): Promise<Response>;

}
declare module 'redux-bees/reducers/entities' {
	import { EntityState } from 'redux-bees/reducer';
	import { BeesAction } from 'redux-bees/types';
	export default function reducer<S>(state: EntityState | undefined, action: BeesAction): EntityState;

}
declare module 'redux-bees/reducers/requests' {
	import { BeesAction } from 'redux-bees/types';
	export default function reducer(state: {
	    [key: string]: any;
	} | undefined, action: BeesAction): any;

}
declare module 'redux-bees/reducer' {
	import { BeesAction } from 'redux-bees/types';
	export interface JSONAPILink {
	    self?: string;
	    related?: string;
	}
	export interface JSONAPIDataRelationship {
	    id: string;
	    type: string;
	}
	export interface JSONAPIRelationship {
	    links: JSONAPILink;
	    id: string;
	    data: JSONAPIDataRelationship | null;
	}
	export interface JSONAPIRelationships {
	    [key: string]: JSONAPIRelationship;
	}
	export interface JSONAPIEntity {
	    id?: string;
	    attributes?: JSONAPIAttributes;
	    relationships: JSONAPIRelationships;
	}
	export interface JSONAPIAttributes {
	    [key: string]: any;
	}
	export interface EntityState {
	    [key: string]: any;
	    relationships?: {
	        [key: string]: any;
	    };
	}
	export interface RequestState {
	    [key: string]: any;
	}
	export interface BeesState {
	    requests?: RequestState;
	    entities?: EntityState;
	}
	export default function reducer(state: BeesState | undefined, action: BeesAction): {
	    requests: any;
	    entities: EntityState;
	};

}
declare module 'redux-bees/selectors' {
	import { BuiltAPIMethod, RestParams } from 'redux-bees/types';
	import { BeesState, JSONAPIDataRelationship, JSONAPIEntity } from 'redux-bees/reducer';
	export function getEntity<S>(state: S & {
	    bees: BeesState;
	}, handle: JSONAPIDataRelationship): any;
	export function getRelationship<S>(state: S & {
	    bees: BeesState;
	}, entity: JSONAPIEntity, relationshipName: string): any;
	export function getRequestResult<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
	export function getRequestHeaders<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
	export function getRequestMeta<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
	export function isRequestLoading<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): boolean;
	export function hasRequestStarted<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): boolean;
	export function getRequestError<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
	export function getRequestInfo<S>(state: S & {
	    bees: BeesState;
	}, apiCall: BuiltAPIMethod, args: RestParams[]): {
	    hasStarted: boolean;
	    isLoading: boolean;
	    hasFailed: boolean;
	    result: any;
	    headers: any;
	    meta: any;
	    error: any;
	};

}
declare module 'redux-bees/buildApi' {
	import { Endpoints, Config, BuiltAPI } from 'redux-bees/types';
	export default function buildApi(endpoints: Endpoints, config?: Config): BuiltAPI;

}
declare module 'object-path-immutable';
declare module 'object.omit';
declare module 'hoist-non-react-statics';declare module 'redux-bees/httpMethods' {
	import { Method } from 'redux-bees/types';
	export const get: Method;
	export const post: Method;
	export const patch: Method;
	export const put: Method;
	export const destroy: Method;

}
declare module 'redux-bees/middleware' {
	import { BeesPromise } from 'redux-bees/types';
	import { MiddlewareAPI, Dispatch, Action } from 'redux';
	export default function buildMiddleware<S>(): (api: MiddlewareAPI<S>) => (next: Dispatch<S>) => (promise: any) => BeesPromise | Action | undefined;

}
declare module 'redux-bees/query' {
	/// <reference types="react" />
	import * as React from 'react';
	import { BuiltAPIMethod, Dispatcher } from 'redux-bees/types';
	export interface WrapperProps {
	    request: any;
	}
	export default function query<T>(propName: string, apiCall: BuiltAPIMethod, dispatcher?: Dispatcher<Partial<T>>): (InnerComponent: React.Component<T, {}>) => React.ComponentClass<any> & {
	    WrappedComponent: React.ComponentType<WrapperProps>;
	};

}
declare module 'redux-bees/index' {
	import { get, post, patch, put, destroy } from 'redux-bees/httpMethods';
	import { getEntity, getRelationship, getRequestResult, isRequestLoading, hasRequestStarted, getRequestError, getRequestHeaders, getRequestMeta, getRequestInfo } from 'redux-bees/selectors';
	import { invalidateRequests } from 'redux-bees/actions';
	export { default as buildApi } from 'redux-bees/buildApi';
	export { default as reducer } from 'redux-bees/reducer';
	export { default as middleware } from 'redux-bees/middleware';
	export { default as query } from 'redux-bees/query';
	export { get, post, patch, put, destroy, getEntity, getRelationship, getRequestResult, isRequestLoading, hasRequestStarted, getRequestError, getRequestHeaders, getRequestMeta, getRequestInfo, invalidateRequests };

}

export interface MethodReturn {
    placeholders: Placeholders;
    options: Options;
}
export declare type RestParams = Body | Placeholders | Options;
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
export declare type BaseUrl = string | BaseUrlMethod;
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

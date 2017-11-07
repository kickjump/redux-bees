import { BuiltAPIMethod, RestParams } from './types';
import { BeesState, JSONAPIDataRelationship, JSONAPIEntity } from "./reducer";
export declare function getEntity<S>(state: S & {
    bees: BeesState;
}, handle: JSONAPIDataRelationship): any;
export declare function getRelationship<S>(state: S & {
    bees: BeesState;
}, entity: JSONAPIEntity, relationshipName: string): any;
export declare function getRequestResult<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
export declare function getRequestHeaders<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
export declare function getRequestMeta<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
export declare function isRequestLoading<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): boolean;
export declare function hasRequestStarted<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): boolean;
export declare function getRequestError<S>(state: S & {
    bees: BeesState;
}, apiCall: BuiltAPIMethod, args: RestParams[]): any;
export declare function getRequestInfo<S>(state: S & {
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

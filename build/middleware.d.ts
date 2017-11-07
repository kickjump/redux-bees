import { BeesPromise } from "./types";
import { MiddlewareAPI, Dispatch, Action } from 'redux';
export default function buildMiddleware<S>(): (api: MiddlewareAPI<S>) => (next: Dispatch<S>) => (promise: any) => Action | BeesPromise | undefined;

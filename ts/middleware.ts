import { BeesPromise, Response } from "./types";
import { MiddlewareAPI, Dispatch, Action } from 'redux'

export default function buildMiddleware<S>() {
  return (api: MiddlewareAPI<S>) => (next: Dispatch<S>) => (promise: any) => {
    if (!promise) {
      return;
    }

    if (!promise.then) {
      return next(<Action>promise);
    }

    if (promise.noop) {
      return;
    }

    const meta = {
      api: true,
      name: promise.actionName,
      params: promise.params,
    };

    next({
      type: `api/${promise.actionName}/request`,
      meta: { ...meta, type: 'request' },
    });

    return <BeesPromise>promise
      .then((result: Response) => {
        next({
          type: `api/${promise.actionName}/response`,
          payload: result,
          meta: { ...meta, type: 'response' },
        });
        return Promise.resolve(result);
      })
      .catch((result: Response) => {
        next({
          type: `api/${promise.actionName}/error`,
          payload: result,
          meta: { ...meta, type: 'error' },
        });
        return Promise.reject(result);
      });
  };
}

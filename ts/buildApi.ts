import { Endpoints, Options, Config, BuiltAPI, Headers, BuiltAPIMethod, PendingPromises, BeesPromise, Response } from './types';
import request from './request';
import { isRequestLoading } from './selectors';
import applyUrlWithPlaceholders from './applyUrlWithPlaceholders';

const pendingPromises: PendingPromises = {};

const defaultConfigure = <T>(config: T): T => config;
const defaultAfterResolve = (result: Response) => Promise.resolve(result);
const defaultAfterReject = (result: Response) => Promise.reject(result);

export default function buildApi(endpoints: Endpoints, config: Config = {}) {
  const {
    baseUrl = '',
    configureOptions = defaultConfigure,
    configureHeaders = defaultConfigure,
    afterResolve = defaultAfterResolve,
    afterReject = defaultAfterReject,
  } = config;

  return Object.keys(endpoints).reduce<BuiltAPI>((acc, key) => {
    const { path, required, method: normalizeArguments } = endpoints[key];

    const requiredPlaceholders = required || [];
    const placeholderRegexp = /:([^\/$]+)/g;
    let match;

    while (match = placeholderRegexp.exec(path)) {
      requiredPlaceholders.push(match[1]);
    }

    acc[key] = (...args: any[]) => {
      const normalizedArguments = normalizeArguments(...args);

      const placeholders = normalizedArguments.placeholders || {};
      const options = normalizedArguments.options || {};

      const augmentedOptions: Options = {
        ...options,
        headers: configureHeaders({
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
          ...options.headers,
        }),
      };

      const missingPlaceholders = requiredPlaceholders
        .filter(key => !placeholders.hasOwnProperty(key));

      if (missingPlaceholders.length > 0) {
        const message = `The "${key}" API call cannot be performed. The following params were not specified: ${missingPlaceholders.join(', ')}`;
        console.error(message);
        const neverendingPromise: BeesPromise = new Promise(() => 1);
        neverendingPromise.noop = true;

        return neverendingPromise;
      }

      const promiseId = JSON.stringify([key, args]);

      if (pendingPromises[promiseId]) {
        return pendingPromises[promiseId];
      }

      const req = request(
        baseUrl,
        applyUrlWithPlaceholders(path, placeholders),
        configureOptions(augmentedOptions)
      );

      pendingPromises[promiseId] = req;

      const promise: BeesPromise = req
        .then(afterResolve)
        .then((result) => {
          delete pendingPromises[promiseId];
          return result;
        })
        .catch((error) => {
          delete pendingPromises[promiseId];
          return Promise.reject(error);
        })
        .catch(afterReject);

      promise.actionName = key;
      promise.params = args;

      return promise;
    };

    acc[key].actionName = key;

    return acc;
  }, {});
};

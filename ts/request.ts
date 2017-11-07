import { Body, Headers, Options, BaseUrl, Response } from './types';

/**
 * Runs the redux-bees api request.
 * The baseUrl can also be a function which is assessed at runtime.
 *
 * @param {BaseUrl} baseUrl
 * @param {string} path
 * @param {Options} options
 * @returns {Promise<Response>}
 */
export default function request(baseUrl: BaseUrl, path: string, options: Options): Promise<Response> {
  const url = (typeof baseUrl === 'function' ? baseUrl() : baseUrl) + path
  return fetch(url, options)
    .then((res) => {
      let headers: Headers = {};
      res.headers.forEach((value, name) => headers[name] = value);

      const response = {
        status: res.status,
        headers,
      };

      if (res.status !== 204) {
        return res.json().then((body: Body) => ({ ...response, body }));
      }

      return Promise.resolve(response);
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }

      return Promise.reject(response);
    });
};


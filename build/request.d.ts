import { Options, BaseUrl, Response } from './types';
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

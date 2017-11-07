import { Options, Method, RestParams, MethodReturn, Placeholders } from './types';


export const get: Method = function get(placeholders = {}, options = {}): MethodReturn {
  return {
    placeholders,
    options,
  };
};

// body
// placeholders, body
// placeholders, body, options

export const post: Method = function post(...args: RestParams[]): MethodReturn {
  const placeholders = args.length >= 2 ? args[0] : {};
  const body = args.length >= 2 ? args[1] : args[0];
  const options = args.length == 3 ? args[2] : {};

  return {
    placeholders,
    options: {
      method: 'POST',
      mode: 'cors',
      body: body && JSON.stringify(body),
      ...options,
    }
  };
};

// body
// placeholders, body
// placeholders, body, options

export const patch: Method = function patch(...args: RestParams[]): MethodReturn {
  const placeholders = args.length >= 2 ? args[0] : {};
  const body = args.length >= 2 ? args[1] : args[0];
  const options = args.length == 3 ? args[2] : {};

  return {
    placeholders,
    options: {
      method: 'PATCH',
      mode: 'cors',
      body: body && JSON.stringify(body),
      ...options,
    }
  };
};

// body
// placeholders, body
// placeholders, body, options

export const put: Method = function patch(...args: RestParams[]): MethodReturn {
  const placeholders = args.length >= 2 ? args[0] : {};
  const body = args.length >= 2 ? args[1] : args[0];
  const options = args.length == 3 ? args[2] : {};

  return {
    placeholders,
    options: {
      method: 'PUT',
      mode: 'cors',
      body: body && JSON.stringify(body),
      ...options,
    }
  };
};

// placeholders
// placeholders, options

export const destroy: Method = function destroy(placeholders = {}, options = {}): MethodReturn {
  return {
    placeholders,
    options: {
      method: 'DELETE',
      mode: 'cors',
      ...options,
    },
  };
};


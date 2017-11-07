import * as queryString from 'query-string';
import { Placeholders } from './types'

interface Query {
  [key: string]: string
}

export default function applyUrlWithPlaceholders(url: string, placeholders: Placeholders) {
  let query: Query = {};

  const completeUrl = Object.keys(placeholders).reduce((acc, key) => {
    const token = `:${key}`;

    if (acc.indexOf(token) !== -1) {
      return acc.replace(token, encodeURIComponent(placeholders[key]))
    }

    if (placeholders[key]) {
      query[key] = placeholders[key];
    }

    return acc;
  }, url);

  if (Object.keys(query).length > 0) {
    return `${completeUrl}?${queryString.stringify(query)}`;
  }

  return completeUrl;
}



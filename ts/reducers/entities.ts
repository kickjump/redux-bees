import immutable from 'object-path-immutable';
import { EntityState } from '../reducer';
import { BeesAction } from '../types';

const initialState: EntityState = {};

export default function reducer<S>(state: EntityState = initialState, action: BeesAction) {
  if (!action.meta || !action.meta.api) {
    return state;
  }

  const { type: metaType } = action.meta;

  if (metaType === 'response' && action.payload && action.payload.body) {
    let newState = state;
    const { data, included } = action.payload.body;

    let items;

    if (Array.isArray(data)) {
      items = data;
    } else if (data) {
      items = [data];
    } else {
      items = [];
    }

    if (Array.isArray(included)) {
      items = items.concat(included);
    }

    newState = items.reduce((acc, item) => (
      immutable.set(
        acc,
        [item.type, item.id],
        item,
      )
    ), newState);

    return newState;
  }

  return state;
}


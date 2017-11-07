import entities from './reducers/entities';
import requests from './reducers/requests';
import { BeesAction } from './types';

export interface JSONAPILink {
  self?: string;
  related?: string;
}

export interface JSONAPIDataRelationship {
  id: string;
  type: string;
}

export interface JSONAPIRelationship {
  links: JSONAPILink;
  id: string;
  data: JSONAPIDataRelationship | null;
}

export interface JSONAPIRelationships {
  [key: string]: JSONAPIRelationship;
}

export interface JSONAPIEntity {
  id?: string;
  attributes?: JSONAPIAttributes;
  relationships: JSONAPIRelationships;
}

export interface JSONAPIAttributes {
  [key: string]: any;
}

export interface EntityState {
  [key: string]: any;
  relationships?: { [key: string]: any; };
}

export interface RequestState {
  [key: string]: any;
}

export interface BeesState {
  requests?: RequestState;
  entities?: EntityState;
}

export default function reducer(state: BeesState = {}, action: BeesAction) {
  return {
    requests: requests(state.requests, action),
    entities: entities(state.entities, action),
  }
};

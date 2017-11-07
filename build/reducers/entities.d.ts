import { EntityState } from '../reducer';
import { BeesAction } from '../types';
export default function reducer<S>(state: EntityState | undefined, action: BeesAction): EntityState;

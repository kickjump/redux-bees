/// <reference types="react" />
import * as React from 'react';
import { BuiltAPIMethod, Dispatcher } from './types';
export interface WrapperProps {
    request: any;
}
export default function query<T>(propName: string, apiCall: BuiltAPIMethod, dispatcher?: Dispatcher<Partial<T>>): (InnerComponent: React.Component<T, {}>) => React.ComponentClass<any> & {
    WrappedComponent: React.ComponentType<WrapperProps>;
};

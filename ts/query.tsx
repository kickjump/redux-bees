import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { getRequestInfo } from './selectors';
import { invalidateRequests } from './actions';
import omit from 'object.omit';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { BuiltAPIMethod, Dispatcher } from './types';

const defaultDispatcher = (call: Function) => call();

function getDisplayName(WrappedComponent: React.ComponentClass) {
  return WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component';
}

export interface WrapperProps {
  request: any;
}



export default function query<T>(propName: string, apiCall: BuiltAPIMethod, dispatcher: Dispatcher<Partial<T>> = defaultDispatcher) {
  return (InnerComponent: React.Component<T>) => {

    interface Wrapper {
      displayName?: string;
      loadData?(dispatch: Dispatch<Promise<any>>, props: any): Promise<any>
    }

    class Wrapper extends React.Component<WrapperProps>  {
      static displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;
      static loadData = function (dispatch: Dispatch<any>, props: any) {
        return dispatch(dispatcher(apiCall, props));
      };

      constructor(props) {
        super(props);
        this.fetch = this.fetch.bind(this);
      }

      componentDidMount() {
        this.fetch();
      }

      componentWillReceiveProps(nextProps) {
        if (!nextProps.request.isLoading && !nextProps.request.hasStarted) {
          this.fetch(nextProps);
        }
      }

      fetch(props = this.props) {
        const { dispatch } = props;
        return dispatch(dispatcher(apiCall, props));
      }

      render() {
        const props = {
          ...omit(this.props, ['request']),
          [propName]: this.props.request.result,
          status: {
            ...this.props.status,
            [propName]: {
              ...omit(this.props.request, ['result']),
              refetch: this.fetch,
            },
          },
        };

        return <InnerComponent {...props } />;
      }
    }

    hoistNonReactStatic(Wrapper, InnerComponent);

    const mapStateToProps = (state, props) => {
      const argumentsAbsorber = (...args: any[]) => args;

      return {
        request: getRequestInfo(
          state,
          apiCall,
          dispatcher(argumentsAbsorber, props),
        ),
      };
    };

    return connect(mapStateToProps)(Wrapper);
  };
}

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var selectors_1 = require("./selectors");
var object_omit_1 = require("object.omit");
var hoist_non_react_statics_1 = require("hoist-non-react-statics");
var defaultDispatcher = function (call) { return call(); };
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component';
}
function query(propName, apiCall, dispatcher) {
    if (dispatcher === void 0) { dispatcher = defaultDispatcher; }
    return function (InnerComponent) {
        var Wrapper = /** @class */ (function (_super) {
            __extends(Wrapper, _super);
            function Wrapper(props) {
                var _this = _super.call(this, props) || this;
                _this.fetch = _this.fetch.bind(_this);
                return _this;
            }
            Wrapper.prototype.componentDidMount = function () {
                this.fetch();
            };
            Wrapper.prototype.componentWillReceiveProps = function (nextProps) {
                if (!nextProps.request.isLoading && !nextProps.request.hasStarted) {
                    this.fetch(nextProps);
                }
            };
            Wrapper.prototype.fetch = function (props) {
                if (props === void 0) { props = this.props; }
                var dispatch = props.dispatch;
                return dispatch(dispatcher(apiCall, props));
            };
            Wrapper.prototype.render = function () {
                var props = __assign({}, object_omit_1.default(this.props, ['request']), (_a = {}, _a[propName] = this.props.request.result, _a.status = __assign({}, this.props.status, (_b = {}, _b[propName] = __assign({}, object_omit_1.default(this.props.request, ['result']), { refetch: this.fetch }), _b)), _a));
                return <InnerComponent {...props}/>;
                var _a, _b;
            };
            return Wrapper;
        }(React.Component));
        Wrapper.displayName = "query(" + getDisplayName(InnerComponent) + ", " + propName + ")";
        Wrapper.loadData = function (dispatch, props) {
            return dispatch(dispatcher(apiCall, props));
        };
        hoist_non_react_statics_1.default(Wrapper, InnerComponent);
        var mapStateToProps = function (state, props) {
            var argumentsAbsorber = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return args;
            };
            return {
                request: selectors_1.getRequestInfo(state, apiCall, dispatcher(argumentsAbsorber, props)),
            };
        };
        return react_redux_1.connect(mapStateToProps)(Wrapper);
    };
}
exports.default = query;

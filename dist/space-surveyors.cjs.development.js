'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var useResizeObserver = _interopDefault(require('use-resize-observer'));
var reactGameEngine = require('react-game-engine');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var initialStoreContext = {
  state: {
    width: undefined,
    height: undefined
  },
  dispatch: function dispatch(_a) {}
};

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTAINER_SIZE':
      var width = action.width,
          height = action.height;
      return _extends({}, state, {
        width: width,
        height: height
      });

    default:
      return state;
  }
};

var GlobalStoreContext = /*#__PURE__*/React.createContext(initialStoreContext);
var Provider = GlobalStoreContext.Provider;

var GlobalStateProvider = function GlobalStateProvider(_ref) {
  var children = _ref.children;

  var _useReducer = React.useReducer(reducer, initialStoreContext.state),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  return React__default.createElement(Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, children);
};

var useGlobalStore = function useGlobalStore() {
  return React.useContext(GlobalStoreContext);
};

const Entities = {};

const Systems = [];

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles-module_spaceSurveyorsContainer__Yohl0 {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n\n.styles-module_spaceSurveyorsStage__uK-Xz {\n  background-color: steelblue;\n  width: 100%;\n  height: 100%;\n}\n";
var styles = {"spaceSurveyorsContainer":"styles-module_spaceSurveyorsContainer__Yohl0","spaceSurveyorsStage":"styles-module_spaceSurveyorsStage__uK-Xz"};
styleInject(css_248z);

const SpaceSurveyors = () => {
  const {
    state,
    dispatch
  } = useGlobalStore();

  const handleContainerResize = _ref => {
    let {
      width,
      height
    } = _ref;
    dispatch({
      type: 'SET_CONTAINER_SIZE',
      width,
      height
    });
  };

  const {
    ref
  } = useResizeObserver({
    onResize: handleContainerResize
  });
  const {
    width,
    height
  } = state;
  return React__default.createElement("div", {
    className: styles.spaceSurveyorsContainer,
    ref: ref
  }, React__default.createElement(reactGameEngine.GameEngine, {
    className: styles.spaceSurveyorsStage,
    entities: Entities,
    systems: Systems
  }, React__default.createElement("h1", null, "Space Surveyors ", width, " ", height)));
};

var index = (function () {
  return React__default.createElement(GlobalStateProvider, null, React__default.createElement(SpaceSurveyors, null));
});

exports.default = index;
//# sourceMappingURL=space-surveyors.cjs.development.js.map

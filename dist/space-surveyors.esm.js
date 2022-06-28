import React, { useReducer, useContext, createContext } from 'react';
import useResizeObserver from 'use-resize-observer';
import { GameEngine } from 'react-game-engine';

const initialStoreContext = {
  state: {
    width: undefined,
    height: undefined
  },
  dispatch: _a => {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONTAINER_SIZE':
      const {
        width,
        height
      } = action;
      return { ...state,
        width,
        height
      };

    default:
      return state;
  }
};

const GlobalStoreContext = /*#__PURE__*/createContext(initialStoreContext);
const {
  Provider
} = GlobalStoreContext;

const GlobalStateProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = useReducer(reducer, initialStoreContext.state);
  return React.createElement(Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};

const useGlobalStore = () => useContext(GlobalStoreContext);

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
  return React.createElement("div", {
    className: styles.spaceSurveyorsContainer,
    ref: ref
  }, React.createElement(GameEngine, {
    className: styles.spaceSurveyorsStage,
    entities: Entities,
    systems: Systems
  }, React.createElement("h1", null, "Space Surveyors ", width, " ", height)));
};

var index = (() => React.createElement(GlobalStateProvider, null, React.createElement(SpaceSurveyors, null)));

export default index;
//# sourceMappingURL=space-surveyors.esm.js.map

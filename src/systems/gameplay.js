import store from '@contexts/store';
import { setStage } from '@contexts/stageSlice';

const progressGameplayMock = (entities, { input }) => {
  const { payload } = input.find((x) => x.name === 'onMouseDown') || {};

  if (payload) {
    const state = store.getState();
    const { stage } = state;
    console.log(state);

    if (stage === 'gameplay') {
      store.dispatch(setStage('finished'));
    }

    if (stage === 'finished') {
      store.dispatch(setStage('summary'));
    }
  }

  return entities;
};

export default progressGameplayMock;

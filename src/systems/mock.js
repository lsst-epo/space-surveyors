const mockProgression = (entities, { input, events, dispatch }) => {
  const { payload } = input.find((x) => x.name === 'onMouseDown') || {};
  if (payload) {
    console.log('mockProgression');
    const { backdrop } = entities;

    if (backdrop.isGameplayRunning) {
      dispatch({ type: 'timeEnd' });
    } else {
      dispatch({ type: 'quit' });
    }
  }
  return entities;
};

export default mockProgression;

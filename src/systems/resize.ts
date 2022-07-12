import { GameSystem } from '@shapes/system';

const onResize: GameSystem = (entities, { events }) => {
  const event = events.find((e) => e.type === 'resize');

  if (event) {
    const { state } = entities;
    const { payload } = event;

    return {
      ...entities,
      state: {
        ...state,
        boundingRect: payload,
        aspectRatio: payload.width / payload.height,
      },
    };
  }

  return entities;
};

export default onResize;

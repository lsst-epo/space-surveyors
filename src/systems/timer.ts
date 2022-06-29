import { GameSystem } from '@shapes/system';

const onTimeEnd: GameSystem = (entities, { events }) => {
  const event = events.find((e) => e.type === 'timeEnd');

  if (event) {
    console.debug('onTimeEnd');
    const { backdrop } = entities;

    return { ...entities, backdrop: { ...backdrop, isGameplayRunning: false } };
  }

  return entities;
};

export default onTimeEnd;

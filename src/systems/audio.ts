import { GameSystem } from '@shapes/system';

const GameAudio: GameSystem = (entities, { events }) => {
  const event = events.find((e) => e.type === 'gameStart');

  if (event) {
    const { audio } = entities;
    switch (event.type) {
      case 'gameStart':
        audio.background.play();
        break;
    }
  }

  return entities;
};

export { GameAudio };

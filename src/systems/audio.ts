import { GameAudio } from '@shapes/entities';
import { GameSystem } from '@shapes/system';

const stopAllAudio = (audio: GameAudio) => {
  Object.keys(audio).forEach((key) => {
    audio[key].stop();
  });
};

const audioHandler: GameSystem = (entities, { events }) => {
  const event = events.find(
    (e) =>
      e.type === 'gameStart' ||
      e.type === 'timeStart' ||
      e.type === 'timeEnd' ||
      e.type === 'cameraExposing' ||
      e.type === 'scoreUpdate' ||
      e.type === 'cameraExposureEnd' ||
      e.type === 'cameraMoving' ||
      e.type === 'quit' ||
      e.type === 'swapped'
  );

  if (event) {
    const { audio } = entities;

    switch (event.type) {
      case 'gameStart':
        audio.countdown.play();
        break;
      case 'timeStart':
        audio.soundtrack.play('background');
        break;
      case 'timeEnd':
        audio.moving.stop();
        break;
      case 'cameraExposing':
        if (event.payload.isFirstExposure) {
          audio.moving.stop();
          audio.exposure.play();
        }
        break;
      case 'cameraExposureEnd':
        if (event.payload.failedCapture) {
          audio.failedCapture.play();
        } else {
          audio.capture.play();
        }
        break;
      case 'cameraMoving':
        if (!audio.moving.playing()) {
          audio.moving.play();
        }
        break;
      case 'quit':
        stopAllAudio(audio);
        audio.soundtrack.play('ambient');
        break;
      case 'swapped':
        stopAllAudio(audio);
        break;
      default:
        break;
    }
  }

  return entities;
};

export { audioHandler };
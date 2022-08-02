import { Howl } from 'howler';

export default {
  background: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Space%20Surveyors.mp3',
  }),
  capture: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Capturing%20a%20new%20object.mp3',
  }),
  countdown: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Countdown.mp3',
  }),
  exposure: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Camera%20shot.mp3',
  }),
  failedCapture: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Failed%20capture%20sound.mp3',
  }),
  moving: new Howl({
    src: 'https://storage.googleapis.com/space-surveyors/Field%20of%20view%20is%20moving%20across%20the%20sky.mp3',
  }),
};

import { Howl } from 'howler';
// import backgroundAudio from '@assets/audio/rave_digger.webm';
const backgroundAudio = require('assets/rave_digger.webm');

export default async () => {
  const background = new Howl({ src: backgroundAudio });
  return { background };
};

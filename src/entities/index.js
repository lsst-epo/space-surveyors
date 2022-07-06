import Backdrop from './backdrop';
import State from './state';
import Timer from './timer';
import Camera from './camera';
import Score from './score';

export default () => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State();
  const camera = Camera();
  const score = Score();

  return { backdrop, timer, state, camera, score };
};

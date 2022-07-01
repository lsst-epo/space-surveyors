import Backdrop from './backdrop';
import State from './state';
import Timer from './timer';
import Camera from './camera';

export default () => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State();
  const camera = Camera();

  return { backdrop, timer, state, camera };
};

import Backdrop from './backdrop';
import State from './state';
import Timer from './timer';

export default () => {
  const backdrop = Backdrop();
  const timer = Timer();
  const state = State();

  return { backdrop, timer, state };
};

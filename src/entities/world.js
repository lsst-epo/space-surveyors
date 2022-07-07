import { System } from 'detect-collisions';
import WorldDebug from '@components/WorldDebug';

export default () => {
  const system = new System();

  return {
    system,
    // renderer: <WorldDebug system />,
  };
};

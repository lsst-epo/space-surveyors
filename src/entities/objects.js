import { Polygon } from 'detect-collisions';
import { StarBounding } from './boundings/StarBounding';
import { getRandomDecimal } from '../utils';
import NightSkyRenderer from '@components/NightSky';
import { STAR_SIZE } from '@constants/';

export default () => {
  const objects = [];
  const newObject = {
    type: 'star',
    physics: new Polygon(
      { x: getRandomDecimal(10, 90), y: getRandomDecimal(0, 100) },
      StarBounding(STAR_SIZE)
    ),
  };

  newObject.physics.center();
  objects.push(newObject);

  return {
    objects,
    renderer: <NightSkyRenderer {...{ objects }}></NightSkyRenderer>,
  };
};

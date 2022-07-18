import NightSkyRenderer from '@components/NightSky';
import { WEIGHTED_GENERATION, MAX_STATIC_OBJECTS } from '@constants/';
import { getRandomWeightedValue } from 'src/utils';
import { SkyObject } from '@modules/SkyObject/';

export default (aspectRatio) => {
  const dynamicObjects = [];
  const occludingObjects = [];
  const staticObjects = [];
  const capturedObjects = [];
  const showEndgame = false;

  const { star, galaxy } = WEIGHTED_GENERATION;

  for (let i = 0; i < MAX_STATIC_OBJECTS; i++) {
    const type = getRandomWeightedValue({ star, galaxy });
    const newObject = new SkyObject(type, aspectRatio);
    staticObjects.push(newObject);
  }

  return {
    staticObjects,
    dynamicObjects,
    occludingObjects,
    capturedObjects,
    showEndgame,
    renderer: (
      <NightSkyRenderer
        {...{
          staticObjects,
          dynamicObjects,
          occludingObjects,
          capturedObjects,
          showEndgame,
        }}
      ></NightSkyRenderer>
    ),
  };
};

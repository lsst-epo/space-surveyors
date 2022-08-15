import NightSkyRenderer from '@components/NightSky';
import {
  WEIGHTS_STATIC,
  STATIC_COLUMNS,
  STATIC_OBJECTS_PER_CELL,
  STATIC_ROWS,
} from '@constants/index';
import { getPositionInCell, getRandomWeightedValue } from 'src/utils';
import { SkyObject } from '@modules/SkyObject/';

export default async (aspectRatio) => {
  const movingObjects = [];
  const timedObjects = [];
  const occludingObjects = [];
  const staticObjects = [];
  const capturedObjects = [];
  const fade = false;
  const showSunrise = false;

  const totalRows = aspectRatio < 1 ? STATIC_COLUMNS : STATIC_ROWS;
  const totalColumns = aspectRatio < 1 ? STATIC_ROWS : STATIC_COLUMNS;

  for (let i = 1; i <= STATIC_ROWS; i++) {
    for (let j = 1; j <= STATIC_COLUMNS; j++) {
      const row = aspectRatio < 1 ? j : i;
      const column = aspectRatio < 1 ? i : j;

      for (let k = 0; k < STATIC_OBJECTS_PER_CELL; k++) {
        const type = getRandomWeightedValue(WEIGHTS_STATIC);
        const position = getPositionInCell(
          row,
          column,
          totalRows,
          totalColumns
        );
        staticObjects.push(new SkyObject(type, aspectRatio, position));
      }
    }
  }

  return {
    staticObjects,
    timedObjects,
    occludingObjects,
    capturedObjects,
    showSunrise,
    fade,
    movingObjects,
    renderer: (
      <NightSkyRenderer
        {...{
          staticObjects,
          movingObjects,
          timedObjects,
          occludingObjects,
          capturedObjects,
          showSunrise,
          fade,
        }}
      ></NightSkyRenderer>
    ),
  };
};

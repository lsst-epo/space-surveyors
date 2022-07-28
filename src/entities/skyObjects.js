import NightSkyRenderer from '@components/NightSky';
import { WEIGHTED_GENERATION } from '@constants/';
import { getPositionInCell, getRandomWeightedValue } from 'src/utils';
import { SkyObject } from '@modules/SkyObject/';
import { STATIC_ROWS } from '@constants/';
import { STATIC_COLUMNS } from '@constants/';
import { STATIC_OBJECTS_PER_CELL } from '@constants/';

export default async (aspectRatio) => {
  const dynamicObjects = [];
  const occludingObjects = [];
  const staticObjects = [];
  const capturedObjects = [];
  const fade = false;
  const showSunrise = false;

  const { star, galaxy } = WEIGHTED_GENERATION;
  const totalRows = aspectRatio < 1 ? STATIC_COLUMNS : STATIC_ROWS;
  const totalColumns = aspectRatio < 1 ? STATIC_ROWS : STATIC_COLUMNS;

  for (let i = 1; i <= STATIC_ROWS; i++) {
    for (let j = 1; j <= STATIC_COLUMNS; j++) {
      const row = aspectRatio < 1 ? j : i;
      const column = aspectRatio < 1 ? i : j;

      for (let k = 0; k < STATIC_OBJECTS_PER_CELL; k++) {
        const type = getRandomWeightedValue({ star, galaxy });
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
    dynamicObjects,
    occludingObjects,
    capturedObjects,
    showSunrise,
    fade,
    renderer: (
      <NightSkyRenderer
        {...{
          staticObjects,
          dynamicObjects,
          occludingObjects,
          capturedObjects,
          showSunrise,
          fade,
        }}
      ></NightSkyRenderer>
    ),
  };
};

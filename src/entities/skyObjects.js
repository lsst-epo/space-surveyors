import NightSkyRenderer from '@components/NightSky';

export default () => {
  const objects = [];
  const capturedObjects = [];
  const showEndgame = false;

  return {
    objects,
    capturedObjects,
    showEndgame,
    renderer: (
      <NightSkyRenderer
        {...{ objects, capturedObjects, showEndgame }}
      ></NightSkyRenderer>
    ),
  };
};

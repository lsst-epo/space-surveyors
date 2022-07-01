export type CameraPosition = {
  x: number;
  y: number;
};

export type CameraRendererProps = {
  currentPosition: CameraPosition;
  nextPosition: CameraPosition;
  path: CameraPosition[];
  exposures: CameraPosition[];
  exposureStartTime: number;
  exposureRemaining: number;
};

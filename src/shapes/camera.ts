import { Polygon } from 'detect-collisions';

export type CameraPosition = {
  x: number;
  y: number;
};

export type CameraRendererProps = {
  nextPosition: CameraPosition;
  path: CameraPosition[];
  exposures: CameraPosition[];
  exposureStartTime: number;
  exposureRemaining: number;
  physics: Polygon;
};

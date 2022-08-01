import { Polygon } from 'detect-collisions';
import { GamePosition } from '.';

export type CameraRendererProps = {
  nextPosition: GamePosition;
  exposures: GamePosition[];
  exposureStartTime: number;
  exposureRemaining: number;
  physics: Polygon;
};

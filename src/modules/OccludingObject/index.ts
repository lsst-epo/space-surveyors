import { SPAWN_LOCATION } from '@constants/index';
import { SkyObject } from '@modules/SkyObject';
import { GamePosition, SkyObjectType } from '@shapes/index';
import {
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  getPositionInQuad,
  getRandomWeightedValue,
  round,
} from 'src/utils';

const startingEdges = { left: 1, right: 1, top: 1, bottom: 1 };

export class OccludingObject extends SkyObject {
  public delta: GamePosition;
  public endPosition: GamePosition = { x: 100, y: 100 };
  public xOffset: number;
  public yOffset: number;
  public angle: number = 0;
  private windSpeed: number;

  constructor(
    type: SkyObjectType,
    aspectRatio: number = 1,
    windSpeed: number,
    position?: GamePosition
  ) {
    super(type, aspectRatio, position);
    this.windSpeed = windSpeed;
    this.xOffset = this.width / 2;
    this.yOffset = this.xOffset * this.aspectRatio;
    this.initializeOcclusion();
    this.delta = this.getDelta();
  }

  private initializeOcclusion = () => {
    const onlyMovesHorizontal = this.type === 'cloud';

    const startOnEdge = onlyMovesHorizontal
      ? 'left'
      : getRandomWeightedValue(startingEdges);
    const endOnEdge = onlyMovesHorizontal
      ? 'right'
      : getRandomWeightedValue({ ...startingEdges, [startOnEdge]: 0 });

    const xQuad = Number(getRandomWeightedValue(SPAWN_LOCATION[this.type].x));
    const yQuad = Number(getRandomWeightedValue(SPAWN_LOCATION[this.type].y));

    const startQuadPosition = getPositionInQuad(xQuad, yQuad);
    const endQuadPosition = getPositionInQuad(xQuad, yQuad);

    switch (startOnEdge) {
      case 'left':
        this.physics.x = -this.xOffset;
        this.physics.y = startQuadPosition.y;
        break;
      case 'right':
        this.physics.x = 100 + this.xOffset;
        this.physics.y = startQuadPosition.y;
        break;
      case 'top':
        this.physics.x = startQuadPosition.x;
        this.physics.y = -this.yOffset;
        break;
      case 'bottom':
        this.physics.x = startQuadPosition.x;
        this.physics.y = 100 + this.yOffset;
        break;
    }

    switch (endOnEdge) {
      case 'left':
        this.endPosition.x = -this.xOffset;
        this.endPosition.y = endQuadPosition.y;
        break;
      case 'right':
        this.endPosition.x = 100 + this.xOffset;
        this.endPosition.y = onlyMovesHorizontal
          ? startQuadPosition.y
          : endQuadPosition.y;
        break;
      case 'top':
        this.endPosition.x = endQuadPosition.x;
        this.endPosition.y = -this.yOffset;
        break;
      case 'bottom':
        this.endPosition.x = endQuadPosition.x;
        this.endPosition.y = 100 + this.yOffset;
        break;
    }

    this.angle = onlyMovesHorizontal
      ? 0
      : round(getAngleBetweenPoints(this.physics.pos, this.endPosition)) + 90;
  };

  private getDelta = () => {
    const { x, y } = this.physics;
    const { x: finalX, y: finalY } = this.endPosition;

    const distance = getDistanceBetweenPoints(
      { x, y },
      { x: finalX, y: finalY }
    );
    const steps = Math.ceil(distance / this.windSpeed);
    const xDelta = round((finalX - x) / steps);
    const yDelta = round((finalY - y) / steps);

    return { x: xDelta, y: yDelta };
  };
}

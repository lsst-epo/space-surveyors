import { SkyObject } from '@modules/SkyObject';
import {
  DynamicObjectConfig,
  Edge,
  GamePosition,
  SkyObjectType,
} from '@shapes/index';
import {
  getAngleBetweenPoints,
  getDistanceBetweenPoints,
  getRandomWeightedValue,
  getNewPosition,
  round,
  scaleByAspectRatio,
} from 'src/utils';

export class DynamicObject extends SkyObject {
  public delta: GamePosition;
  public endPosition: GamePosition = { x: 100, y: 100 };
  public xOffset: number;
  public yOffset: number;
  public angle: number = 0;

  constructor(
    type: SkyObjectType,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    super(type, aspectRatio, position);
    this.xOffset = this.width / 2;
    this.yOffset = this.xOffset * this.aspectRatio;
    this.initializeOcclusion();
    this.delta = this.getDelta();
  }

  private initializeOcclusion = () => {
    const { onlyMovesHorizontal, spawnEdge, baseRotation } = this
      .config as DynamicObjectConfig;

    const startOnEdge: Edge = onlyMovesHorizontal
      ? 'left'
      : (getRandomWeightedValue(spawnEdge) as Edge);
    const endOnEdge: Edge = onlyMovesHorizontal
      ? 'right'
      : (getRandomWeightedValue({
          ...spawnEdge,
          [startOnEdge]: 0,
        }) as Edge);

    const startPosition = getNewPosition();
    const endPosition = getNewPosition();

    switch (startOnEdge) {
      case 'left':
        this.physics.x = -this.xOffset;
        this.physics.y = startPosition.y;
        break;
      case 'right':
        this.physics.x = 100 + this.xOffset;
        this.physics.y = startPosition.y;
        break;
      case 'top':
        this.physics.x = startPosition.x;
        this.physics.y = -this.yOffset;
        break;
      case 'bottom':
        this.physics.x = startPosition.x;
        this.physics.y = 100 + this.yOffset;
        break;
    }

    switch (endOnEdge) {
      case 'left':
        this.endPosition.x = -this.xOffset;
        this.endPosition.y = endPosition.y;
        break;
      case 'right':
        this.endPosition.x = 100 + this.xOffset;
        this.endPosition.y = onlyMovesHorizontal
          ? startPosition.y
          : endPosition.y;
        break;
      case 'top':
        this.endPosition.x = endPosition.x;
        this.endPosition.y = -this.yOffset;
        break;
      case 'bottom':
        this.endPosition.x = endPosition.x;
        this.endPosition.y = 100 + this.yOffset;
        break;
    }

    this.angle = onlyMovesHorizontal
      ? 0
      : round(getAngleBetweenPoints(this.physics.pos, this.endPosition)) +
        baseRotation;
  };

  private getDelta = () => {
    const { x, y } = this.physics;
    const { x: finalX, y: finalY } = this.endPosition;
    const { speed } = this.config as DynamicObjectConfig;

    const distance = getDistanceBetweenPoints(
      { x, y },
      { x: finalX, y: finalY },
      this.aspectRatio
    );

    const scaledSpeed = scaleByAspectRatio(
      this.aspectRatio,
      speed.target,
      speed.min,
      speed.max
    );
    const steps = Math.ceil(distance / scaledSpeed);

    const xDelta = round((finalX - x) / steps);
    const yDelta = round((finalY - y) / steps);

    return { x: xDelta, y: yDelta };
  };
}

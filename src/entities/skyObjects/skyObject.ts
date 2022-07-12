import { GamePosition, SkyObjectType } from '@shapes/index';
import { Polygon, Ellipse } from 'detect-collisions';
import { getNewPosition, getRandomDecimal, getRandomInt } from '../../utils';
import {
  OBJECT_BRIGHTNESS,
  OBJECT_LIFESPAN,
  OBJECT_SIZE,
} from '@constants/index';
import boundings from '@entities/boundings';

export class SkyObject {
  public type: SkyObjectType;
  public width: number;
  public brightness: number = 0;
  public physics: Polygon | Ellipse;
  public expiration: number;
  public isExpiringSoon: boolean = false;
  public captured: boolean = false;

  constructor(
    type: SkyObjectType,
    timestamp: number,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    this.type = type;
    this.width = this.getObjectSize(type);
    this.expiration = this.getObjectExpiration(type, timestamp);
    this.physics = this.getPhysics(type, this.width, aspectRatio, position);
    this.setObjectBrightness(type);
  }

  private getPhysics = (
    type: SkyObjectType,
    width: number,
    aspectRatio: number,
    position?: GamePosition
  ) => {
    const startPosition = position || getNewPosition(width / 2);
    const defaultOptions = {
      center: true,
      isStatic: true,
    };

    if (type === 'star') {
      return new Polygon(
        startPosition,
        boundings[type](width, width * aspectRatio),
        defaultOptions
      );
    } else {
      return new Ellipse(startPosition, width, width * aspectRatio);
    }
  };

  private getObjectSize = (type: SkyObjectType) =>
    getRandomDecimal(OBJECT_SIZE[type].min, OBJECT_SIZE[type].max, 1);

  private getObjectExpiration = (type: SkyObjectType, timestamp: number) =>
    timestamp +
    getRandomInt(OBJECT_LIFESPAN[type].min, OBJECT_LIFESPAN[type].max);

  private setObjectBrightness = (type: SkyObjectType) => {
    setTimeout(() => {
      this.brightness = getRandomDecimal(
        OBJECT_BRIGHTNESS[type].min,
        OBJECT_BRIGHTNESS[type].max,
        1
      );
    });
  };
}

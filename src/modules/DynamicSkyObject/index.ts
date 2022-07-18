import { SkyObject } from '@modules/SkyObject';
import { GamePosition, SkyObjectType } from '@shapes/index';
import { OBJECT_BRIGHTNESS, OBJECT_LIFESPAN } from '@constants/index';
import { getRandomDecimal, getRandomInt } from '../../utils';

export class DynamicSkyObject extends SkyObject {
  public expiration: number;
  public isExpiringSoon: boolean = false;

  constructor(
    type: SkyObjectType,
    timestamp: number,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    super(type, aspectRatio, position);
    this.expiration = this.getObjectExpiration(type, timestamp);
    this.brightness = 0;
    this.setObjectBrightness(type);
  }

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

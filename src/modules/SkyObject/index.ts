import { GamePosition, SkyObjectType } from '@shapes/index';
import { Polygon, Ellipse } from 'detect-collisions';
import {
  getBrightness,
  getNewPosition,
  getScaledObjectSize,
} from '../../utils';
import { OBJECT_BRIGHTNESS } from '@constants/index';
import boundings from '@constants/objects/boundings';

export class SkyObject {
  public type: SkyObjectType;
  public width: number;
  public brightness: number;
  public physics: Polygon | Ellipse;
  public captured: boolean = false;
  public aspectRatio: number;

  constructor(
    type: SkyObjectType,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    this.type = type;
    this.width = getScaledObjectSize(type, aspectRatio);
    this.aspectRatio = aspectRatio;
    this.physics = this.getPhysics(type, this.width, aspectRatio, position);
    // this.brightness = getRandomDecimal(
    //   OBJECT_BRIGHTNESS[type].min,
    //   OBJECT_BRIGHTNESS[type].max,
    //   1
    // );
    this.brightness = getBrightness(OBJECT_BRIGHTNESS[type]);
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

    if (type === 'star' || type === 'cloud') {
      return new Polygon(
        startPosition,
        boundings[type](width, width * aspectRatio),
        defaultOptions
      );
    } else {
      return new Ellipse(startPosition, width, width * aspectRatio);
    }
  };
}

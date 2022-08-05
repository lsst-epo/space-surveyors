import {
  DynamicObjectConfig,
  GamePosition,
  ObjectConfig,
  SkyObjectType,
  TimedObjectConfig,
} from '@shapes/index';
import { Polygon, Ellipse } from 'detect-collisions';
import {
  getBrightness,
  getNewPosition,
  getScaledObjectSize,
} from '../../utils';
import { SkyObjectConfigs } from '@constants/index';
import boundings from '@constants/objects/boundings';

export class SkyObject {
  public type: SkyObjectType;
  public width: number;
  public brightness: number;
  public physics: Polygon | Ellipse;
  public captured: boolean = false;
  public aspectRatio: number;
  public config: ObjectConfig | TimedObjectConfig | DynamicObjectConfig;

  constructor(
    type: SkyObjectType,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    this.type = type;
    this.config = SkyObjectConfigs[type];
    this.width = getScaledObjectSize(this.config.size, aspectRatio);
    this.aspectRatio = aspectRatio;
    this.physics = this.getPhysics(type, this.width, aspectRatio, position);
    this.brightness = getBrightness(this.config.brightness);
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

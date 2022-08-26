import {
  DynamicObjectConfig,
  GamePosition,
  ObjectConfig,
  SkyObjectType,
  TimedObjectConfig,
} from "@shapes/index";
import { Polygon, Circle } from "detect-collisions";
import {
  getBrightness,
  getNewPosition,
  getScaledObjectSize,
  getUuid,
} from "../../utils";
import { SkyObjectConfigs } from "@constants/index";
import boundings from "@constants/objects/boundings";

export class SkyObject {
  public type: SkyObjectType;
  public width: number;
  public brightness: number;
  public physics: Polygon | Circle;
  public captured: boolean = false;
  public aspectRatio: number;
  public color: string | null;
  public config: ObjectConfig | TimedObjectConfig | DynamicObjectConfig;
  public uuid: string;

  constructor(
    type: SkyObjectType,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    this.type = type;
    this.config = this.getConfig(this.type);
    this.width = getScaledObjectSize(this.config.size, aspectRatio);
    this.aspectRatio = aspectRatio;
    this.physics = this.getPhysics(type, this.width, aspectRatio, position);
    this.brightness = getBrightness(this.config.brightness);
    this.color = this.config.color || null;
    this.uuid = getUuid();
  }

  private getConfig = (
    type: SkyObjectType
  ): ObjectConfig | TimedObjectConfig | DynamicObjectConfig => {
    const config = SkyObjectConfigs[type];

    if (typeof config === "function") {
      return config();
    }

    return config;
  };

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

    const body =
      type === "star" || type === "cloud"
        ? new Polygon(startPosition, boundings[type], defaultOptions)
        : new Circle(startPosition, 0.5);

    body.setScale(width, width * aspectRatio);

    return body;
  };
}

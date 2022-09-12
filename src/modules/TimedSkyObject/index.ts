import { SkyObject } from "@modules/SkyObject";
import { GamePosition, SkyObjectType, TimedObjectConfig } from "@shapes/index";
import { getBrightness, getRandomInt } from "@lib/utils";

export class TimedSkyObject extends SkyObject {
  public expiration: number;
  public isExpiringSoon: boolean = false;

  constructor(
    type: SkyObjectType,
    timestamp: number,
    aspectRatio: number = 1,
    position?: GamePosition
  ) {
    super(type, aspectRatio, position);
    this.expiration = this.getObjectExpiration(timestamp);
    this.brightness = 0;
    this.setObjectBrightness();
  }

  private getObjectExpiration = (timestamp: number) =>
    timestamp +
    getRandomInt(
      (this.config as TimedObjectConfig).lifespan.min,
      (this.config as TimedObjectConfig).lifespan.max
    );

  private setObjectBrightness = () => {
    setTimeout(() => {
      this.brightness = getBrightness(this.config.brightness);
    });
  };
}

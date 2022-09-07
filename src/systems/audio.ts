import { Howler } from "howler";
import { GameSystem } from "@shapes/system";
import { GameAudio } from "@shapes/entities";

const onAudioChange: GameSystem = (entities, { events }) => {
  const event = events.find((e) => e.type === "mute" || e.type === "unmute");

  if (event) {
    const { audio } = entities;
    const { payload: track } = event;

    if (audio[track]) {
      const muted = event.type === "mute";
      audio[track].mute(muted);
    }
  }

  return entities;
};

const stop = (audio: GameAudio, group: "music" | "effects", sprite: string) => {
  audio[group].stop(audio.instances[group][sprite]);
};

const play = (audio: GameAudio, group: "music" | "effects", sprite: string) => {
  audio.instances[group][sprite] = audio[group].play(sprite);
};

const playing = (
  audio: GameAudio,
  group: "music" | "effects",
  sprite: string
) => audio[group].playing(audio.instances[group][sprite]);

const audioHandler: GameSystem = (entities, { events }) => {
  const event = events.find(
    (e) =>
      e.type === "gameStart" ||
      e.type === "timeStart" ||
      e.type === "timeEnd" ||
      e.type === "cameraExposing" ||
      e.type === "scoreUpdate" ||
      e.type === "cameraExposureEnd" ||
      e.type === "cameraMoving" ||
      e.type === "quit" ||
      e.type === "swapped" ||
      e.type === "pause"
  );

  if (event && event.type !== "pause") {
    const { audio } = entities;

    switch (event.type) {
      case "gameStart":
        play(audio, "effects", "countdown");
        break;
      case "timeStart":
        play(audio, "music", "background");
        break;
      case "timeEnd":
        stop(audio, "effects", "moving");
        break;
      case "cameraExposing":
        if (event.payload.isFirstExposure) {
          stop(audio, "effects", "moving");
          play(audio, "effects", "exposure");
        }
        break;
      case "cameraExposureEnd":
        if (event.payload.failedCapture) {
          play(audio, "effects", "failedCapture");
        } else {
          play(audio, "effects", "capture");
        }
        break;
      case "cameraMoving":
        if (!playing(audio, "effects", "moving")) {
          play(audio, "effects", "moving");
        }
        break;
      case "quit":
        Howler.stop();
        play(audio, "music", "ambient");
        break;
      case "swapped":
        Howler.stop();
        break;
      default:
        break;
    }
  }

  return entities;
};

export default [audioHandler, onAudioChange];

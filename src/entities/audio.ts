import { Howl } from "howler";
import effectsMp3 from "@assets/audio/effects.mp3";
import effectsWebm from "@assets/audio/effects.webm";

export default () => {
  ["music", "effects"].forEach((item) => {
    if (!localStorage.hasOwnProperty(item)) {
      localStorage.setItem(item, "true");
    }
  });

  const musicMuted = localStorage.getItem("music") === "false";
  const effectsMuted = localStorage.getItem("effects") === "false";

  const music = new Howl({
    src: "https://storage.googleapis.com/space-surveyors/Space%20Surveyors.mp3",
    sprite: {
      background: [0, 60660],
      ambient: [60660, 11340],
    },
    mute: musicMuted,
  });
  const effects = new Howl({
    src: [effectsMp3, effectsWebm],
    sprite: {
      exposure: [0, 999],
      capture: [1000, 999],
      failedCapture: [2000, 999],
      countdown: [3000, 3999],
      moving: [7000, 6000],
    },
    mute: effectsMuted,
  });

  const instances = {
    music: {
      background: null,
      ambient: null,
    },
    effects: {
      moving: null,
      capture: null,
      failedCapture: null,
      countdown: null,
      exposure: null,
    },
  };

  return {
    music,
    effects,
    instances,
  };
};

import { System } from "detect-collisions";
import WorldDebug from "@components/WorldDebug";

export default () => {
  const system = new System();
  const occlusions = new System();

  return {
    system,
    occlusions,
    renderer: <WorldDebug {...{ system, occlusions }} />,
  };
};

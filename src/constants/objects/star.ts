import { getRandomWeightedValue } from "../../utils";

const starWeights = {
  "11": 0,
  "12": 0.15,
  "13": 0.02,
  "14": 0,
  "15": 0,
  "21": 0,
  "22": 0.3,
  "23": 0.08,
  "24": 0.08,
  "25": 0.01,
  "31": 0.01,
  "32": 0.16,
  "33": 0.07,
  "34": 0.07,
  "35": 0.03,
};

const brightnessBins = [
  [0.7, 1],
  [0.4, 0.7],
  [0.1, 0.4],
];

const sizeBins = [
  [2, 2.5],
  [1.5, 2],
  [1, 1.5],
];

const colorBins = ["#c4f3f8", "#cde7f3", "#fff", "#f9efc3", "#fae1bd"];

export default () => {
  const star = getRandomWeightedValue(starWeights);
  const row = Number(star[0]) - 1;
  const column = Number(star[1]) - 1;
  const brightness = {
    min: brightnessBins[row][0],
    max: brightnessBins[row][1],
  };
  const size = { min: sizeBins[row][0], max: sizeBins[row][1] };
  const color = colorBins[column];

  return { brightness, size, color };
};

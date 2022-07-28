import { TimedEvent } from '@shapes/event';

// Timeline

// Durations
export const GAME_DURATION: number = 60000;
export const SUNRISE_DURATION: number = 10000;
export const DAY_TRANSITION_DURATION: number = 2000;
export const FINISH_SCREEN_DURATION: number = 10000;

// Starts
export const TIMER_START: number = 1000;
export const SUNRISE_START: number =
  TIMER_START + GAME_DURATION - SUNRISE_DURATION;
export const GAME_END: number = TIMER_START + GAME_DURATION;
export const FINISH_SCREEN_START: number = GAME_END + DAY_TRANSITION_DURATION;
export const QUIT_TIME: number = FINISH_SCREEN_START + FINISH_SCREEN_DURATION;

export const TIMED_EVENTS: TimedEvent[] = [
  { type: 'timeStart', time: TIMER_START },
  { type: 'dawn', time: SUNRISE_START },
  { type: 'timeEnd', time: GAME_END },
  { type: 'showFinish', time: FINISH_SCREEN_START },
  {
    type: 'quit',
    time: QUIT_TIME,
  },
];

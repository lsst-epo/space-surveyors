import styled, { keyframes, css } from 'styled-components';
import Star from '@components/svg/Star';
import Galaxy from '@components/svg/Galaxy';
import Supernova from '@components/svg/Supernova';
import CloudNight from '@components/svg/CloudNight';
import Cloud from '@components/svg/Cloud';
import Airplane from '@components/svg/Airplane';
import Asteroid from '@components/svg/Asteroid';
import Comet from '@components/svg/Comet';
import { FADE_TIME, FINISH_SCREEN_START, GAME_END } from '@constants/index';

const transitionColor = `${FADE_TIME / 2}ms color`;
const transitionOpacity = `${FADE_TIME}ms opacity`;
const transitionFilter = `${FADE_TIME}ms filter`;

const fadeOut = keyframes`to { opacity: 0}`;
const fadeIn = keyframes`from { opacity: 0} to { opacity: 1}`;
const fadeOutAnimation = css`
  animation: ${fadeOut} ${(FINISH_SCREEN_START - GAME_END) / 2}ms forwards;
`;
const fadeInAnimation = css`
  animation: ${fadeIn} ${(FINISH_SCREEN_START - GAME_END) / 2}ms forwards;
`;

const SkyObjectBase = css`
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  transition: ${transitionColor};
  ${({ $fadeOut }) => ($fadeOut ? fadeOutAnimation : '')}
  ${({ $fadeIn }) => ($fadeIn ? fadeInAnimation : '')}
`;

const SkyObjectAttrs = ({ width, x, y, $captured, brightness, color }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    opacity: $captured && brightness > 0 ? 0.85 : brightness,
    ...(($captured || color) && { color: $captured ? 'var(--yellow)' : color }),
  },
});

const StyledSkyObject = (object) => styled(object).attrs(SkyObjectAttrs)`
  ${SkyObjectBase}
`;

const TimedSkyObjectBase = css`
  ${SkyObjectBase}
  opacity: 0;
  transition: ${transitionColor}, ${transitionOpacity}, ${transitionFilter};
`;

const TimedSkyObjectAttrs = ({ width, x, y, $captured, brightness }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    opacity: brightness,
    filter: `blur(${brightness === 0 ? 5 : 0}px)`,
    ...($captured && { color: 'var(--yellow)' }),
  },
});

const DynamicObjectAttrs = ({ width, x, y, angle, $captured }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
    ...($captured && { color: 'var(--yellow)' }),
  },
});

const StyledTimedSkyObject = (object) => styled(object).attrs(
  TimedSkyObjectAttrs
)`
  ${TimedSkyObjectBase}
`;

const StyledDynamicObject = (object) =>
  styled(object).attrs(DynamicObjectAttrs)`
    ${SkyObjectBase}
    transition: ${transitionColor}, ${transitionOpacity};
  `;

const BaseObjects = {
  star: Star,
  galaxy: Galaxy,
  supernova: Supernova,
  cloud: Cloud,
  airplane: Airplane,
  asteroid: Asteroid,
  comet: Comet,
};

export default {
  star: StyledSkyObject(BaseObjects['star']),
  galaxy: StyledSkyObject(BaseObjects['galaxy']),
  supernova: StyledTimedSkyObject(BaseObjects['supernova']),
  cloud: StyledDynamicObject(BaseObjects['cloud']),
  airplane: StyledDynamicObject(BaseObjects['airplane']),
  asteroid: StyledDynamicObject(BaseObjects['asteroid']),
  comet: StyledDynamicObject(BaseObjects['comet']),
};

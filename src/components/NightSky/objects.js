import styled, { keyframes, css } from 'styled-components';
import Star from '@components/svg/Star';
import Galaxy from '@components/svg/Galaxy';
import Supernova from '@components/svg/Supernova';
import CloudNight from '@components/svg/CloudNight';
import Cloud from '@components/svg/Cloud';
import { FADE_TIME, FINISH_SCREEN_START, GAME_END } from '@constants/index';
import Airplane from '@components/svg/Airplane';

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

const SkyObjectAttrs = ({ width, x, y, $captured, brightness }) => ({
  style: {
    color: $captured ? 'var(--yellow)' : 'var(--neutral10)',
    left: `${x}%`,
    top: `${y}%`,
    opacity: brightness,
  },
});

const StyledSkyObject = (object) => styled(object).attrs(SkyObjectAttrs)`
  ${SkyObjectBase}
`;

const DynamicSkyObjectBase = css`
  ${SkyObjectBase}
  opacity: 0;
  transition: ${transitionColor}, ${transitionOpacity}, ${transitionFilter};
`;

const DynamicSkyObjectAttrs = ({ width, x, y, $captured, brightness }) => ({
  style: {
    color: $captured ? 'var(--yellow)' : 'var(--neutral10)',
    left: `${x}%`,
    top: `${y}%`,
    opacity: brightness,
    filter: `blur(${brightness === 0 ? 5 : 0}px)`,
  },
});

const OccludingObjectAttrs = ({ width, x, y, angle }) => ({
  style: {
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
  },
});

const StyledDynamicSkyObject = (object) => styled(object).attrs(
  DynamicSkyObjectAttrs
)`
  ${DynamicSkyObjectBase}
`;

const StyledOccludingObject = (object) =>
  styled(object).attrs(OccludingObjectAttrs)`
    ${SkyObjectBase}
    transition: ${transitionColor}, ${transitionOpacity};
  `;

const BaseObjects = {
  star: Star,
  galaxy: Galaxy,
  supernova: Supernova,
  cloud: Cloud,
  airplane: Airplane,
};

export default {
  star: StyledSkyObject(BaseObjects['star']),
  galaxy: StyledSkyObject(BaseObjects['galaxy']),
  supernova: StyledDynamicSkyObject(BaseObjects['supernova']),
  cloud: StyledOccludingObject(BaseObjects['cloud']),
  airplane: StyledOccludingObject(BaseObjects['airplane']),
};

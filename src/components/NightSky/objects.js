import styled from 'styled-components';
import Star from '@components/svg/Star';
import Galaxy from '@components/svg/Galaxy';
import Supernova from '@components/svg/Supernova';
import CloudNight from '@components/svg/CloudNight';
import { fadeIn } from '@styles/keyframes';
import { FADE_TIME } from '@constants/';
import Airplane from '@components/svg/Airplane';

const transitionColor = `${FADE_TIME / 2}ms color`;
const transitionOpacity = `${FADE_TIME}ms filter`;
const transitionFilter = `${FADE_TIME}ms opacity`;

const SkyObjectBase = `
  position: absolute;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  transition: ${transitionColor}`;

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

const DynamicSkyObjectBase = `
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
  `;

const BaseObjects = {
  star: Star,
  galaxy: Galaxy,
  supernova: Supernova,
  cloud: CloudNight,
  airplane: Airplane,
};

export default {
  star: StyledSkyObject(BaseObjects['star']),
  galaxy: StyledSkyObject(BaseObjects['galaxy']),
  supernova: StyledDynamicSkyObject(BaseObjects['supernova']),
  cloud: StyledOccludingObject(BaseObjects['cloud']),
  airplane: StyledOccludingObject(BaseObjects['airplane']),
};

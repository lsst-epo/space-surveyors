import styled, { keyframes, css } from 'styled-components';
import Star from '@components/svg/Star';
import Galaxy from '@components/svg/Galaxy';
import Supernova from '@components/svg/Supernova';
import { fadeIn } from '@styles/keyframes';
import { FADE_TIME } from '@constants/';

const fadeInAnimation = keyframes`${fadeIn}`;

const SkyObjectBase = css`
  position: absolute;
  opacity: 0;

  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  transition: ${FADE_TIME}ms opacity, ${FADE_TIME}ms filter;
`;

const SkyObjectAttrs = ({ width, x, y, $captured, brightness }) => ({
  style: {
    color: $captured ? 'var(--yellow)' : 'var(--neutral10)',
    left: `${x}%`,
    top: `${y}%`,
    opacity: brightness,
    filter: `blur(${brightness === 0 ? 5 : 0}px)`,
  },
});

const StyledSkyObject = (object) => styled(object).attrs(SkyObjectAttrs)`
  ${SkyObjectBase}
`;

const BaseObjects = {
  star: Star,
  galaxy: Galaxy,
  supernova: Supernova,
};

export default {
  star: StyledSkyObject(BaseObjects['star']),
  galaxy: StyledSkyObject(BaseObjects['galaxy']),
  supernova: StyledSkyObject(BaseObjects['supernova']),
};

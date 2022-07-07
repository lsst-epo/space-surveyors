import React from 'react';
import styled from 'styled-components';
import Star from '@components/svg/Star';
import { STAR_SIZE } from '@constants/';
import { zStack } from '@styles/globalStyle';

const NightSkyContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zStack.objects};
`;

const NightSkyStar = styled.div`
  position: absolute;
  left: ${({ x }) => `${x}%`};
  top: ${({ y }) => `${y}%`};
  width: ${STAR_SIZE}%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
`;

const NightSkyRenderer = ({ objects }) => {
  return (
    <NightSkyContainer>
      {objects &&
        objects.map((object) => {
          const { x, y } = object.physics;
          return (
            <NightSkyStar key={`${object.type}-${x}-${y}`} {...{ x, y }}>
              <Star></Star>
            </NightSkyStar>
          );
        })}
    </NightSkyContainer>
  );
};

export default NightSkyRenderer;

import React, { useRef } from 'react';
import useResizeObserver from 'use-resize-observer';
import styled from 'styled-components';
import DomeSVG from '@components/svg/Dome';

const StyledDomeSVG = styled(DomeSVG)`
  ${({ $left, width }) =>
    $left
      ? `transform: scaleX(-1); right: clamp(90%, 100%, calc(100% - ${width}px}));`
      : `left: clamp(90%, 100%, calc(100% - ${width}px}));`}
`;

const Dome = ({ $left }) => {
  const ref = useRef(null);
  const { width } = useResizeObserver({ ref });

  return <StyledDomeSVG ref={ref} width={width} $left={$left}></StyledDomeSVG>;
};

export default Dome;

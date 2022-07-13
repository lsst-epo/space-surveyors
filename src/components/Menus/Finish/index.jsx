import React from 'react';
import useFitText from 'use-fit-text';
import styled from 'styled-components';
import { zStack } from '@styles/globalStyle';
import { fullScreenAbsolute, flexCentered } from '@styles/mixins/appearance';

const FinishedMenu = styled.div`
  ${fullScreenAbsolute}
  ${flexCentered}
  color: var(--neutral95);
  font-weight: bold;
  padding-bottom: 1em;
  z-index: ${zStack.menu};
  user-select: none;
`;

const FinishedScreen = () => {
  const { fontSize, ref } = useFitText({ maxFontSize: 1000 });

  return (
    <FinishedMenu ref={ref} style={{ fontSize }}>
      Good job!
    </FinishedMenu>
  );
};

export default FinishedScreen;

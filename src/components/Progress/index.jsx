import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PROGRESS_BASE_HEIGHT = 0.6;
const PROGRESS_BORDER_RADIUS = PROGRESS_BASE_HEIGHT / 2;
const PROGRESS_BAR_PAD = PROGRESS_BASE_HEIGHT / 4;

const StyledProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: ${PROGRESS_BASE_HEIGHT}em;
  border-radius: ${PROGRESS_BORDER_RADIUS}em;
  padding: ${PROGRESS_BAR_PAD}em;
  background: var(--neutral90);
`;

const StyledProgressBar = styled.div.attrs((props) => ({
  style: {
    width: `${props.value}%`,
  },
}))`
  height: ${PROGRESS_BORDER_RADIUS}em;
  background: var(--turquoise50);
  border-radius: ${PROGRESS_BAR_PAD}em;
  min-width: ${PROGRESS_BORDER_RADIUS}em;
`;

const LinearProgress = ({ min, max, value }) => (
  <StyledProgressContainer>
    <StyledProgressBar
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      value={value}
    ></StyledProgressBar>
  </StyledProgressContainer>
);

LinearProgress.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
};

LinearProgress.defaultProps = {
  min: 0,
  max: 100,
};

export default LinearProgress;

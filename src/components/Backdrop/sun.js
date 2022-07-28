import styled from 'styled-components';
import { DAY_TRANSITION_DURATION } from '@constants/';

const Sun = styled.div.attrs(({ showEndgame }) => ({
  style: {
    transform: showEndgame ? 'translate(20%, 30%)' : 'translate(100%, 100%)',
  },
}))`
  background-color: #fdda78;
  border-radius: 50%;
  aspect-ratio: 1/1;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: ${DAY_TRANSITION_DURATION}ms transform;
  transition-delay: 100ms;
  width: 25%;
`;

export default Sun;

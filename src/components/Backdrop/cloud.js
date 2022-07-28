import styled from 'styled-components';
import { DAY_TRANSITION_DURATION } from '@constants/';
import CloudDay from '@components/svg/CloudDay';

const StyledCloudDay = styled(CloudDay).attrs(({ $showEndgame }) => ({
  style: {
    transform: $showEndgame ? 'translate(50%, 0%)' : 'translate(100%, 0%)',
  },
}))`
  width: 20%;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: ${DAY_TRANSITION_DURATION}ms transform;
  transition-delay: 100ms;
`;

export default StyledCloudDay;

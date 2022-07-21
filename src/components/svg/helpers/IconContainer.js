import styled from 'styled-components';
import { flexCentered } from '@styles/mixins/appearance';

const IconContainer = styled.div`
  ${flexCentered}
  flex: 0 0 auto;
  height: 1em;
  aspect-ratio: 1/1;

  &:first-child {
    margin-right: 0.5ch;
  }
`;

export default IconContainer;

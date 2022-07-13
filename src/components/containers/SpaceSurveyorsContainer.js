import styled from 'styled-components';

const SpaceSurveyorsContainer = styled.div`
  background: var(--neutral95);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  font-family: var(--FONT_STACK_BASE);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;

  &:after {
    content: '';
    background: #313333;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 19.2%;
  }
`;

export default SpaceSurveyorsContainer;

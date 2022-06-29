import styled, { css } from 'styled-components';
import { fluidScale } from '@styles/globalStyle';
import { aButton, aButtonTheme } from '@styles/mixins/appearance';

export const Button = styled.button`
  ${({ $styleAs = 'primary' }) => aButtonTheme($styleAs)}
  ${aButton}
  align-items: center;
  font-size: ${fluidScale('20px', '16px')};
  text-align: center;

  ${({ $isBlock }) =>
    $isBlock &&
    css`
      display: flex;
      width: 100%;
    `}
`;

export const ButtonText = styled.span`
  flex: 1 1 auto;
  text-align: center;

  svg + & {
    padding-inline-start: 10px;
  }
`;

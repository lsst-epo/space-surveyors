import styled, { css } from "styled-components";
import { fluidScale } from "@styles/globalStyle";
import { aButton, aButtonTheme } from "@styles/mixins/appearance";

export const Button = styled.button`
  ${({ $styleAs = "primary" }) => aButtonTheme($styleAs)}
  ${aButton}
  align-items: center;
  font-size: ${fluidScale("20px", "16px")};
  text-align: center;

  ${({ $isBlock }) =>
    $isBlock &&
    css`
      display: flex;
      width: 100%;
    `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      display: inline-flex;
      padding-inline-start: 15px;
    `}
`;

export const IconButton = styled.button`
  cursor: pointer;
  color: var(--offWhite);
  border: 0;
  background: transparent;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    outline: 3px solid var(--offWhite);
    outline-offset: 1px;
  }
`;

export const ButtonText = styled.span`
  flex: 1 1 auto;
  text-align: center;

  svg + & {
    text-align: left;
    padding-inline-start: 10px;
  }
`;

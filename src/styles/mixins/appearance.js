import { css } from 'styled-components';

export const fullScreenAbsolute = `
width: 100%;
height: 100%;
position: absolute;`;

export const flexCentered = `
display: flex;
justify-content: center;
align-items: center;`;

export const focusDefault = (style = '') => {
  return `
    .js-focus-visible &:focus:not(.focus-visible) {
      outline-width: 0;
    }

    &.focus-visible:not(:disabled) {
      outline: auto 4px;
      ${style}
    }
  `;
};

export const protoButton = () => {
  return `
    display: inline-block;
    padding: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    appearance: none;
  `;
};

export const aFocus = (styles = '') => css`
  ${focusDefault(css`
    outline: 3px solid var(--black);
    outline-offset: 1px;
    border-color: var(--black);
    ${styles}
  `)}
`;

export const aButtonTheme = (style) => {
  switch (style) {
    case 'secondary':
      return css`
        --button-background-color: var(--red);
        --button-border-color: var(--red);
        --button-color: var(--white);
      `;

    case 'tertiary':
      return css`
        --button-background-color: var(--white);
        --button-border-color: var(--black);
        --button-color: var(--black);
      `;

    default:
      return css`
        --button-background-color: var(--turquoise85);
        --button-border-color: var(--turquoise85);
        --button-color: var(--white);
      `;
  }
};

export const aButton = css`
  ${protoButton()}

  border: 1px solid var(--button-border-color);
  border-radius: 6px;
  background-color: var(--button-background-color);
  padding: 15px 32px;
  color: var(--button-color) !important;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  ${aFocus()}

  &:hover {
    outline: 3px solid var(--button-border-color);
    outline-offset: 1px;
  }

  &:disabled,
  &[aria-disabled] {
    background-color: var(--neutral40);
    border-color: var(--neutral40);
    pointer-events: none;

    &.focus-visible,
    &:hover {
      outline: 0;
    }
  }
`;

export const aHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

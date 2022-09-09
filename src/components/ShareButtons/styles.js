import styled, { css } from "styled-components";
import { protoButton } from "@styles/mixins/appearance";

export const ShareButtonsList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  li {
    + li {
      margin-top: 30px;
    }
  }
`;

const networks = {
  url: css`
    background-color: var(--turquoise70);

    svg {
      width: 26px;
      height: 26px;
      fill: var(--white);
    }

    &:hover,
    &:focus {
      background-color: #7ac1c2;
    }
  `,
  facebook: css`
    background-color: #3d5a99;

    svg {
      width: 37px;
      height: 37px;
      margin-left: 2px;
      fill: var(--white);
    }

    &:hover,
    &:focus {
      background-color: #98a5cb;
    }
  `,
  twitter: css`
    background-color: #38a8e0;

    svg {
      width: 46px;
      height: 46px;
      margin-left: 2px;
      fill: var(--white);
    }

    &:hover,
    &:focus {
      background-color: #98d0f1;
    }
  `,
  email: css`
    background-color: var(--turquoise85);

    svg {
      width: 40px;
      height: 40px;
      margin-left: 1px;
    }

    line,
    .envelope-top {
      stroke: var(--white);
    }

    .envelope-outline {
      fill: var(--white);
    }

    &:hover,
    &:focus {
      background-color: #7fb3b1;
    }
  `,
};

export const ShareIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: transparent solid 2px;
  border-radius: 50%;
  transition: background-color 0.2s, border-color 0.2s;

  svg {
    width: 100%;
    height: auto;
  }

  ${({ network }) => networks[network]}
`;

export const ShareButtonStyle = css`
  ${protoButton()}
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:focus {
    outline: none;

    ${ShareIcon} {
      border-color: var(--blue20);
    }
  }
`;

export const ShareButton = styled.button`
  ${ShareButtonStyle}
`;

export const ShareNetwork = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
  color: var(--white);
  margin-top: 10px;
`;

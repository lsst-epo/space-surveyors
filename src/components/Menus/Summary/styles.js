import styled from "styled-components";
import { BREAK_TABLET_MIN, getRawPx } from "@styles/globalStyle";
import { MenuResponsive, MenuWrapper } from "../styles";
import ScoreList from "@components/ScoreList";

export const SummaryMenuWrapper = styled(MenuWrapper)`
  justify-content: center;
  color: var(--yellow);
`;

export const SummaryMenuResponsive = styled(MenuResponsive)`
  & > * + * {
    margin-top: 2em;
  }
`;

export const SummaryTitle = styled.h1`
  font-size: 2.5em;
  text-transform: uppercase;
`;

export const ScoreSummary = styled.div`
  display: flex;
  align-items: center;
  ${({ $width }) =>
    $width < getRawPx(BREAK_TABLET_MIN) ? "flex-direction: column" : ""};
  font-size: 2em;
  line-height: 1;
  font-weight: bold;
`;

export const ScoreStandout = styled.span`
  font-size: 3em;
  margin: 0 0.5ch;
`;

export const ScaledScoreList = styled(ScoreList)`
  grid-template-columns: repeat(auto-fit, minmax(4em, 1fr));
  width: 100%;
  font-size: 2em;

  ${({ $width }) =>
    $width < getRawPx(BREAK_TABLET_MIN)
      ? "& > li {justify-content: center}"
      : ""};
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
`;

export const LinkContainer = styled(ButtonContainer)`
  color: var(--offWhite);
`;

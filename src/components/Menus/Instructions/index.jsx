import React, { useContext } from "react";
import MenuContext from "@contexts/menus";
import Button from "@components/Button";
import IconComposer from "@components/svg/IconComposer";
import IconContainer from "@components/svg/helpers/IconContainer";
import { GAME_DURATION, MENU_TRANSITION_TIME } from "@constants/index";
import { convertMsToTime } from "@lib/utils";
import MovementVisual from "@components/Menus/Instructions/visuals/MovementVisual";
import OcclusionVisual from "@components/Menus/Instructions/visuals/OcclusionVisual";
import { Trans } from "react-i18next";
import * as Styled from "../styles";

const icons = {
  star: "generics.objects.star_other",
  galaxy: "generics.objects.galaxy_other",
  supernova: "generics.objects.supernova_other",
  comet: "generics.objects.comet_other",
  asteroid: "generics.objects.asteroid_other",
};

const InstructionsMenu = ({ onMenuClose, engine, menu, isOpen }) => {
  const { setMenus, openMenus } = useContext(MenuContext) || {};

  const handleGameStart = () => {
    onMenuClose(menu);

    const timer = setTimeout(() => {
      engine.current.dispatch({ type: "gameStart" });
    }, MENU_TRANSITION_TIME);

    return () => clearTimeout(timer);
  };

  return (
    <Styled.MenuWrapper open={isOpen}>
      <Styled.MenuResponsive>
        <Styled.TitleBar>
          <Styled.RubinLogo />
          <Styled.MenuTitle>
            <Trans>menus.instructions.title</Trans>
          </Styled.MenuTitle>
        </Styled.TitleBar>
        <Styled.Instructions>
          <li>
            <p>
              <Trans
                i18nKey="menus.instructions.0"
                values={{ duration: convertMsToTime(GAME_DURATION) }}
              />
            </p>
            <Styled.IconLegend>
              {Object.keys(icons).map((i) => (
                <Styled.IconItem key={i}>
                  <IconContainer>
                    <IconComposer icon={i} height="100%" />
                  </IconContainer>
                  <Trans>{icons[i]}</Trans>
                </Styled.IconItem>
              ))}
            </Styled.IconLegend>
            <p>
              <Trans>menus.instructions.1</Trans>
            </p>
          </li>
          <li>
            <Trans>menus.instructions.2</Trans>
            <MovementVisual />
          </li>
          <li>
            <Trans>menus.instructions.3</Trans>
            <OcclusionVisual />
          </li>
        </Styled.Instructions>
        <Styled.ButtonContainer>
          <Button
            onClick={() => setMenus([...openMenus, "settings"])}
            styleAs="tertiary"
          >
            <Trans>generics.actions.settings</Trans>
          </Button>
          <Button onClick={handleGameStart}>
            <Trans>generics.actions.play</Trans>
          </Button>
        </Styled.ButtonContainer>
        <Styled.FundingLogos />
      </Styled.MenuResponsive>
    </Styled.MenuWrapper>
  );
};

export default InstructionsMenu;

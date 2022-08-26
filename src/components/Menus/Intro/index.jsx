import React, { useContext, useRef } from "react";
import { MENU_TRANSITION_TIME } from "@constants/index";
import DimensionsContext from "@contexts/dimensions";
import MenuContext from "@contexts/menus";
import useFocusTrap from "@hooks/useFocusTrap";
import { closest } from "../../../utils";
import { IntroContainer, IntroButtonContainer } from "./styles";
import Button from "@components/Button";

const IntroScreen = ({ isOpen, onMenuClose, menu, engine }) => {
  const menuRef = useRef();
  const { setMenus } = useContext(MenuContext) || {};
  const { dimensions } = useContext(DimensionsContext);
  const { fullWidth, fullHeight } = dimensions;
  const availableRatios = [1.7778, 0.6667, 0.452459];
  const availableSizes = ["d", "t", "m"];
  const closestRatio = availableRatios.indexOf(
    closest(availableRatios, fullWidth / fullHeight)
  );

  const handleInstructions = () => {
    setMenus(["instructions"]);
  };

  const handleGameStart = () => {
    onMenuClose(menu);

    const timer = setTimeout(() => {
      engine.current.dispatch({ type: "gameStart" });
    }, MENU_TRANSITION_TIME);

    return () => clearTimeout(timer);
  };

  const imageSize = availableSizes[closestRatio];

  useFocusTrap(menuRef, isOpen);

  return (
    <IntroContainer ref={menuRef} imageSize={imageSize} open={isOpen}>
      <IntroButtonContainer imageSize={imageSize}>
        <Button
          isBlock={imageSize === "m"}
          styleAs="tertiary"
          onClick={handleInstructions}
        >
          Instructions
        </Button>
        <Button isBlock={imageSize === "m"} onClick={handleGameStart}>
          Play
        </Button>
      </IntroButtonContainer>
    </IntroContainer>
  );
};

export default IntroScreen;

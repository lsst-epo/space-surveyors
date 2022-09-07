import React, { useContext } from "react";
import InstructionsMenu from "@components/Menus/Instructions";
import SummaryMenu from "@components/Menus/Summary";
import FinishedScreen from "@components/Menus/Finish";
import SettingsMenu from "@components/Menus/Settings";
import IntroScreen from "@components/Menus/Intro";
import MenuContext from "@contexts/menus";

const Menus = {
  instructions: InstructionsMenu,
  summary: SummaryMenu,
  finished: FinishedScreen,
  settings: SettingsMenu,
  intro: IntroScreen,
};

const GameMenus = ({ engine, score }) => {
  const { setMenus, openMenus } = useContext(MenuContext) || {};

  const handleMenuClose = (closedMenu) => {
    setMenus(openMenus.filter((menu) => menu !== closedMenu));
  };

  const handleMenuOpen = (openedMenu, openOnTop = true) => {
    const openedMenus = openOnTop
      ? setMenus([...openMenus, openedMenu])
      : setMenus([openedMenu, ...openMenus]);
  };

  return Object.keys(Menus).map((menu) => {
    const GameMenu = Menus[menu];

    return (
      <GameMenu
        key={menu}
        onMenuClose={handleMenuClose}
        onMenuOpen={handleMenuOpen}
        isOpen={openMenus.includes(menu)}
        {...{ score, engine, menu }}
      />
    );
  });
};

export default GameMenus;

import React, { useContext } from "react";
import LandingMenu from "@components/Menus/Landing";
import SummaryMenu from "@components/Menus/Summary";
import FinishedScreen from "@components/Menus/Finish";
import SettingsMenu from "@components/Menus/Settings";
import MenuContext from "@contexts/menus";

const Menus = {
  landing: LandingMenu,
  summary: SummaryMenu,
  finished: FinishedScreen,
  settings: SettingsMenu,
};

const GameMenus = ({ engine, score, boundingRect, aspectRatio }) => {
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
        {...{ score, aspectRatio, boundingRect, engine, menu }}
      />
    );
  });
};

export default GameMenus;

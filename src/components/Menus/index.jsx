import React from "react";
import LandingMenu from "@components/Menus/Landing";
import SummaryMenu from "@components/Menus/Summary";
import FinishedScreen from "@components/Menus/Finish";
import SettingsMenu from "@components/Menus/Settings";

const Menus = {
  landing: LandingMenu,
  summary: SummaryMenu,
  finished: FinishedScreen,
  settings: SettingsMenu,
};

const GameMenus = ({
  engine,
  openMenus,
  score,
  boundingRect,
  aspectRatio,
  handleMenuChange,
}) => {
  const handleMenuClose = (closedMenu) => {
    const menus = openMenus.filter((menu) => menu !== closedMenu);

    handleMenuChange(menus);
  };

  const handleMenuOpen = (openedMenu, openOnTop = true) => {
    const openedMenus = openOnTop
      ? [...openMenus, openedMenu]
      : [openedMenu, ...openMenus];
    handleMenuChange(openedMenus);
  };

  return (
    openMenus &&
    openMenus.map((menu) => {
      const GameMenu = Menus[menu];

      return (
        <GameMenu
          key={menu}
          onMenuClose={handleMenuClose}
          onMenuOpen={handleMenuOpen}
          {...{ score, aspectRatio, boundingRect, engine, menu }}
        />
      );
    })
  );
};

export default GameMenus;

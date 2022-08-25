import Button from "@components/Button";
import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { MenuProvider } from "@contexts/menus";
import { MENU_SLIDE_TIME } from "@constants/index";
import { SettingsMenuOuter } from "./styles";
import MainSubmenu from "./submenus/Main";

const SettingsMenu = ({ onMenuClose, engine, isOpen, menu }) => {
  const [menusOpen, setMenusOpen] = useState(["main"]);
  const [mainMenuOverride, setMainOverride] = useState(null);

  useEffect(() => {
    if (mainMenuOverride === false) {
      const timer = setTimeout(() => {
        setMainOverride(null);
        engine.current.dispatch({ type: "unpause" });
      }, MENU_SLIDE_TIME);
      return () => clearTimeout(timer);
    }
    if (isOpen === true) {
      setMainOverride(isOpen);
    }

    if (isOpen === true && mainMenuOverride === null) {
      engine.current.dispatch({ type: "pause" });
    }
  }, [mainMenuOverride, isOpen]);

  const handleSettingsClose = () => {
    setMainOverride(false);
    onMenuClose(menu);
  };

  return (
    <SettingsMenuOuter open={isOpen}>
      <MenuProvider value={{ setMenusOpen, menusOpen }}>
        <MainSubmenu
          settingsCloseCallback={handleSettingsClose}
          isOpen={mainMenuOverride}
          engine={engine}
        />
      </MenuProvider>
    </SettingsMenuOuter>
  );
};

export default SettingsMenu;

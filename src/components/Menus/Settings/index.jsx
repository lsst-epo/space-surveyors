import Button from "@components/Button";
import React, { useRef, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useOnClickOutside, useKeyDownEvent } from "@hooks/listeners";
import useFocusTrap from "@hooks/useFocusTrap";
import { SubmenuProvider } from "./contexts/Submenu";
import { MENU_SLIDE_TIME } from "@constants/index";
import { SettingsMenuOuter } from "./styles";
import MainSubmenu from "./submenus/Main";
import AudioSubmenu from "./submenus/Audio";

const Submenus = {
  main: MainSubmenu,
  audio: AudioSubmenu,
};

const SettingsMenu = ({ onMenuClose, engine }) => {
  const [menusOpen, setMenusOpen] = useState(["main"]);

  const [settingsOpen, setSettingsOpen] = useState(null);
  const [mainMenuOverride, setMainOverride] = useState(null);

  useEffect(() => {
    if (settingsOpen === null) {
      engine.current.dispatch({ type: "pause" });
      const timer = setTimeout(() => {
        setSettingsOpen(true);
        setMainOverride(true);
      }, MENU_SLIDE_TIME);
      return () => clearTimeout(timer);
    }

    if (settingsOpen === false) {
      onMenuClose("settings");
      engine.current.dispatch({ type: "unpause" });
    }

    if (mainMenuOverride === false) {
      const timer = setTimeout(() => setSettingsOpen(false), MENU_SLIDE_TIME);
      return () => clearTimeout(timer);
    }
  }, [settingsOpen, mainMenuOverride, menusOpen]);

  const handleSettingsClose = () => {
    setMainOverride(false);
  };

  return (
    <SettingsMenuOuter open={settingsOpen}>
      <SubmenuProvider value={{ setMenusOpen, menusOpen }}>
        <MainSubmenu
          settingsCloseCallback={handleSettingsClose}
          isOpen={mainMenuOverride}
          engine={engine}
        />
      </SubmenuProvider>
    </SettingsMenuOuter>

    //     <MenuTitle>Settings</MenuTitle>
    //     <SettingsList>
    //       <Setting>
    //         Music
    //         <Button onClick={handleToggleMusic}>
    //           {musicPlaying ? "Mute" : "Unmute"}
    //         </Button>
    //       </Setting>
    //       <Setting>
    //         Sound effects
    //         <Button onClick={handleToggleEffects}>
    //           {effectsPlaying ? "Mute" : "Unmute"}
    //         </Button>
    //       </Setting>
    //       <Setting>
    //         Language<div>EN | ES</div>
    //       </Setting>
    //     </SettingsList>
    //     <MenuSubtitle>Credits</MenuSubtitle>
    //     <CreditText>

    //     </CreditText>

    //     <Button onClick={handleCloseSettings}>Close</Button>
  );
};

export default SettingsMenu;

import React, { useRef, useState } from "react";
import { useOnClickOutside, useKeyDownEvent } from "../../../hooks/listeners";
import useFocusTrap from "../../../hooks/useFocusTrap";
import Button from "@components/Button";
import {
  SubmenuHeader,
  SubmenuTitle,
  SubmenuDescription,
  SubmenuContentWrapper,
  SubmenuSection,
  SubmenuSectionHeading,
  SubmenuNavItems,
  SubmenuButton,
  SubmenuNavItem,
} from "../styles";
import Submenu from ".";
import AudioSubmenu from "./Audio";
import InfoSubmenu from "./Info";

const menuItems = {
  // language: "Language",
  audio: "Audio Settings",
  // help: "Help",
  // share: "Share Space Surveyors",
  info: "About Space Surveyors",
};

const Submenus = {
  audio: AudioSubmenu,
  info: InfoSubmenu,
};

const MainSubmenu = ({ isOpen, settingsCloseCallback, engine }) => {
  const [openOverrides, setOpenOverrides] = useState({
    audio: false,
  });

  const handleMenuChange = (menu, open) => {
    setOpenOverrides({ ...openOverrides, [menu]: open });
  };

  return (
    <Submenu
      openCallback={settingsCloseCallback}
      closeCallback={settingsCloseCallback}
      openOverride={isOpen}
      menu="main"
    >
      <SubmenuHeader>
        <div>
          <SubmenuTitle>Main Menu</SubmenuTitle>
          <SubmenuDescription>Settings and more</SubmenuDescription>
        </div>
        <Button
          icon="close"
          iconSize="20px"
          onClick={settingsCloseCallback}
        ></Button>
      </SubmenuHeader>
      <SubmenuContentWrapper>
        <SubmenuSection>
          <SubmenuSectionHeading>Settings</SubmenuSectionHeading>
          <SubmenuNavItems>
            {menuItems &&
              Object.keys(menuItems).map((item) => {
                const Submenu = Submenus[item];
                return (
                  <SubmenuNavItem key={item}>
                    <SubmenuButton
                      icon={item}
                      iconSize="20px"
                      onClick={() => handleMenuChange(item, true)}
                    >
                      {menuItems[item]}
                    </SubmenuButton>
                    <Submenu
                      toggleMenuCallback={handleMenuChange}
                      isOpen={openOverrides[item]}
                      menu={item}
                      engine={engine}
                    />
                  </SubmenuNavItem>
                );
              })}
          </SubmenuNavItems>
        </SubmenuSection>
      </SubmenuContentWrapper>
    </Submenu>
  );
};

export default MainSubmenu;

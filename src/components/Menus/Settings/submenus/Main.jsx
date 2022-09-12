import React, { useRef, useState } from "react";
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
import { Trans } from "react-i18next";
import LanguageSubmenu from "./Language";

const menuItems = {
  language: "menus.settings.main.language",
  audio: "menus.settings.main.audio",
  // help: "Help",
  // share: "Share Space Surveyors",
  info: "menus.settings.main.info",
};

const Submenus = {
  audio: AudioSubmenu,
  info: InfoSubmenu,
  language: LanguageSubmenu,
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
          <SubmenuTitle>
            <Trans>menus.settings.main.title</Trans>
          </SubmenuTitle>
          <SubmenuDescription>
            <Trans>menus.settings.main.description</Trans>
          </SubmenuDescription>
        </div>
        <Button
          icon="close"
          iconSize="20px"
          onClick={settingsCloseCallback}
        ></Button>
      </SubmenuHeader>
      <SubmenuContentWrapper>
        <SubmenuSection>
          <SubmenuSectionHeading>
            <Trans>menus.settings.main.section</Trans>
          </SubmenuSectionHeading>
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
                      <Trans>{menuItems[item]}</Trans>
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

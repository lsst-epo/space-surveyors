import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";
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
import ShareButtons from "@components/ShareButtons";
import Submenu from ".";

const ShareSubmenu = ({ toggleMenuCallback, isOpen, menu }) => {
  return (
    <Submenu
      openCallback={toggleMenuCallback}
      closeCallback={toggleMenuCallback}
      openOverride={isOpen}
      menu={menu}
    >
      <SubmenuHeader>
        <div>
          <SubmenuTitle>
            <Trans>menus.settings.share.title</Trans>
          </SubmenuTitle>
          <SubmenuDescription>
            <Trans>menus.settings.share.description</Trans>
          </SubmenuDescription>
        </div>
        <Button
          icon="close"
          iconSize="20px"
          onClick={() => toggleMenuCallback(menu, false)}
        ></Button>
      </SubmenuHeader>
      <SubmenuContentWrapper>
        <SubmenuSection>
          <ShareButtons />
        </SubmenuSection>
      </SubmenuContentWrapper>
    </Submenu>
  );
};

export default ShareSubmenu;

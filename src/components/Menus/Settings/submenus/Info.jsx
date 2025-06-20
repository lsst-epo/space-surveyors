import React from "react";
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
  CreditList,
} from "../styles";
import Submenu from ".";
import { Trans } from "react-i18next";

const InfoSubmenu = ({ toggleMenuCallback, isOpen, menu, engine }) => {
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
            <Trans>menus.settings.info.title</Trans>
          </SubmenuTitle>
          <SubmenuDescription>
            <Trans>menus.settings.info.description</Trans>
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
          <CreditList>
            <dt>
              <Trans>menus.settings.info.designer</Trans>
            </dt>
            <dd>José Pinto</dd>
            <dt>
              <Trans>menus.settings.info.developer</Trans>
            </dt>
            <dd>Alexandra Moskowitz</dd>
            <dt>
              <Trans>menus.settings.info.astronomy_data</Trans>
            </dt>
            <dd>Clare Higgs</dd>
            <dt>
              <Trans>menus.settings.info.additional_development</Trans>
            </dt>
            <dd>Blake Mason</dd>
            <dt>
              <Trans>menus.settings.info.testing</Trans>
            </dt>
            <dd>
              Lauren Corlies, Stephanie Deppe, Ardis Herrold, Kristen Metzger,
              Eric Rosas
            </dd>
          </CreditList>
        </SubmenuSection>
      </SubmenuContentWrapper>
    </Submenu>
  );
};

export default InfoSubmenu;

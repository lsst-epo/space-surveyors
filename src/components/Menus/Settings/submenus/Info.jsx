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
          <SubmenuTitle>About Space Surveyors</SubmenuTitle>
          <SubmenuDescription>Credits</SubmenuDescription>
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
            <dt>Designer</dt>
            <dd>José Pinto</dd>
            <dt>Developer</dt>
            <dd>Alexandra Goff</dd>
            <dt>Astronomy Data</dt>
            <dd>Clare Higgs</dd>
            <dt>Additional Development</dt>
            <dd>Blake Mason</dd>
            <dt>Testing</dt>
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

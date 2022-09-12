import React, { useState, useEffect } from "react";
import Button from "@components/Button";
import Radio from "@components/Radio";
import { useTranslation, Trans } from "react-i18next";
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

const LanguageSubmenu = ({ toggleMenuCallback, isOpen, menu, engine }) => {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.languages[0] || "en");

  const handleLocaleSelect = (checked, name, locale) => {
    setLocale(locale);
  };

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

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
            <Trans>menus.settings.language.title</Trans>
          </SubmenuTitle>
          <SubmenuDescription>
            <Trans>menus.settings.language.description</Trans>
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
          <Radio
            id="en"
            label={t("menus.settings.language.en")}
            name="en"
            checked={locale === "en"}
            toggleCallback={handleLocaleSelect}
          />
          <Radio
            id="es"
            label={t("menus.settings.language.es")}
            name="es"
            checked={locale === "es"}
            toggleCallback={handleLocaleSelect}
          />
        </SubmenuSection>
      </SubmenuContentWrapper>
    </Submenu>
  );
};

export default LanguageSubmenu;

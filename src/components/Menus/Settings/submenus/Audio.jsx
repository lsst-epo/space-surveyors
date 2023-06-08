import React, { useState, useEffect } from "react";
import Checkbox from "@components/Checkbox";
import Button from "@components/Button";
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

const AudioSubmenu = ({ toggleMenuCallback, isOpen, menu, engine }) => {
  const { t } = useTranslation();

  const [musicPlaying, setMusic] = useState(
    localStorage.getItem("music") ? localStorage.getItem("music") === "true" : true
  );
  const [effectsPlaying, setEffects] = useState(
    localStorage.getItem("effects") ? localStorage.getItem("effects") === "true" : true
  );

  const handleToggleMusic = () => {
    const type = musicPlaying ? "mute" : "unmute";
    engine.current.dispatch({ type, payload: "music" });
    setMusic((prevState) => !prevState);
  };

  const handleToggleEffects = () => {
    const type = effectsPlaying ? "mute" : "unmute";
    engine.current.dispatch({ type, payload: "effects" });
    setEffects((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem("music", musicPlaying ? "true" : "false");
    localStorage.setItem("effects", effectsPlaying ? "true" : "false");
  }, [musicPlaying, effectsPlaying]);

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
            <Trans>menus.settings.audio.title</Trans>
          </SubmenuTitle>
          <SubmenuDescription>
            <Trans>menus.settings.audio.description</Trans>
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
          <Checkbox
            label={t("menus.settings.audio.music")}
            checked={musicPlaying}
            toggleCallback={handleToggleMusic}
          />
          <Checkbox
            label={t("menus.settings.audio.effects")}
            checked={effectsPlaying}
            toggleCallback={handleToggleEffects}
          />
        </SubmenuSection>
      </SubmenuContentWrapper>
    </Submenu>
  );
};

export default AudioSubmenu;

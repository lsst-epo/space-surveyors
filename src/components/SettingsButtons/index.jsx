import { useContext } from "react";
import screenfull from "screenfull";
import styled from "styled-components";
import Button from "@components/Button";
import { zStack } from "@styles/globalStyle";
import MenuContext from "@contexts/menus";

const SettingsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 0.25rem;
  top: 1rem;
  right: 1rem;
  z-index: ${zStack.settingsButton};
`;

const SettingsButtons = ({ gameContainer }) => {
  const { setMenus, openMenus } = useContext(MenuContext) || {};

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(gameContainer.current);
    }
  };

  return (
    <SettingsContainer>
      {screenfull.isEnabled && (
        <Button
          onClick={() => toggleFullscreen()}
          icon={screenfull.isFullscreen ? "fullscreenExit" : "fullscreen"}
          iconSize="1em"
        />
      )}
      <Button
        onClick={() => setMenus([...openMenus, "settings"])}
        icon="hamburger"
        iconSize="1em"
      />
    </SettingsContainer>
  );
};

export default SettingsButtons;

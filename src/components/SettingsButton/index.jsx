import { useContext } from "react";
import styled from "styled-components";
import Button from "@components/Button";
import { zStack } from "@styles/globalStyle";
import MenuContext from "@contexts/menus";

const StyledButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: ${zStack.settingsButton};
`;

const SettingsButton = () => {
  const { setMenus, openMenus } = useContext(MenuContext) || {};
  return (
    <StyledButton
      onClick={() => setMenus([...openMenus, "settings"])}
      icon="hamburger"
      iconSize="1em"
    />
  );
};

export default SettingsButton;

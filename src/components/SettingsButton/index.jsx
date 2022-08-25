import styled from "styled-components";
import Button from "@components/Button";
import { zStack } from "@styles/globalStyle";

const StyledButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: ${zStack.settingsButton};
`;

const SettingsButton = ({ onClick }) => (
  <StyledButton onClick={onClick} icon="hamburger" iconSize="1em" />
);

export default SettingsButton;

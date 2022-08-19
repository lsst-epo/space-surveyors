import styled from "styled-components";
import Button from "@components/Button";
import { zStack } from "@styles/globalStyle";

const SettingsButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: ${zStack.settingsButton};
`;

export default SettingsButton;

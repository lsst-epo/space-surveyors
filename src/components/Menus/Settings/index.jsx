import Button from "@components/Button";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useOnClickOutside, useKeyDownEvent } from "../../../hooks/listeners";
import useFocusTrap from "../../../hooks/useFocusTrap";
import MenuWrapper from "../styles";

const SettingsMenuWrapper = styled(MenuWrapper)`
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
`;

const SettingsModal = styled.div`
  border-radius: 5px;
  height: 80%;
  min-width: 80%;
  max-width: calc(100% - 0.5rem);
  background-color: var(--neutral95);
  padding: 1rem;
`;

const SettingsMenu = ({
  onMenuClose,
  score,
  engine,
  boundingRect,
  aspectRatio,
}) => {
  useEffect(() => {
    engine.current.dispatch({ type: "pause" });
  }, []);

  const handleCloseSettings = () => {
    onMenuClose("settings");
    engine.current.start();
  };

  const handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      handleCloseSettings();
    }
  };

  const ref = useRef();
  useOnClickOutside(ref, handleCloseSettings);
  useFocusTrap(ref, true);
  useKeyDownEvent(handleKeyDown);

  return (
    <SettingsMenuWrapper open>
      <SettingsModal ref={ref}>
        Settings
        <Button icon="close" />
      </SettingsModal>
    </SettingsMenuWrapper>
  );
};

export default SettingsMenu;

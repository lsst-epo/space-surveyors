import React, { useRef, useState, useContext, useEffect } from "react";
import { useOnClickOutside, useKeyDownEvent } from "@hooks/listeners";
import useFocusTrap from "@hooks/useFocusTrap";
import { SettingsSubMenu, SettingsMenuInner } from "../styles";
import MenuContext from "@contexts/menus";

const Submenu = ({
  children,
  openOverride,
  openCallback,
  closeCallback,
  menu,
}) => {
  const menuRef = useRef();
  const { setMenus, openMenus } = useContext(MenuContext) || {};
  const [isOpen, setIsOpen] = useState(
    typeof openOverride === "boolean" ? openOverride : false
  );

  function handleKeyDown({ key }) {
    if (!isOpen || key !== "Escape") return;
    handleClose();
  }

  function handleClose() {
    const isOpenOverride = typeof openOverride === "boolean";

    if (!isOpenOverride) setIsOpen(false);

    if (isOpenOverride && closeCallback) {
      closeCallback(menu, false);
    } else if (closeCallback) {
      closeCallback(menu, false);
    }

    if (openMenus && setMenus) {
      if (openMenus.includes(menu)) {
        setMenus(
          openMenus.filter((menuId, index) => {
            return menuId !== menu;
          })
        );
      }
    }
  }

  function handleOpen() {
    const isOpenOverride = typeof openOverride === "boolean";
    if (!isOpenOverride) {
      setIsOpen(menu, true);
    }

    if (isOpenOverride && openCallback) {
      openCallback(true);
    } else if (openCallback) {
      openCallback(menu, true);
    }

    if (openMenus && setMenus) {
      if (!openMenus.includes(labelledbyId)) {
        setMenus([...openMenus, labelledbyId]);
      }
    }
  }

  useEffect(() => {
    const isOpenOverride = typeof openOverride === "boolean";
    if (isOpenOverride) {
      setIsOpen(openOverride);
    }
  }, [openOverride]);

  useFocusTrap(menuRef, isOpen);
  useKeyDownEvent(handleKeyDown);
  useOnClickOutside(menuRef, handleClose);

  return (
    <SettingsMenuInner ref={menuRef} open={isOpen}>
      <SettingsSubMenu>{children}</SettingsSubMenu>
    </SettingsMenuInner>
  );
};

export default Submenu;

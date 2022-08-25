import React, { useRef, useState, useContext, useEffect } from "react";
import { useOnClickOutside, useKeyDownEvent } from "@hooks/listeners";
import useFocusTrap from "@hooks/useFocusTrap";
import SubmenuContext from "../contexts/Submenu";
import { SettingsSubMenu, SettingsMenuInner } from "../styles";

const Submenu = ({
  children,
  openOverride,
  openCallback,
  closeCallback,
  menu,
}) => {
  const menuRef = useRef();
  const { setMenusOpen, menusOpen } = useContext(SubmenuContext) || {};
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

    if (menusOpen && setMenusOpen) {
      if (menusOpen.includes(menu)) {
        setMenusOpen(
          menusOpen.filter((menuId, index) => {
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

    if (menusOpen && setMenusOpen) {
      if (!menusOpen.includes(labelledbyId)) {
        setMenusOpen([...menusOpen, labelledbyId]);
      }
    }
  }

  useEffect(() => {
    const isOpenOverride = typeof openOverride === "boolean";
    if (isOpenOverride) {
      setIsOpen(openOverride);
    }
  }, [openOverride]);

  // useFocusTrap(menuRef, isOpen);
  useKeyDownEvent(handleKeyDown);

  // useOnClickOutside(menuRef, handleClose);

  return (
    <SettingsMenuInner ref={menuRef} open={isOpen}>
      <SettingsSubMenu>{children}</SettingsSubMenu>
    </SettingsMenuInner>
  );
};

export default Submenu;

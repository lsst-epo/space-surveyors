import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  CheckboxWrapper,
  CheckboxIndicator,
  CheckboxInput,
  CheckboxLabel,
} from "./styles";

export default function Checkbox({
  label,
  checked,
  toggleCallback,
  labelledbyId,
  describedbyId,
  classes,
  defaultChecked,
}) {
  const checkboxRef = useRef(null);

  function handleChange(e) {
    if (toggleCallback) toggleCallback(checkboxRef.current.checked, label);
  }

  return (
    <>
      {typeof defaultChecked === "boolean" && typeof checked === "undefined" && (
        <CheckboxWrapper>
          <CheckboxInput
            ref={checkboxRef}
            type="checkbox"
            defaultChecked={defaultChecked}
            onChange={handleChange}
          />
          <CheckboxIndicator />
          <CheckboxLabel>{label}</CheckboxLabel>
        </CheckboxWrapper>
      )}
      {typeof defaultChecked === "undefined" && typeof checked === "boolean" && (
        <CheckboxWrapper>
          <CheckboxInput
            ref={checkboxRef}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <CheckboxIndicator />
          <CheckboxLabel>{label}</CheckboxLabel>
        </CheckboxWrapper>
      )}
    </>
  );
}

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  label: PropTypes.string,
  labelledbyId: PropTypes.string,
  describedbyId: PropTypes.string,
  toggleCallback: PropTypes.func,
  classes: PropTypes.string,
};

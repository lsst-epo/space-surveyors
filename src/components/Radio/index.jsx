import { useRef } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function Radio({ id, label, checked, toggleCallback, classes }) {
  const radioRef = useRef(null);

  function handleChange(e) {
    if (toggleCallback) toggleCallback(radioRef.current.checked, label, id);
  }

  return (
    <Styled.RadioWrapper>
      <Styled.Radio ref={radioRef} checked={checked} onChange={handleChange} />
      <Styled.RadioIndicator />
      <Styled.RadioLabel>{label}</Styled.RadioLabel>
    </Styled.RadioWrapper>
  );
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
  toggleCallback: PropTypes.func,
  classes: PropTypes.string,
};

import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function ShareButton({
  icon,
  text,
  network,
  onClick,
  message,
  description,
  showLabel,
}) {
  return (
    <Styled.ShareButton
      onClick={onClick}
      data-network={network}
      data-message={message}
      data-description={description}
    >
      <Styled.ShareIcon network={network}>{icon}</Styled.ShareIcon>
      <Styled.ShareNetwork>{text}</Styled.ShareNetwork>
    </Styled.ShareButton>
  );
}

ShareButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  network: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  showLabel: PropTypes.bool,
};

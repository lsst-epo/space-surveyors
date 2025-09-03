import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import styled from "styled-components";
import { EmailShareButton } from "react-share";
import * as Styled from "./styles";
import IconComposer from "@components/svg/IconComposer";

const StyledEmailShareButton = styled(EmailShareButton)`
  ${Styled.ShareButtonStyle}
`;

export default function ShareButton({ subject, body, separator }) {
  return (
    <StyledEmailShareButton
      url={
        typeof window !== "undefined"
          ? window.location.href
          : "https://lsst-epo.github.io/space-surveyors/"
      }
      subject={subject}
      body={body}
      separator={separator}
    >
      <Styled.ShareIcon network="email">
        <IconComposer icon="email" />
      </Styled.ShareIcon>
      <Styled.ShareNetwork>
        <Trans>menus.settings.share.email.label</Trans>
      </Styled.ShareNetwork>
    </StyledEmailShareButton>
  );
}

ShareButton.defaultProps = {
  separator: " ",
};

ShareButton.propTypes = {
  subject: PropTypes.string,
  body: PropTypes.string,
  separator: PropTypes.string,
};

import PropTypes from "prop-types";
import styled from "styled-components";
import { FacebookShareButton } from "react-share";
import IconComposer from "@components/svg/IconComposer";
import * as Styled from "./styles";

const StyledFacebookShareButton = styled(FacebookShareButton)`
  ${Styled.ShareButtonStyle}
`;

export default function ShareButton({ quote, hashtag }) {
  return (
    <StyledFacebookShareButton
      url={
        typeof window !== "undefined"
          ? window.location.href
          : "https://lsst-epo.github.io/space-surveyors/"
      }
      quote={quote}
      hashtag={hashtag}
    >
      <Styled.ShareIcon network="facebook">
        <IconComposer icon="facebook" />
      </Styled.ShareIcon>
      <Styled.ShareNetwork>Facebook</Styled.ShareNetwork>
    </StyledFacebookShareButton>
  );
}

ShareButton.propTypes = {
  quote: PropTypes.string,
  hashtag: PropTypes.string,
};

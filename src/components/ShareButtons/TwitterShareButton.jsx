import PropTypes from "prop-types";
import styled from "styled-components";
import { TwitterShareButton } from "react-share";
import IconComposer from "@components/svg/IconComposer";
import * as Styled from "./styles";

const StyledTwitterShareButton = styled(TwitterShareButton)`
  ${Styled.ShareButtonStyle}
`;

export default function ShareButton({ title, via, hashtags, related }) {
  return (
    <StyledTwitterShareButton
      url={
        typeof window !== "undefined"
          ? window.location.href
          : "https://spacesurveyors.app"
      }
      title={title}
      hashtags={hashtags}
    >
      <Styled.ShareIcon network="twitter">
        <IconComposer icon="twitter" />
      </Styled.ShareIcon>
      <Styled.ShareNetwork>Twitter</Styled.ShareNetwork>
    </StyledTwitterShareButton>
  );
}

ShareButton.propTypes = {
  title: PropTypes.string,
  via: PropTypes.string,
  hashtags: PropTypes.array,
  related: PropTypes.array,
};

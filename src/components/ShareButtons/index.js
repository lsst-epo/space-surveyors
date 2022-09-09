import PropTypes from "prop-types";
import IconComposer from "@components/svg/IconComposer";
import * as Styled from "./styles";
import CopyUrlButton from "@components/ShareButtons/CopyUrlButton";
import FacebookShareButton from "@components/ShareButtons/FacebookShareButton";
import TwitterShareButton from "@components/ShareButtons/TwitterShareButton";
import EmailShareButton from "@components/ShareButtons/EmailShareButton";

export default function ShareButtons({
  classes,
  showLabels,
  url,
  facebook,
  twitter,
  image,
  email,
}) {
  return (
    <Styled.ShareButtonsList role="menu" aria-label="Share Buttons">
      {url && (
        <li role="menuitem">
          <CopyUrlButton />
        </li>
      )}
      {facebook && (
        <li role="menuitem">
          <FacebookShareButton hashtag="#spacesurveyors" />
        </li>
      )}
      {twitter && (
        <li role="menuitem">
          <TwitterShareButton hashtags={["#spacesurveyors"]} />
        </li>
      )}
      {email && (
        <li role="menuitem">
          <EmailShareButton />
        </li>
      )}
    </Styled.ShareButtonsList>
  );
}

ShareButtons.defaultProps = {
  url: true,
  showLabels: true,
  facebook: true,
  twitter: true,
  email: true,
};

ShareButtons.propTypes = {
  classes: PropTypes.string,
  showLabels: PropTypes.bool,
  url: PropTypes.bool,
  facebook: PropTypes.bool,
  twitter: PropTypes.bool,
  email: PropTypes.bool,
};

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Styled.ShareButtonsList
      role="menu"
      aria-label={t("menus.settings.share.label")}
    >
      {url && (
        <li role="menuitem">
          <CopyUrlButton />
        </li>
      )}
      {facebook && (
        <li role="menuitem">
          <FacebookShareButton
            quote={t("menus.settings.share.facebook")}
            hashtag="#SpaceSurveyors"
          />
        </li>
      )}
      {twitter && (
        <li role="menuitem">
          <TwitterShareButton
            hashtags={["SpaceSurveyors"]}
            title={t("menus.settings.share.twitter")}
          />
        </li>
      )}
      {email && (
        <li role="menuitem">
          <EmailShareButton
            subject={t("menus.settings.share.email.subject")}
            body={t("menus.settings.share.email.body")}
          />
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

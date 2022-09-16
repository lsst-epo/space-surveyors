import { useTranslation } from "react-i18next";
import copy from "copy-to-clipboard";
import IconComposer from "@components/svg/IconComposer";
import ShareButton from "@components/ShareButtons/ShareButton";

export default function CopyUrlButton() {
  const { t } = useTranslation();
  return (
    <ShareButton
      icon={<IconComposer icon="chain" />}
      text={t("menus.settings.share.url")}
      network="url"
      onClick={() => {
        copy(window.location.href);
      }}
    />
  );
}

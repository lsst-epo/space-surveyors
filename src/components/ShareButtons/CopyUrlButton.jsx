import copy from "copy-to-clipboard";
import IconComposer from "@components/svg/IconComposer";
import ShareButton from "@components/ShareButtons/ShareButton";

export default function CopyUrlButton() {
  return (
    <ShareButton
      icon={<IconComposer icon="chain" />}
      text="Get Url"
      network="url"
      onClick={() => {
        copy(window.location.href);
      }}
    />
  );
}

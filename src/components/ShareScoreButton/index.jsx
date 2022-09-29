import React, { useState } from "react";
import Button from "@components/Button";
import copy from "copy-to-clipboard";
import { useTranslation } from "react-i18next";

const ShareScoreButton = ({ score, total }) => {
  const { t } = useTranslation();
  const [buttonKey, setButtonKey] = useState(t("generics.actions.share_score"));

  const copyScore = () => {
    const { asteroid, comet, galaxy, supernova, star } = score;
    const toCopy = t("share_copy", {
      total,
      asteroid,
      comet,
      galaxy,
      star,
      supernova,
      url: window.location,
    });
    const didCopy = copy(toCopy);

    if (didCopy) {
      setButtonKey("generics.actions.copied");

      setTimeout(() => {
        setButtonKey("generics.actions.share_score");
      }, 3000);
    }
  };

  return <Button onClick={copyScore}>{t(buttonKey)}</Button>;
};

export default ShareScoreButton;

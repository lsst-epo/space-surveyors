import React, { useRef, useContext } from "react";
import useResizeObserver from "use-resize-observer";
import CenteredText from "@components/svg/helpers/CenteredText";
import DimensionsContext from "@contexts/dimensions";
import { useTranslation } from "react-i18next";
import * as Styled from "../styles";

const FinishedScreen = ({ isOpen }) => {
  const { t } = useTranslation();
  const { dimensions } = useContext(DimensionsContext);
  const { aspectRatio } = dimensions;
  const { ref, width } = useResizeObserver();
  const finishedMessage = t("menus.finish");
  const charSize = finishedMessage.length / 2;
  return (
    <Styled.FinishedMenu isOpen={isOpen}>
      <CenteredText
        ref={ref}
        $width={width}
        textLength="50%"
        {...{ charSize, aspectRatio }}
      >
        {finishedMessage}
      </CenteredText>
    </Styled.FinishedMenu>
  );
};

export default FinishedScreen;

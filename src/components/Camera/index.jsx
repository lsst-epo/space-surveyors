import React, { useRef } from "react";
import useResizeObserver from "use-resize-observer";
import { useTranslation } from "react-i18next";
import { Exposure, AnimatedExposure } from "@components/svg/Exposure";
import * as Styled from "./styles";
import FocalPlaneContainer from "@components/Camera/FocalPlaneContainer";

const CameraRenderer = ({
  nextPosition,
  exposures,
  exposureRemaining,
  physics,
  showEndgame,
  size,
  paused,
}) => {
  const { t } = useTranslation();
  const { ref, width } = useResizeObserver();
  const { x, y } = physics;
  const captureMessage = t("gameplay.camera.capture");
  const charSize = captureMessage.length / 2;

  return (
    <Styled.CameraContainer>
      {exposures &&
        exposures.map((exposure, i) => (
          <Exposure
            key={`expo-${exposure.x}-${exposure.y}`}
            {...{ x: exposure.x, y: exposure.y, size, $pause: showEndgame }}
          />
        ))}
      <FocalPlaneContainer {...{ x, y, size }}>
        {exposureRemaining && (
          <AnimatedExposure {...{ size, $pause: paused || showEndgame }} />
        )}
        <Styled.ExposureText
          ref={ref}
          visibility={exposureRemaining ? "visible" : "hidden"}
          $width={width}
          textLength="80%"
          {...{ charSize }}
        >
          {captureMessage}
        </Styled.ExposureText>
      </FocalPlaneContainer>
      {nextPosition && (
        <Styled.CameraTarget
          {...{ x: nextPosition.x, y: nextPosition.y, size }}
        />
      )}
    </Styled.CameraContainer>
  );
};

export default CameraRenderer;

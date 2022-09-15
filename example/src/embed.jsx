import React, { useState } from "react";
import SpaceSurveyors from "space-surveyors";

const Embed = () => {
  const [render, setRender] = useState(false);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);

  const handleWidth = (event) => {
    setWidth(event.target.value);
  };

  const handleHeight = (event) => {
    setHeight(event.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
      >
        <SpaceSurveyors />
      </div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginTop: "1rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
        }}
      >
        <label for="width">Width</label>
        <input type="number" id="width" value={width} onChange={handleWidth} />
        <label for="height">Height</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleHeight}
        />
      </div>
    </div>
  );
};

export default Embed;

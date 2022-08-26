import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const WorldCanvas = styled.canvas`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid white;
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 400px;
  height: 400px;
  z-index: 1000;
`;

const WorldDebug = ({ occlusions, system }) => {
  const canvasRef = useRef(null);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.beginPath();

    system.draw(ctx);
    occlusions.draw(ctx);

    ctx.scale(1, 1);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.canvas.width = 200;
    context.canvas.height = 200;
    draw(context);
  }, [draw]);

  return <WorldCanvas ref={canvasRef}></WorldCanvas>;
};

export default WorldDebug;

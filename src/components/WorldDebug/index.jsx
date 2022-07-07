import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const WorldCanvas = styled.canvas`
  border: 1px solid white;
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 400px;
  height: 400px;
  z-index: 1000;
`;

const WorldDebug = ({ system }) => {
  const canvasRef = useRef(null);

  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();

    system.draw(ctx);

    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  }, [draw]);

  return <WorldCanvas ref={canvasRef}></WorldCanvas>;
};

export default WorldDebug;

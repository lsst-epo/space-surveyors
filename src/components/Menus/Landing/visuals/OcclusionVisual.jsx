import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NightSkyVisual from './NightSkyVisual';
import SkyObjects from '@components/NightSky/objects';

const Star = SkyObjects['star'];
const Cloud = SkyObjects['cloud'];

const OcclusionVisual = () => (
  <NightSkyVisual>
    <Star x={50} y={50} width="32px" brightness="0.75" />
    <Star x={75} y={75} width="16px" brightness="0.6" />
    <Star x={25} y={20} width="16px" brightness="0.8" />
    <Cloud y={50} x={20} width="50%" />
    <Cloud y={50} x={100} width="50%" />
  </NightSkyVisual>
);

export default OcclusionVisual;

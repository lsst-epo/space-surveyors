import styled from 'styled-components';
import backdropNightImg from '@assets/image/backdrop_night_1.png';

const NightSkyVisual = styled.div`
  background-color: #004b73;
  background-image: url('${backdropNightImg}');
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  height: 12rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export default NightSkyVisual;

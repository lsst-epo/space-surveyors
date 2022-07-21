import styled from 'styled-components';

const CenteredText = styled.text.attrs(
  ({ $width, textLength = '100%', charSize }) => ({
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    textLength,
    x: '50%',
    y: '50%',
    style: {
      fontSize: $width / charSize || '1rem',
    },
  })
)``;

export default CenteredText;

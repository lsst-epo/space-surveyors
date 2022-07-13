import SourceSansProWoff from '@assets/fonts/source-sans-pro-v18-latin-regular.woff';
import SourceSansProWoff2 from '@assets/fonts/source-sans-pro-v18-latin-regular.woff2';
import SourceSansProBoldWoff from '@assets/fonts/source-sans-pro-v18-latin-700.woff';
import SourceSansProBoldWoff2 from '@assets/fonts/source-sans-pro-v18-latin-700.woff2';

export const fontFace = `
  @font-face {
    font-family: 'Source Sans Pro';
    src: url(${SourceSansProWoff2}) format('woff2'),
        url(${SourceSansProWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Source Sans Pro';
    src: url(${SourceSansProBoldWoff2}) format('woff2'),
        url(${SourceSansProBoldWoff}) format('woff');
    font-weight: bold;
    font-style: normal;
  }
`;

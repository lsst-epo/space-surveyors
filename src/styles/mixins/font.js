import SourceSansProWoff from '@assets/fonts/source-sans-pro-v18-latin-regular.woff';
import SourceSansProWoff2 from '@assets/fonts/source-sans-pro-v18-latin-regular.woff2';
import SourceSansProItalicWoff from '@assets/fonts/source-sans-pro-v18-latin-italic.woff';
import SourceSansProItalicWoff2 from '@assets/fonts/source-sans-pro-v18-latin-italic.woff2';
import SourceSansProBoldWoff from '@assets/fonts/source-sans-pro-v18-latin-700.woff';
import SourceSansProBoldWoff2 from '@assets/fonts/source-sans-pro-v18-latin-700.woff2';
import SourceSansProBoldItalicWoff from '@assets/fonts/source-sans-pro-v18-latin-700italic.woff';
import SourceSansProBoldItalicWoff2 from '@assets/fonts/source-sans-pro-v18-latin-700italic.woff2';

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
    src: url(${SourceSansProItalicWoff}) format('woff2'),
        url(${SourceSansProItalicWoff2}) format('woff');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Source Sans Pro';
    src: url(${SourceSansProBoldWoff2}) format('woff2'),
        url(${SourceSansProBoldWoff}) format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Source Sans Pro';
    src: url(${SourceSansProBoldItalicWoff}) format('woff2'),
        url(${SourceSansProBoldItalicWoff2}) format('woff');
    font-weight: bold;
    font-style: italic;
  }
`;

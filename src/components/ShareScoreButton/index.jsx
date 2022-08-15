import Button from '@components/Button';
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

const ShareScoreButton = ({ score, total }) => {
  const [buttonText, setButtonText] = useState('Share score');

  const copyScore = () => {
    const { asteroid, comet, galaxy, supernova, star } = score;
    const toCopy = `I discovered ${total} objects in Rubin #SpaceSurveyors\r\n\r\n🪨 - ${asteroid} ☄️ - ${comet} 🌌 - ${galaxy} ⭐ - ${star} 💥 - ${supernova}\r\n\r\nhttps://spacesurveyors.app/`;
    const didCopy = copy(toCopy);

    if (didCopy) {
      setButtonText('Copied!');

      setTimeout(() => {
        setButtonText('Share score');
      }, 3000);
    }
  };

  return <Button onClick={copyScore}>{buttonText}</Button>;
};

export default ShareScoreButton;

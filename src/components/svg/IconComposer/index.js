import React from 'react';
import Icons from '../Icons';

const IconComposer = (props) => {
  const IconComponent = Icons[props.icon];
  return <IconComponent {...props} />;
};

export default IconComposer;

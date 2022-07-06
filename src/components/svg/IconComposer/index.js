import React from 'react';
import Icons from '../Icons';

const IconComposer = (props) => {
  const IconComponent = Icons[props.icon];
  console.log(IconComponent);

  return <IconComponent {...props} />;
};

export default IconComposer;

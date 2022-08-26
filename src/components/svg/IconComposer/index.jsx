import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import icons from '../index';

const IconComposer = (props) => {
  const {
    children,
    className,
    size,
    fill,
    stroke,
    icon,
    color,
    width,
    height,
    style,
  } = props;
  const IconComponent = props.renderAsImg ? 'img' : SVG;

  return (
    <IconComponent
      src={icons[icon]}
      {...{
        className,
        size,
        fill,
        stroke,
        color,
        width,
        height,
        style,
        children,
      }}
    />
  );
};

IconComposer.propTypes = {
  renderAsImg: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
};

IconComposer.defaultProps = {
  renderAsImg: false,
};

export default IconComposer;

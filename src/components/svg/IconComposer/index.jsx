import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import icons from "../index";

const IconComposer = (props) => {
  const {
    children,
    className,
    fill = "currentColor",
    stroke,
    icon,
    color,
    width,
    height,
    style,
    size,
  } = props;
  const IconComponent = props.renderAsImg ? "img" : SVG;

  return (
    <IconComponent
      src={icons[icon]}
      {...{
        className,
        fill,
        stroke,
        color,
        width: width || size,
        height: height || size,
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

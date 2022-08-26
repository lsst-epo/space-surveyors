import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";
import IconComposer from "@components/svg/IconComposer";

const Button = forwardRef(
  (
    {
      children,
      icon,
      iconSize,
      isBlock,
      styleAs,
      isInactive,
      className,
      ...buttonProps
    },
    ref
  ) => {
    return !!icon && !children ? (
      <Styled.IconButton
        ref={ref}
        aria-disabled={isInactive || undefined}
        className={className}
        {...buttonProps}
      >
        <IconComposer icon={icon} size={iconSize} />
      </Styled.IconButton>
    ) : (
      <Styled.Button
        ref={ref}
        $isBlock={isBlock}
        $styleAs={styleAs}
        $hasIcon={!!icon}
        $isIcon={!!icon && !children}
        aria-disabled={isInactive || undefined}
        className={className}
        {...buttonProps}
      >
        {icon && (
          <IconComposer
            icon={icon}
            size={iconSize}
            role={children && "presentation"}
          />
        )}
        <Styled.ButtonText>{children}</Styled.ButtonText>
      </Styled.Button>
    );
  }
);

Button.displayName = "Atomic.Button";

Button.propTypes = {
  children: PropTypes.node,
  isBlock: PropTypes.bool,
  styleAs: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  /** This is a disabled style without disabling the button.
   * Good for a11y - button is visible even if form isn't complete.
   */
  isInactive: PropTypes.bool,
};

export default Button;

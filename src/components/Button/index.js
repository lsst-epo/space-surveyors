import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';

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
    return (
      <Styled.Button
        ref={ref}
        $isBlock={isBlock}
        $styleAs={styleAs}
        aria-disabled={isInactive || undefined}
        className={className}
        {...buttonProps}
      >
        <Styled.ButtonText>{children}</Styled.ButtonText>
      </Styled.Button>
    );
  }
);

Button.displayName = 'Atomic.Button';

Button.prototypes = {
  children: PropTypes.node,
  isBlock: PropTypes.bool,
  styleAs: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  /** This is a disabled style without disabling the button.
   * Good for a11y - button is visible even if form isn't complete.
   */
  isInactive: PropTypes.bool,
};

export default Button;

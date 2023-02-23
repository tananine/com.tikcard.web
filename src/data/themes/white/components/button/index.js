import root from 'data/themes/white/components/button/root';
import contained from 'data/themes/white/components/button/contained';

const button = {
  defaultProps: {
    disableRipple: false,
  },
  styleOverrides: {
    root: { ...root },
    contained: { ...contained.base },
    containedSizeSmall: { ...contained.small },
    containedSizeLarge: { ...contained.large },
    containedSecondary: { ...contained.secondary },
  },
};

export default button;

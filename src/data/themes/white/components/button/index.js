import root from '@/data/themes/white/components/button/root';
import contained from '@/data/themes/white/components/button/contained';
import text from '@/data/themes/white/components/button/text';

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
    textError: { ...text.error },
  },
};

export default button;

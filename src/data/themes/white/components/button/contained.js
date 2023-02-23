import colors from 'data/themes/white/base/colors';
import typography from 'data/themes/white/base/typography';
import boxShadows from 'data/themes/white/base/boxShadows';
import borders from 'data/themes/white/base/borders';
import pxToRem from 'data/themes/white/functions/pxToRem';

const { white, black, primary, secondary } = colors;
const { size, fontWeightBold, fontWeightMedium } = typography;
const { xs } = boxShadows;
const { borderRadius } = borders;

const contained = {
  base: {
    backgroundColor: primary.main,
    minHeight: pxToRem(40.5),
    color: black.main,
    padding: `${pxToRem(9)} ${pxToRem(24)}`,
    fontWeight: fontWeightBold,
    boxShadow: xs,
    borderRadius: borderRadius.xxl,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: primary.main,
      boxShadow: xs,
    },

    '&:active, &:active:focus, &:active:hover': {
      opacity: 0.85,
    },

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(16)} !important`,
    },
  },

  small: {
    fontSize: size.sm,
    fontWeight: fontWeightMedium,
    padding: `${pxToRem(4)} ${pxToRem(14)}`,
  },

  large: {
    minHeight: pxToRem(52),
    padding: `${pxToRem(12)} ${pxToRem(64)}`,
    fontSize: size.md,

    '& .material-icon, .material-icons-round, svg': {
      fontSize: `${pxToRem(22)} !important`,
    },
  },

  secondary: {
    backgroundColor: secondary.main,
    color: white.main,

    '&:hover': {
      backgroundColor: secondary.main,
    },

    '&.Mui-disabled': {
      backgroundColor: secondary.disable,
    },
  },
};

export default contained;

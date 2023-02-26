import typography from 'data/themes/white/base/typography';
import colors from 'data/themes/white/base/colors';
import pxToRem from 'data/themes/white/functions/pxToRem';

const { black, white } = colors;

const { fontWeightBold } = typography;

const root = {
  color: black.main,
  minHeight: pxToRem(40.5),
  fontWeight: fontWeightBold,
  backgroundColor: white,
};

export default root;

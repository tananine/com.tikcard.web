import borders from '@/data/themes/white/base/borders';
import pxToRem from '@/data/themes/white/functions/pxToRem';

const { borderRadius } = borders;

const card = {
  styleOverrides: {
    root: {
      padding: pxToRem(12),
      borderRadius: borderRadius.xxl,
    },
  },
};

export default card;

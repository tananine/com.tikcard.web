import rgba from '@/data/themes/white/functions/rgba';
import pxToRem from '@/data/themes/white/functions/pxToRem';

const boxShadow = (offset, radius, color, opacity, inset = '') => {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(
    spread
  )} ${rgba(color, opacity)}`;
};

export default boxShadow;

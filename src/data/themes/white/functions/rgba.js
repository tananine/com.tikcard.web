import hexToRgb from '@/data/themes/white/functions/hexToRgb';

const rgba = (color, opacity) => {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
};

export default rgba;

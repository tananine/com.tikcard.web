import chroma from 'chroma-js';

const hexToRgb = (color) => {
  return chroma(color).rgb().join(', ');
};

export default hexToRgb;

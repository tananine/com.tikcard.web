import colors from 'data/themes/white/base/colors';
import boxShadow from 'data/themes/white/functions/boxShadow';

const { black } = colors;

const boxShadows = {
  xs: boxShadow([0, 2], [9, -5], black.main, 0.15),
  sm: boxShadow([0, 5], [10, 0], black.main, 0.12),
  md: `${boxShadow([0, 4], [6, -1], black.main, 0.1)}, ${boxShadow(
    [0, 2],
    [4, -1],
    black.main,
    0.06
  )}`,
  lg: `${boxShadow([0, 10], [15, -3], black.main, 0.1)}, ${boxShadow(
    [0, 4],
    [6, -2],
    black.main,
    0.05
  )}`,
  xl: `${boxShadow([0, 20], [25, -5], black.main, 0.1)}, ${boxShadow(
    [0, 10],
    [10, -5],
    black.main,
    0.04
  )}`,
};

export default boxShadows;

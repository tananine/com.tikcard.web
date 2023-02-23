import breakpoints from 'data/themes/white/base/breakpoints';

const {
  values: { xs, sm, md, lg, xl },
} = breakpoints;

const XS = `@media (min-width: ${xs}px)`;
const SM = `@media (min-width: ${sm}px)`;
const MD = `@media (min-width: ${md}px)`;
const LG = `@media (min-width: ${lg}px)`;
const XL = `@media (min-width: ${xl}px)`;

const sharedClasses = {
  paddingLeft: `0 !important`,
  paddingRight: `0 !important`,
  marginRight: 'auto !important',
  marginLeft: 'auto !important',
  width: '100% !important',
  position: 'relative',
  maxWidth: `${xl}px !important`,
};

const container = {
  [XS]: {
    '.MuiContainer-root': {
      ...sharedClasses,
    },
  },
  [SM]: {
    '.MuiContainer-root': {
      ...sharedClasses,
    },
  },
  [MD]: {
    '.MuiContainer-root': {
      ...sharedClasses,
    },
  },
  [LG]: {
    '.MuiContainer-root': {
      ...sharedClasses,
    },
  },
  [XL]: {
    '.MuiContainer-root': {
      ...sharedClasses,
    },
  },
};

export default container;

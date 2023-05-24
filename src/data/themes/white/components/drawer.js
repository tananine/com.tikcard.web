import borders from '@/data/themes/white/base/borders';
import breakpoints from '@/data/themes/white/base/breakpoints';

const {
  values: { xl },
} = breakpoints;

const { borderRadius } = borders;

const swipeableDrawer = {
  styleOverrides: {
    root: {
      '& .MuiDrawer-paperAnchorBottom': {
        maxWidth: xl,
        margin: 'auto',
        borderTopLeftRadius: borderRadius.xxxl,
        borderTopRightRadius: borderRadius.xxxl,
      },
    },
  },
};

export default swipeableDrawer;

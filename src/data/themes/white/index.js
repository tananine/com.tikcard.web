import { createTheme } from '@mui/material/styles';

import breakpoints from '@/data/themes/white/base/breakpoints';
import typography from '@/data/themes/white/base/typography';
import globals from '@/data/themes/white/base/globals';
import colors from '@/data/themes/white/base/colors';

import container from '@/data/themes/white/components/container';
import button from '@/data/themes/white/components/button';
import card from '@/data/themes/white/components/card';
import drawer from '@/data/themes/white/components/drawer';
import tabs from '@/data/themes/white/components/tabs';

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiButton: { ...button },
    MuiCard: { ...card },
    MuiDrawer: { ...drawer },
    MuiTabs: { ...tabs },
  },
});

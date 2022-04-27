import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#121212'
        },
        info: {
            main: '#A45A2E'
        },
        error: {
            main: red.A400
        },
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
              h1: {
                fontSize: 30,
                fontWeight: 600
              },
              h2: {
                fontSize: 20,
                fontWeight: 400
              },
              subtitle1: {
                fontSize: '1.875rem',
                fontWeight: 600,
                lineHeight: '2.25rem',
                marginBottom: '1.5rem',
              },
              subtitle2: {
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: 400,
                lineHeight: '1.75rem'
              },
            }
          },
    }
});
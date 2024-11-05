import { useMatches } from 'react-router';
import { useTitle } from 'ahooks';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useI18n, useTheme } from '@milesight/shared/src/hooks';
import { ConfirmProvider } from '@/components';
import BasicLayout from './BasicLayout';
import BlankLayout from './BlankLayout';
import { useWebsocket } from './hooks';

const DEFAULT_LAYOUT = 'basic';
const layouts: Record<string, React.ReactNode> = {
    basic: <BasicLayout />,
    blank: <BlankLayout />,
};

function Layout() {
    const routeMatches = useMatches();
    const { muiLocale, getIntlText } = useI18n();
    const { themeConfig } = useTheme();
    useWebsocket();
    const muiTheme = createTheme(themeConfig, muiLocale!);
    const route = routeMatches[routeMatches.length - 1];
    let { layout = '' } = (route?.handle || {}) as Record<string, any>;

    if (!layout || !layouts[layout]) {
        layout = DEFAULT_LAYOUT;
    }

    useTitle(getIntlText('common.document.title'));

    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ConfirmProvider
                    cancelButtonText={getIntlText('common.button.cancel')}
                    confirmButtonText={getIntlText('common.button.confirm')}
                >
                    {layouts[layout]}
                </ConfirmProvider>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default Layout;

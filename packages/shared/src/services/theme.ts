import { type PaletteMode, type CssVarsThemeOptions } from '@mui/material/styles';
import {
    blue as MBlue,
    green as MGreen,
    red as MRed,
    grey as MGrey,
    yellow as MYellow,
    deepOrange as MDeepOrange,
} from '@mui/material/colors';
import iotStorage from '../utils/storage';

// 缓存 key（注意：使用 iotStorage 会自动拼接 msiot. 前缀）
export const THEME_CACHE_KEY = 'theme';
/** 主题 CSS 变量选择器 */
export const THEME_COLOR_SCHEMA_SELECTOR = 'data-theme';

/** 主题色 - 白 */
export const white = '#FFFFFF';

/** 主题色 - 黑 */
export const black = '#000000';

/** 主题色 - 蓝 */
export const blue = {
    ...MBlue,
    200: '#F0F9FF',
    300: '#D9F0FF',
    400: '#B0DDFF',
    500: '#87C7FF',
    600: '#5EAFFF',
    700: '#3491FA',
    800: '#226FD4',
    900: '#1351AD',
};

/** 主题色 - 绿 */
export const green = {
    ...MGreen,
    200: '#EBFAEF',
    300: '#BEEDCC',
    400: '#90E0AB',
    500: '#66D48E',
    600: '#40C776',
    700: '#1EBA62',
    800: '#10944E',
    900: '#076E3A',
};

/** 主题色 - 黄 */
export const yellow = {
    ...MYellow,
    200: '#FFFDEB',
    300: '#FFF6C2',
    400: '#FFEC99',
    500: '#FFE070',
    600: '#FFD147',
    700: '#F7BA1E',
    800: '#D1940F',
    900: '#AB7003',
};

/** 主题色 - 红 */
export const red = {
    ...MRed,
    200: '#FEEBEE',
    300: '#FFE0DB',
    400: '#FFBAB3',
    500: '#FF928A',
    600: '#FF6661',
    700: '#F13535',
    800: '#CC2328',
    900: '#A6141E',
};

/** 主题色 - 深橙 */
export const deepOrange = {
    ...MDeepOrange,
    200: '#FFF7F0',
    300: '#FFEAD9',
    400: '#FFD1B0',
    500: '#FFB587',
    600: '#FF975E',
    700: '#F77234',
    800: '#D15321',
    900: '#AB3813',
};

/** 主题色 - 灰 */
export const grey = {
    ...MGrey,
    50: '#F7F8FA',
    100: '#F2F3F5',
    200: '#E5E6EB',
    300: '#C9CDD4',
    400: '#A9AEB8',
    500: '#86909C',
    600: '#6B7785',
    700: '#4E5969',
    800: '#272E3B',
    900: '#1D2129',
};

/**
 * 判断浏览器当前是否为黑暗模式
 */
const isDarkMode = ((): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
})();

// 系统主题
// 首次进入系统时，根据当前是否为深色模式来决定默认主题
export const SYSTEM_THEME_MODE = isDarkMode ? 'dark' : 'light';

/**
 * 初始化系统主题
 *
 * 优先根据缓存中的主题类型变更当前主题，若无缓存则默认为 light 主题
 */
export const initTheme = () => {
    const type = iotStorage.getItem<PaletteMode>(THEME_CACHE_KEY) || SYSTEM_THEME_MODE;
    const html = document.querySelector('html');

    html?.setAttribute('data-theme', type);
};

/**
 * 获取当前系统主题类型
 */
export const getCurrentTheme = (): PaletteMode => {
    const mode = iotStorage.getItem<PaletteMode>(THEME_CACHE_KEY);

    return mode || SYSTEM_THEME_MODE;
};

type ColorSchemesType = NonNullable<CssVarsThemeOptions['colorSchemes']>;

/**
 * 获取 MUI 主题配置
 */
export const getMuiSchemes = () => {
    const lightPalette: Exclude<ColorSchemesType['light'], boolean> = {
        palette: {
            grey,
            primary: {
                main: blue[700],
                light: blue[600],
                dark: blue[800],
            },
            secondary: {
                main: '#1261BE',
                light: '#3380CC',
                dark: '#064699',
                contrastText: white,
            },
            error: {
                main: red[700],
                light: red[600],
                dark: red[800],
                contrastText: white,
            },
            warning: {
                main: yellow[700],
                light: yellow[600],
                dark: yellow[800],
                contrastText: white,
            },
            info: {
                main: blue[700],
                light: blue[600],
                dark: blue[800],
                contrastText: white,
            },
            success: {
                main: green[700],
                light: green[600],
                dark: green[800],
                contrastText: white,
            },
            background: {
                default: grey[50],
            },
            Tooltip: {
                bg: grey[800],
            },
        },
    };
    const darkPalette: ColorSchemesType['dark'] = {
        palette: {
            grey,
            primary: {
                main: blue[600],
                light: blue[700],
                dark: blue[500],
            },
            secondary: {
                main: '#3380cc',
                light: '#1261BE',
                dark: '#599DD9',
            },
            error: {
                main: red[600],
                light: red[700],
                dark: red[500],
            },
            warning: {
                main: yellow[600],
                light: yellow[700],
                dark: yellow[500],
            },
            info: {
                main: blue[600],
                light: blue[700],
                dark: blue[500],
            },
            success: {
                main: green[600],
                light: green[700],
                dark: green[500],
            },
            background: {
                default: black,
            },
            text: {
                disabled: grey[300],
            },
            Tooltip: {
                bg: grey[800],
            },
        },
    };
    return {
        light: lightPalette,
        dark: darkPalette,
    };
};

/**
 * 获取 MUI 组件主题配置
 * @param mode 主题类型
 * @link https://mui.com/material-ui/customization/theme-components/
 */
export const getMuiComponents = (mode: PaletteMode = 'light') => {
    const result: CssVarsThemeOptions['components'] = {
        MuiButtonBase: {
            defaultProps: {
                // No more ripple, on the whole application 💣!
                // disableRipple: true,
            },
            // styleOverrides: {},
        },
        MuiChip: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
                margin: 'dense',
                sx: { my: 1.5 },
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
                placement: 'top',
            },
        },
        MuiSvgIcon: {
            defaultProps: {
                fontSize: 'small',
            },
        },
        MuiIconButton: {
            defaultProps: {
                size: 'small',
            },
        },
    };

    return result;
};

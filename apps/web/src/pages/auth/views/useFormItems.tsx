import { useState, useMemo, useCallback } from 'react';
import { type ControllerProps } from 'react-hook-form';
import { TextField, IconButton, InputAdornment, type TextFieldProps } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';
import {
    checkRequired,
    checkEmail,
    userNameChecker,
    passwordChecker,
} from '@milesight/shared/src/utils/validators';
import {
    EmailIcon,
    VisibilityIcon,
    VisibilityOffIcon,
    AccountCircleIcon,
    HttpsIcon,
} from '@milesight/shared/src/components';

interface UseFormItemsProps {
    mode?: 'login' | 'register';
}

export interface FormDataProps {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
}

const useFormItems = ({ mode = 'login' }: UseFormItemsProps) => {
    const { getIntlText } = useI18n();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = useCallback(() => setShowPassword(show => !show), []);

    const formItems = useMemo(() => {
        const props: Partial<TextFieldProps> = {
            fullWidth: true,
            type: 'text',
            size: 'small',
            margin: 'dense',
            sx: { my: 1.5 },
        };
        const registerFields = ['username', 'confirmPassword'];

        const items: ControllerProps<FormDataProps>[] = [
            {
                name: 'email',
                rules: {
                    validate: {
                        checkRequired: checkRequired(),
                        checkEmail: checkEmail(),
                    },
                },
                render({ field: { onChange, value }, fieldState: { error } }) {
                    return (
                        <TextField
                            {...props}
                            label="Email"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    );
                },
            },
            {
                // mode: 'register',
                name: 'username',
                rules: {
                    validate: {
                        checkRequired: checkRequired(),
                        ...userNameChecker(),
                    },
                },
                render({ field: { onChange, value }, fieldState: { error } }) {
                    return (
                        <TextField
                            {...props}
                            label="Username"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    );
                },
            },
            {
                name: 'password',
                rules: {
                    validate: {
                        checkRequired: checkRequired(),
                        ...passwordChecker(),
                    },
                },
                render({ field: { onChange, value }, fieldState: { error } }) {
                    return (
                        <TextField
                            {...props}
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={e => e.preventDefault()}
                                                onMouseUp={e => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    );
                },
            },
            {
                // mode: 'register',
                name: 'confirmPassword',
                rules: {
                    validate: {
                        checkRequired: checkRequired(),
                        checkSamePassword(value, formValues) {
                            if (value !== formValues.password) {
                                return getIntlText('valid.input.password.diff');
                            }
                            return true;
                        },
                    },
                },
                render({ field: { onChange, value }, fieldState: { error } }) {
                    return (
                        <TextField
                            {...props}
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HttpsIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={e => e.preventDefault()}
                                                onMouseUp={e => e.preventDefault()}
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOffIcon />
                                                ) : (
                                                    <VisibilityIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    );
                },
            },
        ];

        return items.filter(item => {
            if (registerFields.includes(item.name)) {
                return mode === 'register';
            }
            return true;
        });
    }, [mode, showPassword, getIntlText, handleClickShowPassword]);

    return formItems;
};

export default useFormItems;

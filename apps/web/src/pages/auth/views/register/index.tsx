import { useNavigate } from 'react-router-dom';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Paper, Typography, Button } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';
import { Logo, toast } from '@milesight/shared/src/components';
import { iotLocalStorage, TOKEN_CACHE_KEY } from '@milesight/shared/src/utils/storage';
import { globalAPI, awaitWrap, isRequestSuccess } from '@/services/http';
import useFormItems, { type FormDataProps } from '../useFormItems';
import './style.less';

export default () => {
    const navigate = useNavigate();
    const { getIntlText } = useI18n();
    const { handleSubmit, control } = useForm<FormDataProps>();
    const formItems = useFormItems({ mode: 'register' });

    const onSubmit: SubmitHandler<FormDataProps> = async data => {
        const { email, username, password } = data;
        const [error, resp] = await awaitWrap(
            globalAPI.oauthRegister({
                email,
                nickname: username!,
                password,
            }),
        );

        // console.log({ error, resp });
        if (error || !isRequestSuccess(resp)) return;

        navigate('/auth/login');
        // 清除已有的 TOKEN 数据，避免影响新用户登录
        iotLocalStorage.removeItem(TOKEN_CACHE_KEY);
        toast.success(getIntlText('auth.message.register_success'));
    };

    return (
        <div className="ms-view-register">
            <Logo />
            <Paper className="ms-auth-container" elevation={3}>
                <Typography variant="h5" align="center">
                    {getIntlText('common.document.title')}
                </Typography>
                <Typography align="center" variant="body2" color="textSecondary">
                    {getIntlText('common.message.register_helper_text')}
                </Typography>
                <div className="ms-auth-form">
                    {formItems.map(props => (
                        <Controller<FormDataProps> key={props.name} {...props} control={control} />
                    ))}
                </div>
                <Button
                    fullWidth
                    sx={{ mt: 2.5, textTransform: 'none' }}
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                >
                    {getIntlText('common.button.confirm')}
                </Button>
            </Paper>
        </div>
    );
};

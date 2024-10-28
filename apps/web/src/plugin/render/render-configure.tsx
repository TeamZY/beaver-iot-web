import { useMemo, forwardRef, useRef } from 'react';
import { isEqual } from 'lodash-es';
import { Form, FormItemsType, MUIForm as MUI } from '@milesight/shared/src/components';
import * as Milesight from '../components';
import { parseStyleString } from './util';

export interface IPlugin {
    /**
     * 自定义组件配置
     */
    config: CustomComponentProps;
    /**
     * 表单数据提交
     */
    onOk: (data: any) => void;
    /**
     * 表单数据变更回调
     */
    onChange?: (data: any) => void;
    /**
     * 传入的表单值
     */
    value?: any;
}

const CreatePlugin = forwardRef((props: IPlugin, ref: any) => {
    const { config, onOk, onChange, value: defaultValue } = props;
    const currentTheme = 'default';
    const defaultRef = useRef<Record<string, any>>({});

    const getFormItems = useMemo(() => {
        const formItems: FormItemsType[] = [];
        const defaultValues: Record<string, any> = {};
        config.configProps?.forEach((item: any) => {
            const { style: configStyle, components } = item;
            const themeStyle = item?.theme?.[currentTheme].style
                ? parseStyleString(item?.theme?.[currentTheme].style)
                : undefined;
            const className = item?.theme?.[currentTheme]?.class
                ? item?.theme?.[currentTheme]?.class
                : undefined;
            components?.forEach((component: ComponentProps, index: number) => {
                const AllComponent: any = { ...MUI, ...Milesight };
                if (AllComponent[component.type]) {
                    const Component = AllComponent[component.type];
                    const commonStyle = component?.style
                        ? parseStyleString(component?.style)
                        : undefined;
                    const { type, style, componentProps, ...restItem } = component;
                    formItems.push({
                        label: component.title,
                        name: component.key,
                        rules: {
                            required: false,
                        },
                        multiple: components?.length > 1 ? components?.length : 0,
                        multipleIndex: index,
                        title: item?.title,
                        style: configStyle ? parseStyleString(configStyle) : {},
                        render: (data: any) => {
                            let value = data?.field?.value;
                            const onChange = data?.field?.onChange;
                            const error = data?.fieldState?.error;
                            if (value === undefined) {
                                value =
                                    config?.config?.[component.key] ||
                                    defaultValue?.[component.key];
                            }
                            if (
                                value === undefined &&
                                component.defaultValue !== undefined &&
                                config.config === undefined
                            ) {
                                defaultValues[component.key] = component.defaultValue;
                            } else {
                                defaultValues[component.key] = value;
                            }
                            return (
                                <Component
                                    {...restItem}
                                    {...componentProps}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    value={value || (component.valueType === 'array' ? [] : '')}
                                    onChange={onChange}
                                    key={component.type}
                                    sx={{
                                        ...commonStyle,
                                        ...themeStyle,
                                    }}
                                    style={style ? parseStyleString(style) : {}}
                                    className={`${className} ${components?.length === 1 ? 'form-item' : ''}`}
                                />
                            );
                        },
                    });
                }
            });
        });
        return { formItems, defaultValues };
    }, [config]);

    const handleSubmit = (values: any) => {
        onOk(values);
    };

    const defaultIsChange = isEqual(defaultRef.current, getFormItems.defaultValues);

    const defaultValues = useMemo(() => {
        return getFormItems.defaultValues;
    }, [defaultIsChange]);

    const formItems = useMemo(() => {
        return getFormItems.formItems;
    }, [getFormItems.formItems]);

    return (
        <Form
            ref={ref}
            formItems={formItems}
            defaultValues={defaultValues}
            onOk={handleSubmit}
            onChange={onChange}
        />
    );
});

export default CreatePlugin;

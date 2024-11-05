import { useState, useRef } from 'react';
import { Modal, EntityForm, toast } from '@milesight/shared/src/components';
import { useI18n } from '@milesight/shared/src/hooks';
import { useConfirm } from '@/components';
import { useEntityApi, type CallServiceType } from '../../../hooks';
import { RenderView } from '../../../render';
import { ViewConfigProps } from './typings';
import './style.less';

interface Props {
    config: ViewConfigProps;
    configJson: CustomComponentProps;
    isEdit?: boolean;
}

const View = (props: Props) => {
    const { getIntlText } = useI18n();
    const confirm = useConfirm();
    const { getEntityChildren, callService, updateProperty } = useEntityApi();
    const { config, configJson, isEdit } = props;
    const [visible, setVisible] = useState(false);
    const [entities, setEntities] = useState([]);
    const ref = useRef<any>();

    // 调用服务
    const handleCallService = async () => {
        const { error } = await callService({
            entity_id: (config?.entity as any)?.value as ApiKey,
            exchange: {
                entity_id: (config?.entity as any)?.value as ApiKey,
            },
        } as CallServiceType);
        if (!error) {
            toast.success(getIntlText('common.message.operation_success'));
        }
    };

    const handleUpdateProperty = async (data: Record<string, any>) => {
        const { error } = await updateProperty({
            entity_id: (config?.entity as any)?.value as ApiKey,
            exchange: data,
        } as CallServiceType);
        if (!error) {
            setVisible(false);
            toast.success(getIntlText('common.message.operation_success'));
        }
    };

    const handleClick = async () => {
        if (configJson.isPreview || isEdit) {
            return;
        }
        const { error, res } = await getEntityChildren({
            id: (config?.entity as any)?.value as ApiKey,
        });
        if (!error) {
            if (res?.length) {
                setEntities(
                    res.map((item: EntityData) => {
                        return {
                            ...item,
                            id: item.entity_id,
                            key: item.entity_key,
                            name: item.entity_name,
                            value_attribute: item.entity_value_attribute,
                        };
                    }),
                );
                setVisible(true);
            } else {
                confirm({
                    title: '',
                    description: getIntlText('dashboard.plugin.trigger_confirm_text'),
                    confirmButtonText: getIntlText('common.button.confirm'),
                    onConfirm: async () => {
                        handleCallService();
                    },
                });
            }
        }
    };

    const handleOk = () => {
        ref.current?.handleSubmit();
    };

    const handleSubmit = (data: Record<string, any>) => {
        handleUpdateProperty(data);
    };

    if (configJson.isPreview) {
        return (
            <div className="trigger-view-preview">
                <RenderView config={config} configJson={configJson} onClick={handleClick} />
            </div>
        );
    }
    return (
        <>
            <RenderView config={config} configJson={configJson} onClick={handleClick} />
            {visible && (
                <Modal
                    title={configJson.name}
                    onOk={handleOk}
                    onCancel={() => setVisible(false)}
                    visible
                >
                    {/* @ts-ignore: Mock 数据字段缺失，暂忽略 ts 校验报错 */}
                    <EntityForm ref={ref} entities={entities} onOk={handleSubmit} />
                </Modal>
            )}
        </>
    );
};

export default View;

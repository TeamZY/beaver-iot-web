import { client, attachAPI, API_PREFIX } from './client';

/**
 * 设备详情定义
 */
export interface DeviceDetail {
    id: ApiKey;
    externalId: ApiKey;
    name: string;
    source: string;
    founder: string;
    createTime: number;
}

/**
 * 设备实体定义
 */
export interface DeviceEntity {
    id: ApiKey;
    name: string;
    type: string;
    dataType: string;
}

/**
 * 设备相关接口定义
 */
export interface DeviceAPISchema extends APISchema {
    /** 获取设备列表 */
    getDeviceList: {
        request: SearchRequestType & {
            /** 名称（模糊搜索） */
            name?: string;
        };
        response: SearchResponseType<DeviceDetail>;
    };

    /** 获取设备详情 */
    getDeviceDetail: {
        request: {
            id: ApiKey;
        };
        response: DeviceDetail;
    };

    /** 添加设备 */
    addDevice: {
        request: {
            /** 名称 */
            name: string;
            /** 集成 ID */
            integration: ApiKey;
            /** 集成新增设备需要的额外信息 */
            param_entities: Record<string, any>;
        };
        response: unknown;
    };

    /** 删除设备 */
    deleteDevices: {
        request: {
            device_id_list: ApiKey[];
        };
        response: unknown;
    };

    /** 更新设备 */
    updateDevice: {
        request: {
            id: ApiKey;
            /** 名称 */
            name: string;
        };
        response: unknown;
    };
}

/**
 * 设备相关 API 服务
 */
export default attachAPI<DeviceAPISchema>(client, {
    apis: {
        getDeviceList: `GET ${API_PREFIX}/device/search`,
        getDeviceDetail: `GET ${API_PREFIX}/device/:id`,
        addDevice: `POST ${API_PREFIX}/device`,
        deleteDevices: `POST ${API_PREFIX}/device/batch-delete`,
        updateDevice: `PUT ${API_PREFIX}/device/:id`,
    },
});

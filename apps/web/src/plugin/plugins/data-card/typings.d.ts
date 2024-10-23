import type { EntityData } from '@/services/http';

export interface ViewConfigProps {
    title: string;
    entity: {
        label: string;
        value: string;
        description: string;
    };
    [key: string]: string;
}

export type ConfigureType = any;

export interface IEntity extends Omit<ConvertKeysToCamelCase<EntityData>, 'entityValueAttribute'> {
    entityValueAttribute?: Record<string, any>;
}

import { isFileName } from '@milesight/shared/src/utils/tools';

const folderNames = (() => {
    /** 提取子文件夹名 */
    const getFolderName = (modules: ModuleType) => {
        return Object.keys(modules).reduce((bucket, path) => {
            const [, folder] = path?.split('/') || [];
            if (!folder || bucket.includes(folder) || isFileName(folder)) return bucket;

            bucket.push(folder);
            return bucket;
        }, [] as string[]);
    };

    const modules = import.meta.glob('../plugins/**');
    return getFolderName(modules);
})();

export default folderNames;

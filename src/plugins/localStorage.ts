import LocalStorageManager from '@/utils/local-storage-manager';

const plugin = (store) => {
    store.subscribe((mutation, state) => {
        const mutationInfo = mutation.type.split('/');

        if (LocalStorageManager.isMutationInWhitelist(mutationInfo[1])) {
            const localData = LocalStorageManager.getResolvedStateData();
            const data = localData ? { ...localData } : {};

            data[mutationInfo[0]] = state[mutationInfo[0]];
            LocalStorageManager.setStoreState(data);
        }
    });
};

export default plugin;

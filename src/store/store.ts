import Vuex, { Module } from 'vuex';
import LocalStorageManager from '@/utils/local-storage-manager';

export default class Store<S> extends Vuex.Store<S> {
    registerModule<T>(path: string|string[], module: Module<T, S>, options: any = {}): void {
        let modulePath = '';

        // Module path comes as an array with only one element
        // so we get that element as a string
        if (path instanceof Array) {
            const [pathItem] = path;
            modulePath = pathItem;
        } else {
            modulePath = path;
        }

        if (!LocalStorageManager.isStateExpired()) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const localState = LocalStorageManager.getResolvedStateData() || {};

            let payload: any = null;
            const moduleData = localState[modulePath];

            // If there is module data in local storage
            // we set it as a payload, which overrides module's
            // initial state to that saved data later on
            if (moduleData) {
                payload = moduleData;
                this.saveDataToStorage(modulePath, moduleData, localState);
            } else {
                const moduleState = module.state ? module.state : {};
                this.saveDataToStorage(modulePath, moduleState, localState);
            }

            // Overriding initial module state with the one saved in local storage
            if (payload) {
                // eslint-disable-next-line no-param-reassign
                module.state = payload;
            }

            super.registerModule(modulePath, module, options);
        } else {
            this.saveDataToStorage(modulePath, module.state, {});
            super.registerModule(modulePath, module, options);
        }
    }

    saveDataToStorage(path: string, state: any, storeState: any) {
        // eslint-disable-next-line no-param-reassign
        storeState[path] = { ...state };
        LocalStorageManager.setStoreState(storeState);
    }
}

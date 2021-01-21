/* eslint-disable prefer-object-spread */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import { createDecorator } from 'vue-class-component';
import { VuexModule } from 'vuex-module-decorators';

export function getId(element: any) {
    if (!element.hasOwnProperty('id')) {
        throw new Error('Element has no id, please define custom getId method or add id to the element');
    }
    return element.id;
}

function generateNameFromPath(path: string) {
    return `set${path.split('.').map((pathItem) => pathItem[0].toUpperCase() + pathItem.substr(1))
        .join('')}`;
}

function generateMutations(state: any, path: string = '') {
    let mutations: any = {};

    Object.keys(state).forEach((key: string) => {
        const propertyPath = path === '' ? key : `${path}.${key}`;
        const name = generateNameFromPath(propertyPath);
        const mutation = (mutationState: any, val: any) => {
            const mutationPath = propertyPath.split('.');
            if (mutationPath.length > 1) {
                const ref = mutationPath.slice(0, -1)
                    .reduce((prev, current) => prev[current], mutationState);
                ref[mutationPath[mutationPath.length - 1]] = val;
            } else {
                mutationState[propertyPath] = val;
            }
        };
        mutations[name] = mutation;
        if (state[key] && typeof state[key] === 'object' && !Array.isArray(state[key])) {
            mutations = { ...mutations, ...generateMutations(state[key], propertyPath) };
        }
    });

    return mutations;
}

const reservedKeys = ['actions', 'getters', 'mutations', 'modules', 'state', 'namespaced', 'commit'];
function stateFactory(module: Function) {
    const state = new module.prototype.constructor({});
    const s = {};
    Object.keys(state).forEach((key: string) => {
        if (reservedKeys.indexOf(key) !== -1) {
            if (typeof state[key] !== 'undefined') {
                throw new Error(
                    `ERR_RESERVED_STATE_KEY_USED: You cannot use the following
                    ['actions', 'getters', 'mutations', 'modules', 'state', 'namespaced', 'commit', 'collection']
                    as fields in your module. These are reserved as they have special purpose in Vuex`,
                );
            }
            return;
        }
        if (state.hasOwnProperty(key)) {
            if (typeof state[key] !== 'function') {
                (s as any)[key] = state[key];
            }
        }
    });
    return s;
}

function getFromPath(state: any, path: string, id: string | number = '') {
    if (id) {
        return path.split('.').reduce((prev, current) => prev[current], state.collection[id]);
    }
    return path.split('.').reduce((prev, current) => prev[current], state);
}

export function AutoMutations(constructor: any | VuexModule) {
    if (!constructor.hasOwnProperty('mutations')) {
        constructor.mutations = Object.assign({}, constructor.mutations);
    }
    const factoryState = stateFactory(constructor);
    constructor.mutations = { ...generateMutations(factoryState), ...constructor.mutations };
    return constructor;
}

export function Get(module: { [key: string]: Function | any }, prop?: string) {
    return createDecorator((options, key) => {
        if (!options.computed) options.computed = {};
        const propName = prop || key;
        options.computed[key] = {
            get: () => getFromPath(module, propName),
        };
    });
}

export function Sync(module: { [key: string]: Function | any }, prop?: string) {
    return createDecorator((options, key) => {
        if (!options.computed) options.computed = {};
        const propName = prop || key;
        options.computed[key] = {
            get: () => getFromPath(module, propName),
            set: module[generateNameFromPath(propName)],
        };
    });
}

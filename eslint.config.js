import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
    { ignores: ['dist/**', 'dev-dist/**', 'node_modules/**', 'server/**', 'public/**'] },
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.recommended,
    {
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/multi-word-component-names': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-self-closing': 'off',
            indent: ['error', 4, { SwitchCase: 1 }],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
        },
    },
);

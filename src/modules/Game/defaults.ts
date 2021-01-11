import { PlayerFormDataType } from './types';

const defaultFormData: () => PlayerFormDataType = () => ({
    name: '',
    color: '',
});

export { defaultFormData };

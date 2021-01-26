import { PlayerType } from '@/store/types';
import { PlayerFormDataType } from './types';

const defaultFormData: () => PlayerFormDataType = () => ({
    name: '',
    color: '',
});

const defaultPlayerData: () => PlayerType = () => ({
    name: '',
    color: '',
    points: 0,
    roundResult: 0,
});

export { defaultFormData, defaultPlayerData };

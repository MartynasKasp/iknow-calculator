import type { FigureColorType } from './types';

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export const POINTS_WINNER = 20;
export const POINTS_READING = 2;
export const POINTS_BET = 1;
export const POINTS_START = 1;

export const FIGURE_COLORS: FigureColorType[] = [
    { value: '0e6cb9', name: 'Blue' },
    { value: 'f6a146', name: 'Orange' },
    { value: 'e84a50', name: 'Red' },
    { value: '45a199', name: 'Green' },
    { value: 'feed34', name: 'Yellow' },
    { value: '6d489d', name: 'Purple' },
];

export const colorName = (value: string) => FIGURE_COLORS
    .find((color) => color.value === value)?.name ?? '';

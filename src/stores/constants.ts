import type { FigureColorType } from './types';

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export const POINTS_WINNER = 20;
export const POINTS_READING = 2;
export const POINTS_BET = 1;
export const POINTS_START = 1;

export const FIGURE_COLORS: FigureColorType[] = [
    { value: '1d74f5', name: 'Blue' },
    { value: 'ff8c1a', name: 'Orange' },
    { value: 'f2334a', name: 'Red' },
    { value: '12b886', name: 'Green' },
    { value: 'ffd31a', name: 'Yellow' },
    { value: 'a140f0', name: 'Purple' },
];

// Colors used before the redesign. Saved games and player history may still hold them.
const LEGACY_COLORS: Record<string, string> = {
    '0e6cb9': '1d74f5',
    'f6a146': 'ff8c1a',
    'e84a50': 'f2334a',
    '45a199': '12b886',
    'feed34': 'ffd31a',
    '6d489d': 'a140f0',
};

// JSON.parse reviver that swaps old figure colors for the current ones.
export const upgradeLegacyColors = (_key: string, value: unknown) => (
    typeof value === 'string' && value in LEGACY_COLORS ? LEGACY_COLORS[value] : value
);

export const colorName = (value: string) => FIGURE_COLORS
    .find((color) => color.value === value)?.name ?? '';

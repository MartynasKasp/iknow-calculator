import type { PiniaPluginContext } from 'pinia';
import { upgradeLegacyColors } from './constants';

// The game in progress is kept in localStorage, so a page reload doesn't lose it.
// It's forgotten after 30 minutes without changes, same as before the Vue 3 update.
const STATE_KEY = 'store_state';
const EXPIRES_KEY = 'store_state_exp';
const EXPIRATION_MINUTES = 30;

// Only game data is saved; dialog flags and the like start fresh on every visit.
const PERSISTED: Record<string, string[]> = {
    game: ['gameStatus'],
    board: ['boardStatus', 'gameBoardBox'],
    player: ['players', 'readerIndex', 'categoryPicker', 'knowFigures', 'betFigures'],
};

type SavedState = Record<string, Record<string, unknown>>;

function readState(): SavedState {
    try {
        const expires = localStorage.getItem(EXPIRES_KEY);
        if (expires && new Date() > new Date(expires)) return {};
        const raw = localStorage.getItem(STATE_KEY);
        return raw ? JSON.parse(raw, upgradeLegacyColors) : {};
    } catch {
        return {};
    }
}

function writeStore(id: string, data: Record<string, unknown>) {
    try {
        const state = readState();
        state[id] = data;
        const expires = new Date(Date.now() + EXPIRATION_MINUTES * 60 * 1000);
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
        localStorage.setItem(EXPIRES_KEY, expires.toString());
    } catch {
        // Storage can be full or blocked (private mode); the game still works without it.
    }
}

export function persistPlugin({ store }: PiniaPluginContext) {
    const keys = PERSISTED[store.$id];
    if (!keys) return;

    const saved = readState()[store.$id];
    if (saved) {
        store.$patch((state) => {
            keys.forEach((key) => {
                if (key in saved) state[key] = saved[key];
            });
        });
    }

    store.$subscribe((_mutation, state) => {
        const data: Record<string, unknown> = {};
        keys.forEach((key) => {
            data[key] = (state as Record<string, unknown>)[key];
        });
        writeStore(store.$id, data);
    }, { detached: true });
}

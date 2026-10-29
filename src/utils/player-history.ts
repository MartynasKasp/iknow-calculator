// Remembers players and recent line-ups across games.
// Kept separate from the game state in stores/persist.ts,
// because that state expires after 30 minutes and this should not.

import { upgradeLegacyColors } from '@/stores/constants';

const SAVED_PLAYERS_KEY = 'saved_players';
const RECENT_GAMES_KEY = 'recent_games';
const MAX_SAVED_PLAYERS = 30;
const MAX_RECENT_GAMES = 3;

export type SavedPlayerType = {
    name: string;
    color: string;
};

export type RecentGameType = {
    players: SavedPlayerType[];
    playedAt: string;
};

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

const lineupKey = (players: SavedPlayerType[]) => players
    .map((p) => `${p.name.trim().toLowerCase()}:${p.color}`)
    .join('|');

function read<T>(key: string): T[] {
    try {
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw, upgradeLegacyColors) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function write(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Storage can be full or blocked (private mode); history is optional.
    }
}

export default class PlayerHistory {
    // Most recently used first.
    public static getSavedPlayers(): SavedPlayerType[] {
        return read<SavedPlayerType>(SAVED_PLAYERS_KEY)
            .filter((p) => p && typeof p.name === 'string' && typeof p.color === 'string');
    }

    public static getRecentGames(): RecentGameType[] {
        return read<RecentGameType>(RECENT_GAMES_KEY)
            .filter((g) => g && Array.isArray(g.players) && g.players.length > 0);
    }

    public static findSavedPlayer(name: string): SavedPlayerType | undefined {
        return this.getSavedPlayers().find((p) => sameName(p.name, name));
    }

    // Called once the line-up is confirmed and the game starts.
    public static rememberGame(players: SavedPlayerType[]) {
        const lineup = players.map(({ name, color }) => ({ name: name.trim(), color }));
        if (!lineup.length) return;

        const saved = this.getSavedPlayers()
            .filter((p) => !lineup.some((l) => sameName(l.name, p.name)));
        write(SAVED_PLAYERS_KEY, [...lineup, ...saved].slice(0, MAX_SAVED_PLAYERS));

        const key = lineupKey(lineup);
        const games = this.getRecentGames()
            .filter((g) => lineupKey(g.players) !== key);
        write(RECENT_GAMES_KEY, [
            { players: lineup, playedAt: new Date().toISOString() },
            ...games,
        ].slice(0, MAX_RECENT_GAMES));
    }

    public static forgetPlayer(name: string) {
        write(SAVED_PLAYERS_KEY, this.getSavedPlayers().filter((p) => !sameName(p.name, name)));
    }

    public static forgetRecentGame(index: number) {
        const games = this.getRecentGames();
        games.splice(index, 1);
        write(RECENT_GAMES_KEY, games);
    }

    // Clears saved players and recent line-ups from this device.
    public static forgetAll() {
        try {
            localStorage.removeItem(SAVED_PLAYERS_KEY);
            localStorage.removeItem(RECENT_GAMES_KEY);
        } catch {
            // Nothing to clear if storage is blocked.
        }
    }
}

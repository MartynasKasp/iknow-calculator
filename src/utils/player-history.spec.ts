import { beforeEach, describe, expect, it } from 'vitest';
import { installMemoryStorage } from '@/test/memory-storage';
import PlayerHistory from './player-history';

describe('player history', () => {
    beforeEach(() => {
        installMemoryStorage();
    });

    it('remembers players, most recent first, without duplicates', () => {
        PlayerHistory.rememberGame([{ name: 'Ona', color: 'a' }, { name: 'Jonas', color: 'b' }]);
        PlayerHistory.rememberGame([{ name: 'ona', color: 'c' }]);
        expect(PlayerHistory.getSavedPlayers()).toEqual([
            { name: 'ona', color: 'c' },
            { name: 'Jonas', color: 'b' },
        ]);
    });

    it('keeps the last 3 line-ups and moves a repeat to the top', () => {
        const lineup = (n: string) => [{ name: n, color: 'a' }];
        ['A', 'B', 'C', 'D'].forEach((n) => PlayerHistory.rememberGame(lineup(n)));
        PlayerHistory.rememberGame(lineup('C'));
        expect(PlayerHistory.getRecentGames().map((g) => g.players[0].name)).toEqual(['C', 'D', 'B']);
    });
});

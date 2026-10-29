import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePlayerStore } from './player';
import { BoardStatus, useBoardStore } from './board';

const setup = (names: string[]) => {
    const players = usePlayerStore();
    const colors = ['0e6cb9', 'f6a146', 'e84a50', '45a199'];
    names.forEach((name, i) => players.addPlayer(name, colors[i]));
    players.completeSetup();
    return players;
};

describe('player store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('validates new players', () => {
        const players = usePlayerStore();
        expect(players.addPlayer('', '')).toEqual({
            name: expect.any(String), color: expect.any(String),
        });
        expect(players.addPlayer('Ona', '0e6cb9')).toEqual({});
        expect(players.addPlayer('ona ', 'f6a146').name).toBeDefined();
        expect(players.addPlayer('Jonas', '0e6cb9').color).toBeDefined();
        expect(players.players).toHaveLength(1);
    });

    it('places figures starting after the card reader', () => {
        const players = setup(['A', 'B', 'C']);
        expect(players.knowFigures.map((p) => p.name)).toEqual(['B', 'C']);
        players.startNextRound();
        expect(players.cardReader.name).toBe('B');
        expect(players.knowFigures.map((p) => p.name)).toEqual(['C', 'A']);
    });

    it('scores a round like the board game', () => {
        const players = setup(['A', 'B', 'C']);
        const board = useBoardStore();

        // B answers on level 6 (3 points), C on level 2 (1 point).
        board.toggleKnow(6);
        board.toggleKnow(2);
        expect(board.toggleBet(6, true)).toBe('own-figure'); // B can't bet on themselves
        board.toggleBet(2, false); // B bets "-" on C
        board.toggleBet(6, true); // C bets "+" on B

        board.boardStatus = BoardStatus.answersCheck;
        board.toggleKnow(6); // B was right, C was wrong

        players.calculatePoints(board.gameBoardBox);

        const byName = (name: string) => players.players.find((p) => p.name === name)!;
        expect(byName('A').roundResult).toBe(2); // reader
        expect(byName('B').roundResult).toBe(3 + 1); // right answer + right "-" bet
        expect(byName('C').roundResult).toBe(1); // wrong answer, right "+" bet
        expect(byName('B').points).toBe(1 + 4);
        expect(players.picksCategory.name).toBe('B');
    });

    it('detects the winner and restarts with the winner reading first', () => {
        const players = setup(['A', 'B']);
        players.setPoints(1, 20);
        expect(players.winner?.name).toBe('B');
        players.restartGame();
        expect(players.players.every((p) => p.points === 1)).toBe(true);
        expect(players.cardReader.name).toBe('B');
    });
});

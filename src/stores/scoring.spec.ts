import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { usePlayerStore } from './player';
import { BoardStatus, useBoardStore } from './board';

const setup = () => {
    const players = usePlayerStore();
    const board = useBoardStore();
    players.addPlayer('Reader', '1d74f5');
    players.addPlayer('A', 'ff8c1a');
    players.addPlayer('B', 'f2334a');
    players.completeSetup();
    return { players, board };
};

const result = (name: string) => usePlayerStore().players.find((p) => p.name === name)!.roundResult;

// Reader reads. A answers on 3 dots (row 6), B on 1 dot (row 1).
// A bets "-" on B (B won't know), B bets "+" on A (A will know).
const playRound = (aRight: boolean, bRight: boolean) => {
    const { players, board } = setup();
    board.toggleKnow(6);
    board.toggleKnow(1);
    expect(board.toggleBet(1, false)).toBe('placed');
    expect(board.toggleBet(6, true)).toBe('placed');

    board.boardStatus = BoardStatus.answersCheck;
    if (aRight) board.toggleKnow(6);
    if (bRight) board.toggleKnow(1);
    players.calculatePoints(board.gameBoardBox);
    return { Reader: result('Reader'), A: result('A'), B: result('B') };
};

describe('round scoring with iBETs', () => {
    beforeEach(() => setActivePinia(createPinia()));

    it('A right, B wrong: A gets 3+1, B gets 0+1', () => {
        expect(playRound(true, false)).toEqual({ Reader: 2, A: 4, B: 1 });
    });

    it('A wrong, B right: A gets 0-1, B gets 1-1', () => {
        expect(playRound(false, true)).toEqual({ Reader: 2, A: -1, B: 0 });
    });

    it('both right: A gets 3-1, B gets 1+1', () => {
        expect(playRound(true, true)).toEqual({ Reader: 2, A: 2, B: 2 });
    });

    it('both wrong: A gets 0+1, B gets 0-1', () => {
        expect(playRound(false, false)).toEqual({ Reader: 2, A: 1, B: -1 });
    });

    it('does not lose iBETs when an iKNOW figure is taken back after bets were placed', () => {
        const { players, board } = setup();
        board.toggleKnow(6); // A
        board.toggleKnow(1); // B
        board.toggleBet(6, true); // A can't bet on own row...
        board.toggleBet(1, false); // ...so A bets "-" on B
        board.toggleBet(6, true); // B bets "+" on A

        // Taking A's iKNOW figure back must not leave B's bet behind on an empty row.
        board.toggleKnow(6);
        const row6 = board.box(6);
        expect(row6.playerKnowFigure === null && row6.playerBetFigure.positive !== null).toBe(false);

        board.boardStatus = BoardStatus.answersCheck;
        board.toggleKnow(6);
        players.calculatePoints(board.gameBoardBox);
        expect(result('B')).toBe(1);
    });
});

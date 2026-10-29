import { defineStore } from 'pinia';
import type { BoardBoxType } from './types';
import { usePlayerStore } from './player';

export enum BoardStatus {
    figuresSetup,
    answersCheck,
}

// Rows of the iKNOW board, top to bottom.
const BOARD_ROWS = [
    { level: 6, points: 3 },
    { level: 5, points: 3 },
    { level: 4, points: 2 },
    { level: 3, points: 2 },
    { level: 2, points: 1 },
    { level: 1, points: 1 },
];

export const defaultGameBoard = (): BoardBoxType[] => BOARD_ROWS.map(({ level, points }) => ({
    level,
    points,
    playerKnowFigure: null,
    playerBetFigure: { positive: null, negative: null },
    knowAnswer: false,
    betAnswer: null,
}));

export type BetResult = 'placed' | 'removed' | 'own-figure' | 'no-know-figure' | 'none-left';

export const useBoardStore = defineStore('board', {
    state: () => ({
        boardStatus: BoardStatus.figuresSetup,
        gameBoardBox: defaultGameBoard(),
        showResults: false,
        showGameEnd: false,
        showSettings: false,
    }),

    actions: {
        box(level: number) {
            return this.gameBoardBox.find((item) => item.level === level) as BoardBoxType;
        },

        // Tap on an iKNOW square: place the next figure, take it back,
        // or (when checking answers) mark it right or wrong.
        toggleKnow(level: number) {
            const players = usePlayerStore();
            const box = this.box(level);

            if (this.boardStatus === BoardStatus.figuresSetup) {
                if (box.playerKnowFigure === null) {
                    const player = players.knowFigures.shift();
                    if (player) box.playerKnowFigure = player;
                } else {
                    players.knowFigures.unshift(box.playerKnowFigure);
                    box.playerKnowFigure = null;
                }
            } else if (box.playerKnowFigure) {
                box.knowAnswer = !box.knowAnswer;
            }
        },

        // Tap on an iBET circle (positive = "+" side, negative = "-" side).
        toggleBet(level: number, positive: boolean): BetResult {
            if (this.boardStatus !== BoardStatus.figuresSetup) return 'none-left';

            const players = usePlayerStore();
            const box = this.box(level);
            const side = positive ? 'positive' : 'negative';
            const current = box.playerBetFigure[side];

            if (current) {
                players.betFigures.unshift(current);
                box.playerBetFigure[side] = null;
                box.betAnswer = null;
                return 'removed';
            }

            const next = players.betFigures[0];
            if (!next) return 'none-left';
            if (!box.playerKnowFigure) return 'no-know-figure';
            if (box.playerKnowFigure.color === next.color) return 'own-figure';

            box.playerBetFigure[side] = players.betFigures.shift() ?? null;
            box.betAnswer = positive;
            return 'placed';
        },

        startNextRound() {
            this.gameBoardBox = defaultGameBoard();
            this.showResults = false;
            this.boardStatus = BoardStatus.figuresSetup;
        },

        resetBoard() {
            this.gameBoardBox = defaultGameBoard();
            this.boardStatus = BoardStatus.figuresSetup;
        },

        backToFiguresSetup() {
            this.gameBoardBox.forEach((item) => {
                item.knowAnswer = false;
            });
            this.boardStatus = BoardStatus.figuresSetup;
        },
    },
});

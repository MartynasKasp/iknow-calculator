import { defineStore } from 'pinia';
import type { BoardBoxType, PlayerType } from './types';
import {
    MAX_PLAYERS, POINTS_BET, POINTS_READING, POINTS_START, POINTS_WINNER,
} from './constants';

export type AddPlayerErrors = {
    name?: string;
    color?: string;
};

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export const usePlayerStore = defineStore('player', {
    state: () => ({
        players: [] as PlayerType[],
        // Player who reads the card this round.
        readerIndex: 0,
        // Player who picks the category; -1 until someone answers correctly.
        categoryPicker: -1,
        // Figures still waiting to be placed on the board, in placing order.
        knowFigures: [] as PlayerType[],
        betFigures: [] as PlayerType[],
    }),

    getters: {
        isFull: (state) => state.players.length >= MAX_PLAYERS,
        cardReader: (state) => state.players[state.readerIndex],
        picksCategory: (state) => state.players[state.categoryPicker],
        winner: (state) => state.players.find((player) => player.points >= POINTS_WINNER),
        standings: (state) => [...state.players].sort((a, b) => b.points - a.points),
    },

    actions: {
        // Returns errors to show next to the form fields; empty when the player was added.
        addPlayer(name: string, color: string): AddPlayerErrors {
            const errors: AddPlayerErrors = {};
            const trimmed = name.trim();

            if (!trimmed) {
                errors.name = 'Who\'s playing? Type a name.';
            } else if (this.players.some((p) => sameName(p.name, trimmed))) {
                errors.name = 'That name\'s already at the table.';
            }
            if (!color) {
                errors.color = 'Pick a figure color.';
            } else if (this.players.some((p) => p.color === color)) {
                errors.color = 'Someone already has that color.';
            }
            if (this.isFull) {
                errors.name = `The table is full: ${MAX_PLAYERS} players max.`;
            }

            if (Object.keys(errors).length === 0) {
                this.players.push({
                    name: trimmed, color, points: POINTS_START, roundResult: 0,
                });
            }
            return errors;
        },

        removePlayer(index: number) {
            this.players.splice(index, 1);
        },

        // Fills the line-up at once, e.g. from a recent game.
        loadPlayers(list: { name: string; color: string }[]) {
            this.players = list.slice(0, MAX_PLAYERS).map(({ name, color }) => ({
                name, color, points: POINTS_START, roundResult: 0,
            }));
        },

        completeSetup() {
            this.readerIndex = 0;
            this.categoryPicker = 0;
            this.setFigures();
        },

        // Figures are placed starting with the player after the card reader.
        setFigures() {
            const before = this.players.slice(0, this.readerIndex);
            const after = this.players.slice(this.readerIndex + 1);

            this.knowFigures = [...after, ...before];
            this.betFigures = [...after, ...before];
        },

        nextReader() {
            this.readerIndex = (this.readerIndex + 1) % this.players.length;
        },

        startNextRound() {
            this.players.forEach((player) => {
                player.roundResult = 0;
            });
            this.nextReader();
            if (this.categoryPicker === -1) {
                this.categoryPicker = this.readerIndex;
            }
            this.setFigures();
        },

        calculateRoundResult(board: BoardBoxType[]) {
            const byColor = (color?: string) => this.players.find((p) => p.color === color);

            this.players[this.readerIndex].roundResult = POINTS_READING;

            // Correct iKNOW answers. The first one from the top picks the next category.
            board.forEach((row) => {
                if (!row.playerKnowFigure || !row.knowAnswer) return;
                const player = byColor(row.playerKnowFigure.color);
                if (!player) return;

                if (this.categoryPicker === -1) {
                    this.categoryPicker = this.players.indexOf(player);
                }
                player.roundResult += row.points;
            });

            // iBET figures: "+" wins when the answer was right, "-" when it was wrong.
            board.forEach((row) => {
                if (!row.playerKnowFigure) return;

                const positive = byColor(row.playerBetFigure.positive?.color);
                if (positive) {
                    positive.roundResult += row.knowAnswer ? POINTS_BET : -POINTS_BET;
                }

                const negative = byColor(row.playerBetFigure.negative?.color);
                if (negative) {
                    negative.roundResult += row.knowAnswer ? -POINTS_BET : POINTS_BET;
                }
            });
        },

        calculatePoints(board: BoardBoxType[]) {
            this.categoryPicker = -1;
            this.calculateRoundResult(board);
            this.players.forEach((player) => {
                player.points += player.roundResult;
            });
        },

        // Same players, fresh scores. The winner reads first and picks the category.
        restartGame() {
            const winnerIndex = this.winner ? this.players.indexOf(this.winner) : 0;
            this.players.forEach((player) => {
                player.points = POINTS_START;
                player.roundResult = 0;
            });
            this.readerIndex = Math.max(winnerIndex, 0);
            this.categoryPicker = this.readerIndex;
            this.setFigures();
        },

        setPoints(index: number, points: number) {
            const player = this.players[index];
            if (player && Number.isFinite(points)) {
                player.points = Math.round(points);
            }
        },

        clearGame() {
            this.$reset();
        },
    },
});

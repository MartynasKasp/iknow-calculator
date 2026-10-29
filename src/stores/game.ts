import { defineStore } from 'pinia';

export enum GameStatus {
    playersSetup,
    gameStarted,
    gameEnd,
}

export const useGameStore = defineStore('game', {
    state: () => ({
        gameStatus: GameStatus.playersSetup,
        // Set when the board is opened straight from a page load, to offer resuming.
        resumingGame: false,
        showBugReport: false,
    }),
});

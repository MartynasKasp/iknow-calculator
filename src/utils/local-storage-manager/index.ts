const STORE_STATE_KEY = 'store_state';

export default class LocalStorageManager {
    private static mutationsWhitelist(): string[] {
        return [
            'setBetFigures',
            'setGameStatus',
            'setBoardStatus',
            'setPlayersData',
        ];
    }

    public static isMutationInWhitelist(type: string): boolean {
        if (this.mutationsWhitelist().includes(type)) {
            return true;
        }
        return false;
    }

    public static getResolvedStateData(): any {
        const state: any = localStorage.getItem(STORE_STATE_KEY);

        if (state) {
            return JSON.parse(state);
        }

        return null;
    }

    public static setStoreState(state: object) {
        localStorage.setItem(STORE_STATE_KEY, JSON.stringify(state));
    }
}

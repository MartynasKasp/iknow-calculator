const STORE_STATE_KEY = 'store_state';
const STORE_STATE_EXP_KEY = 'store_state_exp';
const STORE_EXPIRATION_TIME = 30;

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
        this.updateStoreExpiration();
        localStorage.setItem(STORE_STATE_KEY, JSON.stringify(state));
    }

    public static isStateExpired() {
        const date = localStorage.getItem(STORE_STATE_EXP_KEY);

        if (date) {
            const expirationDate = new Date(date);
            const currentDate = new Date();

            if (currentDate > expirationDate) {
                return true;
            }
        }

        return false;
    }

    private static updateStoreExpiration() {
        const currentDate = new Date();
        const expirationDate = new Date(currentDate);

        expirationDate.setMinutes(currentDate.getMinutes() + STORE_EXPIRATION_TIME);
        localStorage.setItem(STORE_STATE_EXP_KEY, expirationDate.toString());
    }
}

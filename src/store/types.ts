export type PlayerType = {
    name: string;
    color: string;
    points: number;
    roundResult: number;
}

export type SelectType = {
    name: string;
    value: string;
}

export type BoardBoxType = {
    level: number;
    points: number;
    playerKnowFigure: PlayerType|null;
    playerBetFigure: {
        positive: PlayerType|null;
        negative: PlayerType|null;
    };
    knowAnswer: boolean;
    betAnswer: boolean|null;
}

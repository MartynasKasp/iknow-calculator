export type PlayerType = {
    name: string;
    color: string;
    points: number;
}

export type SelectType = {
    name: string;
    value: string;
}

export type BoardBoxType = {
    level: number;
    points: number;
    playerKnowFigure: PlayerType|null;
    playerBetFigure: PlayerType|null;
    knowAnswer: boolean;
    betAnswer: boolean|null;
}

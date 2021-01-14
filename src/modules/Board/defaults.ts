import { BoardBoxType } from '@/store/types';

const defaultGameBoardBox: () => BoardBoxType[] = () => [
    {
        level: 6,
        points: 3,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
    {
        level: 5,
        points: 3,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
    {
        level: 4,
        points: 2,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
    {
        level: 3,
        points: 2,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
    {
        level: 2,
        points: 1,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
    {
        level: 1,
        points: 1,
        playerKnowFigure: null,
        playerBetFigure: {
            positive: null,
            negative: null,
        },
        knowAnswer: false,
        betAnswer: null,
    },
];

export { defaultGameBoardBox };

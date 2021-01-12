<template>
    <div class="md-layout-item md-layout md-size-100 Board__Container">
        <div class="md-layout-item Board__BetSignContainer">
            <div class="Board__BetSign">
                +
            </div>
        </div>
        <div class="md-layout-item md-small-size-70 md-size-33">
            <div
                v-for="box in gameBoardBox"
                :key="box.level"
                :class="`
                    md-layout-item md-layout md-size-100 Board__Row Board__RowLevel--${box.level}
                `"
            >
                <div class="md-layout-item">
                    <div
                        class="Board__Figure Board__Figure--bet"
                        :style="figureStyle(box, 'bet', true)"
                        @click="handleBetBox(box.level, true)"
                    >
                    </div>
                </div>
                <div class="md-layout-item md-size-30">
                    <div
                        class="Board__Figure Board__Figure--know"
                        :style="figureStyle(box, 'know')"
                        @click="handleKnowBox(box.level)"
                    >
                        <div :class="`Board__FigurePoints--${box.points}`">
                            <div
                                v-for="(point, index) in box.points"
                                :key="index"
                                class="Board__FigurePoint"
                            >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md-layout-item">
                    <div
                        class="Board__Figure Board__Figure--bet"
                        :style="figureStyle(box, 'bet', false)"
                        @click="handleBetBox(box.level, false)"
                    >
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout-item Board__BetSignContainer">
            <div class="Board__BetSign">
                -
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';
import { BoardBoxType, PlayerType } from '@/store/types';

@Component
export default class GameBoard extends Vue {
    @Sync(playerModule) private knowFigures!: PlayerType[];

    @Sync(playerModule) private betFigures!: PlayerType[];

    private gameBoardBox: BoardBoxType[] = [
        {
            level: 6,
            points: 3,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
        {
            level: 5,
            points: 3,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
        {
            level: 4,
            points: 2,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
        {
            level: 3,
            points: 2,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
        {
            level: 2,
            points: 1,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
        {
            level: 1,
            points: 1,
            playerKnowFigure: null,
            playerBetFigure: null,
            knowAnswer: false,
            betAnswer: false,
        },
    ];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    figureStyle(box: BoardBoxType, type: string, answer: boolean) {
        switch (type) {
        case 'bet':
            if (box.playerBetFigure && box.betAnswer) {
                if (box.betAnswer === answer) {
                    return { 'background-color': `#${box.playerBetFigure.color}` };
                }
            }
            break;
        case 'know':
            if (box.playerKnowFigure) {
                return { 'background-color': `#${box.playerKnowFigure.color}` };
            }
            break;
        default:
            break;
        }
        return {};
    }

    handleKnowBox(level: number) {
        const box: BoardBoxType = this.gameBoardBox
            .find((item) => item.level === level) as BoardBoxType;

        if (box.playerKnowFigure === null) {
            if (this.knowFigures.length > 0) {
                const player = this.knowFigures.shift() as PlayerType;

                box.playerKnowFigure = player;
            }
        } else {
            this.knowFigures.unshift(box.playerKnowFigure);
            box.playerKnowFigure = null;
        }
    }

    handleBetBox(level: number, answer: boolean) {
        const box: BoardBoxType = this.gameBoardBox
            .find((item) => item.level === level) as BoardBoxType;

        if (box.playerBetFigure === null) {
            if (this.betFigures.length > 0) {
                const player = this.betFigures.shift() as PlayerType;

                box.playerBetFigure = player;
                box.betAnswer = answer;
                console.log('box', box, 'figures', this.gameBoardBox);
            }
        } else {
            this.betFigures.unshift(box.playerBetFigure);
            box.playerBetFigure = null;
            box.betAnswer = null;
        }
    }
}
</script>

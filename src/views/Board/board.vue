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
                        @click="handleKnowBox(box.level)"
                    >
                        <div
                            class="Board__PlayerKnowFigure"
                            :style="figureStyle(box, 'know')"
                        ></div>
                        <md-icon
                            v-if="box.knowAnswer"
                            class="md-size-3x"
                        >
                            check
                        </md-icon>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';
import boardModule, { BoardStatusType } from '@/modules/Board';
import { BoardBoxType, PlayerType } from '@/store/types';

@Component
export default class GameBoard extends Vue {
    @Prop({ required: true }) private gameBoardBox!: BoardBoxType[];

    @Sync(playerModule) private knowFigures!: PlayerType[];

    @Sync(playerModule) private betFigures!: PlayerType[];

    @Get(boardModule) private boardStatus!: BoardStatusType;

    figureStyle(box: BoardBoxType, type: string, answer: boolean) {
        switch (type) {
        case 'bet':
            if (answer === true) {
                if (box.playerBetFigure.positive) {
                    return { 'background-color': `#${box.playerBetFigure.positive.color}` };
                }
            } else if (answer === false) {
                if (box.playerBetFigure.negative) {
                    return { 'background-color': `#${box.playerBetFigure.negative.color}` };
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

        if (this.boardStatus === BoardStatusType.figuresSetup) {
            if (box.playerKnowFigure === null) {
                if (this.knowFigures.length > 0) {
                    const player = this.knowFigures.shift() as PlayerType;

                    box.playerKnowFigure = player;
                }
            } else {
                this.knowFigures.unshift(box.playerKnowFigure);
                box.playerKnowFigure = null;
            }
        } else if (this.boardStatus === BoardStatusType.answersCheck) {
            if (box.playerKnowFigure) {
                if (box.knowAnswer) {
                    box.knowAnswer = false;
                } else {
                    box.knowAnswer = true;
                }
            }
        }
    }

    handleBetBox(level: number, answer: boolean) {
        const box: BoardBoxType = this.gameBoardBox
            .find((item) => item.level === level) as BoardBoxType;

        if (this.boardStatus === BoardStatusType.figuresSetup) {
            if (
                (answer && box.playerBetFigure.positive === null)
                || (!answer && box.playerBetFigure.negative === null)
            ) {
                if (this.betFigures.length > 0) {
                    if (
                        box.playerKnowFigure
                        && box.playerKnowFigure.color === this.betFigures[0].color
                    ) {
                        boardModule.toggleBetSnackbar();
                    } else if (box.playerKnowFigure !== null) {
                        const player = this.betFigures.shift() as PlayerType;

                        if (answer) {
                            box.playerBetFigure.positive = player;
                        } else {
                            box.playerBetFigure.negative = player;
                        }
                        box.betAnswer = answer;
                    }
                }
            } else {
                if (answer) {
                    this.betFigures.unshift(box.playerBetFigure.positive as PlayerType);
                    box.playerBetFigure.positive = null;
                } else {
                    this.betFigures.unshift(box.playerBetFigure.negative as PlayerType);
                    box.playerBetFigure.negative = null;
                }
                box.betAnswer = null;
            }
        }
    }
}
</script>

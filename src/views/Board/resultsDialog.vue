<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Round results</md-dialog-title>

        <md-dialog-content>
            <div
                class="Board__ResultsDialogContent md-subheading"
                v-for="player in roundResults"
                :key="player.color"
            >
                <div class="Board__ResultColor" :style="elementStyle(player.color)"></div>
                <p>
                    <strong>{{ player.name }}</strong> gets
                    <strong>{{ player.roundResult }}</strong> point(s)
                    (<strong>{{ player.points }}</strong> total).
                </p>
            </div>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="onConfirm">Next round</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync, Get } from '@/utils/vuex-module-mutators';
import { PlayerType } from '@/store/types';
import boardModule from '@/modules/Board';
import playerModule from '@/modules/Player';

@Component
export default class ResultsDialog extends Vue {
    @Get(playerModule) private players!: PlayerType[];

    @Sync(boardModule, 'showCalculationResultDialog') private active!: boolean;

    get roundResults() {
        const result = [...this.players];
        return result.sort((a, b) => (a.roundResult > b.roundResult ? -1 : 1));
    }

    elementStyle(color: string) {
        return { 'background-color': `#${color}` };
    }

    async onConfirm() {
        await playerModule.startNextRound();
        boardModule.startNextRound();
    }
}
</script>

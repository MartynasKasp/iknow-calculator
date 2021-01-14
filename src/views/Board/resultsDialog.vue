<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Round results</md-dialog-title>

        <md-dialog-content>
            <div
                v-for="result in roundResults"
                :key="result.color"
            >
                <strong>{{ result.name }}</strong> gets {{ result.points }} point(s).
            </div>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="onConfirm">Next round</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import boardModule from '@/modules/Board';
import playerModule from '@/modules/Player';
import { Sync, Get } from '@/utils/vuex-module-mutators';
import { PlayerType } from '@/store/types';

@Component
export default class ResultsDialog extends Vue {
    @Get(boardModule) private roundResults!: PlayerType[];

    @Sync(boardModule, 'showCalculationResultDialog') private active!: boolean;

    onConfirm() {
        playerModule.startNextRound(this.roundResults);
        boardModule.startNextRound();
    }
}
</script>

<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>End the game?</md-dialog-title>

        <md-dialog-content>
            Are you sure you want to end current game?
            All progress will be reset.
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="active = false">Cancel</md-button>
            <md-button @click="onConfirm">Confirm</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync } from '@/utils/vuex-module-mutators';
import boardModule from '@/modules/Board';
import playerModule from '@/modules/Player';
import gameModule, { GameStatusType } from '@/modules/Game';

@Component
export default class GameEndDialog extends Vue {
    @Sync(boardModule, 'showGameEndDialog') private active!: boolean;

    onConfirm() {
        boardModule.setGameEndDialog(false);
        playerModule.clearGame();
        gameModule.setGameStatus(GameStatusType.playersSetup);
        boardModule.restartGame();
        this.$router.push({ name: 'homepage' });
    }
}
</script>

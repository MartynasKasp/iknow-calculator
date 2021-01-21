<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Start the game?</md-dialog-title>

        <md-dialog-content>
            You are about to start the game with <strong>{{ count }} players</strong>.
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="active = false">Close</md-button>
            <md-button @click="onConfirm">Start</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import gameModule, { GameStatusType } from '@/modules/Game';
import playerModule from '@/modules/Player';
import boardModule, { BoardStatusType } from '@/modules/Board';
import { Sync } from '@/utils/vuex-module-mutators';

@Component
export default class PlayersSetupDialog extends Vue {
    @Prop({ required: true }) private count!: number;

    @Sync(playerModule, 'showSetupCompleteDialog') private active!: boolean;

    onConfirm() {
        playerModule.completePlayerSetup();
        gameModule.setGameStatus(GameStatusType.gameStarted);
        boardModule.setBoardStatus(BoardStatusType.figuresSetup);
        this.$router.push({ name: 'gameBoard' });
    }
}
</script>

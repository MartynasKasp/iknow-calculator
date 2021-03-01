<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Resume the game?</md-dialog-title>

        <md-dialog-content>
            You have a game in progress.<br/>
            Do you want to resume the current game or start a new one?
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="onConfirm">New</md-button>
            <md-button @click="active = false">Resume</md-button>
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
export default class ResumeDialog extends Vue {
    @Sync(gameModule, 'resumingGame') private active!: boolean;

    onConfirm() {
        gameModule.setResumingGame(false);
        playerModule.clearGame();
        boardModule.restartGame();
        gameModule.setGameStatus(GameStatusType.playersSetup);
        this.$router.push({ name: 'playersSetup' });
    }
}
</script>

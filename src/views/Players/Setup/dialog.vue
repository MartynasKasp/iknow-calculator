<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title>Are you sure?</md-dialog-title>

        <md-dialog-content>
            You are about to start the game with <strong>{{ count }} players</strong>.
        </md-dialog-content>

        <md-dialog-actions>
            <md-button @click="active = false">Close</md-button>
            <md-button class="md-primary" @click="onConfirm">Start</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import gameModule from '@/modules/Game';
import { Sync } from '@/utils/vuex-module-mutators';

@Component
export default class PlayersSetupDialog extends Vue {
    @Prop({ required: true }) private count!: number;

    @Sync(gameModule, 'showSetupCompleteDialog') private active!: boolean;

    get contentText(): string {
        return `You are about to start the game with <strong>${this.count} players</strong>.`;
    }

    onConfirm() {
        gameModule.completePlayerSetup();
    }
}
</script>

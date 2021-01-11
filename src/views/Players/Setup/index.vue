<template>
    <div class="md-layout">
        <PlayersSetupForm :players="players" />
        <PlayersSetupList :players="players" />

        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showMaxSnackbar">
            <span>Maximum amount of players is 6 people.</span>
        </md-snackbar>

        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showMinSnackbar">
            <span>Minimum amount of players is 2 people.</span>
        </md-snackbar>

        <md-button
            @click="handleGameStart"
            class="md-fab">
            <md-icon>navigate_next</md-icon>
        </md-button>

        <PlayersSetupDialog :count="players.length" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync, Get } from '@/utils/vuex-module-mutators';
import gameModule from '@/modules/Game';
import { PlayerType } from '@/store/types';
import PlayersSetupForm from './form.vue';
import PlayersSetupList from './list.vue';
import PlayersSetupDialog from './dialog.vue';

@Component({
    components: {
        PlayersSetupForm,
        PlayersSetupList,
        PlayersSetupDialog,
    },
})
export default class PlayersSetup extends Vue {
    @Get(gameModule) private players!: PlayerType[];

    @Sync(gameModule) private showMaxSnackbar!: boolean;

    @Sync(gameModule) private showMinSnackbar!: boolean;

    handleGameStart() {
        if (this.players.length < 2) {
            gameModule.toggleMinSnackbar();
        } else {
            gameModule.toggleSetupCompleteDialog();
        }
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>

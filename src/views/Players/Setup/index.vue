<template>
    <div class="PlayersSetup__Container">
        <div class="md-layout-item">
            <PlayersSetupForm :players="players" />
            <PlayersSetupList :players="players" />

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showMaxSnackbar">
                <span>Maximum amount of players is 6 people.</span>
            </md-snackbar>

            <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showMinSnackbar">
                <span>Minimum amount of players is 2 people.</span>
            </md-snackbar>

            <PlayersSetupDialog :count="players.length" />
        </div>

        <md-speed-dial
            class="md-bottom-left"
            md-direction="top"
        >
            <md-speed-dial-target>
                <md-icon>menu</md-icon>
            </md-speed-dial-target>

            <md-speed-dial-content>
                <md-button @click="handleGameStart" class="md-icon-button">
                    <md-icon>navigate_next</md-icon>
                </md-button>
            </md-speed-dial-content>

            <md-speed-dial-content>
                <md-button @click="handleBugReport" class="md-icon-button">
                    <md-icon>bug_report</md-icon>
                </md-button>
            </md-speed-dial-content>

            <md-speed-dial-content>
                <md-button @click="handleGoHome" class="md-icon-button">
                    <md-icon>home</md-icon>
                </md-button>
            </md-speed-dial-content>
        </md-speed-dial>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync, Get } from '@/utils/vuex-module-mutators';
import playerModule from '@/modules/Player';
import gameModule, { GameStatusType } from '@/modules/Game';
import { PlayerType } from '@/store/types';
import PlayersSetupForm from './form.vue';
import PlayersSetupList from './list.vue';
import PlayersSetupDialog from './dialog.vue';

@Component({
    metaInfo: {
        title: 'Players setup',
    },
    components: {
        PlayersSetupForm,
        PlayersSetupList,
        PlayersSetupDialog,
    },
})
export default class PlayersSetup extends Vue {
    @Get(playerModule) private players!: PlayerType[];

    @Sync(playerModule) private showMaxSnackbar!: boolean;

    @Sync(playerModule) private showMinSnackbar!: boolean;

    @Get(gameModule) private gameStatus!: GameStatusType;

    beforeMount() {
        if (this.gameStatus !== GameStatusType.playersSetup) {
            this.$router.push({ name: 'game' });
        }
    }

    handleGameStart() {
        if (this.players.length < 2) {
            playerModule.toggleMinSnackbar();
        } else {
            playerModule.toggleSetupCompleteDialog();
        }
    }

    handleBugReport() {
        gameModule.setBugReportDialog(true);
    }

    handleGoHome() {
        this.$router.push({ name: 'homepage' });
    }
}
</script>

<style lang="scss">
    @import './styles.scss';
</style>

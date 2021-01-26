<template>
    <div>
        <md-dialog :md-active.sync="active">
            <md-dialog-title>Settings</md-dialog-title>

            <md-dialog-content>
                <div>
                    <md-list>
                        <md-subheader>Players</md-subheader>

                        <md-list-item
                            v-for="(player, index) in players"
                            :key="player.color"
                        >
                            <div
                                class="SettingsDialog__PlayerColor"
                                :style="elementStyle(player.color)"
                            >
                            </div>

                            <div class="md-list-item-text">
                                <span>
                                    {{ player.name }}
                                </span>
                                <span>
                                    {{ player.points }} points
                                </span>
                            </div>

                            <md-button
                                @click="handlePlayerEdit(index)"
                                class="md-icon-button md-list-action"
                            >
                                <md-icon>edit</md-icon>
                            </md-button>
                        </md-list-item>
                    </md-list>
                </div>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button @click="active = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>

        <PlayerEditDialog />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import boardModule from '@/modules/Board';
import playerModule from '@/modules/Player';
import { PlayerType } from '@/store/types';
import PlayerEditDialog from './playerEditDialog.vue';

@Component({
    components: {
        PlayerEditDialog,
    },
})
export default class BoardSettingsDialog extends Vue {
    @Sync(boardModule, 'showSettingsDialog') private active!: boolean;

    @Get(playerModule) private players!: PlayerType[];

    elementStyle(color: string) {
        return {
            'background-color': `#${color}`,
        };
    }

    handlePlayerEdit(index: number) {
        playerModule.editPlayer(index);
    }
}
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>

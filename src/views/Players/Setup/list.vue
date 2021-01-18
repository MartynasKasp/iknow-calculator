<template>
    <div class="md-layout-item md-layout md-gutter md-size-100 PlayersSetup__ListContainer">
        <h5 class="md-layout-item md-size-100">Players list</h5>

        <p
            class="md-layout-item"
            v-if="!players.length"
        >
            There are no players yet.
        </p>

        <div
            v-else
            v-for="(player, index) in players"
            :key="`${player.name}-${index}`"
            class="
                md-layout-item
                md-layout
                md-size-100
                md-alignment-center-center
                PlayersSetup__ListItem
            "
        >
            <div
                class="PlayersSetup__PlayerColor"
                :style="setBoxColor(player.color)"
            ></div>
            <div
                class="md-layout-item md-small-size-60 md-size-20 PlayersSetup__PlayerName"
            >
                <strong>{{ player.name }}</strong>
                <span
                    v-if="index === 0"
                    class="md-caption"
                >
                    (starts the first round)
                </span>
            </div>
            <div
                class="md-layout-item md-size-5 PlayersSetup__PlayerAction"
            >
                <md-button
                    @click="handleRemove(index)"
                    class="md-icon-button md-accent"
                >
                    <md-icon>delete</md-icon>
                </md-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import playerModule from '@/modules/Player';
import { PlayerType } from '@/store/types';

@Component
export default class PlayerSetupList extends Vue {
    @Prop({ required: true }) private players!: PlayerType[];

    setBoxColor(color: string) {
        return {
            'background-color': `#${color}`,
        };
    }

    handleRemove(index: number) {
        playerModule.removePlayerFromGame(index);
    }
}
</script>

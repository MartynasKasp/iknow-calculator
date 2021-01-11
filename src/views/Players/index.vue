<template>
    <div class="md-layout">
        <div class="md-layout-item md-layout md-gutter md-alignment-center-center">
            <div class="md-layout-item md-size-100">
                <h1>Add players to game</h1>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-20">
                <md-field :class="hasErrorMessage('color')">
                    <label for="playerColor">Player color</label>
                    <md-select
                        v-model="playerColor"
                        name="playerColor"
                        id="playerColor"
                    >
                        <md-option
                            v-for="color in availableColors"
                            :key="color.value"
                            :value="color.value"
                        >
                            {{ color.name }}
                        </md-option>
                    </md-select>
                    <span v-if="formErrors['color']" class="md-error">
                        {{ formErrors['color'] }}
                    </span>
                </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-20">
                <md-field :class="hasErrorMessage('name')">
                    <label>Player name</label>
                    <md-input v-model="playerName"></md-input>
                    <span v-if="formErrors['name']" class="md-error">
                        {{ formErrors['name'] }}
                    </span>
                </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-10">
                <md-button
                    @click="handlePlayerAdd"
                    class="md-raised md-primary"
                    :disabled="disableAddButton"
                >
                    Add player
                </md-button>
            </div>
        </div>
        <div class="md-layout-item md-layout PlayersSetup__ListContainer">
            <h2 class="md-layout-item md-size-100">Players list</h2>

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
                    class="md-layout-item md-small-size-70 md-size-20 PlayersSetup__PlayerName"
                >
                    <strong>{{ player.name }}</strong>
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

        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar">
            <span>Maximum count of players is 6 persons.</span>
        </md-snackbar>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Sync, Get } from '@/utils/vuex-module-mutators';
import gameModule from '@/modules/Game';
import { PlayerType, SelectType } from '@/store/types';
import { FormErrorType } from '@/utils/errors/types';

@Component
export default class Players extends Vue {
    @Sync(gameModule, 'formData.name') private playerName!: string;

    @Sync(gameModule, 'formData.color') private playerColor!: string;

    @Get(gameModule) private players!: PlayerType[];

    @Get(gameModule) private formErrors!: FormErrorType[];

    @Get(gameModule) private figureColors!: SelectType[];

    @Sync(gameModule) private showSnackbar!: boolean;

    @Get(gameModule) private disableAddButton!: boolean;

    get availableColors() {
        return this.figureColors
            .filter((color) => !this.players
                .find((player) => player.color === color.value));
    }

    async handlePlayerAdd() {
        try {
            await gameModule.addPlayerToGame();
        } catch (e) {
            console.error(e);
        }
    }

    hasErrorMessage(key: string) {
        return {
            'md-invalid': this.formErrors[key],
        };
    }

    handleRemove(index: number) {
        gameModule.removePlayerFromGame(index);
    }

    setBoxColor(color: string) {
        return {
            'background-color': `#${color}`,
        };
    }
}
</script>

<style lang="scss" scoped>
    .PlayersSetup__ListItem {
        padding: 8px;

        .PlayersSetup__Player {
            &Color {
                width: 50px;
                height: 50px;
            }

            &Name {
                text-align: left;
                padding-left: 24px;
            }
        }
    }
</style>

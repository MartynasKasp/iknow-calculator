<template>
    <div class="md-layout-item md-layout md-gutter md-alignment-top-center">
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
                    :disabled="!availableColors.length"
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import gameModule from '@/modules/Game';
import playerModule from '@/modules/Player';
import { PlayerType, SelectType } from '@/store/types';
import { FormErrorType } from '@/utils/errors/types';

@Component
export default class PlayersSetupForm extends Vue {
    @Prop({ required: true }) private players!: PlayerType[];

    @Sync(playerModule, 'formData.name') private playerName!: string;

    @Sync(playerModule, 'formData.color') private playerColor!: string;

    @Get(playerModule) private formErrors!: FormErrorType[];

    @Get(playerModule) private disableAddButton!: boolean;

    @Get(gameModule) private figureColors!: SelectType[];

    get availableColors() {
        return this.figureColors
            .filter((color) => !this.players
                .find((player) => player.color === color.value));
    }

    async handlePlayerAdd() {
        try {
            await playerModule.addPlayerToGame();
        } catch (e) {
            console.error(e);
        }
    }

    hasErrorMessage(key: string) {
        return {
            'md-invalid': this.formErrors[key],
        };
    }
}
</script>

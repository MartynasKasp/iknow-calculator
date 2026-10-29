<template>
    <div class="md-layout-item md-layout md-gutter md-size-100 md-alignment-top-center">
        <div class="md-layout-item md-size-100">
            <h4>Add players to game</h4>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-20">
            <md-field :class="hasErrorMessage('color')">
                <label for="playerColor">Figurines color</label>
                <md-select
                    v-model="playerColor"
                    name="playerColor"
                    id="playerColor"
                    :disabled="availableColors.length === 0"
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
            <md-autocomplete
                v-if="suggestions.length"
                v-model="playerName"
                :md-options="suggestions"
                :class="hasErrorMessage('name')"
                :disabled="disableForm"
                md-dense
                @md-selected="handleSuggestionSelect"
            >
                <label>Player name</label>

                <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <span
                        class="PlayersSetup__SuggestionDot"
                        :style="suggestionDotStyle(item)"
                    ></span>
                    <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
                </template>

                <span v-if="formErrors['name']" class="md-error">
                    {{ formErrors['name'] }}
                </span>
            </md-autocomplete>

            <md-field v-else :class="hasErrorMessage('name')">
                <label>Player name</label>
                <md-input
                    v-model="playerName"
                    :disabled="disableForm"
                >
                </md-input>
                <span v-if="formErrors['name']" class="md-error">
                    {{ formErrors['name'] }}
                </span>
            </md-field>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-10">
            <md-button
                @click="handlePlayerAdd"
                class="md-raised md-primary"
                :disabled="disableForm"
            >
                Add player
            </md-button>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { Get, Sync } from '@/utils/vuex-module-mutators';
import gameModule from '@/modules/Game';
import playerModule from '@/modules/Player';
import { PlayerType, SelectType } from '@/store/types';
import { FormErrorType } from '@/utils/errors/types';
import PlayerHistory, { SavedPlayerType } from '@/utils/player-history';

@Component
export default class PlayersSetupForm extends Vue {
    @Prop({ required: true }) private players!: PlayerType[];

    @Sync(playerModule, 'formData.name') private playerName!: string;

    @Sync(playerModule, 'formData.color') private playerColor!: string;

    @Get(playerModule) private formErrors!: FormErrorType[];

    @Get(playerModule) private disableForm!: boolean;

    @Get(gameModule) private figureColors!: SelectType[];

    private savedPlayers: SavedPlayerType[] = PlayerHistory.getSavedPlayers();

    // Saved players not already added to this game.
    get suggestions(): string[] {
        return this.savedPlayers
            .filter((saved) => !this.players.some((p) => this.sameName(p.name, saved.name)))
            .map((saved) => saved.name);
    }

    // Typing or picking a known name also picks that player's usual color,
    // if nobody in this game has it yet.
    @Watch('playerName')
    onPlayerNameChange(name: string) {
        if (typeof name !== 'string' || this.playerColor) return;
        const saved = this.savedPlayers.find((p) => this.sameName(p.name, name));
        if (saved && this.availableColors.some((c) => c.value === saved.color)) {
            this.playerColor = saved.color;
        }
    }

    handleSuggestionSelect(name: string) {
        this.playerName = name;
        const saved = this.savedPlayers.find((p) => this.sameName(p.name, name));
        if (saved && this.availableColors.some((c) => c.value === saved.color)) {
            this.playerColor = saved.color;
        }
    }

    suggestionDotStyle(name: string) {
        const saved = this.savedPlayers.find((p) => p.name === name);
        return saved ? { 'background-color': `#${saved.color}` } : {};
    }

    sameName(a: string, b: string) {
        return a.trim().toLowerCase() === b.trim().toLowerCase();
    }

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

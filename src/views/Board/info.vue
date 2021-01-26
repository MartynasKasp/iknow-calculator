<template>
    <div class="
        Board__RoundInfo
        md-layout-item
        md-xsmall-size-90
        md-small-size-70
        md-size-30"
    >
        <div v-if="status">
            <md-card>
                <md-card-content>
                    <PlayerInfo
                        :player="picksCategory"
                        followingText="picks the category."
                    />
                    <PlayerInfo
                        :player="cardReader"
                        followingText="reads the card this round."
                    />
                </md-card-content>
            </md-card>

            <md-card v-if="knowFigures.length">
                <md-card-content>
                    <PlayerInfo
                        :player="placingKnowFigure"
                        leadingText="Place"
                        followingText="iKNOW figure."
                    />
                </md-card-content>
            </md-card>

            <md-card v-else-if="betFigures.length">
                <md-card-content>
                    <PlayerInfo
                        :player="placingBetFigure"
                        leadingText="Place"
                        followingText="iBET figure."
                    />
                </md-card-content>
            </md-card>
        </div>
        <md-card v-else>
            <md-card-content>
                Check <strong>iKNOW</strong> figures of those, who answered correctly.
            </md-card-content>
        </md-card>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import PlayerInfo from '@/projectComponents/player/player.vue';
import { PlayerType } from '@/store/types';
import playerModule from '@/modules/Player';

@Component({
    components: {
        PlayerInfo,
    },
})
export default class BoardInfo extends Vue {
    @Prop({ required: true }) private status!: boolean;

    @Get(playerModule) private players!: PlayerType[];

    @Get(playerModule) private readerIndex!: number;

    @Get(playerModule) private categoryPicker!: number;

    @Get(playerModule) private knowFigures!: PlayerType[];

    @Get(playerModule) private betFigures!: PlayerType[];

    get cardReader(): PlayerType {
        return this.players[this.readerIndex];
    }

    get picksCategory(): PlayerType {
        return this.players[this.categoryPicker];
    }

    get placingKnowFigure() {
        return this.knowFigures[0];
    }

    get placingBetFigure() {
        return this.betFigures[0];
    }
}
</script>

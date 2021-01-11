<template>
    <h2>Game view</h2>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get } from '@/utils/vuex-module-mutators';
import gameModule, { GameStatusType } from '@/modules/Game';

@Component
export default class Game extends Vue {
    @Get(gameModule) private gameStatus!: GameStatusType;

    beforeMount() {
        switch (this.gameStatus) {
        case GameStatusType.playersSetup:
            this.$router.push({ name: 'playersSetup' });
            break;
        default:
            break;
        }
    }
}
</script>

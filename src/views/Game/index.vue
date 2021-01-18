<template>
    <router-view></router-view>
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
        case GameStatusType.gameStarted:
            this.$router.push({ name: 'gameBoard' });
            break;
        case GameStatusType.gameEnd:
            this.$router.push({ name: 'gameEnd' });
            break;
        default:
            this.$router.push({ name: 'homepage' });
            break;
        }
    }
}
</script>

<template>
    <div>
        <div class="Player__Container">
            <span v-if="leadingText" class="Player__LeadignText">
                {{ leadingText }}
            </span>
            <div class="Player__Color" :style="elementStyle">
            </div>
            <strong class="Player__Name">
                {{ player.name }}
            </strong>
            <span v-if="followingText" class="Player__FollowingText">
                {{ followingText }}
            </span>
        </div>
    </div>
</template>

<script>
import PlayerType from '@/store/types';

export default {
    name: 'Player',
    props: {
        player: PlayerType,
        leadingText: String,
        followingText: String,
    },
    computed: {
        elementStyle() {
            return {
                'background-color': `#${this.player.color}`,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>

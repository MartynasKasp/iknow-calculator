<template>
    <md-toolbar class="Navbar__Container md-primary" md-elevation="2">
        <span class="md-xsmall-hide">
            iKNOW Points Calculator
        </span>

        <!-- <div class="Navbar__ItemsContainer">
            <ul>
                <li class="Navbar__Item">
                    <a href="#about">About</a>
                </li>
                <li class="Navbar__Item">
                    <a href="#how-to-use">How to use</a>
                </li>
            </ul>
        </div> -->

        <div class="md-toolbar-section-end">
            <md-button
                @click="handleGameStart"
                class="Navigation__StartButton md-raised"
            >
                Start game
            </md-button>
        </div>
    </md-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
    handleGameStart() {
        this.$router.push({ name: 'playersSetup' });
    }
}
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>

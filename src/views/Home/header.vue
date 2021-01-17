<template>
    <div class="Home__HeaderContainer">
        <md-toolbar class="Home__Navigation md-primary" md-elevation="2">
            <h2 class="md-title">
                iKnow Calculator
            </h2>
            <div class="md-toolbar-section-end">
                <md-button class="md-raised">Start game</md-button>
            </div>
        </md-toolbar>

        <div id="PageIntro" class="Home__MaskView">
            <div class="Home__Mask">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Header extends Vue {

}
</script>

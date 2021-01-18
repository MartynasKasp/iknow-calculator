<template>
    <div class="Home__HeaderContainer">
        <div id="PageIntro" class="Home__MaskView">
            <div class="Home__Mask">
                <div class="Home__MaskContent md-layout md-gutter">
                    <div class="md-layout-item md-layout md-size-100 md-alignment-center-center">
                        <div class="md-layout-item md-small-size-100 md-medium-size-50 md-size-30">
                            <h2>
                                iKnow Calculator
                            </h2>
                            <hr/>
                            <h5>
                                iKNOW board game playing made easier and faster!
                            </h5>
                        </div>
                    </div>
                </div>
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

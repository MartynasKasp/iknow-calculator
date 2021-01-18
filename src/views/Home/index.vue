<template>
    <div class="Home__Container">
        <Header />
        <Content />
        <div class="Home__FooterContainer md-layout md-gutter">
            <div class="md-layout-item md-layout md-size-100">
                Footer
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Header from './header.vue';
import Content from './content.vue';

@Component({
    components: {
        Header,
        Content,
    },
})
export default class Home extends Vue {

}
</script>

<style lang="scss">
    @import './styles.scss';
</style>

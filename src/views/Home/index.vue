<template>
    <div class="Home__Container">
        <Header />
        <Content />
        <Footer />

        <md-button
            @click="handleBugReport"
            class="md-fab Ui__FabBottom Ui__FabBottom--right"
        >
            <md-icon>bug_report</md-icon>
        </md-button>
    </div>
</template>

<script>
import gameModule from '@/modules/Game';
import Header from './header.vue';
import Content from './content.vue';
import Footer from './footer.vue';

export default {
    name: 'Home',
    components: {
        Header,
        Content,
        Footer,
    },
    methods: {
        handleBugReport() {
            gameModule.setBugReportDialog(true);
        },
    },
};
</script>

<style lang="scss">
    @import './styles.scss';
</style>

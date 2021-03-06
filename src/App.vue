<template>
    <div id="app">
        <Navigation v-if="displayNavbar" />

        <router-view :class="elementClass" />

        <BugReport />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navigation from '@/views/Navigation/index.vue';
import BugReport from '@/views/BugReport/index.vue';

@Component({
    components: {
        Navigation,
        BugReport,
    },
})
export default class App extends Vue {
    get displayNavbar() {
        return ['homepage'].includes(this.$route.name || '');
    }

    get elementClass() {
        return [
            'App__Layout',
            // eslint-disable-next-line @typescript-eslint/camelcase
            { App__GameLayout: !this.displayNavbar },
        ];
    }
}
</script>

<style lang="scss">
    html, body, #app {
        height: 100%;
        overflow: hidden;
    }

    body {
        margin: 0;

        font-weight: 400;
        font-size: 16px;
        letter-spacing: 0.5px;
    }

    #app {
        font-family: -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            'Open Sans',
            'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: $textColor;
        display: flex;
        flex-direction: row;
        line-height: 21px;
    }

    .App__Layout {
        overflow: auto;
        background-color: $backgroundColorDark;
        scroll-behavior: smooth;
    }

    .App__GameLayout {
        background:
            radial-gradient(ellipse at center, $colorDark 0%, $colorDarker 100%);
        padding-bottom: 72px;
        flex-grow: 1;
        flex-direction: column;
    }

    @font-face {
        font-family: "Material Icons";
        font-style: normal;
        font-weight: 400;
        src: url("/fonts/MaterialIcons/MaterialIcons-Regular.woff2") format('woff2');
    }

    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 300;
        src: url("/fonts/OpenSans-Light.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 300;
        src: url("/fonts/OpenSans-LightItalic.ttf") format('ttf');
    }

    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: url("/fonts/OpenSans-Regular.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 400;
        src: url("/fonts/OpenSans-Italic.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 600;
        src: url("/fonts/OpenSans-SemiBold.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 600;
        src: url("/fonts/OpenSans-SemiBoldItalic.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 700;
        src: url("/fonts/OpenSans-Bold.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 700;
        src: url("/fonts/OpenSans-BoldItalic.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: normal;
        font-weight: 800;
        src: url("/fonts/OpenSans-ExtraBold.ttf") format('ttf');
    }

    @font-face {
        font-family: "Open Sans";
        font-style: italic;
        font-weight: 800;
        src: url("/fonts/OpenSans-ExtraBoldItalic.ttf") format('ttf');
    }
</style>

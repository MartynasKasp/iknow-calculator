<template>
    <div id="app">
        <Navigation v-if="displayNavbar" />

        <router-view class="App__Layout" />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Navigation from '@/views/Navigation/index.vue';

@Component({
    components: {
        Navigation,
    },
})
export default class App extends Vue {
    get displayNavbar() {
        return ['homepage'].includes(this.$route.name || '');
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
        flex-grow: 1;
        overflow: auto;
        background-color: $backgroundColor;
        display: flex;
        flex-direction: column;

        > div {
            flex: 0 1 auto;
        }
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

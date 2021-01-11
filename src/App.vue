<template>
    <div id="app">
        <router-view class="App__Layout" />
    </div>
</template>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: row;
        line-height: 21px;
    }

    .App__Layout {
        flex-grow: 1;
        overflow: auto;
        // background-color: $backgroundColor;
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
</style>

<template>
    <div class="NotFound__Container md-layout md-gutter md-alignment-center-center">
        <h1>404</h1>

        <p>
            It is so empty in here...
            Maybe this page is hiding out in quarantine?
        </p>

        <md-button @click="handleGoHome">
            Go home
        </md-button>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
    metaInfo: {
        title: '404 Not Found',
    },
    created() {
        if (this.$router.name !== 'notFound404') {
            this.$router.push({ name: 'notFound404' });
        }
    },
    methods: {
        handleGoHome() {
            this.$router.push({ name: 'homepage' });
        },
    },
};
</script>

<style lang="scss" scoped>
    @import './styles.scss';
</style>

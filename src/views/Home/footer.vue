<template>
    <div class="Home__FooterContainer md-layout">
        <div class="Home__FooterContent md-layout-item md-layout md-gutter md-size-100">
            <div class="md-layout-item md-layout md-size-100">
                <div class="md-layout-item md-layout md-small-size-100 md-size-50">
                    <div>
                        <span class="subtitle1">
                            iKNOW Points Calculator
                        </span>
                        <p class="body2">
                            iKNOW board game playing made easier and faster!
                        </p>
                    </div>
                </div>
                <div class="md-layout-item md-layout md-small-size-50 md-size-25">
                    <div>
                        <span class="subtitle1">
                            Menu
                        </span>
                        <ul class="body2">
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#how-to-use">How to use it?</a>
                            </li>
                            <li>
                                <a :href="gameStartUrl">Start game</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="md-layout-item md-layout md-small-size-50 md-size-25">
                    <div>
                        <span class="subtitle1">
                            Links
                        </span>
                        <ul class="body2">
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="http://iknowgame.net/"
                                >
                                    Tactic iKNOW
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="http://www.tactic.net/iknow/eng/miten_pelaan.php"
                                >
                                    iKNOW instructions
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="Home__FooterCopyright md-layout-item md-layout md-size-100">
            <div class="md-layout-item md-size-100">
                &#169; 2021 Copyright: <a href="https://martynaskasp.lt">MartynasK</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    computed: {
        gameStartUrl() {
            return this.$router.resolve({ name: 'playersSetup' }).href;
        },
    },
};
</script>

<template>
    <div class="Home__ContentContainer md-layout md-gutter">
        <div class="md-layout-item md-layout md-size-100">
            <div
                id="about"
                class="md-layout-item md-layout md-size-100"
            >
                <h1 class="md-layout-item md-size-100">
                    About
                </h1>

                <div class="md-layout-item">
                    <p>
                        iKNOW is a board game with a touch more interaction.
                        It wraps knowledge, skill and luck into a single stylish whole.
                        It’s all about what you know, what you think the other players know,
                        and how well you know your friends.
                    </p>
                    <p>
                        This online game points calculator was made to make your iKNOW board game
                        playing experience much easier and faster!
                        Forget about wasting minutes after every round to correctly calculate
                        the points of each player.
                        With this easy to use calculator you will be able to save playing time
                        (which means you can play more matches), calculate each rounds outcome
                        and track everyones score!
                        When one of the players collects points needed to win the game, it will
                        automatically end, announcing the winner and showing the final results.
                    </p>
                    <p>
                        So what are you waiting for? Pick a friend who will administrate the
                        calculator, set it up and <a href="/game/players">start</a> the game.
                    </p>
                    <p>
                        If you are not familiar with the iKNOW board game instructions
                        you should read the original instructions
                        <a
                            target="_blank"
                            href="http://www.tactic.net/iknow/eng/miten_pelaan.php"
                        >here</a>.
                    </p>
                </div>
            </div>

            <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
            </div>

            <div
                id="how-to-use"
                class="md-layout-item md-layout md-size-100"
            >
                <h1 class="md-layout-item md-size-100">
                    How to use it?
                </h1>

                <div class="md-layout-item md-layout md-gutter md-size-100">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="/img/step1.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                <div class="Home__HowToNumber md-elevation-2">1</div>

                                While your friends prepares the board and questions,
                                add all your friends to the list by typing in their names
                                and assigning them their picked figurines colors.
                                To continue just press the red action button
                                on the bottom left corner.
                            </md-card-content>
                        </md-card>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="/img/step2.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                <div class="Home__HowToNumber md-elevation-2">2</div>

                                The game shows who picks the category and reads the question.
                                While your friends places iKNOW and iBET figures on the board,
                                you do the same in the calculator.
                                Figures placing order in the calculator starts from the card reader.
                            </md-card-content>
                        </md-card>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="/img/step3.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                <div class="Home__HowToNumber md-elevation-2">3</div>

                                After the card reader tells the correct answer, check the iKNOW
                                figures of those who answered correctly. Click the action
                                button and give or take the tokens from players based on the
                                shown round results.
                            </md-card-content>
                        </md-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Content extends Vue {

}
</script>

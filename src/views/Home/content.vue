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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque in feugiat risus. Quisque dictum ante interdum leo
                        ullamcorper varius. Aenean accumsan, justo non consectetur
                        dictum, dolor magna luctus arcu, vel cursus leo risus non dolor.
                        Integer non eros rutrum, porttitor ex at, rhoncus turpis. Sed finibus
                        libero vel semper ultrices. Pellentesque sit amet feugiat nunc,
                        ac vehicula nisi. Praesent consectetur enim vel consectetur feugiat.
                        Nam lacinia nunc a ipsum imperdiet vestibulum. Donec finibus leo et
                        ligula cursus vulputate. Integer maximus feugiat hendrerit. Sed quis
                        nibh semper odio placerat bibendum sit amet et elit.
                    </p>
                    <p>
                        Integer a ex scelerisque, pharetra magna in, eleifend turpis.
                        Integer imperdiet lacinia dui in dictum. Praesent vehicula vel
                        lectus non accumsan. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos. Sed vitae commodo metus.
                        Nam interdum et ipsum finibus laoreet. Quisque at elit augue.
                    </p>
                    <p>
                        Phasellus molestie, ligula vestibulum feugiat bibendum, metus ex vulputate
                        dolor, ac consequat ex lorem a augue. Vivamus et dignissim elit. Phasellus
                        at ipsum consectetur, tristique ligula sed, mollis quam. Sed mauris purus,
                        finibus sed nisl at, vehicula porttitor metus. Ut mauris leo, lobortis at
                        molestie eu, mattis eget urna. Aliquam laoreet sapien mauris, ut dignissim
                        mauris faucibus eget. Pellentesque condimentum mauris nisl, et
                        vulputate sapien fermentum ac. Cras at libero rhoncus, porta felis in,
                        facilisis sapien. In ullamcorper velit sit amet semper blandit.
                        Nam mollis orci id pretium iaculis. Suspendisse lorem lacus, semper ut
                        augue nec, egestas dignissim erat.
                    </p>
                </div>
            </div>

            <div
                id="how-to-use"
                class="md-layout-item md-layout md-size-100"
            >
                <h1 class="md-layout-item md-size-100">
                    How to use
                </h1>

                <div class="md-layout-item md-layout md-gutter md-size-100">
                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Optio itaque ea nostrum.
                            </md-card-content>
                        </md-card>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                Integer a ex scelerisque, pharetra magna in, eleifend turpis.
                            </md-card-content>
                        </md-card>
                    </div>

                    <div class="md-layout-item md-small-size-100 md-size-33">
                        <md-card>
                            <md-card-media>
                                <img src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png" alt="First step">
                            </md-card-media>

                            <md-card-content>
                                Phasellus molestie, ligula vestibulum feugiat bibendum,
                                metus ex vulputate dolor, ac consequat ex lorem a augue.
                                Vivamus et dignissim elit.
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

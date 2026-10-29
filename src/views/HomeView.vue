<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Bug, Dices } from 'lucide-vue-next';
import { useGameStore } from '@/stores/game';

useHead({ title: 'Less math, more trivia' });

const router = useRouter();
const game = useGameStore();
const year = new Date().getFullYear();

const startGame = () => router.push({ name: 'playersSetup' });

const steps = [
    {
        image: '/img/step1.webp',
        title: 'Gather the gang',
        text: 'While someone sets up the board, add everyone\'s name and figure color. '
            + 'Played before? Bring back last game\'s crew with one tap.',
    },
    {
        image: '/img/step2.webp',
        title: 'Place your bets',
        text: 'The app tells you who reads the card and who picks the category. '
            + 'Then copy the iKNOW and iBET figures from the real board onto the app\'s board.',
    },
    {
        image: '/img/step3.webp',
        title: 'Count the points',
        text: 'Once the answer is out, tap the iKNOW figures of everyone who got it right. '
            + 'The app works out who gains and who loses, and keeps the score.',
    },
];
</script>

<template>
    <div class="min-h-dvh">
        <header class="sticky top-0 z-30 border-b border-separator bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
            <nav class="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
                <RouterLink to="/" class="flex items-center gap-2 font-semibold">
                    <span class="grid size-8 place-items-center rounded-md bg-accent text-accent-foreground">
                        <Dices class="size-5" />
                    </span>
                    iKNOW Calculator
                </RouterLink>
                <div class="ms-auto flex items-center gap-1">
                    <a href="#how-it-works" class="button button--ghost button--sm max-sm:hidden">How it works</a>
                    <button class="button button--primary button--sm" @click="startGame">Start a game</button>
                </div>
            </nav>
        </header>

        <main>
            <section class="relative isolate overflow-hidden">
                <img
                    src="/img/iknow.webp"
                    alt=""
                    width="1440"
                    height="1077"
                    fetchpriority="high"
                    class="absolute inset-0 -z-10 size-full object-cover opacity-25 dark:opacity-20"
                >
                <div class="absolute inset-0 -z-10 bg-linear-to-b from-background/40 via-background/70 to-background"></div>

                <div class="mx-auto max-w-3xl px-4 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
                    <span class="chip chip--accent chip--soft chip--md">For iKNOW game nights</span>
                    <h1 class="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
                        Less math, <span class="text-accent">more trivia.</span>
                    </h1>
                    <p class="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted">
                        The iKNOW scorekeeper that does all the adding up,
                        so you can get back to arguing about the answers.
                    </p>
                    <div class="mt-8 flex flex-wrap justify-center gap-3">
                        <button class="button button--primary button--lg" @click="startGame">
                            Start a game
                            <ArrowRight class="size-4" />
                        </button>
                        <a href="#how-it-works" class="button button--secondary button--lg">How it works</a>
                    </div>
                </div>
            </section>

            <section id="about" class="mx-auto max-w-3xl scroll-mt-[calc(5rem+env(safe-area-inset-top))] px-4 py-16">
                <h2 class="text-2xl font-bold sm:text-3xl">What's this?</h2>
                <div class="mt-4 space-y-4 text-pretty text-muted">
                    <p>
                        iKNOW is the board game where it's not just about what <em>you</em> know,
                        it's about what you think your friends know. Great fun!
                        Counting everyone's points after every round? Not so much.
                    </p>
                    <p>
                        This little calculator does the bookkeeping for you: who reads the card,
                        who picks the category, who bet on whom and who's in the lead.
                        When someone reaches 20 points, it crowns the winner. Confetti included.
                    </p>
                    <p>
                        New to iKNOW? Have a look at the
                        <a
                            class="link text-accent"
                            target="_blank"
                            rel="noopener"
                            href="http://www.tactic.net/iknow/eng/miten_pelaan.php"
                        >official rules</a>
                        first. We'll wait.
                    </p>
                </div>
            </section>

            <section id="how-it-works" class="scroll-mt-[calc(5rem+env(safe-area-inset-top))] bg-surface-secondary/60 py-16">
                <div class="mx-auto max-w-5xl px-4">
                    <h2 class="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
                    <p class="mt-2 text-center text-muted">Three steps, and then it's all trivia.</p>

                    <ol class="mt-10 grid gap-6 md:grid-cols-3">
                        <li v-for="(step, index) in steps" :key="step.title" class="card card--default overflow-hidden p-0">
                            <img
                                :src="step.image"
                                :alt="step.title"
                                width="900"
                                height="675"
                                class="aspect-4/3 w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            >
                            <div class="card__content gap-2 p-5">
                                <div class="flex items-center gap-3">
                                    <span class="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                                        {{ index + 1 }}
                                    </span>
                                    <h3 class="card__title text-base">{{ step.title }}</h3>
                                </div>
                                <p class="card__description">{{ step.text }}</p>
                            </div>
                        </li>
                    </ol>

                    <div class="mt-10 text-center">
                        <button class="button button--primary button--lg" @click="startGame">
                            Let's play
                            <ArrowRight class="size-4" />
                        </button>
                    </div>
                </div>
            </section>
        </main>

        <footer class="border-t border-separator">
            <div class="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm sm:grid-cols-[2fr_1fr_1fr]">
                <div>
                    <div class="font-semibold">iKNOW Calculator</div>
                    <p class="mt-1 text-muted">Less math, more trivia.</p>
                </div>
                <div>
                    <div class="font-semibold">Around here</div>
                    <ul class="mt-2 space-y-1.5 text-muted">
                        <li><a class="link" href="#about">What's this?</a></li>
                        <li><a class="link" href="#how-it-works">How it works</a></li>
                        <li><RouterLink class="link" :to="{ name: 'playersSetup' }">Start a game</RouterLink></li>
                        <li>
                            <button class="link inline-flex items-center gap-1" @click="game.showBugReport = true">
                                <Bug class="size-3.5" /> Found a bug?
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="font-semibold">The real thing</div>
                    <ul class="mt-2 space-y-1.5 text-muted">
                        <li><a class="link" target="_blank" rel="noopener" href="http://iknowgame.net/">Tactic iKNOW</a></li>
                        <li>
                            <a class="link" target="_blank" rel="noopener" href="http://www.tactic.net/iknow/eng/miten_pelaan.php">
                                Game rules
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="space-y-1 border-t border-separator px-4 py-4 text-center text-xs text-muted">
                <p>
                    &copy; {{ year }}
                    <a class="link" href="https://martynaskasp.lt" target="_blank" rel="noopener">MartynasK</a>.
                    Made for game nights.
                </p>
                <p class="mx-auto max-w-xl text-pretty">
                    iKNOW Calculator is an unofficial fan-made tool. It is not affiliated with, endorsed by
                    or sponsored by Tactic Games. iKNOW is a trademark of its respective owner.
                </p>
                <p class="mx-auto max-w-xl text-pretty">
                    No tracking, no accounts, no cookies. Your players and games are stored only in this browser.
                </p>
            </div>
        </footer>
    </div>
</template>

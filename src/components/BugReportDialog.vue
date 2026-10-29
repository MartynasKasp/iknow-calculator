<script setup lang="ts">
import { Bug } from 'lucide-vue-next';
import { useGameStore } from '@/stores/game';
import AppModal from '@/components/ui/AppModal.vue';

const game = useGameStore();
const email = 'bugs@iknowcalculator.online';
</script>

<template>
    <AppModal v-model:open="game.showBugReport" title="Found a bug?">
        <template #icon>
            <span class="mb-1 grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                <Bug class="size-5" />
            </span>
        </template>
        <p>
            Oops, sorry about that! Drop a line to
            <a class="link text-accent-text" :href="`mailto:${email}?subject=Bug%20report`">{{ email }}</a>
            and tell us what happened. The more detail, the faster it gets squashed.
        </p>
        <p class="mt-2">Thanks for helping out!</p>

        <template #footer>
            <button class="button button--tertiary" @click="game.showBugReport = false">Close</button>
            <a class="button button--primary" :href="`mailto:${email}?subject=Bug%20report`">Send an email</a>
        </template>
    </AppModal>
</template>

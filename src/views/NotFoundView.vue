<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { Dices } from 'lucide-vue-next';

useHead({ title: 'Page not found' });
</script>

<template>
    <main class="grid min-h-dvh place-items-center px-4 text-center">
        <div>
            <Dices class="mx-auto size-14 text-accent" />
            <h1 class="mt-4 text-5xl font-bold">404</h1>
            <p class="mx-auto mt-3 max-w-sm text-muted">
                Hmm, this page doesn't exist. Maybe it rolled under the couch with the dice?
            </p>
            <RouterLink to="/" class="button button--primary mt-6">Take me home</RouterLink>
        </div>
    </main>
</template>

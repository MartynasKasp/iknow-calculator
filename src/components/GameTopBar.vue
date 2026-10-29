<script setup lang="ts">
import { Bug, House } from 'lucide-vue-next';
import { useGameStore } from '@/stores/game';

defineProps<{ title: string; subtitle?: string }>();
const emit = defineEmits<{ home: [] }>();

const game = useGameStore();
</script>

<template>
    <header class="sticky top-0 z-30 border-b border-separator bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div class="mx-auto flex h-14 max-w-3xl items-center gap-2 px-4">
            <button class="button button--ghost button--icon-only button--sm" aria-label="Home" @click="emit('home')">
                <House class="size-5" />
            </button>
            <div class="min-w-0 flex-1 text-center">
                <h1 class="truncate text-base font-semibold">{{ title }}</h1>
                <p v-if="subtitle" class="truncate text-xs text-muted">{{ subtitle }}</p>
            </div>
            <slot name="end">
                <button
                    class="button button--ghost button--icon-only button--sm"
                    aria-label="Report a bug"
                    @click="game.showBugReport = true"
                >
                    <Bug class="size-5" />
                </button>
            </slot>
        </div>
    </header>
</template>
